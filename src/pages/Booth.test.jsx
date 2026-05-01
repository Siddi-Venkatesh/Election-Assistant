import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Booth from './Booth';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => fallback || key,
  }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock analytics
vi.mock('../services/analytics', () => ({
  trackBoothSearch: vi.fn(),
}));

describe('Booth Page', () => {
  it('renders the search form', () => {
    render(<Booth />);
    const input = screen.getByPlaceholderText('e.g. SZ02625770');
    expect(input).toBeInTheDocument();
  });

  it('renders the ECI official search link', () => {
    render(<Booth />);
    const eciLink = screen.getByRole('link', { name: /official ECI/i });
    expect(eciLink).toHaveAttribute('href', 'https://electoralsearch.eci.gov.in/');
    expect(eciLink).toHaveAttribute('target', '_blank');
    expect(eciLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows error for short EPIC number', async () => {
    const user = userEvent.setup();
    render(<Booth />);
    
    const input = screen.getByPlaceholderText('e.g. SZ02625770');
    await user.type(input, 'AB');
    
    const submitBtn = screen.getByRole('button', { name: /search mock/i });
    await user.click(submitBtn);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows loading state during search', async () => {
    const user = userEvent.setup();
    render(<Booth />);
    
    const input = screen.getByPlaceholderText('e.g. SZ02625770');
    await user.type(input, 'ABCDEFGHIJ');
    
    const submitBtn = screen.getByRole('button', { name: /search mock/i });
    await user.click(submitBtn);
    
    expect(screen.getByText(/Searching Mock Database/i)).toBeInTheDocument();
  });

  it('displays search results after successful search', async () => {
    const user = userEvent.setup();
    render(<Booth />);
    
    const input = screen.getByPlaceholderText('e.g. SZ02625770');
    await user.type(input, 'SZ02625770');
    
    const submitBtn = screen.getByRole('button', { name: /search mock/i });
    await user.click(submitBtn);
    
    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('has accessible note about simulated data', () => {
    render(<Booth />);
    expect(screen.getByText(/simulated, realistic demonstration/i)).toBeInTheDocument();
  });

  it('has a properly labeled search input', () => {
    render(<Booth />);
    const input = screen.getByPlaceholderText('e.g. SZ02625770');
    expect(input).toHaveAttribute('autocomplete', 'off');
    expect(input).toHaveAttribute('id', 'epic-input');
  });
});

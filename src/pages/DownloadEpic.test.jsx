import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DownloadEpic from './DownloadEpic';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('DownloadEpic Page', () => {
  it('renders the page title', () => {
    render(<DownloadEpic />);
    expect(screen.getByText('Download e-EPIC')).toBeInTheDocument();
  });

  it('renders the download portal link with correct attributes', () => {
    render(<DownloadEpic />);
    const link = screen.getByRole('link', { name: /Download e-EPIC from official ECI portal/i });
    expect(link).toHaveAttribute('href', 'https://voters.eci.gov.in/home/e-epic-download');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders all benefits', () => {
    render(<DownloadEpic />);
    expect(screen.getByText(/Valid as proof of identity/)).toBeInTheDocument();
    expect(screen.getByText(/Cannot be lost or torn/)).toBeInTheDocument();
    expect(screen.getByText(/Easily printable and verifiable/)).toBeInTheDocument();
    expect(screen.getByText(/Stores directly on your phone/)).toBeInTheDocument();
  });

  it('renders the benefits list with proper ARIA', () => {
    render(<DownloadEpic />);
    const list = screen.getByRole('list', { name: /benefits/i });
    expect(list).toBeInTheDocument();
  });

  it('renders the update details section', () => {
    render(<DownloadEpic />);
    expect(screen.getByText(/Need to update your details/)).toBeInTheDocument();
    expect(screen.getByText(/Form 8/)).toBeInTheDocument();
  });

  it('renders the page description', () => {
    render(<DownloadEpic />);
    expect(screen.getByText(/digital version of your Electoral/)).toBeInTheDocument();
  });
});

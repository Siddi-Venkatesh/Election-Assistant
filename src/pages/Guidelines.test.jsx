import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Guidelines from './Guidelines';

// Mock lucide-react
vi.mock('lucide-react', () => ({
  AlertTriangle: (props) => <svg data-testid="icon-alert" {...props} />,
  Check: (props) => <svg data-testid="icon-check" {...props} />,
  X: (props) => <svg data-testid="icon-x" {...props} />,
  ShieldAlert: (props) => <svg data-testid="icon-shield" {...props} />,
}));

describe('Guidelines Page', () => {
  it('renders the heading', () => {
    render(<Guidelines />);
    expect(screen.getByText('Voting Day Guidelines')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<Guidelines />);
    expect(screen.getByText(/Ensure a smooth voting experience/)).toBeInTheDocument();
  });

  it('renders the Do\'s section with all items', () => {
    render(<Guidelines />);
    expect(screen.getByText("Do's")).toBeInTheDocument();
    expect(screen.getByText(/Bring your Voter ID/)).toBeInTheDocument();
    expect(screen.getByText(/Check your name/)).toBeInTheDocument();
    expect(screen.getByText(/Maintain the secrecy/)).toBeInTheDocument();
    expect(screen.getByText(/Follow the instructions/)).toBeInTheDocument();
  });

  it('renders the Don\'ts section with all items', () => {
    render(<Guidelines />);
    expect(screen.getByText("Don'ts")).toBeInTheDocument();
    expect(screen.getByText(/Do NOT carry mobile phones/)).toBeInTheDocument();
    expect(screen.getByText(/Do NOT wear political/)).toBeInTheDocument();
    expect(screen.getByText(/Do NOT attempt to influence/)).toBeInTheDocument();
    expect(screen.getByText(/Do NOT accept any gifts/)).toBeInTheDocument();
  });

  it('renders the warning alert', () => {
    render(<Guidelines />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(/Violation of these rules/)).toBeInTheDocument();
  });

  it('has accessible list roles for Do\'s and Don\'ts', () => {
    render(<Guidelines />);
    const lists = screen.getAllByRole('list');
    expect(lists.length).toBeGreaterThanOrEqual(2);
  });

  it('has section landmarks with aria-labelledby', () => {
    render(<Guidelines />);
    expect(document.getElementById('dos-heading')).toBeInTheDocument();
    expect(document.getElementById('donts-heading')).toBeInTheDocument();
  });
});

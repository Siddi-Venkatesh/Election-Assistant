import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Eligibility from './Eligibility';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  CheckCircle2: (props) => <svg data-testid="icon-checkcircle2" {...props} />,
  ShieldCheck: (props) => <svg data-testid="icon-shieldcheck" {...props} />,
  UserCheck: (props) => <svg data-testid="icon-usercheck" {...props} />,
  Scale: (props) => <svg data-testid="icon-scale" {...props} />,
}));

describe('Eligibility Page', () => {
  it('renders the heading', () => {
    render(<Eligibility />);
    expect(screen.getByText('Eligibility Criteria')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<Eligibility />);
    expect(screen.getByText(/To cast your vote/)).toBeInTheDocument();
  });

  it('renders all four eligibility criteria', () => {
    render(<Eligibility />);
    expect(screen.getByText('Be a citizen of the country.')).toBeInTheDocument();
    expect(screen.getByText('Be at least 18 years old on the qualifying date.')).toBeInTheDocument();
    expect(screen.getByText('Be registered as a voter in your constituency.')).toBeInTheDocument();
    expect(screen.getByText('Not be disqualified under any law.')).toBeInTheDocument();
  });

  it('has an accessible list with role attribute', () => {
    render(<Eligibility />);
    const list = screen.getByRole('list', { name: /eligibility requirements/i });
    expect(list).toBeInTheDocument();
  });

  it('renders four list items', () => {
    render(<Eligibility />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
  });
});

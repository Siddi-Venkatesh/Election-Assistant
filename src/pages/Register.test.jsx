/**
 * @fileoverview Tests for the Register page component.
 * Validates rendering of voter registration content, links, and accessibility.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Register from './Register';

describe('Register Page', () => {
  it('renders the page heading', () => {
    render(<Register />);
    expect(screen.getByText('Voter Registration')).toBeInTheDocument();
  });

  it('renders Form 6 mention', () => {
    render(<Register />);
    expect(screen.getByText(/Form 6/i)).toBeInTheDocument();
  });

  it('renders the National Voter Service Portal heading', () => {
    render(<Register />);
    expect(screen.getByText('National Voter Service Portal')).toBeInTheDocument();
  });

  it('renders a link to the official ECI portal', () => {
    render(<Register />);
    const link = screen.getByRole('link', { name: /Open National Voter Service Portal/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://voters.eci.gov.in/');
  });

  it('opens the ECI link in a new tab', () => {
    render(<Register />);
    const link = screen.getByRole('link', { name: /Open National Voter Service Portal/i });
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('uses noopener noreferrer on external link', () => {
    render(<Register />);
    const link = screen.getByRole('link', { name: /Open National Voter Service Portal/i });
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders descriptive text about the registration portal', () => {
    render(<Register />);
    expect(
      screen.getByText(/Click the button below to be securely redirected/i)
    ).toBeInTheDocument();
  });

  it('renders the page without crashing', () => {
    const { container } = render(<Register />);
    expect(container).toBeTruthy();
  });
});

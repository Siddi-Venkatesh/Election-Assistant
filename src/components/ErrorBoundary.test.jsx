/**
 * @fileoverview Tests for the ErrorBoundary component.
 * Validates that the boundary catches errors, shows fallback UI,
 * and supports recovery via the "Try Again" button.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';

/** A component that renders normally */
const GoodChild = () => <div>All good</div>;

/** A component that always throws during render */
const BrokenChild = () => {
  throw new Error('Test render error');
};

/** Suppress expected console.error noise from ErrorBoundary during tests */
const suppressConsoleError = () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  return spy;
};

describe('ErrorBoundary', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = suppressConsoleError();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('renders the fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows a Try Again button in the fallback UI', () => {
    render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
  });

  it('has role="alert" on the fallback UI for accessibility', () => {
    render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows descriptive error message in fallback UI', () => {
    render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
  });

  it('resets error state when Try Again is clicked', async () => {
    const user = userEvent.setup();
    let shouldThrow = true;

    const ConditionalChild = () => {
      if (shouldThrow) throw new Error('Conditional error');
      return <div>Recovered</div>;
    };

    render(
      <ErrorBoundary>
        <ConditionalChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Simulate recovery: stop throwing and click Try Again
    shouldThrow = false;
    await user.click(screen.getByRole('button', { name: /Try Again/i }));

    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });

  it('logs the error via componentDidCatch', () => {
    render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(consoleSpy).toHaveBeenCalled();
  });
});

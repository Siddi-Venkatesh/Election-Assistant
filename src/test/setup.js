/**
 * @fileoverview Global test setup for Vitest + React Testing Library.
 * Registers custom DOM matchers from jest-dom for assertions like
 * toBeInTheDocument(), toHaveAttribute(), toBeVisible(), etc.
 */
import '@testing-library/jest-dom';

// Mock scrollIntoView which is not available in JSDOM
Element.prototype.scrollIntoView = vi.fn();

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

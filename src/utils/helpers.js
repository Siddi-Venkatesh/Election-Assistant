/**
 * @fileoverview Pure utility functions extracted for testability.
 * These functions contain reusable business logic used across the application.
 */

import { EPIC_MIN_LENGTH, EPIC_PATTERN } from './constants';

/**
 * Validates an EPIC (Electoral Photo Identity Card) number.
 * A valid EPIC number is a string of at least EPIC_MIN_LENGTH characters
 * matching the pattern of 3 uppercase letters followed by 7 digits.
 *
 * @param {string} epic - The EPIC number to validate.
 * @returns {{ valid: boolean, error: string }} Validation result with optional error message.
 */
export function validateEpicNumber(epic) {
  if (!epic || typeof epic !== 'string') {
    return { valid: false, error: 'EPIC number is required.' };
  }

  const trimmed = epic.trim();

  if (trimmed.length < EPIC_MIN_LENGTH) {
    return { valid: false, error: 'Please enter a valid EPIC number (e.g., ABC1234567).' };
  }

  if (!EPIC_PATTERN.test(trimmed)) {
    return { valid: false, error: 'EPIC number should be 3 letters followed by 7 digits (e.g., ABC1234567).' };
  }

  return { valid: true, error: '' };
}

/**
 * Deterministically selects a booth record based on the EPIC number hash.
 * Uses character code summation to produce a consistent but varied result.
 *
 * @param {string} epic - The EPIC number entered by the user.
 * @param {Array<Object>} records - Array of booth records to select from.
 * @returns {Object|null} The selected booth record, or null if no records.
 */
export function getBoothRecord(epic, records) {
  if (!epic || !records || records.length === 0) {
    return null;
  }

  const hash = epic.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return records[hash % records.length];
}

/**
 * Determines the winner from an array of party seat data.
 * The winner is the party with the highest number of seats.
 *
 * @param {Array<{ party: string, seats: number }>} seats - Array of party seat objects.
 * @returns {{ party: string, seats: number }|null} The winning party object, or null.
 */
export function getWinner(seats) {
  if (!seats || seats.length === 0) {
    return null;
  }

  return seats.reduce((max, current) => (current.seats > max.seats ? current : max), seats[0]);
}

/**
 * Formats raw election data for a given year and state combination.
 * Returns a safe default if data is not available for the selection.
 *
 * @param {Object} rawData - The full election data object keyed by year.
 * @param {string} year - The election year (e.g., '2024').
 * @param {string} state - The state name (e.g., 'All India').
 * @returns {{ seats: Array, voteShare: Array }} Formatted election data.
 */
export function formatElectionData(rawData, year, state) {
  if (!rawData || !year || !state) {
    return { seats: [], voteShare: [] };
  }

  return rawData[year]?.[state] || { seats: [], voteShare: [] };
}

/**
 * Sanitizes user input by removing potentially dangerous HTML/script content.
 * This provides a basic layer of XSS protection on the client side.
 *
 * @param {string} input - The raw user input string.
 * @returns {string} Sanitized string safe for display and API transmission.
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Creates a debounced version of a function that delays invocation
 * until after the specified wait time has elapsed since the last call.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} The debounced function.
 */
export function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

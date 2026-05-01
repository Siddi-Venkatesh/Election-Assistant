/**
 * @fileoverview Application-wide constants extracted for maintainability
 * and testability. Centralizes magic strings and configuration values.
 */

/** Application route paths */
export const ROUTES = {
  HOME: '/',
  ELIGIBILITY: '/eligibility',
  REGISTER: '/register',
  BOOTH: '/booth',
  GUIDELINES: '/guidelines',
  RESULTS: '/results',
  DOWNLOAD_EPIC: '/download-epic',
};

/** Chart color palette for election results visualization */
export const CHART_COLORS = [
  '#ff9933',
  '#138808',
  '#64748b',
  '#eab308',
  '#ec4899',
  '#3b82f6',
  '#ef4444',
];

/** API endpoint base URL */
export const API_URL = '/api';

/** Minimum valid length for an EPIC number */
export const EPIC_MIN_LENGTH = 8;

/** Regex pattern for validating EPIC numbers (3 letters + 7 digits) */
export const EPIC_PATTERN = /^[A-Z]{3}\d{7}$/;

/** Available election years for the results dashboard */
export const ELECTION_YEARS = ['2024', '2019', '2014'];

/** Chat message debounce delay in milliseconds */
export const CHAT_DEBOUNCE_MS = 1000;

/** Supported languages for i18n */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' },
];

/** Google Analytics Measurement ID */
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

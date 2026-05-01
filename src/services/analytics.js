/**
 * @fileoverview Google Analytics 4 integration service.
 * Provides utility functions for tracking page views and custom events
 * across the Election Assistant application.
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs
 */

import { GA_MEASUREMENT_ID } from '../utils/constants';

/**
 * Tracks a page view event in Google Analytics.
 * Called on every route change via React Router.
 *
 * @param {string} path - The current page path (e.g., '/eligibility').
 * @param {string} [title] - Optional page title for the event.
 */
export function trackPageView(path, title) {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
}

/**
 * Tracks a custom event in Google Analytics.
 *
 * @param {string} eventName - The event name (e.g., 'chat_opened').
 * @param {Object} [params={}] - Additional event parameters.
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * Tracks when the AI chat assistant is opened.
 */
export function trackChatOpened() {
  trackEvent('chat_opened', { component: 'floating_chat' });
}

/**
 * Tracks when a chat message is sent by the user.
 *
 * @param {number} messageLength - Character length of the message.
 */
export function trackChatMessageSent(messageLength) {
  trackEvent('chat_message_sent', {
    message_length: messageLength,
    component: 'floating_chat',
  });
}

/**
 * Tracks when a user clicks on a timeline step on the home page.
 *
 * @param {number} stepId - The step number clicked (1-5).
 * @param {string} stepTitle - The title of the step.
 */
export function trackStepClicked(stepId, stepTitle) {
  trackEvent('step_clicked', {
    step_id: stepId,
    step_title: stepTitle,
  });
}

/**
 * Tracks language change events.
 *
 * @param {string} language - The language code selected (e.g., 'hi').
 */
export function trackLanguageChanged(language) {
  trackEvent('language_changed', { language });
}

/**
 * Tracks theme toggle events.
 *
 * @param {string} theme - The new theme ('dark' or 'light').
 */
export function trackThemeToggled(theme) {
  trackEvent('theme_toggled', { theme });
}

/**
 * Tracks EPIC number searches on the booth page.
 *
 * @param {boolean} success - Whether the search was successful.
 */
export function trackBoothSearch(success) {
  trackEvent('booth_search', { success });
}

/**
 * Tracks election result filter changes.
 *
 * @param {string} year - The selected year.
 * @param {string} state - The selected state.
 */
export function trackResultsFilter(year, state) {
  trackEvent('results_filter_changed', { year, state });
}

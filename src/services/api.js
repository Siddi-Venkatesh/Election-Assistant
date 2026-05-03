/**
 * @fileoverview API service layer for communicating with the Flask backend.
 * Centralises all HTTP calls and provides consistent error handling.
 *
 * @module services/api
 */
import { API_URL } from '../utils/constants';

/** Tracks the currently in-flight chat request so it can be aborted. */
let currentChatController = null;

export const api = {
  /**
   * Sends a user message to the backend chat endpoint and returns
   * the assistant's response text.
   *
   * Automatically cancels any previous in-flight request before sending
   * a new one to prevent race conditions.
   *
   * @param {string} message - The sanitized user message to send.
   * @returns {Promise<string>} The assistant's response text.
   * @throws {Error} When the server returns a non-OK response or network fails.
   */
  async sendChatMessage(message) {
    // Abort any previous pending request
    if (currentChatController) {
      currentChatController.abort();
    }
    currentChatController = new AbortController();

    const response = await fetch(`${API_URL}/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: currentChatController.signal,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to send message');
    return data.response;
  },
};

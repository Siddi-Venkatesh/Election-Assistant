/**
 * @fileoverview Google Cloud Translation API integration service.
 * Provides utility functions for translating text using the Google
 * Translation REST API. Used to supplement the existing i18next
 * localisation layer with on-demand machine translation.
 *
 * @see https://cloud.google.com/translate/docs/reference/rest
 */

/** Google Cloud Translation API endpoint */
const TRANSLATE_API_BASE = 'https://translation.googleapis.com/language/translate/v2';

/** Google Cloud API key (public-facing, restricted to Translation API + referrer) */
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || '';

/**
 * Translates a given text string to the target language using the
 * Google Cloud Translation API (Basic edition / REST v2).
 *
 * @param {string} text - The source text to translate.
 * @param {string} targetLanguage - BCP-47 language code of the target language (e.g. 'hi', 'te').
 * @param {string} [sourceLanguage='en'] - BCP-47 language code of the source language.
 * @returns {Promise<string>} The translated text, or the original text if translation fails.
 */
export async function translateText(text, targetLanguage, sourceLanguage = 'en') {
  if (!text || !targetLanguage || targetLanguage === sourceLanguage) {
    return text;
  }

  // If no API key configured, fall back gracefully to i18next translations
  if (!GOOGLE_API_KEY) {
    console.info('[Translate] No VITE_GOOGLE_TRANSLATE_API_KEY set — using i18next fallback.');
    return text;
  }

  try {
    const url = new URL(TRANSLATE_API_BASE);
    url.searchParams.set('key', GOOGLE_API_KEY);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text',
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.translations?.[0]?.translatedText || text;
  } catch (error) {
    console.error('[Translate] Translation failed:', error);
    return text;
  }
}

/**
 * Detects the language of a given text string using the
 * Google Cloud Translation API.
 *
 * @param {string} text - The text whose language to detect.
 * @returns {Promise<string>} The detected BCP-47 language code, or 'en' on failure.
 */
export async function detectLanguage(text) {
  if (!text || !GOOGLE_API_KEY) return 'en';

  try {
    const url = new URL(`${TRANSLATE_API_BASE}/detect`);
    url.searchParams.set('key', GOOGLE_API_KEY);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text }),
    });

    if (!response.ok) throw new Error(`Detect API error: ${response.status}`);

    const data = await response.json();
    return data?.data?.detections?.[0]?.[0]?.language || 'en';
  } catch (error) {
    console.error('[Translate] Language detection failed:', error);
    return 'en';
  }
}

/**
 * Returns the list of supported language codes available via the
 * Google Cloud Translation API.
 *
 * @returns {Promise<Array<{language: string, name: string}>>} Supported language list.
 */
export async function getSupportedLanguages() {
  if (!GOOGLE_API_KEY) return [];

  try {
    const url = new URL(`${TRANSLATE_API_BASE}/languages`);
    url.searchParams.set('key', GOOGLE_API_KEY);
    url.searchParams.set('target', 'en');

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Languages API error: ${response.status}`);

    const data = await response.json();
    return data?.data?.languages || [];
  } catch (error) {
    console.error('[Translate] Failed to fetch supported languages:', error);
    return [];
  }
}

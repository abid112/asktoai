/**
 * Utility functions for encoding and decoding prompts
 */

/**
 * Encode a prompt to a URL-safe base64 string
 * @param {string} prompt - The prompt text to encode
 * @returns {string} - URL-safe base64 encoded string
 */
export function encodePrompt(prompt) {
  try {
    // Convert to base64 and make URL-safe
    const base64 = btoa(unescape(encodeURIComponent(prompt)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    console.error('Error encoding prompt:', error);
    return '';
  }
}

/**
 * Decode a URL-safe base64 string back to prompt text
 * @param {string} encoded - The encoded string
 * @returns {string} - Decoded prompt text
 */
export function decodePrompt(encoded) {
  try {
    // Restore base64 padding and special characters
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(escape(atob(base64)));
  } catch (error) {
    console.error('Error decoding prompt:', error);
    return '';
  }
}

/**
 * Generate a random short ID
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} - Random alphanumeric ID
 */
export function generateShortId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Validate a prompt
 * @param {string} prompt - The prompt to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export function validatePrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return { valid: false, error: 'Prompt is required' };
  }
  
  if (prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt cannot be empty' };
  }
  
  if (prompt.length > 5000) {
    return { valid: false, error: 'Prompt is too long (max 5000 characters)' };
  }
  
  return { valid: true, error: null };
}


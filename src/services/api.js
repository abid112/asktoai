/**
 * API service for handling shortlink operations
 * Supports both demo mode (URL-encoded) and production mode (Supabase)
 */

import config from '../config';
import { encodePrompt, validatePrompt } from '../utils/encoding';

/**
 * Create a short link for a prompt
 * @param {string} prompt - The prompt text
 * @returns {Promise<object>} - { success: boolean, id: string, error?: string }
 */
export async function createShortLink(prompt) {
  // Validate prompt
  const validation = validatePrompt(prompt);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  try {
    if (config.appMode === 'demo') {
      // Demo mode: return URL-encoded version
      const encoded = encodePrompt(prompt);
      return {
        success: true,
        id: `?q=${encoded}`,
        mode: 'demo',
      };
    } else {
      // Production mode: call API endpoint
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to create link' };
      }

      return data;
    }
  } catch (error) {
    console.error('Error creating short link:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get a short link by ID
 * @param {string} id - The short link ID
 * @returns {Promise<object>} - { success: boolean, prompt?: string, clicks?: number, error?: string }
 */
export async function getShortLink(id) {
  try {
    if (config.appMode === 'demo') {
      return { success: false, error: 'Demo mode does not support ID-based links' };
    }

    const response = await fetch(`/api/get?id=${encodeURIComponent(id)}`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Link not found' };
    }

    return data;
  } catch (error) {
    console.error('Error getting short link:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Increment click count for a link
 * @param {string} id - The short link ID
 * @returns {Promise<object>} - { success: boolean, error?: string }
 */
export async function incrementClickCount(id) {
  try {
    if (config.appMode === 'demo') {
      return { success: true }; // No-op in demo mode
    }

    const response = await fetch('/api/increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to update click count' };
    }

    return data;
  } catch (error) {
    console.error('Error incrementing click count:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get all links (admin)
 * @returns {Promise<object>} - { success: boolean, links?: array, error?: string }
 */
export async function getAllLinks() {
  try {
    if (config.appMode === 'demo') {
      return { success: true, links: [] };
    }

    const response = await fetch('/api/list');
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to load links' };
    }

    return data;
  } catch (error) {
    console.error('Error getting all links:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Delete a link (admin)
 * @param {string} id - The short link ID
 * @returns {Promise<object>} - { success: boolean, error?: string }
 */
export async function deleteLink(id) {
  try {
    if (config.appMode === 'demo') {
      return { success: false, error: 'Demo mode does not support deletion' };
    }

    const response = await fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to delete link' };
    }

    return data;
  } catch (error) {
    console.error('Error deleting link:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}


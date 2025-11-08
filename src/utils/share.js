/**
 * Utility functions for sharing links
 */

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (error) {
        console.error('Fallback: Oops, unable to copy', error);
        textArea.remove();
        return false;
      }
    }
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

/**
 * Generate Twitter share URL
 * @param {string} url - URL to share
 * @param {string} text - Tweet text
 * @returns {string} - Twitter share URL
 */
export function getTwitterShareUrl(url, text = '') {
  const shareText = text || `Check out this AI prompt: ${url}`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
}

/**
 * Generate WhatsApp share URL
 * @param {string} url - URL to share
 * @param {string} text - Message text
 * @returns {string} - WhatsApp share URL
 */
export function getWhatsAppShareUrl(url, text = '') {
  const shareText = text || `Check out this AI prompt: ${url}`;
  return `https://wa.me/?text=${encodeURIComponent(shareText)}`;
}

/**
 * Generate Facebook share URL
 * @param {string} url - URL to share
 * @returns {string} - Facebook share URL
 */
export function getFacebookShareUrl(url) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

/**
 * Generate LinkedIn share URL
 * @param {string} url - URL to share
 * @returns {string} - LinkedIn share URL
 */
export function getLinkedInShareUrl(url) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}


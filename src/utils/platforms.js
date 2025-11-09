/**
 * AI Platform configurations
 */
export const platforms = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    color: 'bg-gradient-to-r from-green-500 to-emerald-600',
    icon: '🤖',
    logo: '/images/platforms/chatgpt.png',
    getUrl: (prompt) => `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'claude',
    name: 'Claude',
    color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    icon: '🧠',
    logo: '/images/platforms/claude.png',
    getUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-600',
    icon: '✨',
    logo: '/images/platforms/gemini.png',
    getUrl: (prompt) => `https://www.google.com/search?udm=50&aep=11&q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'grok',
    name: 'Grok',
    color: 'bg-gradient-to-r from-gray-700 to-gray-900',
    icon: '🚀',
    logo: '/images/platforms/grok.png',
    getUrl: (prompt) => `https://x.com/i/grok?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    color: 'bg-gradient-to-r from-teal-500 to-blue-600',
    icon: '🔍',
    logo: '/images/platforms/perplexity.png',
    getUrl: (prompt) => `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}`,
  },
];

/**
 * Get platform by ID
 * @param {string} id - Platform ID
 * @returns {object|null} - Platform object or null
 */
export function getPlatformById(id) {
  return platforms.find(p => p.id === id) || null;
}

/**
 * Get all platform URLs for a prompt
 * @param {string} prompt - The prompt text
 * @returns {object} - Object with platform IDs as keys and URLs as values
 */
export function getAllPlatformUrls(prompt) {
  return platforms.reduce((acc, platform) => {
    acc[platform.id] = platform.getUrl(prompt);
    return acc;
  }, {});
}


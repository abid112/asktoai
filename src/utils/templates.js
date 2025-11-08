/**
 * Prompt templates for quick start
 */

export const templates = [
  {
    id: 'explain',
    name: 'Explain Like I\'m 5',
    prompt: 'Explain [TOPIC] in simple terms that a 5-year-old would understand.',
    category: 'Learning',
  },
  {
    id: 'summarize',
    name: 'Summarize Article',
    prompt: 'Please summarize the following article in 3-5 bullet points:\n\n[PASTE ARTICLE HERE]',
    category: 'Productivity',
  },
  {
    id: 'code-review',
    name: 'Code Review',
    prompt: 'Review the following code and suggest improvements:\n\n```\n[PASTE CODE HERE]\n```',
    category: 'Development',
  },
  {
    id: 'brainstorm',
    name: 'Brainstorm Ideas',
    prompt: 'Help me brainstorm creative ideas for [PROJECT/TOPIC]. Please provide at least 10 unique suggestions.',
    category: 'Creative',
  },
  {
    id: 'email',
    name: 'Professional Email',
    prompt: 'Write a professional email about [TOPIC] to [RECIPIENT]. The tone should be [formal/casual/friendly].',
    category: 'Writing',
  },
  {
    id: 'debug',
    name: 'Debug Code',
    prompt: 'I\'m getting this error: [ERROR MESSAGE]\n\nHere\'s my code:\n```\n[PASTE CODE]\n```\n\nPlease help me fix it.',
    category: 'Development',
  },
  {
    id: 'research',
    name: 'Research Topic',
    prompt: 'I need to research [TOPIC]. Please provide:\n1. Key concepts and definitions\n2. Current trends\n3. Reliable sources for further reading',
    category: 'Learning',
  },
  {
    id: 'translate',
    name: 'Translate & Explain',
    prompt: 'Translate the following text to [LANGUAGE] and explain any cultural nuances:\n\n[TEXT]',
    category: 'Language',
  },
];

/**
 * Get template by ID
 * @param {string} id - Template ID
 * @returns {object|null} - Template object or null
 */
export function getTemplateById(id) {
  return templates.find(t => t.id === id) || null;
}

/**
 * Get templates by category
 * @param {string} category - Category name
 * @returns {array} - Array of templates
 */
export function getTemplatesByCategory(category) {
  return templates.filter(t => t.category === category);
}

/**
 * Get all categories
 * @returns {array} - Array of unique category names
 */
export function getCategories() {
  return [...new Set(templates.map(t => t.category))];
}


// Application configuration
export const config = {
  // App mode: 'demo' or 'production'
  appMode: import.meta.env.VITE_APP_MODE || 'demo',
  
  // Supabase configuration (for production mode)
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  
  // Rate limiting
  rateLimit: {
    maxRequests: parseInt(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS || '10'),
    windowMs: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  },
  
  // Turnstile CAPTCHA
  turnstile: {
    siteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '',
  },
  
  // Base URL
  baseUrl: import.meta.env.VITE_BASE_URL || window.location.origin,
  
  // AI Platform URLs
  platforms: {
    chatgpt: 'https://chat.openai.com/?q=',
    claude: 'https://claude.ai/new?q=',
    gemini: 'https://gemini.google.com/app?q=',
    grok: 'https://x.com/i/grok?q=',
    perplexity: 'https://www.perplexity.ai/?q=',
  },
};

export default config;


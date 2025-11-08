/**
 * Supabase client configuration
 */

import { createClient } from '@supabase/supabase-js';
import config from '../config';

let supabaseClient = null;

// Only initialize Supabase in production mode
if (config.appMode === 'production' && config.supabase.url && config.supabase.anonKey) {
  supabaseClient = createClient(config.supabase.url, config.supabase.anonKey);
} else {
  // Mock client for demo mode
  supabaseClient = {
    from: () => ({
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Demo mode') }) }) }),
      select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Demo mode') }) }), order: () => Promise.resolve({ data: [], error: null }) }),
      delete: () => ({ eq: () => Promise.resolve({ error: new Error('Demo mode') }) }),
    }),
    rpc: () => Promise.resolve({ error: new Error('Demo mode') }),
  };
}

export { supabaseClient };


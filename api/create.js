/**
 * Vercel Serverless Function: Create Short Link
 * POST /api/create
 * Body: { prompt: string }
 */

import { createClient } from '@supabase/supabase-js';

// Rate limiting storage (in-memory, resets on cold start)
const rateLimitStore = new Map();

// Helper: Generate random ID
function generateShortId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper: Check rate limit
function checkRateLimit(ip, maxRequests = 10, windowMs = 900000) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  
  // Filter valid requests within window
  const validRequests = userRequests.filter(timestamp => now - timestamp < windowMs);
  
  if (validRequests.length >= maxRequests) {
    const oldestRequest = Math.min(...validRequests);
    const resetAt = oldestRequest + windowMs;
    return {
      allowed: false,
      resetIn: Math.ceil((resetAt - now) / 1000),
    };
  }
  
  // Record new request
  validRequests.push(now);
  rateLimitStore.set(ip, validRequests);
  
  return { allowed: true };
}

// Helper: Validate prompt
function validatePrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return { valid: false, error: 'Prompt is required' };
  }
  
  if (prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt cannot be empty' };
  }
  
  if (prompt.length > 5000) {
    return { valid: false, error: 'Prompt is too long (max 5000 characters)' };
  }
  
  return { valid: true };
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    
    // Validate prompt
    const validation = validatePrompt(prompt);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    
    // Check rate limit
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        resetIn: rateLimit.resetIn,
      });
    }
    
    // Check if in demo mode
    const appMode = process.env.VITE_APP_MODE || 'demo';
    
    if (appMode === 'demo') {
      // Demo mode: return encoded prompt
      const encoded = Buffer.from(prompt)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
      
      return res.status(200).json({
        success: true,
        id: `?q=${encoded}`,
        mode: 'demo',
      });
    }
    
    // Production mode: Save to Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    const id = generateShortId();
    
    const { data, error } = await supabase
      .from('links')
      .insert([
        {
          id,
          prompt,
          clicks: 0,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to create link' });
    }
    
    return res.status(200).json({
      success: true,
      id: data.id,
      mode: 'production',
    });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


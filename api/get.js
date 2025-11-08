/**
 * Vercel Serverless Function: Get Short Link
 * GET /api/get?id=xxx
 */

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    
    // Check if in demo mode
    const appMode = process.env.VITE_APP_MODE || 'demo';
    
    if (appMode === 'demo') {
      return res.status(400).json({ error: 'Demo mode does not support ID-based links' });
    }
    
    // Production mode: Fetch from Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      return res.status(404).json({ error: 'Link not found' });
    }
    
    return res.status(200).json({
      success: true,
      prompt: data.prompt,
      clicks: data.clicks || 0,
      created_at: data.created_at,
    });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


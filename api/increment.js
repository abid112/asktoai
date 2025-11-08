/**
 * Vercel Serverless Function: Increment Click Count
 * POST /api/increment
 * Body: { id: string }
 */

import { createClient } from '@supabase/supabase-js';

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
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    
    // Check if in demo mode
    const appMode = process.env.VITE_APP_MODE || 'demo';
    
    if (appMode === 'demo') {
      return res.status(200).json({ success: true }); // No-op in demo mode
    }
    
    // Production mode: Update in Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Use RPC function for atomic increment
    const { error } = await supabase.rpc('increment_clicks', { link_id: id });
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to update click count' });
    }
    
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


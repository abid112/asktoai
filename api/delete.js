/**
 * Vercel Serverless Function: Delete Link (Admin)
 * DELETE /api/delete
 * Body: { id: string }
 */

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'DELETE') {
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
      return res.status(400).json({ error: 'Demo mode does not support deletion' });
    }
    
    // Production mode: Delete from Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to delete link' });
    }
    
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


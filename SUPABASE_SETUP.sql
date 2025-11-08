-- =====================================================
-- Supabase Database Setup for "Let Me Ask AI For You"
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Create links table
CREATE TABLE IF NOT EXISTS links (
  id TEXT PRIMARY KEY,
  prompt TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_links_clicks ON links(clicks DESC);
CREATE INDEX IF NOT EXISTS idx_links_id ON links(id);

-- Create function to increment clicks atomically
CREATE OR REPLACE FUNCTION increment_clicks(link_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE links 
  SET clicks = clicks + 1, 
      updated_at = NOW() 
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to clean up old links (optional)
CREATE OR REPLACE FUNCTION cleanup_old_links(days_old INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM links 
  WHERE created_at < NOW() - (days_old || ' days')::INTERVAL
  AND clicks = 0;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get link statistics
CREATE OR REPLACE FUNCTION get_link_stats()
RETURNS TABLE(
  total_links BIGINT,
  total_clicks BIGINT,
  avg_clicks NUMERIC,
  links_today BIGINT,
  clicks_today BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_links,
    COALESCE(SUM(clicks), 0)::BIGINT as total_clicks,
    COALESCE(AVG(clicks), 0)::NUMERIC as avg_clicks,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::BIGINT as links_today,
    COALESCE(SUM(clicks) FILTER (WHERE created_at >= CURRENT_DATE), 0)::BIGINT as clicks_today
  FROM links;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security (RLS)
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON links;
DROP POLICY IF EXISTS "Allow public insert" ON links;
DROP POLICY IF EXISTS "Allow public update clicks" ON links;
DROP POLICY IF EXISTS "Allow public delete" ON links;

-- Create policies for public access
-- Note: In production, you may want to restrict these based on authentication

-- Allow anyone to read links
CREATE POLICY "Allow public read access" ON links
  FOR SELECT 
  USING (true);

-- Allow anyone to create links
CREATE POLICY "Allow public insert" ON links
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to update clicks (through the increment_clicks function)
CREATE POLICY "Allow public update clicks" ON links
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete links (you may want to restrict this in production)
CREATE POLICY "Allow public delete" ON links
  FOR DELETE 
  USING (true);

-- Optional: Enable Realtime for live updates
-- Uncomment the following line if you want real-time updates in the admin dashboard
-- ALTER PUBLICATION supabase_realtime ADD TABLE links;

-- Create a view for popular links (optional)
CREATE OR REPLACE VIEW popular_links AS
SELECT 
  id,
  LEFT(prompt, 100) as prompt_preview,
  clicks,
  created_at
FROM links
WHERE clicks > 0
ORDER BY clicks DESC
LIMIT 100;

-- Grant access to the view
GRANT SELECT ON popular_links TO anon, authenticated;

-- =====================================================
-- Verification Queries
-- =====================================================
-- Run these to verify your setup

-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'links'
) as table_exists;

-- Check if indexes exist
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'links';

-- Check if functions exist
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN ('increment_clicks', 'cleanup_old_links', 'get_link_stats');

-- Check RLS policies
SELECT policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'links';

-- =====================================================
-- Test Queries
-- =====================================================
-- Use these to test your setup

-- Insert a test link
INSERT INTO links (id, prompt, clicks) 
VALUES ('test123', 'This is a test prompt', 0);

-- Increment clicks
SELECT increment_clicks('test123');

-- Get link stats
SELECT * FROM get_link_stats();

-- View popular links
SELECT * FROM popular_links;

-- Clean up test data
DELETE FROM links WHERE id = 'test123';

-- =====================================================
-- Maintenance
-- =====================================================

-- Schedule cleanup of old unused links (run manually or via cron)
-- This will delete links older than 90 days with 0 clicks
-- SELECT cleanup_old_links(90);

-- Get database size
SELECT pg_size_pretty(pg_database_size(current_database())) as database_size;

-- Get table size
SELECT pg_size_pretty(pg_total_relation_size('links')) as table_size;

-- =====================================================
-- Security Notes
-- =====================================================
-- 
-- 1. The current RLS policies allow public access for demo purposes
-- 2. For production, consider:
--    - Restricting delete to authenticated users only
--    - Adding rate limiting at the database level
--    - Implementing user authentication
--    - Adding admin-only policies for sensitive operations
-- 
-- Example: Restrict delete to authenticated users only
-- 
-- DROP POLICY "Allow public delete" ON links;
-- CREATE POLICY "Allow authenticated delete" ON links
--   FOR DELETE 
--   USING (auth.role() = 'authenticated');
-- 
-- =====================================================


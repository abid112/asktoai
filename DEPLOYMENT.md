# Deployment Guide

This guide covers deploying "Let Me Ask AI For You" to various platforms.

## Table of Contents

1. [Vercel Deployment](#vercel-deployment)
2. [Cloudflare Pages Deployment](#cloudflare-pages-deployment)
3. [Netlify Deployment](#netlify-deployment)
4. [Supabase Setup](#supabase-setup)
5. [Environment Variables](#environment-variables)

---

## Vercel Deployment

### Method 1: Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   - In Project Settings → Environment Variables, add:
     ```
     VITE_APP_MODE=production
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     VITE_BASE_URL=https://your-project.vercel.app
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live!

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add VITE_APP_MODE
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   vercel env add VITE_BASE_URL
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## Cloudflare Pages Deployment

### Prerequisites

- Cloudflare account
- Wrangler CLI (optional)

### Method 1: Cloudflare Dashboard

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Root directory: `/`

3. **Add Environment Variables**
   - In Pages → Settings → Environment Variables
   - Add all required variables

### Method 2: Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=let-me-ask-ai
   ```

### Cloudflare Workers (for API functions)

Create `wrangler.toml`:

```toml
name = "let-me-ask-ai-api"
compatibility_date = "2024-01-01"

[env.production]
vars = { VITE_APP_MODE = "production" }

[[env.production.kv_namespaces]]
binding = "RATE_LIMIT"
id = "your-kv-namespace-id"
```

---

## Netlify Deployment

### Method 1: Netlify Dashboard

1. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Netlify will auto-detect settings

3. **Add Environment Variables**
   - Site Settings → Environment Variables
   - Add all required variables

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Netlify Functions

For Netlify, you'll need to adapt the API functions. Create `netlify/functions/` directory and convert Vercel functions to Netlify format.

Example (`netlify/functions/create.js`):

```javascript
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // Your API logic here
  // Similar to Vercel functions but different signature
};
```

---

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project to be created

### 2. Set Up Database Schema

1. Go to SQL Editor in Supabase Dashboard
2. Run the following SQL:

```sql
-- Create links table
CREATE TABLE links (
  id TEXT PRIMARY KEY,
  prompt TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_links_created_at ON links(created_at DESC);
CREATE INDEX idx_links_clicks ON links(clicks DESC);

-- Create function to increment clicks atomically
CREATE OR REPLACE FUNCTION increment_clicks(link_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE links SET clicks = clicks + 1 WHERE id = link_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access" ON links
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON links
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update clicks" ON links
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON links
  FOR DELETE USING (true);
```

### 3. Get API Credentials

1. Go to Project Settings → API
2. Copy:
   - Project URL (VITE_SUPABASE_URL)
   - Anon/Public Key (VITE_SUPABASE_ANON_KEY)

### 4. Optional: Set Up Realtime (for live updates)

```sql
-- Enable realtime for links table
ALTER PUBLICATION supabase_realtime ADD TABLE links;
```

---

## Environment Variables

### Required Variables

```env
# Application Mode
VITE_APP_MODE=production

# Supabase (Production Mode Only)
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Base URL (Your deployed domain)
VITE_BASE_URL=https://yourdomain.com
```

### Optional Variables

```env
# Rate Limiting
VITE_RATE_LIMIT_MAX_REQUESTS=10
VITE_RATE_LIMIT_WINDOW_MS=900000

# Turnstile CAPTCHA (Optional)
VITE_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

### Setting Environment Variables

#### Vercel
```bash
vercel env add VARIABLE_NAME
```

#### Cloudflare
- Dashboard → Pages → Settings → Environment Variables

#### Netlify
```bash
netlify env:set VARIABLE_NAME value
```

---

## Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] Supabase database is configured
- [ ] Test link creation
- [ ] Test link retrieval
- [ ] Test admin dashboard
- [ ] Verify rate limiting works
- [ ] Check mobile responsiveness
- [ ] Test QR code generation
- [ ] Verify social sharing works
- [ ] Set up custom domain (optional)
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring/analytics

---

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- Solution: Run `npm install` and commit `package-lock.json`

**Error**: `Environment variable not found`
- Solution: Check all required env vars are set in platform settings

### API Functions Not Working

**Error**: `404 on /api/*`
- Vercel: Check `vercel.json` rewrites
- Netlify: Check `netlify.toml` redirects
- Cloudflare: Ensure Workers are deployed

### Supabase Connection Issues

**Error**: `Failed to create link`
- Check Supabase URL and key are correct
- Verify RLS policies are set up
- Check network/CORS settings

### Rate Limiting Not Working

- Server-side rate limiting uses in-memory storage
- Consider Redis for production
- Client-side rate limiting uses localStorage

---

## Performance Optimization

### 1. Enable Caching

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Enable Compression

Most platforms enable this by default, but verify in settings.

### 3. Optimize Images

- Use WebP format
- Implement lazy loading
- Use CDN for static assets

### 4. Database Optimization

- Add indexes for frequently queried columns
- Use connection pooling
- Implement caching layer (Redis)

---

## Monitoring & Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `src/main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

// In your app
<Analytics />
```

### Custom Analytics

Implement in `src/services/analytics.js`:
```javascript
export function trackEvent(event, data) {
  // Your analytics logic
}
```

---

## Security Best Practices

1. **Never commit `.env` files**
2. **Use environment variables for secrets**
3. **Enable RLS on Supabase**
4. **Implement rate limiting**
5. **Add CAPTCHA for high-traffic sites**
6. **Regularly update dependencies**
7. **Monitor for suspicious activity**

---

## Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Cloudflare: [developers.cloudflare.com](https://developers.cloudflare.com)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- Supabase: [supabase.com/docs](https://supabase.com/docs)


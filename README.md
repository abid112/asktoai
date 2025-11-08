# Let Me Ask AI For You 🤖

Create shareable links that prefill prompts for multiple AI platforms (ChatGPT, Claude, Gemini, Grok, and Perplexity).

## ✨ Features

- 🚀 **Quick Link Generation**: Create shareable AI prompt links in seconds
- 🔗 **Universal Links**: One link works across 5 major AI platforms
- 📱 **QR Code Support**: Generate QR codes for easy mobile sharing
- 📊 **Admin Dashboard**: Track clicks and manage links
- 🛡️ **Rate Limiting**: Built-in abuse protection
- 🎨 **Beautiful UI**: Modern, responsive design with TailwindCSS
- 🔄 **Two Modes**: Demo (no database) and Production (Supabase)

## 🎯 Supported AI Platforms

- ChatGPT (OpenAI)
- Claude (Anthropic)
- Gemini (Google)
- Grok (X/Twitter)
- Perplexity AI

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Database**: Supabase (production) / URL-encoded (demo)
- **Serverless**: Vercel Functions / Cloudflare Workers compatible
- **QR Codes**: qrcode.react

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- (Optional) Supabase account for production mode

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd let-me-ask-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 🔧 Configuration

### Demo Mode (No Database)

For quick testing without a database, set in `.env`:

```env
VITE_APP_MODE=demo
```

In demo mode:
- Links are encoded in the URL query parameter
- No persistence (links work as long as the URL is shared)
- Admin dashboard shows empty state
- Perfect for local development and testing

### Production Mode (Supabase)

For production deployment with persistence:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Set up the database schema**

   Run this SQL in your Supabase SQL editor:

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

   -- Create function to increment clicks atomically
   CREATE OR REPLACE FUNCTION increment_clicks(link_id TEXT)
   RETURNS void AS $$
   BEGIN
     UPDATE links SET clicks = clicks + 1 WHERE id = link_id;
   END;
   $$ LANGUAGE plpgsql;

   -- Enable Row Level Security (RLS)
   ALTER TABLE links ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Allow public read access" ON links
     FOR SELECT USING (true);

   CREATE POLICY "Allow public insert" ON links
     FOR INSERT WITH CHECK (true);

   CREATE POLICY "Allow public update clicks" ON links
     FOR UPDATE USING (true);

   CREATE POLICY "Allow public delete" ON links
     FOR DELETE USING (true);
   ```

3. **Configure environment variables**

   Update `.env`:

   ```env
   VITE_APP_MODE=production
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_BASE_URL=https://yourdomain.com
   ```

   Get your Supabase URL and anon key from: Project Settings → API

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

   Or use the Vercel dashboard:
   - Connect your GitHub repository
   - Vercel will auto-detect the Vite configuration
   - Add environment variables in Project Settings

3. **Configure environment variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Redeploy

### Deploy to Cloudflare Pages

1. **Create `wrangler.toml`** (for Cloudflare Workers)
   ```toml
   name = "let-me-ask-ai"
   compatibility_date = "2024-01-01"
   
   [build]
   command = "npm run build"
   
   [build.upload]
   format = "service-worker"
   ```

2. **Deploy**
   ```bash
   npm run build
   npx wrangler pages deploy dist
   ```

3. **Configure environment variables**
   - Go to Cloudflare Dashboard → Pages → Settings
   - Add environment variables

### Deploy to Netlify

1. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## 📖 Usage

### Creating a Link

1. Visit the homepage
2. Enter your AI prompt or select a template
3. (Optional) Toggle "Include current page URL"
4. Click "Generate Shareable Link"
5. Share the link via QR code, social media, or direct link

### Using a Link

1. Click on a shared link (e.g., `yourdomain.com/s/abc123`)
2. View the prompt
3. Click on your preferred AI platform
4. The AI platform opens with the prompt pre-filled

### Admin Dashboard

1. Visit `/admin`
2. View all created links
3. See click statistics
4. Delete links as needed

## 🎨 Customization

### Adding More AI Platforms

Edit `src/utils/platforms.js`:

```javascript
{
  id: 'newai',
  name: 'New AI',
  color: 'bg-gradient-to-r from-red-500 to-pink-600',
  icon: '🔥',
  getUrl: (prompt) => `https://newai.com/?q=${encodeURIComponent(prompt)}`,
}
```

### Adding More Templates

Edit `src/utils/templates.js`:

```javascript
{
  id: 'custom',
  name: 'Custom Template',
  prompt: 'Your template text here...',
  category: 'Custom',
}
```

### Styling

- Main styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind utility classes

## 🔒 Security & Rate Limiting

### Client-Side Rate Limiting

- Default: 10 requests per 15 minutes
- Stored in localStorage
- Configure in `.env`:
  ```env
  VITE_RATE_LIMIT_MAX_REQUESTS=10
  VITE_RATE_LIMIT_WINDOW_MS=900000
  ```

### Server-Side Rate Limiting

- Implemented in API functions
- Uses in-memory storage (resets on cold start)
- For production, consider Redis or similar

### CAPTCHA (Optional)

Add Cloudflare Turnstile for additional protection:

```env
VITE_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

## 📊 Analytics

The app includes basic click tracking. For advanced analytics:

1. Add Google Analytics
2. Use Vercel Analytics
3. Implement custom analytics endpoint

## 🐛 Troubleshooting

### Links not working in production

- Check environment variables are set correctly
- Verify Supabase connection
- Check browser console for errors

### Rate limit issues

- Clear localStorage: `localStorage.clear()`
- Adjust rate limit settings in `.env`

### Build errors

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`

## 📝 Project Structure

```
let-me-ask-ai/
├── api/                    # Serverless functions
│   ├── create.js          # Create short link
│   ├── get.js             # Get link by ID
│   ├── increment.js       # Increment click count
│   ├── list.js            # List all links (admin)
│   └── delete.js          # Delete link (admin)
├── src/
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── .env.example           # Environment variables template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

## 🎯 Name Suggestions

1. **AskAI.link** - Short and memorable
2. **AskForAI.com** - Clear purpose
3. **LetMeAskAI.com** - Playful and descriptive
4. **QueryBuddy.ai** - Friendly and helpful
5. **AskMeAI.app** - Modern and concise

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review Supabase and Vercel docs

---

Made with ❤️ by the community


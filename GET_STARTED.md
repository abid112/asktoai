# 🚀 Get Started with "Let Me Ask AI For You"

Welcome! This guide will get you up and running in **5 minutes**.

## 🎯 What You're Building

A web app that creates shareable links to prefill prompts across ChatGPT, Claude, Gemini, Grok, and Perplexity.

**Example:**
1. User enters: "Explain quantum computing in simple terms"
2. App generates: `yourdomain.com/s/abc123`
3. Anyone clicking the link sees the prompt and can open it in any AI platform

## ⚡ Quick Start (Demo Mode)

**No database needed! Perfect for testing.**

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env
```

The default `.env.example` is already set to demo mode, so you're good to go!

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open Your Browser

Visit: `http://localhost:3000`

### 5. Test It Out

1. Enter a prompt (or select a template)
2. Click "Generate Shareable Link"
3. Copy the link and open it in a new tab
4. Click any AI platform button
5. See your prompt pre-filled! 🎉

**That's it!** You now have a working app.

## 🔥 Upgrade to Production Mode

**Want persistence, analytics, and admin dashboard?**

### 1. Create Supabase Account

Go to [supabase.com](https://supabase.com) and create a free account.

### 2. Create New Project

- Click "New Project"
- Choose a name and password
- Wait ~2 minutes for setup

### 3. Set Up Database

1. Go to **SQL Editor** in Supabase
2. Open `SUPABASE_SETUP.sql` from this project
3. Copy all the SQL
4. Paste into Supabase SQL Editor
5. Click **Run**

### 4. Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (long string starting with `eyJ...`)

### 5. Update Environment Variables

Edit `.env`:

```env
VITE_APP_MODE=production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_BASE_URL=http://localhost:3000
```

### 6. Restart Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### 7. Test Production Features

1. Create a link - it's now saved to database!
2. Visit `/admin` - see your links and stats
3. Click counts are tracked
4. Links persist even after server restart

## 🌐 Deploy to Production

### Option 1: Deploy to Vercel (Recommended)

**Step 1: Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

**Step 2: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects everything!

**Step 3: Add Environment Variables**

In Vercel Dashboard → Settings → Environment Variables:

```
VITE_APP_MODE=production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_BASE_URL=https://your-project.vercel.app
```

**Step 4: Deploy**

Click "Deploy" and wait ~2 minutes.

**Done!** Your app is live at `https://your-project.vercel.app`

### Option 2: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo)

## 📚 What's Included

### ✅ Features

- **Prompt Composer** with templates
- **5 AI Platforms** (ChatGPT, Claude, Gemini, Grok, Perplexity)
- **QR Code Generation** for mobile sharing
- **Social Sharing** (Twitter, WhatsApp)
- **Admin Dashboard** with analytics
- **Rate Limiting** to prevent abuse
- **Responsive Design** for all devices

### 📁 Project Structure

```
let-me-ask-ai/
├── api/              # Serverless functions
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── utils/        # Utilities
│   └── config/       # Configuration
├── public/           # Static assets
└── docs/             # Documentation
```

### 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel / Cloudflare / Netlify
- **API:** Serverless Functions

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
  },
}
```

### Add AI Platforms

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

### Add Templates

Edit `src/utils/templates.js`:

```javascript
{
  id: 'custom',
  name: 'My Template',
  prompt: 'Your prompt here...',
  category: 'Custom',
}
```

## 📖 Documentation

- **[README.md](README.md)** - Complete documentation
- **[QUICKSTART.md](QUICKSTART.md)** - Detailed setup guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions
- **[STRUCTURE.md](STRUCTURE.md)** - Project structure
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute

## 🆘 Troubleshooting

### "Module not found" error

```bash
rm -rf node_modules package-lock.json
npm install
```

### Links not saving

- Check `VITE_APP_MODE=production` in `.env`
- Verify Supabase credentials
- Check browser console for errors

### Build fails

```bash
npm run build
```

Check the error message and ensure all dependencies are installed.

### Rate limit issues

Clear localStorage in browser console:
```javascript
localStorage.clear()
```

## 💡 Tips

1. **Start with demo mode** to test everything
2. **Use production mode** for real deployments
3. **Check the admin dashboard** at `/admin`
4. **Rate limiting** prevents abuse (10 requests per 15 min)
5. **QR codes** work great for mobile sharing

## 🎯 Next Steps

1. ✅ Get the app running locally
2. ✅ Test all features
3. ✅ Set up Supabase (optional)
4. ✅ Deploy to Vercel
5. ✅ Customize branding
6. ✅ Share your first link!

## 🌟 Name Suggestions

Choose a domain name:

1. **AskAI.link** - Short and memorable
2. **AskForAI.com** - Clear purpose
3. **LetMeAskAI.com** - Playful
4. **QueryBuddy.ai** - Friendly
5. **AskMeAI.app** - Modern

## 🤝 Need Help?

- 📖 Read the [full documentation](README.md)
- 🐛 [Report issues](https://github.com/yourusername/your-repo/issues)
- 💬 [Ask questions](https://github.com/yourusername/your-repo/discussions)

## 🎉 You're Ready!

You now have everything you need to:

- ✅ Run the app locally
- ✅ Deploy to production
- ✅ Customize to your needs
- ✅ Share AI prompts with the world

**Happy building!** 🚀

---

**Quick Commands Reference:**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

---

Made with ❤️ for the AI community


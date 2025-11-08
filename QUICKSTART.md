# Quick Start Guide

Get "Let Me Ask AI For You" up and running in 5 minutes!

## 🚀 Option 1: Demo Mode (No Database)

Perfect for testing and local development.

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set:
```env
VITE_APP_MODE=demo
```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

**That's it!** You can now:
- Create AI prompt links
- Share them via QR code
- Test all AI platforms

**Note:** In demo mode, links are encoded in the URL and not saved to a database.

---

## 🔥 Option 2: Production Mode (With Supabase)

For full functionality with persistence and analytics.

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project creation (~2 minutes)

### Step 2: Set Up Database

1. In Supabase Dashboard, go to **SQL Editor**
2. Copy the contents of `SUPABASE_SETUP.sql`
3. Paste and click **Run**
4. Verify tables are created

### Step 3: Get API Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGci...`)

### Step 4: Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_APP_MODE=production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_BASE_URL=http://localhost:3000
```

### Step 5: Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` 🎉

**Now you have:**
- ✅ Persistent link storage
- ✅ Click tracking
- ✅ Admin dashboard
- ✅ Full analytics

---

## 📦 Deploy to Vercel (5 minutes)

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite

3. **Add Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add all variables from your `.env` file
   - Click "Deploy"

4. **Done!** Your app is live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add VITE_APP_MODE
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_BASE_URL

# Deploy to production
vercel --prod
```

---

## 🧪 Testing Your Deployment

### 1. Create a Link

1. Visit your deployed URL
2. Enter a prompt: "Explain quantum computing in simple terms"
3. Click "Generate Shareable Link"
4. Copy the link

### 2. Test the Link

1. Open the link in a new tab
2. Verify the prompt is displayed
3. Click on a platform (e.g., ChatGPT)
4. Verify the prompt is pre-filled

### 3. Test Admin Dashboard

1. Visit `/admin`
2. Verify your link appears
3. Check click count
4. Test delete functionality

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        600: '#your-darker-color',
      },
    },
  },
}
```

### Add Your Logo

Replace the emoji in `src/components/Header.jsx`:

```jsx
<span className="text-2xl">🤖</span>
// Change to:
<img src="/logo.png" alt="Logo" className="h-8" />
```

### Add More Templates

Edit `src/utils/templates.js`:

```javascript
{
  id: 'my-template',
  name: 'My Custom Template',
  prompt: 'Your prompt here...',
  category: 'Custom',
}
```

---

## 🐛 Troubleshooting

### "Module not found" error

```bash
rm -rf node_modules package-lock.json
npm install
```

### Links not persisting

- Check `VITE_APP_MODE=production` in `.env`
- Verify Supabase credentials
- Check browser console for errors

### API errors on Vercel

- Verify environment variables are set in Vercel dashboard
- Check API function logs in Vercel dashboard
- Ensure Supabase URL and key are correct

### Rate limit issues

Clear localStorage:
```javascript
// In browser console
localStorage.clear()
```

---

## 📚 Next Steps

1. **Read the full [README.md](README.md)** for detailed documentation
2. **Check [DEPLOYMENT.md](DEPLOYMENT.md)** for advanced deployment options
3. **Review [CONTRIBUTING.md](CONTRIBUTING.md)** to contribute
4. **Set up custom domain** in Vercel/Cloudflare settings
5. **Add analytics** (Google Analytics, Vercel Analytics, etc.)
6. **Implement CAPTCHA** for production (Cloudflare Turnstile)

---

## 💡 Tips

- **Demo mode** is perfect for testing and development
- **Production mode** requires Supabase but provides full features
- **Rate limiting** is enabled by default (10 requests per 15 minutes)
- **QR codes** are generated automatically for all links
- **Admin dashboard** shows all links and analytics

---

## 🆘 Need Help?

- 📖 Read the [README.md](README.md)
- 🐛 Check [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Start a [Discussion](https://github.com/your-repo/discussions)
- 📧 Contact the maintainers

---

## 🎉 You're All Set!

Congratulations! You now have a fully functional AI prompt sharing platform.

**Share your first link and let the magic begin!** ✨

---

Made with ❤️ by the community


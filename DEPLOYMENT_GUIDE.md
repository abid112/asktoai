# 🚀 Deployment Guide - Ask to AI

## ✅ Your Configuration is CORRECT!

Your `.gitignore` and deployment configuration are already set up properly for production deployment.

---

## 📋 Quick Answers

### 1. Should `dist` folder be in `.gitignore`?
**✅ YES!** This is correct and follows best practices:
- Hosting platforms (Vercel, Netlify, etc.) build the app automatically
- Build artifacts should never be committed to git
- Keeps repository clean and prevents conflicts

### 2. Does the hosting platform run `npm run build`?
**✅ YES!** Your `vercel.json` is configured correctly:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 3. Are any `.gitignore` files blocking deployment?
**✅ NO!** Your `.gitignore` is perfect:
- `node_modules/` - Hosting platform installs these
- `dist/` - Hosting platform builds this
- `.env.local` - Use platform environment variables instead

### 4. What is the correct deployment configuration?
**✅ Already correct!** See details below.

---

## 🎯 Deployment Checklist

### Files That SHOULD Be Committed ✅
- ✅ `package.json` - Dependencies and scripts
- ✅ `package-lock.json` - Exact dependency versions
- ✅ `vite.config.js` - Build configuration
- ✅ `vercel.json` - Deployment settings
- ✅ `tailwind.config.js` - Tailwind configuration
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `index.html` - Entry HTML
- ✅ `src/` - All source code
- ✅ `public/` - Static assets (favicon, images)

### Files That Should NOT Be Committed ✅
- ✅ `node_modules/` - Installed by platform
- ✅ `dist/` - Built by platform
- ✅ `.env.local` - Use platform env vars
- ✅ `.vercel/` - Deployment metadata

---

## 🚀 Vercel Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Automatic (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import from GitHub: `abid112/asktoai`
4. Vercel auto-detects Vite settings
5. Click **"Deploy"**

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Step 3: Verify Build Settings
Vercel should automatically detect:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

### Step 4: Environment Variables (Optional)
You don't need any environment variables for basic functionality!

Optional (for rate limiting):
- `VITE_RATE_LIMIT_MAX_REQUESTS` = `10`
- `VITE_RATE_LIMIT_WINDOW_MS` = `900000`

Optional (for CAPTCHA):
- `VITE_TURNSTILE_SITE_KEY` = Your Cloudflare Turnstile site key

---

## 🐛 Troubleshooting Deployment Issues

### Issue 1: Build Fails on Vercel

**Check build logs for errors:**

1. **Missing dependencies**
   - ✅ Verify all dependencies are in `package.json`
   - ✅ Run `npm install` locally to test

2. **Node version mismatch**
   - Add to `package.json`:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

3. **Build command fails**
   - Test locally: `npm run build`
   - Check for errors in console

### Issue 2: Blank Page After Deployment

**Common causes:**

1. **Asset paths incorrect**
   - ✅ Already fixed: Vite uses relative paths by default

2. **JavaScript errors**
   - Open browser console (F12)
   - Check for errors
   - Verify all imports are correct

3. **Missing environment variables**
   - This app doesn't require any env vars to run!
   - Check if any code references `import.meta.env.VITE_*`

### Issue 3: 404 on Page Refresh

**Solution:** Already configured in `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes go to `index.html` for client-side routing.

### Issue 4: Images Not Loading

**Check:**
1. ✅ Images are in `public/images/` folder
2. ✅ Image paths start with `/` (e.g., `/images/platforms/chatgpt.png`)
3. ✅ Image files are committed to git

---

## 🔍 Verify Local Build

Before deploying, test the production build locally:

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

Then open http://localhost:4173 to test.

---

## 📊 Expected Build Output

Your build should produce:
```
dist/
├── index.html (0.85 kB)
├── favicon.svg
├── images/
│   └── platforms/
│       ├── chatgpt.png
│       ├── claude.png
│       ├── gemini.png
│       ├── grok.png
│       └── perplexity.png
└── assets/
    ├── index-[hash].css (~19 kB)
    └── index-[hash].js (~162 kB)
```

---

## 🌐 Alternative Hosting Platforms

### Netlify
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add redirect rule in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Cloudflare Pages
1. Connect GitHub repo
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Framework preset: Vite

### GitHub Pages
Not recommended for this app (requires additional configuration for client-side routing).

---

## ✅ Post-Deployment Checklist

After deployment, verify:
- [ ] Homepage loads correctly
- [ ] Logo displays properly
- [ ] Platform logos load (ChatGPT, Claude, Gemini, Grok, Perplexity)
- [ ] Can enter a prompt
- [ ] Can select a platform
- [ ] "Generate Link" button works
- [ ] Generated link is correct
- [ ] Copy button works
- [ ] Share buttons work
- [ ] Footer displays correctly
- [ ] Buy Me a Coffee button works

---

## 🎉 Success!

Once deployed, your app will be available at:
- Vercel: `https://your-project.vercel.app`
- Custom domain: Configure in Vercel dashboard

---

## 📝 Notes

- **No database required**: This app is 100% client-side
- **No API routes**: All functionality is in the browser
- **No environment variables needed**: App works out of the box
- **Fast deployment**: Typically completes in 30-60 seconds
- **Automatic HTTPS**: Vercel provides SSL certificates
- **Global CDN**: Your app is served from edge locations worldwide

---

## 🆘 Still Having Issues?

If deployment fails, check:
1. **Build logs** in Vercel dashboard
2. **Browser console** for JavaScript errors
3. **Network tab** for failed asset requests
4. **Vercel build settings** match the configuration above

Common fixes:
- Clear Vercel build cache and redeploy
- Verify all files are committed to GitHub
- Check Node.js version compatibility
- Ensure `package-lock.json` is committed


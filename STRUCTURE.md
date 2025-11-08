# Project Structure

Complete file structure for "Let Me Ask AI For You" with descriptions.

```
let-me-ask-ai/
│
├── 📁 api/                                    # Serverless API Functions
│   ├── create.js                             # POST /api/create - Create new short link
│   ├── get.js                                # GET /api/get?id=xxx - Retrieve link by ID
│   ├── increment.js                          # POST /api/increment - Increment click count
│   ├── list.js                               # GET /api/list - List all links (admin)
│   └── delete.js                             # DELETE /api/delete - Delete link (admin)
│
├── 📁 src/                                    # Source Code
│   │
│   ├── 📁 components/                        # React Components
│   │   ├── Header.jsx                        # App header with navigation
│   │   ├── Footer.jsx                        # App footer with links
│   │   ├── PromptComposer.jsx                # Main prompt input form with templates
│   │   ├── ShareModal.jsx                    # Modal for sharing links with QR code
│   │   ├── PlatformButtons.jsx               # AI platform selection buttons
│   │   └── RateLimitWarning.jsx              # Rate limit exceeded notification
│   │
│   ├── 📁 pages/                             # Page Components
│   │   ├── HomePage.jsx                      # Main landing page with prompt composer
│   │   ├── LandingPage.jsx                   # Link landing page (/s/:id or /s?q=xxx)
│   │   └── AdminPage.jsx                     # Admin dashboard for link management
│   │
│   ├── 📁 services/                          # API Services
│   │   ├── api.js                            # API client functions (CRUD operations)
│   │   └── supabase.js                       # Supabase client configuration
│   │
│   ├── 📁 utils/                             # Utility Functions
│   │   ├── encoding.js                       # URL encoding/decoding, validation
│   │   ├── platforms.js                      # AI platform configurations
│   │   ├── share.js                          # Social sharing utilities
│   │   ├── rateLimit.js                      # Client-side rate limiting
│   │   └── templates.js                      # Prompt templates
│   │
│   ├── 📁 config/                            # Configuration
│   │   └── index.js                          # App configuration (modes, URLs, etc.)
│   │
│   ├── App.jsx                               # Main app component with routing
│   ├── main.jsx                              # Application entry point
│   └── index.css                             # Global styles and Tailwind directives
│
├── 📁 public/                                # Static Assets
│   └── (static files like favicon, images)
│
├── 📄 Configuration Files
│   ├── package.json                          # Dependencies and scripts
│   ├── vite.config.js                        # Vite build configuration
│   ├── tailwind.config.js                    # Tailwind CSS configuration
│   ├── postcss.config.js                     # PostCSS configuration
│   ├── vercel.json                           # Vercel deployment configuration
│   ├── .eslintrc.cjs                         # ESLint configuration
│   ├── .prettierrc                           # Prettier configuration
│   ├── .gitignore                            # Git ignore rules
│   ├── .env.example                          # Environment variables template
│   └── .env.local.example                    # Local development env template
│
├── 📄 Documentation Files
│   ├── README.md                             # Main documentation
│   ├── QUICKSTART.md                         # 5-minute setup guide
│   ├── DEPLOYMENT.md                         # Detailed deployment instructions
│   ├── CONTRIBUTING.md                       # Contribution guidelines
│   ├── PROJECT_SUMMARY.md                    # Project overview and architecture
│   ├── SETUP_CHECKLIST.md                    # Complete setup checklist
│   └── STRUCTURE.md                          # This file - project structure
│
├── 📄 Database & Setup
│   ├── SUPABASE_SETUP.sql                    # Database schema and setup SQL
│   └── LICENSE                               # MIT License
│
└── 📁 Generated (not in repo)
    ├── node_modules/                         # Dependencies (gitignored)
    ├── dist/                                 # Production build (gitignored)
    └── .env                                  # Local environment variables (gitignored)
```

## 📂 Detailed Breakdown

### `/api` - Serverless Functions

All API endpoints are serverless functions compatible with Vercel, Cloudflare Workers, and Netlify Functions.

**create.js**
- Creates a new short link
- Validates prompt
- Checks rate limits
- Stores in Supabase (production) or returns encoded URL (demo)

**get.js**
- Retrieves a link by ID
- Returns prompt and metadata
- Only works in production mode

**increment.js**
- Increments click count for a link
- Uses atomic database operation
- No-op in demo mode

**list.js**
- Returns all links (admin endpoint)
- Ordered by creation date
- Includes click statistics

**delete.js**
- Deletes a link by ID
- Admin endpoint
- Only works in production mode

### `/src/components` - React Components

**Header.jsx**
- App navigation
- Logo and branding
- Links to home and admin

**Footer.jsx**
- Footer links
- Copyright information
- Social links

**PromptComposer.jsx**
- Main prompt input textarea
- Template selector
- "Include URL" toggle
- Character counter
- Submit button with loading state

**ShareModal.jsx**
- QR code display
- Link copy functionality
- Social sharing buttons (Twitter, WhatsApp)
- Close button

**PlatformButtons.jsx**
- Grid of AI platform buttons
- Opens platform with pre-filled prompt
- Styled with platform colors

**RateLimitWarning.jsx**
- Rate limit exceeded modal
- Shows time until reset
- Helpful tips

### `/src/pages` - Page Components

**HomePage.jsx**
- Main landing page
- Prompt composer
- Features section
- Use cases
- Handles link generation

**LandingPage.jsx**
- Displays shared prompt
- Platform selection buttons
- QR code for sharing
- Click tracking

**AdminPage.jsx**
- Statistics cards
- Links table
- Delete functionality
- Empty state

### `/src/services` - API Services

**api.js**
- `createShortLink(prompt)` - Create link
- `getShortLink(id)` - Get link
- `incrementClickCount(id)` - Track click
- `getAllLinks()` - List links
- `deleteLink(id)` - Delete link

**supabase.js**
- Supabase client initialization
- Mock client for demo mode
- Connection configuration

### `/src/utils` - Utilities

**encoding.js**
- `encodePrompt(prompt)` - URL-safe encoding
- `decodePrompt(encoded)` - Decode prompt
- `generateShortId()` - Random ID generation
- `validatePrompt(prompt)` - Input validation

**platforms.js**
- Platform configurations
- URL builders
- Icons and colors

**share.js**
- `copyToClipboard(text)` - Copy utility
- `getTwitterShareUrl(url)` - Twitter share
- `getWhatsAppShareUrl(url)` - WhatsApp share

**rateLimit.js**
- `checkRateLimit()` - Check if allowed
- `recordRequest()` - Record new request
- `clearRateLimit()` - Clear data

**templates.js**
- Predefined prompt templates
- Template categories
- Template helpers

### `/src/config` - Configuration

**index.js**
- App mode (demo/production)
- Supabase credentials
- Rate limit settings
- Platform URLs
- Base URL

## 🔄 Data Flow

### Creating a Link

```
User Input (PromptComposer)
    ↓
Validation (utils/encoding.js)
    ↓
Rate Limit Check (utils/rateLimit.js)
    ↓
API Call (services/api.js)
    ↓
Serverless Function (api/create.js)
    ↓
Database (Supabase) OR URL Encoding
    ↓
Response with Link ID
    ↓
Display ShareModal
```

### Using a Link

```
User Visits /s/:id or /s?q=xxx
    ↓
LandingPage Component
    ↓
Fetch Prompt (services/api.js)
    ↓
Serverless Function (api/get.js)
    ↓
Database Query OR URL Decode
    ↓
Display Prompt
    ↓
Increment Clicks (api/increment.js)
    ↓
User Clicks Platform Button
    ↓
Open AI Platform with Prompt
```

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `PromptComposer.jsx`)
- **Utilities**: camelCase (e.g., `encoding.js`)
- **Pages**: PascalCase with "Page" suffix (e.g., `HomePage.jsx`)
- **API Functions**: lowercase (e.g., `create.js`)
- **Config Files**: lowercase with dots (e.g., `vite.config.js`)

## 🎨 Code Organization

### Component Structure
```jsx
// Imports
import React, { useState } from 'react';

// Component
function ComponentName({ props }) {
  // State
  const [state, setState] = useState();
  
  // Handlers
  const handleAction = () => {};
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// Export
export default ComponentName;
```

### Utility Structure
```javascript
// Documentation
/**
 * Function description
 * @param {type} param - Description
 * @returns {type} - Description
 */
export function utilityFunction(param) {
  // Implementation
}
```

## 🔧 Build Output

After running `npm run build`:

```
dist/
├── index.html                    # Entry HTML
├── assets/
│   ├── index-[hash].js          # Bundled JavaScript
│   ├── index-[hash].css         # Bundled CSS
│   └── [other-assets]           # Images, fonts, etc.
└── api/                         # Serverless functions (copied)
```

## 📦 Dependencies Overview

### Production Dependencies
- `react` & `react-dom` - UI framework
- `react-router-dom` - Routing
- `@supabase/supabase-js` - Database client
- `qrcode.react` - QR code generation

### Development Dependencies
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `eslint` - Linting
- `prettier` - Code formatting

## 🎯 Key Files to Customize

1. **src/config/index.js** - App configuration
2. **src/utils/platforms.js** - Add/remove AI platforms
3. **src/utils/templates.js** - Add/remove templates
4. **tailwind.config.js** - Customize colors/theme
5. **src/components/Header.jsx** - Branding
6. **src/components/Footer.jsx** - Footer content

## 📚 Further Reading

- See [README.md](README.md) for overview
- See [QUICKSTART.md](QUICKSTART.md) for setup
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment
- See [CONTRIBUTING.md](CONTRIBUTING.md) for contributing

---

**This structure is designed for:**
- ✅ Easy navigation
- ✅ Clear separation of concerns
- ✅ Scalability
- ✅ Maintainability
- ✅ Developer experience


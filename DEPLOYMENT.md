# 🚀 Monetixra Deployment Guide

## 📋 Table of Contents
1. [Netlify Deployment](#netlify-deployment)
2. [Cloudflare Pages Deployment](#cloudflare-pages-deployment)
3. [Hybrid Deployment (Recommended)](#hybrid-deployment-recommended)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Netlify Deployment

### Quick Deploy (One-Click)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/monetixra)

### Manual Deploy Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/monetixra.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Select GitHub and your repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.` (root)
   - Click "Deploy site"

3. **Configure Environment Variables**
   Go to Site settings → Environment variables:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Enable Custom Domain (Optional)**
   - Site settings → Domain management
   - Add custom domain
   - Configure DNS records

---

## Cloudflare Pages Deployment

### Deploy Steps

1. **Push code to GitHub** (same as above)

2. **Connect to Cloudflare**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Pages → Create a project
   - Connect to Git
   - Select repository
   - Build settings:
     - Framework preset: None
     - Build command: (empty)
     - Build output directory: `.`
   - Click "Save and Deploy"

3. **Configure Environment Variables**
   Settings → Environment variables:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

---

## Hybrid Deployment (Recommended)

For full functionality (Socket.io + WebRTC), use this architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Users                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┴──────────────┐
        │                            │
┌───────▼────────┐        ┌──────────▼──────────┐
│  Netlify/        │        │  Render/Railway      │
│  Cloudflare      │        │  (Backend)            │
│  (Frontend)      │        │                       │
│  - index.html    │◄──────►│  - server.js          │
│  - Static assets │  API   │  - Socket.io          │
└──────────────────┘        │  - WebRTC signaling   │
        │                   └──────────┬──────────┘
        │                              │
        │         ┌────────────────────▼───────────────┐
        │         │  Supabase                          │
        └────────►│  - Database (PostgreSQL)           │
                  │  - Storage (Media files)             │
                  │  - Auth                              │
                  └──────────────────────────────────────┘
```

### Setup Steps

1. **Deploy Frontend** (Netlify/Cloudflare)
   - Follow steps above
   - Update API endpoint in code to point to backend

2. **Deploy Backend** (Render/Railway)
   ```bash
   # On Render
   - Create new Web Service
   - Connect GitHub repo
   - Root directory: ./
   - Build command: npm install
   - Start command: node server.js
   ```

3. **Configure CORS**
   Update `server.js` with your frontend URL:
   ```javascript
   app.use(cors({
     origin: ['https://monetixra.netlify.app', 'https://monetixra.pages.dev']
   }));
   ```

---

## Environment Variables

### Required Variables

| Variable | Description | Source |
|----------|-------------|--------|
| `SUPABASE_URL` | Supabase project URL | Supabase Dashboard |
| `SUPABASE_ANON_KEY` | Supabase anon/public key | Supabase Dashboard |

### Optional Variables (for full features)

| Variable | Description | Source |
|----------|-------------|--------|
| `ADSTERRA_KEY` | Adsterra ad key | adsterra.com |
| `ADSENSE_CLIENT` | Google AdSense client ID | Google AdSense |
| `ADSENSE_SLOT` | Google AdSense slot ID | Google AdSense |
| `PROPELLERADS_ZONE` | PropellerAds zone ID | propellerads.com |
| `STRIPE_PUB_KEY` | Stripe publishable key | stripe.com |
| `EMAILJS_SERVICE` | EmailJS service ID | emailjs.com |
| `EMAILJS_TEMPLATE` | EmailJS template ID | emailjs.com |
| `EMAILJS_PUBLIC` | EmailJS public key | emailjs.com |

---

## Post-Deployment Checklist

### ✅ Basic Functionality
- [ ] Site loads without errors
- [ ] Can create account/login
- [ ] Can create posts
- [ ] Can upload media (Supabase connected)
- [ ] Real-time updates work (Socket.io)

### ✅ Monetization
- [ ] Ads display correctly
- [ ] Reward ads give points
- [ ] Premium subscription works
- [ ] Referral system functional

### ✅ PWA Features
- [ ] Install prompt appears
- [ ] Offline mode works
- [ ] Push notifications enabled
- [ ] Service worker registered

### ✅ Performance
- [ ] Lighthouse score > 80
- [ ] First load < 3 seconds
- [ ] Images optimized

---

## 🔧 Troubleshooting

### Common Issues

**Issue:** "Supabase connection failed"
- **Solution:** Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in environment variables

**Issue:** "Socket.io not connecting"
- **Solution:** Backend URL must be HTTPS. Update `SERVER_URL` in index.html

**Issue:** "Push notifications not working"
- **Solution:** Ensure `VAPID_KEY` is set and user granted permission

---

## 📞 Support

For deployment issues:
1. Check browser console for errors
2. Verify environment variables
3. Test API endpoints with curl/Postman
4. Contact support: support@monetixra.com

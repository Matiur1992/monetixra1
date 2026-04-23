# 🎯 Setup Checklist — Monetixra

Complete this checklist to get your Monetixra project fully operational.

## ✅ Phase 1: Fixed Issues (Completed)

- [x] **CSS Error Fixed** - Added standard `line-clamp` property
- [x] **File Names Cleaned** - Removed spaces from filenames
  - ✓ `server .js` → `server.js`
  - ✓ `manifest .json` → `manifest.json`
  - ✓ `sw .js` → `sw.js`
  - ✓ `supabase_schema .sql` → `supabase_schema.sql`
- [x] **Security Hardened** - Removed hardcoded API keys
- [x] **Payment Handler** - Implemented Stripe webhook point crediting
- [x] **Project Cleaned** - Removed empty directories
- [x] **Documentation Created** - README.md, env.example
- [x] **Git Protection** - .gitignore configured

## 📋 Phase 2: Required Configuration

### 2.1 Environment Setup
- [ ] Copy `env.example` to `.env`
- [ ] Fill in all required API keys (see below)
- [ ] Verify `.env` is in `.gitignore` (should be by default)

### 2.2 Database Setup
```
1. [ ] Create Supabase project (supabase.com)
2. [ ] Copy SUPABASE_URL to .env
3. [ ] Copy SUPABASE_ANON_KEY to .env
4. [ ] Run supabase_schema.sql in SQL editor
5. [ ] Verify tables are created
```

### 2.3 Payment Gateway Setup
```
Stripe:
- [ ] Create Stripe account (stripe.com)
- [ ] Copy STRIPE_SECRET_KEY to .env
- [ ] Set webhook URL: https://your-domain.com/api/payment/stripe/webhook
- [ ] Copy webhook secret to STRIPE_WEBHOOK_SECRET

Optional - bKash (Bangladesh):
- [ ] Register at developer.bkash.com
- [ ] Copy credentials to .env

Optional - Nagad (Bangladesh):
- [ ] Register at nagad.com.bd/merchant
- [ ] Copy credentials to .env
```

### 2.4 AI Services Setup
```
OpenAI (for ChatGPT):
- [ ] Get API key from platform.openai.com/api-keys
- [ ] Paste into OPENAI_API_KEY

DeepSeek (alternative):
- [ ] Get API key from platform.deepseek.com
- [ ] Paste into DEEPSEEK_API_KEY (optional)

Google Cloud APIs:
- [ ] Create project at console.cloud.google.com
- [ ] Enable Vision API
- [ ] Create API key
- [ ] Copy to GOOGLE_API_KEY and GOOGLE_VISION_KEY
```

### 2.5 Real-time Communication
```
WebRTC (Video Calls):
- [ ] Create account at metered.ca
- [ ] Copy METERED_API_KEY to .env

Web Push Notifications:
- [ ] Run: npm run vapid
- [ ] Copy generated keys to VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY
- [ ] Update VAPID_EMAIL
```

### 2.6 PWA Icons
- [ ] Generate icons (see public/README.md)
- [ ] Place in public/ directory
- [ ] Test with: npm start

## 🚀 Phase 3: Launch Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server runs at http://localhost:3000
```

### Test Checklist
- [ ] Application loads at localhost:3000
- [ ] No console errors
- [ ] Database connection works
- [ ] AI chat responds
- [ ] Push notifications can be sent

## 📤 Phase 4: Deploy to Render

### 4.1 Prepare Repository
```bash
# Make sure .env is NOT committed
git status
# .env should NOT appear in the list

# Commit all other changes
git add .
git commit -m "Setup Monetixra production ready"
git push
```

### 4.2 Deploy on Render
1. [ ] Go to render.com
2. [ ] Create new Web Service
3. [ ] Connect your GitHub repository
4. [ ] Set Environment Variables:
   - Copy all values from your `.env` file
   - Add each as Render environment variable
   - Set `NODE_ENV=production`
   - Update `BASE_URL` to your Render URL
5. [ ] Deploy
6. [ ] Monitor: https://dashboard.render.com

### 4.3 Post-Deployment
- [ ] Test at your Render URL
- [ ] Configure Stripe webhook URL (production)
- [ ] Monitor logs for errors
- [ ] Test payment flow
- [ ] Verify database connectivity

## 🔒 Security Checklist

- [x] No hardcoded API keys in code
- [x] Sensitive variables in .env only
- [x] .gitignore protects .env
- [x] CORS configured appropriately
- [x] Helmet security headers enabled
- [x] Rate limiting in place
- [ ] Change default VAPID_EMAIL
- [ ] Monitor Stripe webhooks
- [ ] Enable database backups
- [ ] Set up error monitoring (Sentry)

## 🆘 Common Issues & Solutions

### Issue: "Cannot find module 'stripe'"
**Solution:** Some endpoints require stripe to be in dependencies
```bash
npm install stripe
# Add to package.json dependencies
```

### Issue: Supabase connection fails
**Solution:** 
- Verify URL format (should include .supabase.co)
- Check SUPABASE_ANON_KEY is correct
- Ensure Supabase project is active

### Issue: Push notifications not working
**Solution:**
1. Run: `npm run vapid`
2. Update both keys in .env
3. Restart server
4. Subscribe again in browser

### Issue: Stripe webhook returns 404
**Solution:**
- Verify webhook URL in Stripe dashboard
- Check format: https://yourdomain.com/api/payment/stripe/webhook
- Ensure server is running

### Issue: Icons not displaying
**Solution:**
- Check files exist in public/
- Verify filenames match manifest.json
- Restart server after adding icons
- Check browser cache (Ctrl+Shift+Delete)

## 📊 Performance Checklist

- [ ] PWA icons optimized (size < 500KB each)
- [ ] Database indexes created
- [ ] Cache headers configured
- [ ] Rate limits appropriate
- [ ] Error monitoring active

## 📞 Support Resources

- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs
- **Socket.io**: https://socket.io/docs
- **Express**: https://expressjs.com/
- **Node.js**: https://nodejs.org/docs

---

## Next Steps

1. **Complete Phase 2** (Configuration) - Critical for functionality
2. **Run Phase 3** (Local testing) - Verify everything works
3. **Execute Phase 4** (Deployment) - Go live on Render

**Estimated time to completion:** 2-3 hours (depending on account creation)

---

*Created: April 20, 2026*
*Version: 1.0.0*

# 🚀 MediaEarn Ultra X — সম্পূর্ণ Setup Guide

## ═══ STEP 1: Project Setup ═══

```bash
# 1. ফাইলগুলো নামান
# 2. terminal/command prompt খুলুন
npm install
cp .env.example .env
mkdir public
# index.html, sw.js, manifest.json → public/ ফোল্ডারে রাখুন
```

---

## ═══ STEP 2: EmailJS Setup (OTP Email) ═══
**সময়: ২০ মিনিট | খরচ: বিনামূল্যে (200 email/মাস)**

1. **emailjs.com** → Sign Up
2. Email Services → Add New Service → Gmail
3. Gmail দিয়ে connect করুন
4. Templates → Create New Template:
   - Subject: `Your MediaEarn OTP Code`
   - Body:
   ```
   Hi {{to_name}},
   Your OTP code is: {{otp_code}}
   Valid for 10 minutes.
   - MediaEarn Ultra X Team
   ```
5. Account → API Keys থেকে নিন
6. `.env` তে বসান:
```
EMAILJS_SERVICE=service_xxxxxxx
EMAILJS_TEMPLATE=template_xxxxxxx
EMAILJS_PUBLIC=xxxxxxxxxxxxxxx
```
7. `index.html` এ বসান (শুরুতে):
```javascript
const EMAILJS_SERVICE  = 'service_xxxxxxx';
const EMAILJS_TEMPLATE = 'template_xxxxxxx';
const EMAILJS_PUBLIC   = 'xxxxxxxxxxxxxxx';
```

---

## ═══ STEP 3: Web Push VAPID Keys ═══
**সময়: ১৫ মিনিট | খরচ: বিনামূল্যে**

```bash
# Terminal এ run করুন:
npx web-push generate-vapid-keys
```
Output:
```
Public Key: BK...
Private Key: xxx...
```
`.env` তে বসান:
```
VAPID_PUBLIC_KEY=BK...
VAPID_PRIVATE_KEY=xxx...
VAPID_EMAIL=mailto:myworktoolsp3@gmail.com
```

---

## ═══ STEP 4: Supabase Database ═══
**সময়: ৩০ মিনিট | খরচ: বিনামূল্যে (500MB)**

1. **supabase.com** → New Project তৈরি করুন
2. SQL Editor → New Query
3. `supabase_schema.sql` ফাইলের সব SQL কপি করে paste করুন → Run
4. Settings → API থেকে নিন:
   - Project URL
   - anon public key
5. `.env` তে বসান:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ═══ STEP 5: Adsterra Ads ═══
**সময়: ২৪ ঘণ্টা approval | খরচ: বিনামূল্যে**

1. **adsterra.com** → Sign Up (Publisher)
2. Sites → Add Site → আপনার domain দিন
3. Approval হলে: Placements → Social Bar → Key কপি করুন
4. `index.html` এ বসান:
```javascript
const ADSTERRA_KEY = 'your_key_here';
```

---

## ═══ STEP 6: Google AdSense ═══
**সময়: ১-৪ সপ্তাহ approval | খরচ: বিনামূল্যে**

1. **adsense.google.com** → Sign Up
2. Site verify করুন (HTML tag method)
3. Approval হলে: Ads → By ad unit → Display ads
4. `index.html` এ বসান:
```javascript
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';
const ADSENSE_SLOT   = 'XXXXXXXXXX';
```

---

## ═══ STEP 7: bKash Payment ═══
**সময়: ৩-৭ দিন approval | খরচ: বিনামূল্যে**

1. **developer.bkash.com** → Merchant Registration
2. Sandbox credentials নিন (testing এর জন্য)
3. `.env` তে বসান:
```
BKASH_APP_KEY=your_app_key
BKASH_APP_SECRET=your_app_secret
BKASH_USERNAME=your_username
BKASH_PASSWORD=your_password
```
⚠️ Production এ sandbox URL → live URL change করুন server.js এ

---

## ═══ STEP 8: Nagad Payment ═══
**সময়: ৩-৭ দিন approval | খরচ: বিনামূল্যে**

1. **nagad.com.bd** → Merchant Account
2. API credentials নিন
3. `.env` তে বসান:
```
NAGAD_MERCHANT_ID=your_merchant_id
NAGAD_PUBLIC_KEY=your_public_key
```

---

## ═══ STEP 9: Render.com Deploy ═══
**সময়: ৩০ মিনিট | খরচ: বিনামূল্যে**

### GitHub এ upload:
```bash
git init
git add .
git commit -m "MediaEarn Ultra X v8.0"
git remote add origin https://github.com/yourusername/mediaearn.git
git push -u origin main
```

### Render.com:
1. **render.com** → Sign Up (GitHub দিয়ে)
2. New → Web Service
3. GitHub repo select করুন
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Environment Variables (এই সব বসান):
```
PORT=3000
OPENAI_API_KEY=sk-...
DEEPSEEK_API_KEY=sk-...
GOOGLE_API_KEY=AIzaSy...
GOOGLE_VISION_KEY=AIzaSy...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJ...
METERED_API_KEY=ffb21c8d...
VAPID_PUBLIC_KEY=BK...
VAPID_PRIVATE_KEY=xxx...
VAPID_EMAIL=mailto:myworktoolsp3@gmail.com
BASE_URL=https://your-app.onrender.com
```
6. **Deploy** → আপনার URL: `https://mediaearn-ultra-x.onrender.com`
7. `index.html` এর BASE_URL update করুন

---

## ═══ Admin Login ═══
- **Email:** myworktoolsp3@gmail.com
- **Phone:** 01757008864  
- **Password:** F<%0K"-9!H5.X+(*#)`

Settings → Admin Control Panel

---

## ═══ Complete Checklist ═══
- [ ] npm install
- [ ] .env configured
- [ ] EmailJS keys set in index.html
- [ ] VAPID keys generated
- [ ] Supabase schema run
- [ ] Adsterra key set in index.html
- [ ] AdSense key set in index.html
- [ ] bKash credentials in .env
- [ ] Nagad credentials in .env
- [ ] Deployed to Render.com
- [ ] HTTPS working ✅


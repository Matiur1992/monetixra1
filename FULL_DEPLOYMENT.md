# 🚀 Monetixra - Complete Deployment Guide

## 📋 সংক্ষিপ্ত তথ্য

| কম্পোনেন্ট | স্ট্যাটাস | হোস্টিং |
|-----------|----------|--------|
| **Frontend (index.html)** | ✅ রেডি | Netlify/Cloudflare |
| **Backend (server.js)** | ✅ রেডি | Render/Railway |
| **Database** | ✅ রেডি | Supabase (ফ্রি) |
| **Storage** | ✅ রেডি | Supabase Storage |
| **Realtime** | ✅ রেডি | Socket.io (ব্যাকএন্ডে) |

---

## 🎯 সহজ ৩ ধাপে ডিপ্লয়

### ধাপ ১: GitHub-এ পুশ করুন (১ মিনিট)

**অপশন A: অটো স্ক্রিপ্ট রান করুন**
```powershell
# PowerShell খুলুন এই ফোল্ডারে:
cd "d:\files (7)"

# স্ক্রিপ্ট রান করুন:
.\deploy.ps1
```

**অপশন B: ম্যানুয়ালি**
```bash
git init
git add .
git commit -m "Deploy Monetixra"
git remote add origin https://github.com/YOUR_USERNAME/monetixra.git
git push -u origin main
```

---

### ধাপ ২: Backend ডিপ্লয় করুন (২ মিনিট)

#### Render-এ (সুপারিশকৃত):

1. [render.com](https://render.com)-এ যান → Sign up with GitHub
2. "New" → "Web Service"
3. GitHub repo সিলেক্ট করুন: `monetixra`
4. সেটিংস:
   ```
   Name: monetixra-backend
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```
5. "Advanced" → Environment Variables যোগ করুন:
   ```
   SUPABASE_URL=https://rgximkhnhxgaonrxzzxl.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   OPENAI_API_KEY=your-key (ঐচ্ছিক)
   ```
6. "Create Web Service"

**ব্যাকএন্ড URL পাবেন:** `https://monetixra-backend.onrender.com`

---

### ধাপ ৩: Frontend ডিপ্লয় করুন (২ মিনিট)

#### Netlify-এ:

**অপশন ১: One-Click** (সবচেয়ে সহজ)
```
https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/monetixra
```

**অপশন ২: Import from GitHub**
1. [app.netlify.com](https://app.netlify.com)-এ যান
2. "Add new site" → "Import an existing project"
3. GitHub → `monetixra` রিপো
4. Build settings:
   ```
   Build command: (empty)
   Publish directory: .
   ```
5. "Deploy site"

**Environment Variables সেটআপ:**
```
Site settings → Environment variables → Add:
SUPABASE_URL=https://rgximkhnhxgaonrxzzxl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔌 Backend ও Frontend কানেক্ট করুন

`index.html`-এ Line ~76-77 আপডেট করুন:

```javascript
// আগে ছিল:
// const SERVER_URL = 'https://your-backend.onrender.com';

// এখন আপডেট করুন:
const SERVER_URL = 'https://monetixra-backend.onrender.com';
```

তারপর:
```bash
git add index.html
git commit -m "Update backend URL"
git push origin main
```

**অটোমেটিক ডিপ্লয় হবে!** 🎉

---

## 🆚 Netlify vs Cloudflare - কোনটি বেছে নিবেন?

| ফিচার | Netlify | Cloudflare Pages |
|--------|---------|-------------------|
| **বিল্ড টাইম** | ৩০০ মিনিট/মাস (ফ্রি) | ৫০০ বিল্ড/মাস |
| **ব্যান্ডউইডথ** | ১০০ GB | অসীম |
| **CDN** | ✅ দ্রুত | ✅⚡ আরো দ্রুত |
| **Edge Functions** | ✅ | ✅✅ |
| **Analytics** | ✅ | ✅ |

**সুপারিশ:** Netlify দিয়ে শুরু করুন, পরে Cloudflare-এ মাইগ্রেট করুন।

---

## 🔧 সম্পূর্ণ আর্কিটেকচার

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┴──────────────┐
        │                            │
┌───────▼────────┐        ┌──────────▼──────────┐
│  Netlify/        │        │  Render             │
│  Cloudflare      │◄──────►│  (Backend)          │
│  (Static HTML)   │  API   │  - server.js          │
│  - index.html    │        │  - Socket.io          │
│  - PWA assets    │        │  - WebRTC signaling   │
└──────────────────┘        └──────────┬──────────┘
        │                              │
        │         ┌────────────────────▼───────────────┐
        │         │  Supabase                          │
        └────────►│  - PostgreSQL                      │
                  │  - Storage (images/videos)           │
                  │  - Auth                            │
                  └──────────────────────────────────────┘
```

---

## 📊 ফ্রি টায়ার লিমিটস

| সার্ভিস | ফ্রি লিমিট |
|---------|-----------|
| **Netlify** | ১০০ GB ব্যান্ডউইডথ, ৩০০ মিনিট বিল্ড |
| **Render** | ৭৫০ ঘণ্টা রানটাইম/মাস |
| **Supabase** | ৫০০ MB DB, ১ GB Storage |
| **Cloudflare** | অসীম ব্যান্ডউইডথ, ১০০,০০০ ফাংশন/দিন |

---

## 🧪 ডিপ্লয় যাচাইকরণ

সবকিছু ডিপ্লয় হয়ে গেলে এই URL চেক করুন:

```
✅ Frontend: https://monetixra.netlify.app
✅ Backend:  https://monetixra-backend.onrender.com
✅ API Test: https://monetixra-backend.onrender.com/api/health
```

**চেকলিস্ট:**
- [ ] সাইট লোড হয়
- [ ] সাইনআপ/লগইন কাজ করে
- [ ] পোস্ট তৈরি হয়
- [ ] ছবি আপলোড হয়
- [ ] রিয়েলটাইম চ্যাট কাজ করে
- [ ] নোটিফিকেশন আসে

---

## 🚨 সমস্যা সমাধান

### সমস্যা: "Cannot connect to backend"
**সমাধান:** 
- `SERVER_URL` সঠিক কিনা চেক করুন
- Render সাইট "Active" আছে কিনা দেখুন

### সমস্যা: "Supabase connection failed"
**সমাধান:**
- Environment variables সঠিক কিনা চেক করুন
- Supabase URL ও KEY সঠিক কিনা ভেরিফাই করুন

### সমস্যা: "Build failed on Netlify"
**সমাধান:**
- Build command খালি রাখুন (static site)
- Publish directory: `.` সেট করুন

---

## 🎉 সফল হলে আপনার সাইট:

| পরিবেশ | URL |
|--------|-----|
| **Production** | https://monetixra.netlify.app |
| **Backend API** | https://monetixra-backend.onrender.com |
| **GitHub Repo** | https://github.com/YOUR_USERNAME/monetixra |

---

## 📞 সাহায্য দরকার?

ডিপ্লয় সমস্যা হলে যোগাযোগ করুন:
- Netlify Support: [netlify.com/support](https://netlify.com/support)
- Render Docs: [render.com/docs](https://render.com/docs)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)

**আপনার সাইট লাইভ হলে জানাবেন! 🚀**

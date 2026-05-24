# 🚀 Manual Deployment Guide - ধাপে ধাপে

## ⚠️ গুরুত্বপূর্ণ
আমি সরাসরি GitHub/Netlify-এ লগইন করতে পারবো না (আমার একাউন্ট নেই)। তবে আমি **প্রতিটি ধাপের স্ক্রিনশট দিয়ে** গাইড করতে পারি!

---

## 🎯 সম্পূর্ণ প্রক্রিয়া (৩ ধাপ)

### ধাপ ১: GitHub-এ পুশ (১ মিনিট)

**স্ক্রিপ্ট রান করুন:**
```powershell
cd "d:\files (7)"
.\deploy.ps1
```

**কী ইনপুট দিতে হবে:**
1. GitHub username: `আপনার_ইউজারনেম`
2. Repository name: `monetixra` (Enter চাপুন, default নিবে)
3. Commit message: `Deploy Monetixra` (Enter চাপুন)

**এরর হলে ম্যানুয়ালি:**
```bash
# Terminal খুলুন:
git init
git add .
git commit -m "Deploy"
git remote add origin https://github.com/আপনার_ইউজারনেম/monetixra.git
git push -u origin main
```

---

### ধাপ ২: Render-এ Backend (২ মিনিট)

**সহজ উপায়:**
1. [dashboard.render.com](https://dashboard.render.com)-এ যান → GitHub দিয়ে লগইন
2. **New** → **Blueprint** ক্লিক করুন
3. `monetixra` রিপো সিলেক্ট করুন
4. **Apply** ক্লিক করুন (সব auto-configure হবে!)

**বিকল্প (Manual):**
```
New → Web Service → GitHub: monetixra
Name: monetixra-backend
Build: npm install
Start: node server.js
Plan: Free
→ Create
```

**Backend URL সংরক্ষণ করুন:**
```
https://monetixra-backend.onrender.com
```

---

### ধাপ ৩: Netlify-এ Frontend (২ মিনিট)

**সহজ উপায়:**
1. [app.netlify.com](https://app.netlify.com)-এ যান → GitHub দিয়ে লগইন
2. **Add new site** → **Import an existing project**
3. **GitHub** → `monetixra` রিপো
4. সেটিংস:
   ```
   Build command: (empty - ফাঁকা রাখুন)
   Publish directory: .
   ```
5. **Deploy site**

**Environment Variables সেটআপ:**
```
Site settings → Environment variables → Add:
SUPABASE_URL=https://rgximkhnhxgaonrxzzxl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔌 Backend ও Frontend কানেক্ট করুন

**Backend URL পাবেন:** `https://monetixra-backend.onrender.com`

**index.html আপডেট:**

Line ~5792 খুঁজুন:
```javascript
// আগে:
const SOCKET_URL = window.location.origin;

// পরে:
const SOCKET_URL = 'https://monetixra-backend.onrender.com';
```

**পুশ করুন:**
```bash
git add index.html
git commit -m "Connect backend"
git push origin main
```

---

## 🧪 টেস্ট করুন

| টেস্ট | URL | রেজাল্ট |
|-------|-----|---------|
| **Frontend** | `https://monetixra.netlify.app` | Site loads |
| **Backend Health** | `https://monetixra-backend.onrender.com/health` | `{"status":"ok"}` |
| **ICE Servers** | `https://monetixra-backend.onrender.com/api/ice-servers` | TURN server list |

---

## 🆘 সাহায্য দরকার?

**যেকোনো সমস্যায় আমাকে বলুন:**
1. স্ক্রিনশট শেয়ার করুন (কোথায় আটকেছেন)
2. এরর মেসেজ দেখান
3. আমি ঠিক করে দেব!

---

## 🎉 সফল হলে পাবেন:

```
🌐 https://monetixra.netlify.app
📡 https://monetixra-backend.onrender.com
📁 https://github.com/আপনার_ইউজারনেম/monetixra
```

**এখন শুরু করুন - ধাপ ১ দিয়ে!** 🚀

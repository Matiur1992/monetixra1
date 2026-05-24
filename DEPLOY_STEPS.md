# 🚀 Monetixra Deployment - Step by Step Guide

## ⚡ দ্রুত ৩ ধাপে (মোট ৫ মিনিট)

---

## ধাপ ১: GitHub-এ পুশ করুন (১ মিনিট)

### PowerShell দিয়ে (সবচেয়ে সহজ):

```powershell
# ১. ফোল্ডারে যান
cd "d:\files (7)"

# ২. স্ক্রিপ্ট রান করুন
.\deploy.ps1
```

**ইনপুট দিন:**
- GitHub username: `আপনার ইউজারনেম` (যেমন: ahmed123)
- Repository name: `monetixra` (Enter চাপুন)
- Email: `আপনার email`
- Name: `আপনার নাম`
- Commit message: `Initial deploy` (Enter চাপুন)

✅ **প্রস্তুত!** কোড GitHub-এ পুশ হয়ে গেছে।

---

## ধাপ ২: Backend ডিপ্লয় - Render (২ মিনিট)

### অপশন A: One-Click (সুপারিশকৃত)

এই লিংকে ক্লিক করুন:
```
https://dashboard.render.com/blueprint/new?repo=https://github.com/YOUR_USERNAME/monetixra
```

### অপশন B: Manual Steps:

1. 🌐 [dashboard.render.com](https://dashboard.render.com) → Sign up with GitHub
2. 🔘 **New** → **Web Service**
3. 📁 GitHub repo সিলেক্ট করুন: `monetixra`
4. ⚙️ সেটিংস:
   ```
   Name: monetixra-backend
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```
5. ✅ **Create Web Service**

**Backend URL সংরক্ষণ করুন:**
```
https://monetixra-backend.onrender.com
```

---

## ধাপ ৩: Frontend ডিপ্লয় - Netlify (২ মিনিট)

### অপশন A: One-Click (সুপারিশকৃত)

এই লিংকে ক্লিক করুন (GitHub username বদলে দিন):
```
https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/monetixra
```

### অপশন B: Manual Steps:

1. 🌐 [app.netlify.com](https://app.netlify.com) → Sign up with GitHub
2. ➕ **Add new site** → **Import an existing project**
3. 🔗 **GitHub** → `monetixra` repo সিলেক্ট করুন
4. ⚙️ Build settings:
   ```
   Build command: (empty - ফাঁকা রাখুন)
   Publish directory: .
   ```
5. 🚀 **Deploy site**

✅ **সাইট লাইভ!**

---

## 🔌 Backend URL Frontend-এ যোগ করুন

**Backend URL পাবেন:** `https://monetixra-backend.onrender.com`

### index.html আপডেট করুন:

**Line ~76-77** খুঁজুন (Socket URL):
```javascript
// আগে ছিল:
const SOCKET_URL = window.location.origin;

// পরিবর্তন করুন:
const SOCKET_URL = 'https://monetixra-backend.onrender.com';
```

### পুশ করুন:
```bash
git add index.html
git commit -m "Connect backend"
git push origin main
```

**Netlify অটো-ডিপ্লয় করবে!** 🎉

---

## 🧪 ডিপ্লয় যাচাইকরণ

### চেক করুন:

| URL | কী দেখবেন |
|-----|----------|
| `https://monetixra.netlify.app` | আপনার সাইট লোড হচ্ছে |
| `https://monetixra-backend.onrender.com/health` | `{"status":"ok"}` |
| `https://monetixra-backend.onrender.com/api/ice-servers` | TURN servers |

### টেস্ট করুন:
1. ✅ সাইট খুলে লগইন/সাইনআপ
2. ✅ একটি পোস্ট তৈরি করুন
3. ✅ একটি ছবি আপলোড করুন
4. ✅ রিয়েল-টাইম চ্যাট চেষ্টা করুন

---

## 🆘 সমস্যা হলে?

### সমস্যা ১: "Git push failed"
**সমাধান:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/monetixra.git
git push -u origin main
# অথবা GitHub CLI ব্যবহার করুন:
gh repo create monetixra --public --source=. --remote=origin --push
```

### সমস্যা ২: "Render build failed"
**সমাধান:**
```
Render Dashboard → monetixra-backend → Logs চেক করুন
সাধারণত: npm install সমস্যা → package.json ঠিক আছে কিনা দেখুন
```

### সমস্যা ৩: "Netlify site not found"
**সমাধান:**
```
Build command ফাঁকা রাখুন!
Publish directory: . (dot দিন)
```

### সমস্যা ৪: "Socket.io not connecting"
**সমাধান:**
```javascript
// index.html-এ SOCKET_URL সঠিক কিনা চেক করুন
const SOCKET_URL = 'https://monetixra-backend.onrender.com';
// 'http' না, 'https' হতে হবে!
```

---

## 📞 সাহায্য চাইলে

যেকোনো সমস্যায় আমাকে বলুন:
- 📝 এরর মেসেজ দেখান
- 📸 স্ক্রিনশট শেয়ার করুন
- 🔧 আমি ঠিক করে দেব!

---

## 🎉 সফল হলে পাবেন:

```
🌐 https://monetixra.netlify.app ← আপনার লাইভ সাইট!
📡 https://monetixra-backend.onrender.com ← API
📁 https://github.com/YOUR_USERNAME/monetixra ← Code
```

**এখনই শুরু করুন - ধাপ ১ দিয়ে!** 🚀

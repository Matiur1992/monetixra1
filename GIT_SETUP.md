# Git Setup & GitHub Push Guide

## 🚀 দ্রুত সেটআপ (৩ ধাপে)

### ধাপ ১: Git ইনিশিয়ালাইজ করুন

```bash
# প্রজেক্ট ফোল্ডারে যান
cd "d:\files (7)"

# Git ইনিশিয়ালাইজ করুন
git init

# সব ফাইল স্টেজ করুন
git add .

# প্রথম কমিট করুন
git commit -m "🎉 Initial commit - Monetixra v3.0 with all features"
```

### ধাপ ২: GitHub রিপোজিটরি তৈরি

**অপশন A: GitHub CLI দিয়ে (সহজ)**

```bash
# GitHub CLI ইনস্টল করা থাকলে:
gh repo create monetixra --public --source=. --remote=origin --push
```

**অপশন B: ম্যানুয়ালি**

1. [github.com/new](https://github.com/new)-এ যান
2. Repository name: `monetixra`
3. Description: `Complete Social Earn Platform with AI, Crypto, NFT, MLM & Live`
4. Public সিলেক্ট করুন
5. "Create repository" ক্লিক করুন
6. নিচের কম্যান্ড কপি করুন:

```bash
# GitHub থেকে লিংক কপি করে:
git remote add origin https://github.com/YOUR_USERNAME/monetixra.git

# বা SSH ব্যবহার করলে:
git remote add origin git@github.com:YOUR_USERNAME/monetixra.git
```

### ধাপ ৩: পুশ করুন

```bash
# মেইন ব্রাঞ্চে পুশ করুন
git branch -M main
git push -u origin main
```

## 🌐 অটো-ডিপ্লয় সেটআপ

### Netlify সাথে কানেক্ট করুন

**অপশন ১: One-Click Deploy**

নিচের বাটন ক্লিক করুন:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/monetixra)

**অপশন ২: GitHub থেকে ইম্পোর্ট**

1. [Netlify Dashboard](https://app.netlify.com/)-এ যান
2. "Add new site" → "Import an existing project"
3. GitHub সিলেক্ট করুন
4. `monetixra` রিপো চয়ন করুন
5. Build settings:
   - Build command: (empty)
   - Publish directory: `.`
6. "Deploy site"

### Cloudflare Pages সাথে কানেক্ট করুন

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
2. "Create a project" → "Connect to Git"
3. GitHub অথরাইজ করুন
4. `monetixra` রিপো সিলেক্ট করুন
5. Build settings:
   - Framework preset: None
   - Build command: (empty)
   - Build output directory: `.`
6. "Save and Deploy"

## 🔧 Environment Variables সেটআপ

### Netlify-এ:

```
Site Settings → Environment Variables → Add:

SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADSTERRA_KEY=your-ad-key (ঐচ্ছিক)
```

### Cloudflare Pages-এ:

```
Settings → Environment Variables → Add:

SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📋 পরবর্তী আপডেট করার নিয়ম

```bash
# নতুন ফিচার যোগ করার পর:
git add .
git commit -m "✨ Added new feature"
git push origin main

# অটোমেটিক ডিপ্লয় হবে! 🎉
```

## 🔄 সমস্যা সমাধান

| সমস্যা | সমাধান |
|--------|---------|
| `git not found` | Git ইনস্টল করুন: [git-scm.com](https://git-scm.com) |
| `Permission denied` | GitHub টোকেন রিসেট করুন অথবা SSH সেটআপ করুন |
| `Merge conflict` | `git pull origin main` তারপর `git push` |
| `Large file error` | `.gitignore`-এ বড় ফাইল যোগ করুন |

## 📁 .gitignore ফাইল

```gitignore
# Dependencies
node_modules/

# Environment
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*

# Large files
*.mp4
*.mov
*.zip
```

## 🎯 GitHub Actions সক্ষম করুন

`.github/workflows/deploy.yml` ফাইল ইতিমধ্যে তৈরি করা আছে। 

### সিক্রেট সেটআপ:

1. GitHub রিপো → Settings → Secrets and variables → Actions
2. New repository secrets যোগ করুন:
   - `NETLIFY_AUTH_TOKEN` (Netlify → User settings → Applications → Personal access tokens)
   - `NETLIFY_SITE_ID` (Netlify site settings → General → Site details)
   - `CLOUDFLARE_API_TOKEN` (Cloudflare → My Profile → API Tokens)

## ✅ ডিপ্লয় যাচাইকরণ চেকলিস্ট

- [ ] GitHub-এ কোড পুশ হয়েছে
- [ ] Netlify/Cloudflare সাথে কানেক্টেড
- [ ] Environment variables সেট করা হয়েছে
- [ ] Supabase URL সঠিক
- [ ] Site লাইভ (URL ওপেন হয়)
- [ ] Login/Signup কাজ করছে
- [ ] Media upload কাজ করছে

## 🆘 ইমার্জেন্সি রোলব্যাক

```bash
# পুরনো ভার্সনে ফিরে যেতে:
git log --oneline  # কমিট দেখুন
git revert HEAD    # সর্বশেষ কমিট রিভার্ট করুন
git push origin main
```

# 🚀 Monetixra - Quick Deployment Guide

## ✅ ডিপ্লয়মেন্ট শুরু করুন (Start Deployment)

### পদ্ধতি ১: Netlify CLI (সুপারিশকৃত)

#### ধাপ ১: Netlify CLI ইনস্টল করুন
```powershell
# PowerShell তে চালান
npm install -g netlify-cli
```

#### ধাপ ২: Netlify-এ লগইন করুন
```powershell
netlify login
```

#### ধাপ ৩: সাইট লিংক করুন
```powershell
cd "d:\monetixra New"
netlify link
# অথবা নতুন সাইট তৈরি করুন:
# netlify sites:create --name monetixrap
```

#### ধাপ ৪: প্রোডাকশন ডিপ্লয়
```powershell
netlify deploy --prod --dir="." --site=monetixrap
```

---

### পদ্ধতি ২: Drag & Drop (সবচেয়ে সহজ)

1. https://app.netlify.com/drop এ যান
2. "d:\monetixra New" ফোল্ডারটি ব্রাউজারে টেনে আনুন
3. ✅ ডিপ্লয় সম্পূর্ণ!

---

### পদ্ধতি ৩: Batch File (Windows)

```batch
# "d:\monetixra New" ফোল্ডারে যান
# deploy-netlify.bat ডবল-ক্লিক করুন
cd "d:\monetixra New"
.\deploy-netlify.bat
```

---

## 📊 Ad Types হাইলাইট (Highlighted)

### 🎯 মোট ৬টি অ্যাড নেটওয়ার্ক

| নং | নেটওয়ার্ক | অ্যাড টাইপ | আয়ের হার |
|---|-----------|-----------|----------|
| 1 | **Google AdSense** | Display, Native, Auto | মধ্যম |
| 2 | **Google AdMob** | Banner, Interstitial, Rewarded, App Open | উচ্চ |
| 3 | **ProfitableCPMRate** | Popunder, Smartlink, Social Bar, Native Banner, 160x30, 468x60 | **উচ্চ** |
| 4 | **Adsterra** | Social Bar, Popunder | মধ্যম |
| 5 | **Media.net** | Contextual Ads | মধ্যম |

---

## 💰 বিজ্ঞাপন লোকেশন (Ad Locations)

### ১. Download Modal Ads (সবচেয়ে বেশি আয়)
```
📥 ডাউনলোড শুরু হলে:
   ├── 160x30 Banner (Small)
   ├── 300x50 Banner (Mobile)
   └── প্রোগ্রেস বার

✅ ডাউনলোড শেষে:
   ├── 468x60 Banner (Large)
   ├── Native Banner
   └── AdSense Slot
```

### ২. Feed Ads (প্রতি ৫টি পোস্ট পর)
```
┌─────────────────────────────┐
│  পোস্ট ১                    │
│  পোস্ট ২                    │
│  পোস্ট ৩                    │
│  পোস্ট ৪                    │
│  পোস্ট ৫                    │
├─────────────────────────────┤
│  📢 [Native / AdSense]      │ ← এখানে অ্যাড
└─────────────────────────────┘
```

### ৩. Page Ads (সবসময় দৃশ্যমান)
```
┌─────────────────────────────┐
│  [Top Banner Ad]            │ ← Animated
├─────────────────────────────┤
│                             │
│      Content Area           │
│                             │
├─────────────────────────────┤
│  [Social Bar - Fixed]       │ ← Bottom
└─────────────────────────────┘

Background: [Popunder] ← পেজ লোডে
```

### ৪. Wallet Page (ইউজার একশন)
```
┌─────────────────────────────┐
│  💰 Wallet Balance          │
├─────────────────────────────┤
│  📺 Watch Ad & Earn 10 pts  │ ← Rewarded Button
├─────────────────────────────┤
│  [Withdraw] [Top-up]        │
└─────────────────────────────┘
```

---

## 🔧 API Keys এবং IDs (সংরক্ষিত)

### ✅ ইতিমধ্যে যোগ করা হয়েছে:

```javascript
// AdMob
App ID:       ca-app-pub-2253243248364888~1427340343
Banner:       ca-app-pub-2253243248364888/3990983995
Interstitial: ca-app-pub-2253243248364888/3199587018
Rewarded:     ca-app-pub-2253243248364888/6812588459
Native:       ca-app-pub-2253243248364888/2245597996
App Open:     ca-app-pub-2253243248364888/8392203945

// AdSense
Publisher:    pub-2397116277801081
Customer ID:  9316157812

// Adsterra
API Key:      55d8dff1aa431254a145e6f12f01b775

// OpenAI
API Key:      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
```

---

## 📁 প্রয়োজনীয় ফাইল

```
✅ index.html          - মূল ফাইল (সব অ্যাড যুক্ত)
✅ ads.txt             - অ্যাড নেটওয়াক যাচাইকরণ
✅ app-ads.txt         - মোবাইল অ্যাপ অ্যাড
✅ netlify.toml        - Netlify কনফিগারেশন
✅ manifest.json       - PWA ম্যানিফেস্ট
✅ sw.js              - সার্ভিস ওয়ার্কার
✅ config.js          - API কনফিগ
✅ AD_TYPES.md        - অ্যাড ডকুমেন্টেশন
✅ deploy-netlify.bat  - ডিপ্লয় ব্যাচ ফাইল
```

---

## 🎬 দ্রুত ডিপ্লয় (One-Line)

```powershell
# PowerShell Administrator হিসেবে চালান
npm install -g netlify-cli; netlify login; cd "d:\monetixra New"; netlify deploy --prod --dir="."
```

---

## 📊 আয়ের সম্ভাব্য পরিসংখ্যান

| ট্রাফিক | দৈনিক আয় | মাসিক আয় |
|---------|---------|----------|
| 1,000 visitors | $5-10 | $150-300 |
| 5,000 visitors | $25-50 | $750-1500 |
| 10,000 visitors | $50-100 | $1500-3000 |

**বিশেষ:** Download ads সবচেয়ে বেশি আয় দেয়!

---

## 🆘 সমস্যা সমাধান

### সমস্যা: `netlify command not found`
```powershell
npm install -g netlify-cli
```

### সমস্যা: `login required`
```powershell
netlify login
# ব্রাউজারে লগইন করুন
```

### সমস্যা: `site not found`
```powershell
netlify sites:create --name monetixrap
# অথবা
netlify link
```

---

## 🌐 লাইভ URL

ডিপ্লয়ের পর আপনার সাইট:
```
🌍 https://monetixrap.netlify.app
```

---

**তৈরির তারিখ:** May 2, 2026  
**স্ট্যাটাস:** ✅ ডিপ্লয়ের জন্য প্রস্তুত

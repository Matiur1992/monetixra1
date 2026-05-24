# 📢 Monetixra - Ad Types Configuration

## 🎯 All Integrated Ad Networks

### 1. Google AdSense (Web Ads)
| Setting | Value |
|---------|-------|
| Publisher ID | `pub-2397116277801081` |
| Customer ID | `9316157812` |
| Script | `ca-pub-2397116277801081` |

**Ad Types:**
- ✅ Display Ads (Banner)
- ✅ In-Article Ads (Feed)
- ✅ Native Ads
- ✅ Auto Ads

---

### 2. Google AdMob (Mobile App/Web)
| Setting | Value |
|---------|-------|
| App ID | `ca-app-pub-2253243248364888~1427340343` |

**Ad Unit IDs:**
| Ad Type | Ad Unit ID | Implementation |
|---------|-----------|----------------|
| 📱 **Banner** | `ca-app-pub-2253243248364888/3990983995` | Bottom banner on mobile |
| 🖼️ **Interstitial** | `ca-app-pub-2253243248364888/3199587018` | Between page transitions |
| 🎁 **Rewarded Interstitial** | `ca-app-pub-2253243248364888/5139354646` | Optional reward ads |
| 💰 **Rewarded** | `ca-app-pub-2253243248364888/6812588459` | Points for watching |
| 📰 **Native** | `ca-app-pub-2253243248364888/2245597996` | Feed integrated |
| 🚪 **App Open** | `ca-app-pub-2253243248364888/8392203945` | App launch |
| 🚪 **App Open (Alt)** | `ca-app-pub-2253243248364888/1173248962` | Backup app open |

---

### 3. ProfitableCPMRate Network
| Setting | Value |
|---------|-------|
| Publisher | monetixrap.netlify.app |
| Zone IDs | 29179785 - 29179790 |

**Ad Types:**
| Type | ID | Size | Usage |
|------|-----|------|-------|
| 🔻 **Popunder** | 29179785 | Full page | Background tab |
| 🔗 **Smartlink** | 29179786 | Interstitial | Direct link: `https://www.profitablecpmratenetwork.com/qu1bqnynm6?key=d753b3018195910056f99110db5b614a` |
| 📊 **Social Bar** | 29179787 | Fixed bottom | Always visible |
| 🖼️ **Native Banner** | 29179788 | Responsive | Feed integration |
| 📏 **Banner 160x30** | 29179789 | 160x30 | Small download ads |
| 📏 **Banner 468x60** | 29179790 | 468x60 | Large download ads |
| 📏 **Banner 300x50** | Extra | 300x50 | Mobile banner |

---

### 4. Adsterra
| Setting | Value |
|---------|-------|
| API Key | `55d8dff1aa431254a145e6f12f01b775` |

**Ad Types:**
- Social Bar
- Popunder
- Native Ads
- Direct Link

---

### 5. Media.net / Contextual
| Setting | Value |
|---------|-------|
| Customer ID | `9316157812` |

**Ad Types:**
- Contextual Ads
- Native Ads
- Display Ads

---

## 💰 Revenue Strategy by Location

### Download Modal Ads (High Revenue)
```
┌─────────────────────────────────┐
│  Download Progress...           │
│  ████████████░░░░ 60%          │
├─────────────────────────────────┤
│  [160x30 Banner]               │  ← During Download
│  [300x50 Banner]               │  ← Extra impression
├─────────────────────────────────┤
│  ✅ Download Complete!           │
├─────────────────────────────────┤
│  [468x60 Banner]               │  ← After Download
│  [Native Banner]               │  ← Native ad
│  [AdSense Slot]                │  ← Google ad
└─────────────────────────────────┘
```

### Feed Ads (Continuous Revenue)
```
Every 5 posts in feed:
┌─────────────────────────────────┐
│  📢 Sponsored                  │
│  [Native Banner / AdSense]     │
└─────────────────────────────────┘
```

### Page Layout Ads
```
┌─────────────────────────────────┐
│ [Banner Ad - Top]              │
├─────────────────────────────────┤
│     [Social Bar]               │ ← Fixed bottom
├─────────────────────────────────┤
│          Content               │
├─────────────────────────────────┤
│ [Popunder - Background]        │ ← On page load
└─────────────────────────────────┘
```

---

## 🎁 Rewarded Ad System

### User Flow:
1. User clicks "📺 Watch Ad & Earn 10 Points"
2. System tries AdMob Rewarded Ad first
3. If unavailable → Shows Smartlink
4. User watches/interacts with ad
5. User receives 10 points instantly
6. Revenue tracked in analytics

### Code Location:
- Wallet Page: `index.html:1435-1438`
- Reward Function: `index.html:4019-4046`

---

## 📊 Ad Revenue Tracking

```javascript
// Track all ad impressions
function trackAdRevenue(adType, value) {
  // Stores: impressions, clicks, value per day
  // Location: index.html:4080-4088
}

// Get stats
function getAdRevenueStats() {
  // Returns daily revenue breakdown
  // Location: index.html:4090-4093
}
```

---

## 🚀 Quick Deploy Commands

### Option 1: Batch File (Windows)
```batch
double_click: deploy-netlify.bat
```

### Option 2: Command Line
```bash
# Install dependencies
npm install

# Start local server
npm start

# Deploy to Netlify
netlify deploy --prod --dir="."
```

### Option 3: Full Pipeline
```bash
npm install && npm start &
netlify deploy --prod --dir="." --site=monetixrap.netlify.app
```

---

## 📁 Required Files for Deployment

```
monetixra New/
├── index.html          ✅ (Main file with all ads)
├── ads.txt             ✅ (Ad network verification)
├── app-ads.txt         ✅ (Mobile app ads)
├── netlify.toml        ✅ (Netlify config)
├── manifest.json       ✅ (PWA manifest)
├── sw.js              ✅ (Service worker)
├── config.js          ✅ (API config)
├── js/
│   ├── indexeddb-storage.js
│   ├── mega-storage.js
│   └── supabase-realtime.js
└── public/            ✅ (Static assets)
```

---

## 🔧 Ad Configuration Variables

Location: `index.html:104-137`

```javascript
// All Ad IDs are configured here:
const ADMOB_APP_ID           = 'ca-app-pub-2253243248364888~1427340343';
const ADMOB_BANNER_ID        = 'ca-app-pub-2253243248364888/3990983995';
const ADMOB_INTERSTITIAL_ID  = 'ca-app-pub-2253243248364888/3199587018';
const ADMOB_REWARDED_ID      = 'ca-app-pub-2253243248364888/6812588459';
const ADMOB_NATIVE_ID        = 'ca-app-pub-2253243248364888/2245597996';
const ADMOB_APP_OPEN_ID      = 'ca-app-pub-2253243248364888/8392203945';

const ADSTERRA_KEY       = '55d8dff1aa431254a145e6f12f01b775';
const ADSENSE_CLIENT     = 'ca-pub-2397116277801081';
const MEDIANET_CID       = '9316157812';

const OPENAI_API_KEY = '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';
```

---

## 📈 Expected Revenue (Estimate)

| Ad Type | Impressions/Day | RPM | Daily Revenue |
|---------|----------------|-----|---------------|
| Popunder | 1,000 | $3 | $3 |
| Banner 468x60 | 500 | $1 | $0.50 |
| Native Banner | 2,000 | $0.50 | $1 |
| Rewarded | 100 | $5 | $0.50 |
| Interstitial | 200 | $2 | $0.40 |
| **Total** | | | **~$5-10/day** |

*Note: Actual revenue depends on traffic, GEO, and user engagement*

---

## 🎨 Ad Display Locations Summary

| Location | Ad Types | Revenue Impact |
|----------|----------|----------------|
| Top Banner | Animated gradient | Medium |
| Feed (every 5 posts) | Native, AdSense, CPMR | High |
| Download Modal | 160x30, 300x50, 468x60, Native | **Very High** |
| Bottom Social Bar | Social Bar | Medium |
| Page Background | Popunder | High |
| Wallet Page | Rewarded Ad Button | Medium |

---

**Last Updated:** May 2026  
**Status:** ✅ Ready for Deployment

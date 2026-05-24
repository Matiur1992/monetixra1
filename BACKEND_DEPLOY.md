# 🚀 Backend Deployment to Render (Socket.io + WebRTC)

## 📋 এক নজরে

| ফিচার | স্ট্যাটাস |
|--------|----------|
| **Socket.io** | ✅ Real-time messaging |
| **WebRTC** | ✅ Video/audio calls |
| **Supabase** | ✅ Database connection |
| **Web Push** | ✅ Notifications |
| **AI APIs** | ✅ OpenAI/DeepSeek |
| **Payment** | ✅ bKash/Nagad |

---

## 🎯 দ্রুত ৩ ধাপে ডিপ্লয়

### ধাপ ১: Render একাউন্ট তৈরি (৩০ সেকেন্ড)

1. [dashboard.render.com](https://dashboard.render.com)-এ যান
2. **Sign up with GitHub** ক্লিক করুন
3. GitHub অথরাইজেশন দিন

---

### ধাপ ২: Backend সার্ভিস তৈরি (১ মিনিট)

**অপশন A: Blueprint Auto-Deploy (সুপারিশকৃত)**

1. Blueprint যোগ করুন:
   ```
   https://dashboard.render.com/blueprint/new?repo=https://github.com/YOUR_USERNAME/monetixra
   ```
   
2. "Apply" ক্লিক করুন - সবকিছু অটো সেটআপ হবে!

**অপশন B: Manual Setup**

1. Dashboard → **New** → **Web Service**
2. GitHub repo সিলেক্ট করুন: `monetixra`
3. সেটিংস:
   
   | ফিল্ড | মান |
   |-------|-----|
   | **Name** | `monetixra-backend` |
   | **Environment** | `Node` |
   | **Region** | `Singapore` (এশিয়ার জন্য) |
   | **Branch** | `main` |
   | **Build Command** | `npm install` |
   | **Start Command** | `node server.js` |
   | **Plan** | `Free` |

4. **Advanced** ক্লিক করে Environment Variables যোগ করুন:

   ```
   SUPABASE_URL=https://rgximkhnhxgaonrxzzxl.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJneGlta2huaHhnYW9ucnh6enhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDg3MDQsImV4cCI6MjA5MTIyNDcwNH0.zgBfCTs2AEocLVwjJntg1dDBwy4quQS40QWqeuYRTwU
   METERED_API_KEY=ffb21c8dfcff4bf229f8973e77541a11edc0
   GOOGLE_API_KEY=AIzaSyCCGkyMBXiByuRV8qFfLRAWPrfFNRQOhoI
   GOOGLE_VISION_KEY=AIzaSyDIgQr0BfU4-AfWRA2_HFcDhwZZj7ymiUg
   ```

5. **Create Web Service** ক্লিক করুন

---

### ধাপ ৩: Frontend ও Backend কানেক্ট করুন (৩০ সেকেন্ড)

**Backend URL পাবেন:**
```
https://monetixra-backend.onrender.com
```

**index.html আপডেট করুন:**

```javascript
// Line ~76-77, আগে ছিল:
const SERVER_URL = 'https://your-backend.onrender.com';

// এখন পরিবর্তন করুন:
const SERVER_URL = 'https://monetixra-backend.onrender.com';
```

তারপর GitHub-ে পুশ করুন:
```bash
git add index.html
git commit -m "🔗 Connect frontend to backend"
git push origin main
```

---

## 🧪 টেস্টিং

### API চেক করুন:
```bash
curl https://monetixra-backend.onrender.com/api/health
```

**সফল হলে দেখাবে:**
```json
{"status":"ok","timestamp":"...","socketio":"connected"}
```

### Socket.io টেস্ট:
```javascript
// Browser console-এ:
const socket = io('https://monetixra-backend.onrender.com');
socket.on('connect', () => console.log('✅ Connected!'));
```

---

## 🔧 সমস্যা সমাধান

### সমস্যা: "Service crashed"
**সমাধান:**
```bash
# Logs চেক করুন:
Render Dashboard → monetixra-backend → Logs

# সাধারণ সমস্যা:
- Missing env variables → Environment tab-এ যোগ করুন
- Port issue → PORT=10000 সেট আছে তো?
- Build error → Build Command সঠিক: `npm install`
```

### সমস্যা: "CORS error"
**সমাধান:**
```javascript
// server.js-এ already আছে:
app.use(cors({origin:'*'}));

// নিজের frontend URL দিতে চাইলে:
app.use(cors({origin:['https://monetixra.netlify.app']}));
```

### সমস্যা: "WebRTC not working"
**সমাধান:**
- METERED_API_KEY সঠিক কিনা চেক করুন
- ICE servers লোড হচ্ছে কিনা: `/api/ice` endpoint চেক করুন

---

## 📊 Render Dashboard-এ কী দেখবেন

| ট্যাব | কী পাবেন |
|-------|---------|
| **Events** | Deploy history |
| **Logs** | Real-time server logs |
| **Metrics** | CPU/Memory usage |
| **Environment** | Env variables |
| **Settings** | Auto-deploy, custom domain |

---

## 🔄 Auto-Deploy চালু আছে?

**Yes!** GitHub-এ পুশ করলে অটোমেটিক ডিপ্লয় হবে:

```bash
git add .
git commit -m "New feature"
git push origin main  # ← অটো ডিপ্লয় শুরু!
```

Render Dashboard-এ দেখবেন:
```
Your service is being deployed...
Build successful ✓
Deploy successful ✓
```

---

## 🌐 কাস্টম ডোমেইন (ঐচ্ছিক)

1. Render Dashboard → monetixra-backend → Settings
2. **Custom Domain** → Add domain
3. `api.monetixra.com` সেট করুন
4. DNS records আপডেট করুন

**তারপর index.html-এ:**
```javascript
const SERVER_URL = 'https://api.monetixra.com';
```

---

## ✅ ফাইনাল চেকলিস্ট

- [ ] Render service "Live" স্ট্যাটাসে
- [ ] /api/health কাজ করছে
- [ ] Socket.io connected
- [ ] index.html-এ SERVER_URL আপডেট
- [ ] Frontend থেকে API কল হচ্ছে
- [ ] Chat/Call কাজ করছে

**সব কিছু কাজ করলে:** 🎉 **বধাই! সম্পূর্ণ সোশ্যাল প্ল্যাটফর্ম লাইভ!**

---

## 📞 সাহায্য

- Render Docs: [render.com/docs](https://render.com/docs)
- Socket.io: [socket.io/docs](https://socket.io/docs)
- WebRTC: [webrtc.org](https://webrtc.org)

**এখনই Render-এ ডিপ্লয় শুরু করুন!** 🚀

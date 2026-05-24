# 🚀 Render Backend Deployment - সম্পূর্ণ গাইড

## ✅ ইতিমধ্যে করা হয়েছে:

| কাজ | ফাইল | স্ট্যাটাস |
|-----|------|----------|
| **Render Blueprint** | `render.yaml` | ✅ Auto-deploy ready |
| **Health Check** | `server.js` | ✅ `/health` ও `/api/health` |
| **Start Script** | `start.sh` | ✅ Node server starter |
| **Deploy Guide** | `BACKEND_DEPLOY.md` | ✅ Step-by-step |

---

## 🎯 দ্রুত ডিপ্লয় (২ ধাপে):

### ১️⃣ Blueprint দিয়ে অটো ডিপ্লয়

এই লিংকে ক্লিক করুন:
```
https://dashboard.render.com/blueprint/new?repo=https://github.com/YOUR_USERNAME/monetixra
```

**অথবা ম্যানুয়ালি:**
1. [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**
2. GitHub repo: `monetixra`
3. সেটিংস:
   ```
   Name: monetixra-backend
   Environment: Node
   Build: npm install
   Start: node server.js
   Plan: Free
   ```
4. Environment Variables (ইতিমধ্যে `render.yaml`-এ আছে):
   ```
   SUPABASE_URL=https://rgximkhnhxgaonrxzzxl.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   METERED_API_KEY=ffb21c8dfcff4bf229f8973e77541a11edc0
   ```
5. **Create Web Service**

---

### ২️⃣ Frontend কানেক্ট করুন

**Backend URL পাবেন:**
```
https://monetixra-backend.onrender.com
```

**Socket.io URL আপডেট করুন:**

`index.html`-এ Line ~5792 চেক করুন:
```javascript
// আগে ছিল:
const SOCKET_URL = window.location.origin;

// এখন পরিবর্তন করুন:
const SOCKET_URL = 'https://monetixra-backend.onrender.com';
```

**GitHub-ে পুশ করুন:**
```bash
git add index.html
git commit -m "🔗 Connect to Render backend"
git push origin main
```

---

## 🧪 টেস্টিং চেকলিস্ট

| টেস্ট | URL/কমান্ড | সফল হলে |
|-------|-----------|---------|
| **Health Check** | `https://monetixra-backend.onrender.com/health` | `{"status":"ok"}` |
| **ICE Servers** | `https://monetixra-backend.onrender.com/api/ice-servers` | TURN servers |
| **Socket.io** | Browser console: `io('https://monetixra-backend.onrender.com')` | Connected! |
| **WebRTC Call** | Call button click | Video works |

---

## 📊 Backend ফিচারস (সব চালু):

```
✅ Socket.io - Real-time chat & notifications
✅ WebRTC - Video/audio calls with TURN servers
✅ Supabase - Database & file storage
✅ Web Push - Browser notifications
✅ AI APIs - OpenAI/DeepSeek integration
✅ Payment - bKash/Nagad (configure করতে হবে)
✅ Rate Limiting - DDoS protection
✅ Security - Helmet, CORS configured
```

---

## 🔧 সমস্যা সমাধান

### সমস্যা: "Service crashed"
**চেক করুন:**
```bash
# Render Dashboard → monetixra-backend → Logs
# কমন কারণ:
- Missing env vars → Settings → Environment যোগ করুন
- Port binding → PORT=10000 Auto-set
- Build error → npm install লগ দেখুন
```

### সমস্যা: "Cannot connect to socket"
**সমাধান:**
```javascript
// index.html-এ SOCKET_URL সঠিক কিনা চেক করুন
const SOCKET_URL = 'https://monetixra-backend.onrender.com';
// NOT: window.location.origin
```

### সমস্যা: "CORS error"
**সমাধান:**
```javascript
// server.js-এ already আছে:
app.use(cors({origin:'*'}));

// নিজের domain দিতে চাইলে:
app.use(cors({
  origin: ['https://monetixra.netlify.app', 'https://monetixra.pages.dev']
}));
```

---

## 🔄 Auto-Deploy চালু আছে

GitHub-এ পুশ করলেই অটোমেটিক:
```bash
git push origin main
# Render Dashboard-এ "Deploy in progress..."
```

---

## 📞 সাপোর্ট

| রিসোর্স | লিংক |
|--------|------|
| Render Docs | [render.com/docs](https://render.com/docs) |
| Socket.io | [socket.io/docs](https://socket.io/docs) |
| WebRTC | [webrtc.org](https://webrtc.org) |

**এখনই Render-এ ডিপ্লয় করুন!** 🚀

---

## 🎉 ফাইনাল URL গুলো হবে:

| সার্ভিস | URL |
|--------|-----|
| **Frontend** | https://monetixra.netlify.app |
| **Backend** | https://monetixra-backend.onrender.com |
| **GitHub** | https://github.com/YOUR_USERNAME/monetixra |

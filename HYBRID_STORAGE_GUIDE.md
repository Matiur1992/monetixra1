# 🗄️ Monetixra Hybrid Storage System - Complete Guide

## 📊 Storage Architecture (21GB+ Free Storage)

```
┌─────────────────────────────────────────────────────────────────┐
│                    HYBRID STORAGE SYSTEM                        │
├─────────────────────────────────────────────────────────────────┤
│  📱 IndexedDB (Browser)  │  ☁️ Supabase (Cloud)  │  🌐 MEGA    │
│  ───────────────────────  │  ───────────────────  │  ─────────  │
│  500MB - 2GB per user     │  1GB total (free)     │  20GB free  │
│  ───────────────────────  │  ───────────────────  │  ─────────  │
│  • Tiny files (<100KB)    │  • Small files        │  • Large    │
│  • Offline cache          │    (100KB - 5MB)      │    files    │
│  • Chat messages          │  • Text data          │  (>5MB)     │
│  • User preferences       │  • Thumbnails         │  • Videos   │
│  • Notifications          │  • Auth data          │  • Audio    │
│                           │  • Realtime           │  • 4K imgs  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │   SMART STORAGE MANAGER      │
              │   Auto-selects best storage   │
              │   based on file size & type   │
              └───────────────────────────────┘
```

---

## 🎯 কী কী ফাইল কোথায় যাবে?

### 1️⃣ IndexedDB (ব্রাউজারে, অফলাইনে কাজ করে)

| ফাইল টাইপ | সাইজ | উদাহরণ |
|-----------|------|--------|
| **Tiny Images** | < 100KB | প্রোফাইল পিকচার, আইকন |
| **Chat Data** | Any | মেসেজ, রুম ইতিহাস |
| **Posts (Text)** | Any | পোস্ট কন্টেন্ট, মেটাডাটা |
| **Notifications** | Any | নোটিফিকেশন কিউ |
| **User Settings** | Any | থিম, প্রেফারেন্স |

```javascript
// IndexedDB ব্যবহার:
await IndexedDBStorage.savePostOffline(post);
await IndexedDBStorage.saveChatMessage(message);
await IndexedDBStorage.saveMediaOffline(id, blob, metadata);
```

---

### 2️⃣ Supabase (ক্লাউড, রিয়েল-টাইম)

| ফাইল টাইপ | সাইজ | উদাহরণ |
|-----------|------|--------|
| **Small Images** | 100KB - 5MB | পোস্ট ছবি, কম্প্রেসড ভিডিও |
| **Documents** | < 5MB | PDF, DOCX ফাইল |
| **Audio** | < 5MB | শর্ট ক্লিপ, ভয়েস মেসেজ |
| **Text Data** | Any | পোস্ট, কমেন্ট, ইউজার ডেটা |
| **Auth** | Any | লগইন সেশন, টোকেন |

```javascript
// Supabase ব্যবহার:
await supabase.from('posts').insert(post);
await supabase.storage.from('media').upload(path, file);
```

---

### 3️⃣ MEGA.nz (20GB ফ্রি, বড় ফাইলের জন্য)

| ফাইল টাইপ | সাইজ | উদাহরণ |
|-----------|------|--------|
| **Large Videos** | > 5MB | ফুল HD ভিডিও, রিলস |
| **Audio** | > 5MB | ফুল সঙ্গীত, পডকাস্ট |
| **High-res Images** | > 5MB | 4K ফটো, RAW ইমেজ |
| **Archives** | > 5MB | ZIP, RAR ফাইল |

```javascript
// MEGA ব্যবহার:
await MegaStorage.upload(file, onProgress);
// অথবা স্মার্ট আপলোড:
await MegaStorage.smartUpload(file, options);
```

---

## 🚀 Smart Upload - Automatic Storage Selection

```javascript
// আপনাকে কিছু করতে হবে না - অটো সিলেক্ট হবে!

const result = await MegaStorage.smartUpload(file, {
  onProgress: (percent) => console.log(`${percent}%`)
});

// ফলাফল:
// file.size = 50KB   → IndexedDB
// file.size = 2MB    → Supabase
// file.size = 100MB  → MEGA
```

---

## 📱 Offline Mode (অফলাইনে কাজ করে)

```javascript
// ইন্টারনেট চলে গেলেও কাজ চলবে!

// 1. পোস্ট অফলাইনে সেভ করুন
await IndexedDBStorage.savePostOffline({
  id: 'temp_123',
  text: 'My post',
  author: 'user_id',
  timestamp: Date.now()
});

// 2. অফলাইনে পোস্ট দেখুন
const posts = await IndexedDBStorage.getAllPostsOffline();

// 3. ইন্টারনেট আসলে অটো সিঙ্ক হবে
window.addEventListener('online', async () => {
  await IndexedDBStorage.syncOfflineData();
  toast('s', 'Synced!');
});
```

---

## 🔄 Real-time Features (সরাসরি দেখা যাবে)

```javascript
// নতুন পোস্ট আসলে অটো দেখাবে
SupabaseRealtime.subscribeToPosts(
  (newPost) => addPostToFeed(newPost),
  (updatedPost) => updatePost(updatedPost),
  (deletedPost) => removePost(deletedPost.id)
);

// চ্যাট মেসেজ রিয়েল-টাইম
SupabaseRealtime.subscribeToChat('room_123',
  (message) => displayMessage(message),
  (typingUsers) => showTypingIndicator(typingUsers)
);

// নোটিফিকেশন রিয়েল-টাইম
SupabaseRealtime.subscribeToNotifications(userId,
  (notification) => showNotification(notification)
);

// ইউজার অনলাইন স্ট্যাটাস
SupabaseRealtime.subscribeToUserPresence(userId,
  (presence) => updateOnlineStatus(presence)
);
```

---

## 🛡️ Security & Privacy

| লেয়ার | সিকিউরিটি |
|--------|----------|
| **IndexedDB** | ব্রাউজার-লোকাল, শুধু আপনার ডিভাইসে |
| **Supabase** | Row Level Security (RLS), JWT Auth |
| **MEGA** | End-to-end encryption (zero-knowledge) |

---

## 📊 Storage Limits & Quotas

| সার্ভিস | ফ্রি লিমিট | পেয়ার্ড |
|---------|-----------|---------|
| **IndexedDB** | 500MB - 2GB (ব্রাউজার অনুযায়ী) | N/A |
| **Supabase** | 1GB storage, 500MB DB | $25/month: 100GB |
| **MEGA** | 20GB storage | $5/month: 400GB |

**মোট ফ্রি:** 21.5GB+ per user

---

## 🔌 index.html-এ যোগ করুন

```html
<!-- Supabase (আগে থেকেই আছে) -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- নতুন মডিউলগুলো (body শেষে, </body> এর আগে) -->
<script src="js/indexeddb-storage.js"></script>
<script src="js/mega-storage.js"></script>
<script src="js/supabase-realtime.js"></script>
```

---

## 🎯 ব্যবহারের উদাহরণ

### 1. ফাইল আপলোড (স্মার্ট)
```javascript
async function uploadPostMedia(file) {
  // Smart upload - auto select storage
  const result = await MegaStorage.smartUpload(file, {
    onProgress: (pct) => showProgress(pct)
  });
  
  return {
    url: result.url,
    storage: result.storage, // 'indexeddb' | 'supabase' | 'mega'
    size: result.size
  };
}
```

### 2. অফলাইন পোস্টিং
```javascript
async function createPostOffline(text, file) {
  const post = {
    id: `temp_${Date.now()}`,
    text,
    timestamp: Date.now(),
    synced: false
  };
  
  // Save locally
  await IndexedDBStorage.savePostOffline(post);
  
  // Add to sync queue
  await IndexedDBStorage.addToSyncQueue({
    type: 'post',
    data: post
  });
  
  // Show in UI immediately
  displayPost(post);
  
  // If online, sync now
  if (navigator.onLine) {
    await IndexedDBStorage.syncOfflineData();
  }
}
```

### 3. রিয়েল-টাইম চ্যাট
```javascript
// Initialize
SupabaseRealtime.init(supabaseClient);

// Join room
SupabaseRealtime.subscribeToChat('room_123',
  (msg) => addMessageToChat(msg),
  (typing) => showTyping(typing)
);

// Send message
async function sendMessage(text) {
  if (!navigator.onLine) {
    // Save offline
    await IndexedDBStorage.saveChatMessage({
      id: `temp_${Date.now()}`,
      room: 'room_123',
      text,
      timestamp: Date.now(),
      synced: false
    });
  } else {
    // Send real-time
    await supabase.from('chat_messages').insert({
      room_id: 'room_123',
      content: text
    });
  }
}
```

---

## ✅ Benefits of This Architecture

| ফিচার | সুবিধা |
|--------|--------|
| **Cost** | সম্পূর্ণ ফ্রি 21GB+ |
| **Speed** | CDN + Local cache = ফাস্ট |
| **Offline** | অফলাইনে কাজ করে |
| **Realtime** | সরাসরি আপডেট |
| **Security** | End-to-end encrypted |
| **Scalability** | ইউজার বাড়লে সমস্যা নেই |

---

## 🆘 Troubleshooting

### সমস্যা: "IndexedDB quota exceeded"
**সমাধান:** পুরনো ক্যাশে পরিষ্কার করুন
```javascript
await IndexedDBStorage.clearSyncQueue();
```

### সমস্যা: "MEGA upload failed"
**সমাধান:** Supabase-এ ফলব্যাক হবে অটোমেটিক

### সমস্যা: "Realtime not working"
**সমাধান:** Check Supabase URL & anon key
```javascript
SupabaseRealtime.init(supabaseClient);
```

---

## 📞 Support

- IndexedDB: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- MEGA SDK: [mega.nz/sdk](https://mega.nz/sdk)

**এই আর্কিটেকচার ইমপ্লিমেন্ট করলে আপনার অ্যাপ স্কেল হবে আর ফ্রি থাকবে! 🚀**

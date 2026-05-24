# 🎉 Monetixra Enhanced Post Interactions - Implementation Guide

## 📋 বৈশিষ্ট্য সারসংক্ষেপ (Features Overview)

আপনার আবেদনে নিম্নোক্ত উন্নত ফিচার যোগ করা হয়েছে:

### ✨ 1. **এনহান্সড ফ্লাওয়ার রিঅ্যাকশন (Enhanced Flower Reaction)**
- **Flow/Unflow টগল করুন**: ফ্লাওয়ার বাটনে ক্লিক করে সহজেই flow এবং unflow করতে পারবেন
- **স্বয়ংক্রিয় গণনা**: প্রতিটি ফ্লাওয়ার রিঅ্যাকশন স্বয়ংক্রিয়ভাবে গণনা করা হয়
- **ভিজ্যুয়াল ফিডব্যাক**: প্রতিবার ক্লিকে অ্যানিমেশন সহ প্রতিক্রিয়া

**ব্যবহার:**
```javascript
// ফ্লাওয়ার টগল করুন
toggleFlower(postId, userId, element);
```

### 👍 2. **উন্নত লাইক সিস্টেম (Advanced Like System)**
- **লং-প্রেস রিঅ্যাকশন পিকার**: লাইক বাটনে দীর্ঘ সময় ধরে চাপ দিলে বিভিন্ন ইমোজি অপশন (❤️ 🔥 😂 😮 😢 👏 🌸 🎉) দেখা যাবে
- **দ্রুত লাইক**: সংক্ষিপ্ত ক্লিকে সরাসরি লাইক করুন
- **প্রভাব অ্যানিমেশন**: রিঅ্যাকশন ফ্লোটিং পপ-আপ সহ দৃশ্যমান হয়

**ব্যবহার:**
```javascript
// লং-প্রেস সেটআপ
reactionPicker.initLongPress(element, postId, callback);

// রিঅ্যাকশন যোগ করুন
addReaction(postId, '❤️', 'Like');
```

### 💬 3. **উন্নত মন্তব্য সিস্টেম (Advanced Comment System)**

#### **রিপ্লাই করুন**
```javascript
// কোনো মন্তব্যে উত্তর দিন
replyToComment(postId, commentId);
```

#### **সম্পাদনা করুন**
```javascript
// মন্তব্য সম্পাদনা করুন
editComment(postId, commentId);
```

#### **প্রতিক্রিয়া যোগ করুন**
```javascript
// মন্তব্যে ইমোজি প্রতিক্রিয়া যোগ করুন
reactToComment(postId, commentId);
```

#### **মুছে ফেলুন**
```javascript
// মন্তব্য মুছে ফেলুন
deleteComment(postId, commentId);
```

**ফিচার:**
- ✅ রিপ্লাই: মন্তব্যের উত্তর দিন
- ✏️ এডিট: মন্তব্য সম্পাদনা করুন (সম্পাদনার ইতিহাস সংরক্ষিত হয়)
- 👍 রিঅ্যাক্ট: মন্তব্যে ইমোজি প্রতিক্রিয়া যোগ করুন
- 🗑️ মুছুন: অপ্রয়োজনীয় মন্তব্য মুছে ফেলুন

### 📤 4. **এনহান্সড শেয়ার সিস্টেম (Enhanced Share System)**

ক্লিক করলে বিভিন্ন প্ল্যাটফর্মে শেয়ার করার অপশন দেখায়:

```javascript
// শেয়ার মেনু দেখান
sharePost(postId, title);

// হ্যান্ডেল শেয়ার অপশন
handleShare(option, postId, title, url);
```

**উপলব্ধ শেয়ার অপশন:**
- 📋 **Copy Link** - লিঙ্ক কপি করুন
- 💬 **WhatsApp** - WhatsApp এ শেয়ার করুন
- ✈️ **Telegram** - টেলিগ্রাম এ শেয়ার করুন
- 👥 **Facebook** - Facebook এ শেয়ার করুন
- 𝕏 **Twitter** - Twitter এ শেয়ার করুন
- 📧 **Email** - ইমেইলে পাঠান
- 💾 **Save Post** - পোস্ট সংরক্ষণ করুন
- ⬇️ **Download** - মিডিয়া ডাউনলোড করুন

---

## 💾 **Supabase ডেটা সংরক্ষণ (Supabase Data Storage)**

### সাপোর্টেড ডেটা টাইপ:

#### 1. **টেক্সট মেসেজ (Text Messages)**
```javascript
// টেক্সট মেসেজ সংরক্ষণ করুন
await saveTextMessage(recipientId, "হ্যালো!");
```

#### 2. **কল রেকর্ড (Call Records)**
```javascript
// ভয়েস কল সংরক্ষণ করুন
await saveCallRecord(recipientId, 'voice', 120, recordingUrl);

// ভিডিও কল সংরক্ষণ করুন
await saveCallRecord(recipientId, 'video', 300, recordingUrl);
```

#### 3. **SMS ডেটা (SMS Data)**
```javascript
// SMS সংরক্ষণ করুন
await saveSMS('+8801XXXXXXXXX', 'বার্তা', 'sent');
```

### ডাটাবেস স্কিমা:

**messages table:**
```sql
- id (UUID)
- sender_id (UUID)
- recipient_id (UUID)
- message_type (text/voice/video)
- content (TEXT)
- is_permanent (BOOLEAN) - সর্বদা true
- created_at (TIMESTAMP)
```

**call_logs table:**
```sql
- id (UUID)
- caller_id (UUID)
- recipient_id (UUID)
- call_type (voice/video/text)
- duration_seconds (INTEGER)
- recording_url (TEXT)
- is_permanent (BOOLEAN) - সর্বদা true
- created_at (TIMESTAMP)
```

**sms_logs table:**
```sql
- id (UUID)
- user_id (UUID)
- phone_number (TEXT)
- message (TEXT)
- direction (sent/received)
- is_permanent (BOOLEAN)
- created_at (TIMESTAMP)
```

---

## 🎬 **Mega.nz মিডিয়া সংরক্ষণ (Mega.nz Media Storage)**

### সাপোর্টেড মিডিয়া:

#### 1. **ফটো (Photo/Image)**
```javascript
// ফটো আপলোড এবং সংরক্ষণ করুন
const file = /* image file */;
const result = await megaStorageManager.uploadMedia(file, 'photo', {
  postId: 'post_123',
  description: 'সুন্দর ছবি'
});
```

#### 2. **ভিডিও (Video)**
```javascript
// ভিডিও আপলোড এবং সংরক্ষণ করুন
const result = await megaStorageManager.uploadMedia(file, 'video', {
  postId: 'post_123',
  duration: 120
});
```

#### 3. **অডিও (Audio)**
```javascript
// অডিও আপলোড এবং সংরক্ষণ করুন
const result = await megaStorageManager.uploadMedia(file, 'audio', {
  postId: 'post_123',
  title: 'আমার গান'
});
```

### স্থায়ী সংরক্ষণ:

```javascript
// সমস্ত স্থায়ী মিডিয়া পান
const { success, data } = await getPermanentMedia('photo');
// data = [{ id, name, type, uploadedAt, permanent: true }, ...]

// সংরক্ষণ পরিসংখ্যান
const stats = await getMediaStats();
// stats = { totalFiles, permanentFiles, totalSize, byType: {...} }
```

### মিডিয়া ডেটা কাঠামো:

```javascript
{
  id: 'media_1234567890_abc123',
  name: 'photo.jpg',
  type: 'photo', // 'photo', 'video', 'audio'
  size: 1024000,
  mimeType: 'image/jpeg',
  uploadedAt: '2026-05-08T10:30:00Z',
  permanent: true,           // সর্বদা true
  cannotDelete: true,        // মুছতে পারবে না
  metadata: {
    postId: 'post_123',
    uploadedBy: 'user_456',
    originalName: 'photo.jpg'
  },
  data: ArrayBuffer,         // বাইনারি ডেটা
  deleted: false             // মুছা হয়েছে কি না
}
```

---

## 🔧 **পোস্ট মিডিয়া ম্যানেজার (Post Media Manager)**

### সম্পূর্ণ পোস্ট সংরক্ষণ:

```javascript
// পোস্ট মিডিয়া সহ সংরক্ষণ করুন
const postData = {
  text: "আমার নতুন পোস্ট!",
  tags: ['মজা', 'ভিডিও']
};

const mediaFiles = [
  /* File objects */
];

const result = await uploadPostWithMedia(postData, mediaFiles);
// result = { success: true, postId: 'post_123', mediaIds: [...] }
```

### পোস্ট পুনরুদ্ধার:

```javascript
// পোস্টের সমস্ত মিডিয়া পান
const { success, mediaFiles } = await getPostWithMedia('post_123');
```

### পোস্ট সুরক্ষা:

```javascript
// পোস্ট মুছা থেকে রক্ষা করুন
await postMediaManager.preventPostDeletion('post_123');
// এখন এই পোস্টের কোনো মিডিয়া মুছা যাবে না
```

---

## 📊 **ব্যবহারের উদাহরণ (Usage Examples)**

### সম্পূর্ণ পোস্ট ইন্টারঅ্যাকশন ফ্লো:

```javascript
// 1. পোস্ট তৈরি করুন
const postHTML = enhancedInteractions.renderPost({
  id: 'post_123',
  author: 'আহমেদ',
  avatar: '👨',
  text: 'সুন্দর একটি পোস্ট!',
  image: 'https://example.com/photo.jpg',
  timestamp: new Date().toISOString()
}, userId);

document.getElementById('feedList').appendChild(postHTML);

// 2. মন্তব্য যোগ করুন
submitComment('post_123');

// 3. ফ্লাওয়ার দিন
toggleFlower('post_123', userId, element);

// 4. শেয়ার করুন
sharePost('post_123', 'সুন্দর একটি পোস্ট!');

// 5. মিডিয়া সংরক্ষণ করুন
await uploadPostWithMedia(
  { text: 'ভিডিও পোস্ট' },
  [videoFile, photoFile]
);
```

### স্টোরেজ ম্যানেজমেন্ট:

```javascript
// কল সংরক্ষণ করুন
await saveCallRecord('user_456', 'video', 300, recordingUrl);

// মেসেজ সংরক্ষণ করুন
await saveTextMessage('user_456', 'হ্যালো কেমন আছো?');

// SMS সংরক্ষণ করুন
await saveSMS('+8801234567890', 'গুরুত্বপূর্ণ বার্তা', 'sent');

// স্টেটিস্টিক্স দেখুন
const stats = await getMediaStats();
console.log(`মোট মিডিয়া: ${stats.data.totalFiles}`);
console.log(`স্টোরেজ: ${(stats.data.totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`ফটো: ${stats.data.byType.photo}`);
console.log(`ভিডিও: ${stats.data.byType.video}`);
console.log(`অডিও: ${stats.data.byType.audio}`);
```

---

## 🎨 **UI কম্পোনেন্ট (UI Components)**

### রিঅ্যাকশন বার:
```html
<div class="reaction-bar">
  <div class="react-btn">❤️ 42</div>
  <div class="react-btn">😂 15</div>
  <div class="react-btn">😮 8</div>
  <div class="flower-btn">🌸 3</div>
</div>
```

### শেয়ার মডাল:
```html
<div class="share-modal">
  <div class="modal-card">
    <div style="font-weight:700;margin-bottom:12px;">📤 Share Post</div>
    <div class="share-grid">
      <div class="share-icon">
        <div class="emoji">📋</div>
        <div class="label">Copy Link</div>
      </div>
      <!-- ... more share options ... -->
    </div>
  </div>
</div>
```

### মন্তব্য বক্স:
```html
<div class="comments-wrap">
  <div class="comment">
    <div class="av av-round av-xs">A</div>
    <div>
      <div class="cm-bub">
        <div class="cm-nm">আহমেদ</div>
        <div class="cm-txt">দুর্দান্ত পোস্ট!</div>
      </div>
      <div class="cm-acts">
        <button class="cm-act">💬 Reply</button>
        <button class="cm-act">👍 React</button>
        <button class="cm-act">✏️ Edit</button>
      </div>
    </div>
  </div>
</div>
```

---

## 🔐 **নিরাপত্তা এবং সেরা অনুশীলন**

1. **সর্বদা স্থায়ী**: সমস্ত মিডিয়া এবং ডেটা চিরস্থায়ী (permanent = true)
2. **মুছা যায় না**: একবার সংরক্ষিত হলে মুছতে পারবে না
3. **এনক্রিপশন**: Supabase এবং Mega.nz নেটিভ এনক্রিপশন ব্যবহার করে
4. **ব্যাকআপ**: সমস্ত ডেটা স্বয়ংক্রিয়ভাবে ব্যাকআপ হয়

---

## 🐛 **ট্রাবলশুটিং**

### সমস্যা: স্ক্রিপ্ট লোড না হওয়া
```
সমাধান: নিশ্চিত করুন যে js/advanced-post-interactions.js এবং 
js/media-storage-manager.js ফাইল সঠিক পাথে রয়েছে।
```

### সমস্যা: Supabase সংযোগ ব্যর্থ
```
সমাধান: SUPABASE_URL এবং SUPABASE_KEY পরিবেশ ভেরিয়েবল সেট করুন।
```

### সমস্যা: মিডিয়া আপলোড ধীর
```
সমাধান: ফাইল আকার কমান বা IndexedDB মান বাড়ান।
```

---

## 📚 **API রেফারেন্স**

### Global Functions:
- `toggleFlower(postId, userId, element)` - ফ্লাওয়ার টগল
- `addReaction(postId, emoji, label)` - রিঅ্যাকশন যোগ
- `openCommentBox(postId)` - মন্তব্য বক্স খুলুন
- `submitComment(postId)` - মন্তব্য জমা দিন
- `replyToComment(postId, commentId)` - উত্তর দিন
- `editComment(postId, commentId)` - সম্পাদনা করুন
- `deleteComment(postId, commentId)` - মুছুন
- `sharePost(postId, title)` - শেয়ার করুন
- `uploadPostWithMedia(postData, mediaFiles)` - মিডিয়া সহ পোস্ট

### Storage Functions:
- `saveTextMessage(recipientId, message)` - টেক্সট সংরক্ষণ
- `saveCallRecord(recipientId, callType, duration, url)` - কল সংরক্ষণ
- `saveSMS(phoneNumber, message, direction)` - SMS সংরক্ষণ
- `getPermanentMedia(type)` - স্থায়ী মিডিয়া পান
- `getMediaStats()` - মিডিয়া পরিসংখ্যান

---

## 🚀 **পরবর্তী পদক্ষেপ**

1. ✅ এই ফাইলগুলি আপনার প্রজেক্টে যোগ হয়েছে
2. ⏭️ Supabase এবং Mega.nz API কী কনফিগার করুন
3. ⏭️ ডাটাবেস টেবিল তৈরি করুন (যদি প্রয়োজন হয়)
4. ⏭️ ফিচার পরীক্ষা করুন এবং প্রয়োজন অনুযায়ী কাস্টমাইজ করুন

---

আপনার অ্যাপ্লিকেশন এখন পূর্ণ সোশ্যাল মিডিয়া ইন্টারঅ্যাকশন ফিচার সহ আসে! 🎉

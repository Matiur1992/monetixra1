# Supabase Setup Guide for Monetixra

## 🔌 Supabase সংযোগ সেটআপ

### ধাপ ১: Supabase প্রকল্প তৈরি

1. [Supabase Dashboard](https://app.supabase.com)-এ লগইন করুন
2. "New Project" ক্লিক করুন
3. প্রজেক্টের নাম দিন: `monetixra`
4. Database password সেট করুন (সংরক্ষণ করুন!)
5. Region নির্বাচন করুন: `Southeast Asia (Singapore)` বা কাছাকাছি
6. "Create new project" ক্লিক করুন

### ধাপ ২: API কী সংগ্রহ

প্রজেক্ট ড্যাশবোর্ড থেকে:

1. **Settings** → **API**-তে যান
2. নিচের তথ্য সংরক্ষণ করুন:

```
Project URL: https://xxxxxxxxxxxx.supabase.co
Anon/Public Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (সাবধানে রাখুন!)
```

### ধাপ ৩: Database Schema সেটআপ

**SQL Editor**-এ গিয়ে নিচের কোড রান করুন:

```sql
-- Users table extension
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  points INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  premium_expiry TIMESTAMP,
  streak INTEGER DEFAULT 0,
  last_post_date TIMESTAMP,
  kyc_verified BOOLEAN DEFAULT FALSE,
  badges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT,
  file_url TEXT,
  mime_type TEXT,
  hashtags TEXT[],
  is_premium BOOLEAN DEFAULT FALSE,
  is_nft BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Activity log table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT,
  details JSONB,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT,
  title TEXT,
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Storage bucket and policies for permanent media
-- Use the complete, current setup from supabase_storage_setup.sql.
-- It creates the public `media` bucket and allows the app's anon-key upload flow.

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Posts are viewable by everyone"
  ON public.posts FOR SELECT USING (true);

CREATE POLICY "Users can create posts"
  ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts"
  ON public.posts FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts"
  ON public.posts FOR DELETE USING (auth.uid() = author_id);
```

### ধাপ ৪: index.html-এ Supabase সংযোগ

`index.html`-এ নিচের কনফিগারেশন আপডেট করুন (ইতিমধ্যে করা আছে):

```javascript
// Line ~73-74
const SUPABASE_URL  = 'https://xxxxxxxxxxxx.supabase.co';
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-anon-key';
```

**নিরাপদ রাখতে:** Environment variable ব্যবহার করুন:

```javascript
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fallback.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'fallback-key';
```

### ধাপ ৫: Environment Variables সেটআপ

#### Netlify-এ:
1. Site settings → Environment variables
2. Add variables:
   ```
   SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

#### Cloudflare Pages-এ:
1. Settings → Environment variables
2. Add variables (same as above)

### ধাপ ৬: Storage Bucket কনফিগারেশন

1. **Storage** → **New bucket**
   - Name: `media`
   - Public: ✅ Checked
   - Click "Create bucket"

2. **Policies** সেটআপ:
   ```sql
   -- Allow public read
   CREATE POLICY "Public Read" ON storage.objects
     FOR SELECT USING (bucket_id = 'media');
   
   -- Allow authenticated uploads
   CREATE POLICY "Auth Upload" ON storage.objects
     FOR INSERT TO authenticated 
     WITH CHECK (bucket_id = 'media' AND owner = auth.uid());
   ```

### ✅ যাচাইকরণ

```javascript
// Browser console-এ টেস্ট করুন:
fetch(`${SUPABASE_URL}/rest/v1/posts?select=*&limit=1`, {
  headers: {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
  }
}).then(r => r.json()).then(console.log);
```

### 🔧 সমস্যা সমাধান

| সমস্যা | সমাধান |
|--------|---------|
| "Invalid API key" | Settings → API → Anon key পুনরায় কপি করুন |
| "403 Forbidden" | RLS Policy চেক করুন |
| "Bucket not found" | Storage → Create bucket 'media' |
| "CORS error" | Settings → API → Enable CORS |

### 📞 সাপোর্ট

Supabase ডকুমেন্টেশন: [supabase.com/docs](https://supabase.com/docs)

-- ════════════════════════════════════════════════════════
--  MediaEarn Ultra X — Supabase Database Schema
--  Run this in: supabase.com → SQL Editor → New Query
-- ════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS
create table if not exists public.users (
  id          text primary key,
  name        text not null,
  username    text unique,
  email       text unique,
  phone       text unique,
  password    text,
  bio         text,
  avatar      text,
  cover       text,
  points      bigint default 0,
  is_admin    boolean default false,
  kyc_verified boolean default false,
  verified    boolean default false,
  two_fa      boolean default false,
  disabled    boolean default false,
  deactivated boolean default false,
  tin         jsonb,
  pay_methods jsonb,
  crypto_wallets jsonb,
  privacy_settings jsonb,
  notif_settings jsonb,
  eth_address text,
  sol_address text,
  referred_by text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- POSTS
create table if not exists public.posts (
  id          text primary key,
  author      text references public.users(id) on delete cascade,
  text        text,
  file        text,
  file_type   text,
  tags        text[],
  visibility  text default 'public',
  likes       text[] default '{}',
  views       bigint default 0,
  reports     int default 0,
  hidden      boolean default false,
  copyright   boolean default false,
  chain       text,
  created_at  timestamptz default now()
);

-- MESSAGES
create table if not exists public.messages (
  id          text primary key,
  from_user   text references public.users(id) on delete cascade,
  to_user     text references public.users(id) on delete cascade,
  text        text,
  media       text,
  read        boolean default false,
  deleted_for text[],
  created_at  timestamptz default now()
);

-- TRANSACTIONS
create table if not exists public.transactions (
  id          text primary key,
  user_id     text references public.users(id) on delete cascade,
  type        text,
  label       text,
  pts         bigint,
  admin_cut   int default 0,
  created_at  timestamptz default now()
);

-- WITHDRAWALS
create table if not exists public.withdrawals (
  id          text primary key,
  user_id     text references public.users(id) on delete cascade,
  amount      bigint,
  method      text,
  account     text,
  status      text default 'pending',
  approved_at timestamptz,
  rejected_at timestamptz,
  created_at  timestamptz default now()
);

-- NOTIFICATIONS
create table if not exists public.notifications (
  id          text primary key,
  to_user     text references public.users(id) on delete cascade,
  type        text,
  icon        text,
  msg         text,
  read        boolean default false,
  created_at  timestamptz default now()
);

-- NFTs
create table if not exists public.nfts (
  id          text primary key,
  name        text,
  description text,
  image       text,
  creator     text references public.users(id),
  owner       text references public.users(id),
  price       bigint,
  eth_price   text,
  chain       text default 'platform',
  sold        boolean default false,
  pending_approval boolean default true,
  views       bigint default 0,
  created_at  timestamptz default now()
);

-- FOLLOWS
create table if not exists public.follows (
  follower_id text references public.users(id) on delete cascade,
  following_id text references public.users(id) on delete cascade,
  created_at  timestamptz default now(),
  primary key (follower_id, following_id)
);

-- COMMENTS
create table if not exists public.comments (
  id          text primary key,
  post_id     text references public.posts(id) on delete cascade,
  author      text references public.users(id) on delete cascade,
  text        text,
  created_at  timestamptz default now()
);

-- KYC
create table if not exists public.kyc_submissions (
  id          text primary key,
  user_id     text references public.users(id) on delete cascade,
  nid         text,
  full_name   text,
  dob         text,
  status      text default 'pending',
  submitted_at timestamptz default now(),
  reviewed_at  timestamptz
);

-- PUSH SUBSCRIPTIONS
create table if not exists public.push_subscriptions (
  user_id     text primary key references public.users(id) on delete cascade,
  subscription jsonb,
  created_at  timestamptz default now()
);

-- Row Level Security (RLS) — basic
alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.messages enable row level security;

-- Public read for posts and users
create policy "Public posts read" on public.posts for select using (not hidden);
create policy "Public users read" on public.users for select using (not deactivated and not disabled);

-- Service role full access (for server.js)
create policy "Service full access users"   on public.users    for all using (true);
create policy "Service full access posts"   on public.posts    for all using (true);
create policy "Service full access msgs"    on public.messages for all using (true);
create policy "Service full access txs"     on public.transactions for all using (true);
create policy "Service full access wd"      on public.withdrawals  for all using (true);
create policy "Service full access notifs"  on public.notifications for all using (true);
create policy "Service full access nfts"    on public.nfts         for all using (true);
create policy "Service full access follows" on public.follows       for all using (true);
create policy "Service full access kyc"     on public.kyc_submissions for all using (true);

-- Indexes for performance
create index if not exists idx_posts_author    on public.posts(author);
create index if not exists idx_posts_created   on public.posts(created_at desc);
create index if not exists idx_messages_from   on public.messages(from_user);
create index if not exists idx_messages_to     on public.messages(to_user);
create index if not exists idx_txs_user        on public.transactions(user_id);
create index if not exists idx_notifs_to       on public.notifications(to_user);
create index if not exists idx_follows_follower on public.follows(follower_id);
create index if not exists idx_follows_following on public.follows(following_id);

-- Done!
select 'MediaEarn Supabase Schema Created! ✅' as status;

-- Monetixra Supabase Fix / Upgrade
-- Run in Supabase Dashboard > SQL Editor when public.users is missing or policies fail.

create extension if not exists "uuid-ossp";

create table if not exists public.users (
  id text primary key,
  name text not null default 'User',
  username text unique,
  email text unique,
  phone text unique,
  password text,
  bio text,
  avatar text,
  cover text,
  points bigint default 0,
  is_admin boolean default false,
  kyc_verified boolean default false,
  verified boolean default false,
  two_fa boolean default false,
  disabled boolean default false,
  deactivated boolean default false,
  tin jsonb,
  pay_methods jsonb,
  crypto_wallets jsonb,
  privacy_settings jsonb,
  notif_settings jsonb,
  eth_address text,
  sol_address text,
  referred_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.posts (
  id text primary key,
  author text references public.users(id) on delete cascade,
  text text,
  file text,
  file_type text,
  tags text[] default '{}',
  visibility text default 'public',
  likes text[] default '{}',
  views bigint default 0,
  reports int default 0,
  hidden boolean default false,
  copyright boolean default false,
  chain text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.messages (
  id text primary key,
  from_user text references public.users(id) on delete cascade,
  to_user text references public.users(id) on delete cascade,
  text text,
  media text,
  read boolean default false,
  deleted_for text[] default '{}',
  deleted_everyone boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.transactions (
  id text primary key,
  user_id text references public.users(id) on delete cascade,
  type text,
  label text,
  pts bigint,
  admin_cut int default 0,
  created_at timestamptz default now()
);

create table if not exists public.withdrawals (
  id text primary key,
  user_id text references public.users(id) on delete cascade,
  amount bigint not null,
  method text not null,
  account text not null,
  status text default 'pending',
  approved_at timestamptz,
  rejected_at timestamptz,
  admin_note text,
  created_at timestamptz default now()
);

create table if not exists public.media_objects (
  id text primary key,
  user_id text references public.users(id) on delete set null,
  post_id text references public.posts(id) on delete set null,
  provider text default 'local',
  url text,
  mime text,
  size bigint default 0,
  created_at timestamptz default now()
);

create table if not exists public.live_events (
  id text primary key,
  post_id text references public.posts(id) on delete cascade,
  streamer_id text references public.users(id) on delete cascade,
  status text default 'live',
  recording_url text,
  started_at timestamptz default now(),
  ended_at timestamptz
);

create table if not exists public.notifications (
  id text primary key,
  to_user text references public.users(id) on delete cascade,
  type text,
  icon text,
  msg text,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.nfts (
  id text primary key,
  name text,
  description text,
  image text,
  creator text references public.users(id),
  owner text references public.users(id),
  price bigint,
  eth_price text,
  chain text default 'platform',
  sold boolean default false,
  pending_approval boolean default true,
  views bigint default 0,
  created_at timestamptz default now()
);

create table if not exists public.follows (
  follower_id text references public.users(id) on delete cascade,
  following_id text references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.messages enable row level security;
alter table public.transactions enable row level security;
alter table public.withdrawals enable row level security;
alter table public.notifications enable row level security;
alter table public.nfts enable row level security;
alter table public.follows enable row level security;
alter table public.media_objects enable row level security;
alter table public.live_events enable row level security;

drop policy if exists "Public users read" on public.users;
drop policy if exists "Public posts read" on public.posts;
drop policy if exists "Service full access users" on public.users;
drop policy if exists "Service full access posts" on public.posts;
drop policy if exists "Service full access msgs" on public.messages;
drop policy if exists "Service full access txs" on public.transactions;
drop policy if exists "Service full access wd" on public.withdrawals;
drop policy if exists "Service full access notifs" on public.notifications;
drop policy if exists "Service full access nfts" on public.nfts;
drop policy if exists "Service full access follows" on public.follows;
drop policy if exists "Service full access media" on public.media_objects;
drop policy if exists "Service full access live" on public.live_events;

create policy "Public users read" on public.users for select using (not deactivated and not disabled);
create policy "Public posts read" on public.posts for select using (not hidden);
create policy "Service full access users" on public.users for all using (true) with check (true);
create policy "Service full access posts" on public.posts for all using (true) with check (true);
create policy "Service full access msgs" on public.messages for all using (true) with check (true);
create policy "Service full access txs" on public.transactions for all using (true) with check (true);
create policy "Service full access wd" on public.withdrawals for all using (true) with check (true);
create policy "Service full access notifs" on public.notifications for all using (true) with check (true);
create policy "Service full access nfts" on public.nfts for all using (true) with check (true);
create policy "Service full access follows" on public.follows for all using (true) with check (true);
create policy "Service full access media" on public.media_objects for all using (true) with check (true);
create policy "Service full access live" on public.live_events for all using (true) with check (true);

create index if not exists idx_posts_author on public.posts(author);
create index if not exists idx_posts_created on public.posts(created_at desc);
create index if not exists idx_messages_pair on public.messages(from_user, to_user, created_at desc);
create index if not exists idx_txs_user on public.transactions(user_id, created_at desc);
create index if not exists idx_withdrawals_status on public.withdrawals(status, created_at desc);
create index if not exists idx_notifs_to on public.notifications(to_user, created_at desc);
create index if not exists idx_live_status on public.live_events(status, started_at desc);

select 'Monetixra Supabase fix applied' as status;

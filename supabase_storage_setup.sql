-- Monetixra permanent media storage setup
-- Run this in Supabase Dashboard -> SQL Editor after creating the project.

-- 1) Create the public media bucket used by index.html uploadToSupabase().
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  104857600,
  array[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'audio/mpeg',
    'audio/mp4',
    'audio/ogg',
    'audio/wav',
    'audio/webm',
    'application/json'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) Public read is required because post media is rendered from
-- /storage/v1/object/public/media/<path>.
drop policy if exists "Monetixra public media read" on storage.objects;
create policy "Monetixra public media read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'media');

-- 3) Client-side uploads currently use the public anon key, so anon insert/update
-- must be allowed. For a stricter production setup, move uploads behind server.js
-- with a service-role key and remove anon write access.
drop policy if exists "Monetixra anon media upload" on storage.objects;
create policy "Monetixra anon media upload"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'media');

drop policy if exists "Monetixra anon media upsert" on storage.objects;
create policy "Monetixra anon media upsert"
on storage.objects
for update
to anon, authenticated
using (bucket_id = 'media')
with check (bucket_id = 'media');

select 'Monetixra media bucket and policies ready' as status;

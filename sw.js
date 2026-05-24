// ============================================================
//  Monetixra — Enhanced Service Worker (PWA)
//  Offline support + Push Notifications + Background Sync
// ============================================================
const CACHE_NAME = 'monetixra-v5';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

const CDN_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Outfit:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap',
  'https://cdn.socket.io/4.7.5/socket.io.min.js',
  'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js',
];

const ASSETS = [...STATIC_ASSETS, ...CDN_ASSETS];

// Install: cache essential assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => {
      return Promise.allSettled(ASSETS.map(url => c.add(url).catch(() => {})));
    }).then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for API, cache-first for assets
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // API calls: always network
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/socket.io/')) {
    return e.respondWith(fetch(e.request).catch(() => new Response(
      JSON.stringify({ error: 'Offline' }), { headers: { 'Content-Type': 'application/json' } }
    )));
  }

  // Navigation: network-first, fallback to cached index.html
  if (e.request.mode === 'navigate') {
    return e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() => caches.match('/index.html'))
    );
  }

  // Images and media thumbnails: stale-while-revalidate for faster mobile repeat views
  if (e.request.destination === 'image' || /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(url.pathname)) {
    return e.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(e.request).then(cached => {
          const fresh = fetch(e.request).then(response => {
            if(response && response.status === 200) cache.put(e.request, response.clone());
            return response;
          }).catch(() => cached);
          return cached || fresh;
        })
      )
    );
  }

  // Assets: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});

// Push notification handler
self.addEventListener('push', e => {
  const data = e.data?.json() || { title: 'MediaEarn', body: 'You have a new notification!' };
  e.waitUntil(
    self.registration.showNotification(data.title || 'MediaEarn Ultra X', {
      body:    data.body || '',
      icon:    '/icon-192.png',
      badge:   '/icon-72.png',
      tag:     data.tag || 'mediaearn',
      data:    data.url || '/',
      actions: data.actions || [],
      vibrate: [200, 100, 200],
    })
  );
});

// Notification click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data || '/';
  e.waitUntil(
    clients.matchAll({ type:'window' }).then(list => {
      for (const c of list) {
        if (c.url === url && 'focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

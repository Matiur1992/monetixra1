// ============================================================
//  MediaEarn Ultra X — Service Worker (PWA)
//  Offline support + Cache-first strategy
// ============================================================
const CACHE_NAME = 'monetixra-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Outfit:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap',
  'https://cdn.socket.io/4.7.5/socket.io.min.js',
];

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
      fetch(e.request).catch(() => caches.match('/index.html'))
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

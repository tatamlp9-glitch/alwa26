// يخلي النظام يفتح حتى بدون إنترنت (بعد أول فتح). بيانات Firebase تبقى خارج الكاش.
const V = 'alwa-v1';
const CDN = ['www.gstatic.com','cdn.tailwindcss.com','cdnjs.cloudflare.com','cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com','unpkg.com'];
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const same = u.origin === location.origin, cdn = CDN.includes(u.hostname);
  if (!same && !cdn) return;               // Firestore / Auth يروحون مباشرة للإنترنت
  if (same) {                               // ملفات الموقع: الأحدث أولاً، والكاش عند انقطاع النت
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(V).then(ch => ch.put(r, c)); return res; }).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
  } else {                                  // مكتبات خارجية: من الكاش فوراً وتتحدث بالخلفية
    e.respondWith(caches.match(r).then(m => { const f = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(V).then(ch => ch.put(r, c)); } return res; }).catch(() => m); return m || f; }));
  }
});

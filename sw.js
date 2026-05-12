const CACHE_NAME = 'kmz-viewer-v17';
const STATIC_ASSETS = [
  './index.html',
  './manifest.json',
  'https://unpkg.com/jszip@3.10.1/dist/jszip.min.js'
];

// 설치: 정적 파일 캐시
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// 활성화: 이전 캐시 삭제
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    return; // 🔥 중요
  }
  if (e.request.url.includes('kakao.com')) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});


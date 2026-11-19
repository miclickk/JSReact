import { precacheAndRoute, cleanupOutdatedCaches, matchPrecache } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-assets-${CACHE_VERSION}`;
const API_CACHE = `public-api-${CACHE_VERSION}`;

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener('install', () => {
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  const validCaches = [STATIC_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              (key.startsWith('static-assets-') || key.startsWith('public-api-')) &&
              !validCaches.includes(key)
          )
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

registerRoute(
  ({ request }) =>
    request.destination === 'image' || request.destination === 'font',
  new CacheFirst({
    cacheName: STATIC_CACHE,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
      }),
    ],
  })
);

// 3. Стратегия Network-First: публичное API (кроме Firebase/авторизации)
registerRoute(
  ({ url, request }) => {
    if (request.method !== 'GET') return false;
    // Не кэшируем Firebase Auth, токены и приватные запросы
    if (
      url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') ||
      request.headers.has('Authorization')
    ) {
      return false;
    }
    return url.hostname.includes('jsonplaceholder.typicode.com') || url.pathname.startsWith('/api/');
  },
  new NetworkFirst({
    cacheName: API_CACHE,
    networkTimeoutSeconds: 5,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 24 * 60 * 60, // 24 часа
      }),
    ],
  })
);

setCatchHandler(async ({ request }) => {
  if (request.destination === 'document') {
    const offlinePage = await matchPrecache('offline.html');
    if (offlinePage) return offlinePage;
  }
  return Response.error();
});
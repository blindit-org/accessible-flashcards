const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './',  // The root of your site relative to the service worker
  './index.html',
  './styles.css',
  './script.js',
  './json/sfintromod2/Flashcards-Opportunities-Let\'s-Sell-Something-with-Products-and-Price-Books.json',
  // Add other files as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Serve from cache if available
        }
        return fetch(event.request); // Fetch from network if not in cache
      })
  );
});

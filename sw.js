const CACHE_NAME = 'willnapolini-cache-v1';
const urlsToCache = [
  '/thyshop.github.io/',
  '/thyshop.github.io/index.html',
  '/thyshop.github.io/assets/css/style.css',
  '/thyshop.github.io/assets/js/main.js',
  '/thyshop.github.io/assets/icons/icon-192x192.png',
  '/thyshop.github.io/assets/icons/icon-512x512.png',
  '/thyshop.github.io/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://unpkg.com/lucide@latest',
  // Add your blog post and shop item images here dynamically if possible, or list them manually
  // For example:
  '/thyshop.github.io/assets/images/default-blog-image.jpg',
  '/thyshop.github.io/assets/images/default-shop-image.jpg',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2615',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2672',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2670',
  'https://avatars.githubusercontent.com/u/192521042?v=4'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



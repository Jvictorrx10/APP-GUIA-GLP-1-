// Service Worker para cache de assets estáticos
const CACHE_NAME = 'glp1-natural-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './assets/css/global.css',
  './assets/js/app.js',
  './assets/js/localState.js',
  './manifest.webmanifest'
];

// Instalar SW e cachear assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativar SW e limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar requests e servir do cache quando offline
self.addEventListener('fetch', event => {
  // Apenas cachear requests GET para assets estáticos
  if (event.request.method !== 'GET') return;
  
  // Ignorar requests externos
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retornar do cache se disponível
        if (response) {
          return response;
        }
        
        // Tentar buscar da rede
        return fetch(event.request)
          .then(response => {
            // Não cachear se não for uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar a resposta para cachear
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Se offline e não está no cache, retornar página principal para SPA
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
      })
  );
});


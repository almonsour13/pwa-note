const CACHE_NAME = 'note-app';

self.addEventListener('install', (event) => {
    console.log('install event');
    event.waitUntil((async () => {
        try {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll([
                '/',
                './index.html',
                './manifest.json',
                './assets/js/main.js',
                './assets/js/modal.js',
                './assets/js/note.js',
                './assets/js/firebaseConfig.js',
                './assets/js/dataController.js',
                './assets/js/componenents/cards.js',
                './assets/js/componenents/header.js',
                './assets/js/form/auth.js',
                './assets/js/form/login.js',
                './assets/js/masonry/masonry.pkgd.min.js',
                './assets/css/style.css',
                './assets/bootstrap-5.3.3-dist/css/bootstrap.min.css',
                './assets/bootstrap-5.3.3-dist/js/bootstrap.bundle.js',
                './assets/images/icon.png'
            ]);
            console.log('Assets added to cache');
        } catch (error) {
            console.error('Cache addAll failed:', error);
        }
    })());
});

self.addEventListener('activate', event => {
    console.log("Version 1 now ready to handle fetches");
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        // Only cache GET requests
        if (event.request.method !== 'GET') {
            return fetch(event.request);
        }

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                const fetchResponse = await fetch(event.request);
                // Cache only the response data, not the entire response object
                const responseToCache = fetchResponse.clone();
                cache.put(event.request, responseToCache);
                return fetchResponse;
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally, you could return a fallback response here
            }
        }
    })());
});


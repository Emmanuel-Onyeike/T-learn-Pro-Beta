/**
 * T-Learn Pro — Service Worker
 * Handles offline caching for fast reloads
 */

const CACHE_NAME = 'tlearnpro-v4';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// Assets to cache immediately on install
const STATIC_ASSETS = [
    '/pages/dashboard.html',
    '/pages/login.html',
    '/pages/register.html',
    '/js/tailwind.js',
    '/js/config.js',
    '/js/supabase-loader.js',
    '/js/auth-state.js',
    '/js/auth.js',
    '/js/dashboard.js',
    '/js/curriculum.js',
    '/js/history.js',
    '/js/messages.js',
    '/js/utilities.js',
    '/js/modules/overview.js',
    '/js/modules/lms.js',
    '/js/modules/settings.js',
    '/js/modules/ui.js',
    '/js/modules/proj.js',
    '/js/views/overview.js',
    '/js/views/lessons.js',
    '/js/views/leaderboard.js',
    '/js/views/projects-view.js',
    '/js/views/settings.js',
    '/assets/Logo.webp',
    '/favicon.ico',
];

// Install — cache all static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' }))))
            .then(() => self.skipWaiting())
            .catch(err => console.warn('[SW] Cache install partial fail:', err))
    );
});

// Activate — delete old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch — serve from cache, update in background (stale-while-revalidate)
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Never cache Supabase API calls or external services
    if (
        url.hostname.includes('supabase.co') ||
        url.hostname.includes('paystack') ||
        url.hostname.includes('jivosite') ||
        url.hostname.includes('anthropic') ||
        url.pathname.includes('/auth/') ||
        event.request.method !== 'GET'
    ) {
        return; // Let browser handle normally
    }

    // For HTML pages: network first, fallback to cache
    if (event.request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // For JS/CSS/images: cache first, then update background
    event.respondWith(
        caches.match(event.request).then(cached => {
            const networkFetch = fetch(event.request).then(response => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
            return cached || networkFetch;
        })
    );
});

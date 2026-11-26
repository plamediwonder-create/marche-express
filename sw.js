/* Marché Express : service worker (version 3)
   - Garde l'INTERFACE en cache (jamais les données privées : commandes, messages, comptes).
   - L'application s'ouvre toujours depuis le cache, puis se met à jour en arrière-plan :
     une connexion lente ou instable ne peut plus afficher « Vous êtes hors connexion ».
   - La page offline.html n'est montrée que s'il n'y a RIEN en cache ET que le réseau a échoué
     deux fois de suite ; elle vérifie elle-même la connexion et rouvre l'application toute seule.
   À CHAQUE MISE EN LIGNE : changez VERSION ci-dessous. */
'use strict';
const VERSION = '7';
const SHELL_CACHE = 'mx-shell-v' + VERSION;
const LIB_CACHE = 'mx-lib-v1';                      /* bibliothèques externes à version fixe */
const ROOT = new URL('./', self.registration.scope).href;
const CORE = [ROOT, 'tokens.css', 'app.css', 'textes.js', 'offline.html'];      /* obligatoires */
const EXTRA = ['manifest.json', 'favicon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  'fonts/inter-400.woff', 'fonts/inter-500.woff', 'fonts/inter-700.woff'];     /* facultatifs */
const NAV_TIMEOUT = 8000;

const abs = (u) => new URL(u, self.registration.scope).href;
function timed(req, ms) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  return fetch(req, { signal: ac.signal }).finally(() => clearTimeout(t));
}
/* une réponse « redirigée » ne peut pas servir une navigation : on la recopie */
async function clean(res) {
  if (!res.redirected) return res;
  return new Response(await res.blob(), { status: res.status, statusText: res.statusText, headers: res.headers });
}

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL_CACHE);
    await Promise.all(CORE.map(async (u) => {
      const r = await fetch(new Request(abs(u), { cache: 'reload' }));
      if (!r.ok) throw new Error('precache ' + u + ' ' + r.status);
      await c.put(abs(u), await clean(r));
    }));
    await Promise.allSettled(EXTRA.map(async (u) => {
      const r = await fetch(new Request(abs(u), { cache: 'reload' }));
      if (r.ok) await c.put(abs(u), r);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keep = [SHELL_CACHE, LIB_CACHE];
    for (const k of await caches.keys()) if (keep.indexOf(k) < 0) await caches.delete(k);
    if (self.registration.navigationPreload) { try { await self.registration.navigationPreload.disable(); } catch (x) {} }
    await self.clients.claim();
  })());
});

async function tellClients(msg) {
  for (const c of await self.clients.matchAll({ type: 'window' })) c.postMessage(msg);
}

/* Télécharge la version à jour et la range ; prévient la page si le contenu a changé. */
async function revalidate(url, cache, announce) {
  try {
    const res = await timed(new Request(url, { cache: 'no-cache' }), 15000);
    if (!res || !res.ok) return null;
    const fresh = await clean(res);
    if (announce) {
      const old = await cache.match(url);
      if (old) {
        const a = await old.clone().text(), b = await fresh.clone().text();
        if (a !== b) tellClients({ type: 'shell-updated' });
      }
    }
    await cache.put(url, fresh.clone());
    return fresh;
  } catch (x) { return null; }
}

async function handleNavigation(e) {
  const cache = await caches.open(SHELL_CACHE);
  const reqUrl = new URL(e.request.url);
  if (/\/offline\.html$/.test(reqUrl.pathname)) {
    return (await cache.match(abs('offline.html'))) || fetch(e.request);
  }
  const cached = await cache.match(ROOT);
  if (cached) {                                  /* 1. depuis le cache, toujours : démarrage instantané */
    e.waitUntil(revalidate(ROOT, cache, true));  /*    puis mise à jour en arrière-plan */
    return cached;
  }
  /* 2. premier lancement sans cache : réseau, avec un second essai avant d'abandonner */
  let res = null;
  for (let i = 0; i < 2 && !res; i++) {
    try {
      const r = await timed(new Request(ROOT, { cache: i ? 'reload' : 'default' }), NAV_TIMEOUT);
      if (r && r.ok) res = await clean(r);
    } catch (x) { /* nouvel essai */ }
  }
  if (res) { e.waitUntil(cache.put(ROOT, res.clone())); return res; }
  return (await cache.match(abs('offline.html'))) ||
    new Response('Hors connexion', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.searchParams.has('probe')) return;                       /* test de connexion : toujours le réseau */

  if (req.mode === 'navigate') {
    if (url.origin === self.location.origin) e.respondWith(handleNavigation(e));
    return;
  }

  if (url.origin === self.location.origin) {
    const path = url.pathname.slice(self.registration.scope.length - self.location.origin.length);
    if (!path || /^(?:\.\.|sw\.js$)/.test(path)) return;
    const stable = /^(?:fonts\/|icon-|apple-touch|favicon|logo|splash\/)/.test(path);
    e.respondWith((async () => {
      const cache = await caches.open(SHELL_CACHE);
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) {
        if (!stable) e.waitUntil(revalidate(req.url, cache, false));
        return hit;
      }
      const res = await timed(req, 15000);
      if (res && res.ok) e.waitUntil(cache.put(req, res.clone()));
      return res;
    })());
    return;
  }

  /* bibliothèque Supabase (version fixe) : gardée pour que l'application démarre même si le CDN est lent */
  if (url.hostname === 'cdn.jsdelivr.net' && /\/npm\/@supabase\/supabase-js@\d/.test(url.pathname)) {
    e.respondWith((async () => {
      const cache = await caches.open(LIB_CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) e.waitUntil(cache.put(req, res.clone()));
      return res;
    })());
  }
  /* tout le reste (API Supabase, photos…) passe directement par le réseau : rien de privé n'est gardé */
});

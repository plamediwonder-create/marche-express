// Marché Express : service worker.
// - Met en cache UNIQUEMENT l'interface (liste blanche ci-dessous : logo, icônes, page hors connexion, bibliothèque).
// - Ne met JAMAIS rien d'autre en cache : commandes, messages, profil, adresses, produits et toutes les
//   requêtes vers Supabase passent directement par internet (ce fichier ne les touche pas).
// - Mise à jour automatique : ce fichier change => nouvelle version installée et active au lancement suivant.
//   Les pages sont toujours demandées à internet d'abord : la dernière version publiée s'affiche au lancement.
var VERSION = 'v2';
var CACHE = 'marche-express-ui-' + VERSION;
var LOCAL = ['offline.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon.svg', 'logo-nom-horizontal.png'];
var CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) {
        return Promise.all(LOCAL.map(function (u) { return c.add(u).catch(function () {}); }))
          .then(function () { return c.add(new Request(CDN, { mode: 'no-cors' })).catch(function () {}); });
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.navigationPreload ? self.registration.navigationPreload.enable() : null; })
      .then(function () { return self.clients.claim(); })
  );
});

function isUiAsset(url) {
  if (url.href === CDN) return true;
  if (url.origin !== location.origin) return false;
  var name = url.pathname.replace(/^.*\//, '');
  return LOCAL.indexOf(name) >= 0;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Ouverture de l'application : internet d'abord (dernière version), sinon page « hors connexion »
  if (req.mode === 'navigate') {
    e.respondWith(
      Promise.resolve(e.preloadResponse).then(function (pre) { return pre || fetch(req); })
        .catch(function () { return caches.match('offline.html'); })
    );
    return;
  }

  // Interface : rapide depuis le cache, rafraîchie en arrière-plan pour le lancement suivant
  if (isUiAsset(url)) {
    e.respondWith(
      caches.open(CACHE).then(function (c) {
        return c.match(req).then(function (hit) {
          var net = fetch(req).then(function (res) {
            if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
            return res;
          }).catch(function () { return hit; });
          return hit || net;
        });
      })
    );
  }
  // Tout le reste (Supabase, données privées) : aucun traitement, aucun cache.
});
const cacheName = "jinkaCache-v4";

const jinka_assets = [
  "/css/main.css",
  "/js/functions.js",
  "/index.html",
  "/about.html",
];

self.addEventListener("install", (e) => {
  console.log("Service Worker: Yuppiee! I am installed. :P");

  // CREATE CACHE
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log(
          "Service Worker: Adding Jinka assets to Jinka Cache in Browser"
        );
        cache.addAll(jinka_assets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Yuppiee! I am activated too. :D");

  // REMOVE UNWANTED CACHES
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing unwanted caches");
            caches.delete(cache);
          }
        });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching...");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

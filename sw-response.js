const cacheName = "jinkaCache-response-v1";

self.addEventListener("install", (e) => {
  console.log("Service Worker: Yuppiee! I am installed. :P");
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
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(cacheName).then((cache) => {
          console.log(
            "Service Worker: Adding responses to Jinka Cache in Browser"
          );
          cache.put(e.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(e.request).then((response) => response))
  );
});

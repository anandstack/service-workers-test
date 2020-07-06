console.log("Main.js is loaded");
const serviceWorkerLocation = "sw.js";

if (navigator.serviceWorker) {
  console.log("Service Worker supported");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        console.log(
          "Unregistering all existing Service Workers - " + registrations.length
        );
        for (let registration of registrations) {
          console.log("Unregistering a Service Worker");
          console.log(registration);
          registration.unregister();
        }
      })
      .then(() => {
        /*navigator.serviceWorker
          .register(serviceWorkerLocation)
          .then((reg) => {
            console.log("A new Service Worker is registered.");
            console.log(reg);
          })
          .catch((err) => {
            console.log("Error while registering new Service Worker");
            console.log(err);
          });*/

        // REMOVE UNWANTED CACHES
        caches.keys().then((cacheNames) => {
          cacheNames.map((cache) => {
            console.log("Service Worker: Clearing unwanted caches");
            caches.delete(cache);
          });
        });
      })
      .catch(function (err) {
        console.log("Service Worker un-registration failed: ", err);
      });
  });
} else console.log("No support for Service Worker.");

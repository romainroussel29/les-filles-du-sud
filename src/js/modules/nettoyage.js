// L'ancienne version du site installait un service worker (sw.js) qui gardait des fichiers en cache.
// Il est désinscrit ici pour que les visiteurs déjà venus reçoivent bien les nouvelles pages.

export function cleanUpLegacy() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => registrations.forEach((registration) => registration.unregister()))
    .catch(() => {});
  if ('caches' in window) {
    caches
      .keys()
      .then((keys) => keys.filter((key) => key.startsWith('vds-')).forEach((key) => caches.delete(key)))
      .catch(() => {});
  }
}

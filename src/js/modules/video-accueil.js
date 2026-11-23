// Vidéo de l'accueil. La photo (poster) s'affiche tout de suite ; la vidéo n'est chargée qu'ensuite,
// dans la taille adaptée à l'écran, et jamais si l'on préfère réduire les animations ou économiser ses données.

import { prefersReducedMotion } from './utils.js';

export function initHeroVideo() {
  const video = document.querySelector('[data-hero-video]');
  if (!video || prefersReducedMotion() || navigator.connection?.saveData) return;

  const start = () => {
    const small = window.matchMedia('(max-width: 768px)').matches;
    video.muted = true;
    video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
    video.src = small ? video.dataset.srcSmall : video.dataset.srcLarge;
    video.play().catch(() => {
      /* lecture automatique refusée : la photo reste affichée */
    });
  };

  // Après le premier affichage, pour ne pas ralentir le chargement de la page
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

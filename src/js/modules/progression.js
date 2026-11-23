// Barre de lecture en haut de l'écran. Animée en CSS pur (animation-timeline) quand le navigateur
// le permet ; sinon, mise à jour ici à chaque image pendant le défilement.

export function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar || CSS.supports('animation-timeline: scroll()')) return;

  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    });
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

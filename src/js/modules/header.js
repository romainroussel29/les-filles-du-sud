// En-tête : passe en fond plein quand on défile (pages à grande photo) et menu mobile.

const SCROLL_OFFSET = 40;
const TABLET = window.matchMedia('(max-width: 1020px)');

export function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  if (header.hasAttribute('data-transparent')) {
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > SCROLL_OFFSET);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  const toggle = header.querySelector('[data-menu-toggle]');
  if (!toggle) return;

  const setOpen = (open) => {
    header.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-menu-open')));
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-menu-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  // Un lien du menu vers une ancre de la même page referme le menu
  header.querySelector('#menu-principal')?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  TABLET.addEventListener('change', () => setOpen(false));
}

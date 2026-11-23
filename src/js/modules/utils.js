// Petites fonctions partagées.

// Le formateur est créé une seule fois : Intl.NumberFormat est coûteux à instancier.
const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export const formatPrice = (amount) => priceFormatter.format(amount);

export const pluralize = (count, singular, plural = `${singular}s`) => (count > 1 ? plural : singular);

/** Échappe un texte avant de l'insérer dans du HTML. */
export const escapeHtml = (text) =>
  String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Icône du sprite SVG. */
export const icon = (name, className = 'icon') =>
  `<svg class="${className}" aria-hidden="true"><use href="/assets/icons/sprite.svg#${name}"></use></svg>`;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Prépare une boîte de dialogue native <dialog> : bouton de fermeture [data-dialog-close]
 * et clic sur le fond. `onRequestClose` peut refuser la fermeture en renvoyant false.
 */
export function setupDialog(dialog, onRequestClose = () => true) {
  const close = () => {
    if (onRequestClose() !== false) dialog.close();
  };
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-dialog-close]')) close();
  });
  // Touche Échap : le navigateur ferme la fenêtre, sauf si on l'en empêche.
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
}

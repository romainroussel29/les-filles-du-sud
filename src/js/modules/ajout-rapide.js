// Bouton « + » des cartes produit : ajoute directement les pièces en taille unique,
// sinon déplie le choix de la taille sur la photo.

import { openCart } from './panier.js';
import { addLine, readProduct } from './panier-store.js';
import { escapeHtml } from './utils.js';

let panelCount = 0;

function closePanel(card) {
  const panel = card.querySelector('.product-card__sizes');
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  card.querySelector('[data-quick-add]').setAttribute('aria-expanded', 'false');
}

function togglePanel(card, button, product, sizes) {
  let panel = card.querySelector('.product-card__sizes');
  if (!panel) {
    panel = document.createElement('div');
    panel.className = 'product-card__sizes';
    panel.id = `tailles-${++panelCount}`;
    panel.setAttribute('role', 'group');
    panel.setAttribute('aria-label', `Choisir une taille pour ${product.name}`);
    panel.hidden = true;
    panel.innerHTML = sizes
      .map((size) => `<button type="button" data-size="${escapeHtml(size)}">${escapeHtml(size)}</button>`)
      .join('');
    button.before(panel);
    button.setAttribute('aria-controls', panel.id);
  }
  const open = panel.hidden;
  panel.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
  if (open) panel.querySelector('button')?.focus();
}

export function initQuickAdd() {
  document.addEventListener('click', (event) => {
    const card = event.target.closest('[data-product-card]');

    // Clic ailleurs : on referme les choix de taille ouverts
    for (const openCard of document.querySelectorAll('[data-product-card]')) {
      if (openCard !== card) closePanel(openCard);
    }
    if (!card) return;

    const { product, sizes } = readProduct(card);
    const sizeButton = event.target.closest('[data-size]');
    if (sizeButton) {
      addLine(product, sizeButton.dataset.size);
      closePanel(card);
      openCart();
      return;
    }

    const addButton = event.target.closest('[data-quick-add]');
    if (!addButton) return;
    if (sizes.length === 1) {
      addLine(product, sizes[0]);
      openCart();
    } else {
      togglePanel(card, addButton, product, sizes);
    }
  });

  // Le choix de taille se referme quand la souris quitte la carte, ou avec Échap
  document.addEventListener('mouseout', (event) => {
    const card = event.target.closest?.('[data-product-card]');
    if (card && !card.contains(event.relatedTarget)) closePanel(card);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const card = event.target.closest?.('[data-product-card]');
    if (card) {
      closePanel(card);
      card.querySelector('[data-quick-add]')?.focus();
    }
  });
}

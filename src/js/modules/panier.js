// Panier en tiroir latéral (<dialog id="panier"> présent dans chaque page), compteur de l'en-tête.

import { openCheckout } from './commande.js';
import { FREE_SHIPPING_THRESHOLD } from './config.js';
import { changeQuantity, getCart, subscribe } from './panier-store.js';
import { escapeHtml, formatPrice, icon, pluralize, setupDialog } from './utils.js';

let dialog = null;

export function openCart() {
  if (!dialog) return;
  renderDrawer(getCart());
  if (!dialog.open) dialog.showModal();
}

export function closeCart() {
  dialog?.close();
}

function renderCounts({ count }) {
  for (const element of document.querySelectorAll('[data-cart-count]')) element.textContent = String(count);
  for (const button of document.querySelectorAll('[data-cart-open]')) {
    button.setAttribute('aria-label', `Ouvrir le panier, ${count} ${pluralize(count, 'article')}`);
  }
}

function lineTemplate(line) {
  const name = escapeHtml(line.name);
  return `
    <li class="cart-line">
      <a href="${escapeHtml(line.url)}" class="cart-line__media" tabindex="-1" aria-hidden="true">
        <img class="media" src="${escapeHtml(line.image)}" alt="" width="84" height="112" loading="lazy" decoding="async">
      </a>
      <div>
        <p class="cart-line__name"><a href="${escapeHtml(line.url)}">${name}</a></p>
        <p class="cart-line__detail">${escapeHtml(line.color)} · ${escapeHtml(line.size)}</p>
        <div class="quantity">
          <button type="button" data-quantity="-1" data-key="${escapeHtml(line.key)}" aria-label="Retirer un exemplaire de ${name}">−</button>
          <output aria-live="polite">${line.quantity}</output>
          <button type="button" data-quantity="1" data-key="${escapeHtml(line.key)}" aria-label="Ajouter un exemplaire de ${name}">+</button>
        </div>
      </div>
      <p class="cart-line__price">${formatPrice(line.price * line.quantity)}</p>
    </li>`;
}

// Le tiroir n'est redessiné que s'il est ouvert ; le compteur de l'en-tête, toujours.
function onCartChange(cart) {
  renderCounts(cart);
  if (dialog.open) renderDrawer(cart);
}

function renderDrawer(cart) {
  const { lines, count, subtotal } = cart;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Garde le focus sur le bouton +/− après la mise à jour
  const focused = document.activeElement?.closest?.('[data-quantity]');
  const focusSelector = focused ? `[data-quantity="${focused.dataset.quantity}"][data-key="${focused.dataset.key}"]` : null;

  const content =
    lines.length === 0
      ? `<div class="cart__empty">
          <p>Votre panier est vide.</p>
          <a href="/boutique/" class="btn btn--dark">Découvrir la collection</a>
        </div>`
      : `<div class="cart__shipping">
          <p>${remaining > 0 ? `Plus que ${formatPrice(remaining)} pour profiter de la livraison offerte.` : 'La livraison vous est offerte.'}</p>
          <div class="progress-bar" aria-hidden="true"><span style="width: ${progress}%"></span></div>
        </div>
        <ul class="cart__list">${lines.map(lineTemplate).join('')}</ul>
        <div class="cart__footer">
          <p class="cart__total"><span>Sous-total</span><span>${formatPrice(subtotal)}</span></p>
          <button type="button" class="btn btn--dark btn--block" data-checkout-open>Passer commande</button>
        </div>`;

  dialog.innerHTML = `
    <div class="dialog__body">
      <button type="button" class="dialog__close" data-dialog-close aria-label="Fermer">${icon('fermer')}</button>
      <div class="cart">
        <h2 class="cart__title title-wide">Panier (${count})</h2>
        ${content}
      </div>
    </div>`;

  if (focusSelector) dialog.querySelector(focusSelector)?.focus();
}

export function initCart() {
  dialog = document.getElementById('panier');
  if (!dialog) return;

  setupDialog(dialog);
  subscribe(onCartChange);
  renderCounts(getCart());

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-cart-open]')) openCart();
  });

  dialog.addEventListener('click', (event) => {
    const quantityButton = event.target.closest('[data-quantity]');
    if (quantityButton) {
      changeQuantity(quantityButton.dataset.key, Number(quantityButton.dataset.quantity));
      return;
    }
    if (event.target.closest('[data-checkout-open]')) {
      closeCart();
      openCheckout();
    }
  });
}

// Fiche produit : choix de la taille puis ajout au panier.

import { openCart } from './panier.js';
import { addLine, readProduct } from './panier-store.js';

export function initProductForm() {
  const form = document.querySelector('[data-product-form]');
  if (!form) return;

  const error = form.querySelector('[data-size-error]');
  const { product, sizes } = readProduct(form);

  form.addEventListener('change', () => {
    if (error) error.hidden = true;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const size = sizes.length === 1 ? sizes[0] : new FormData(form).get('taille');
    if (!size) {
      error.hidden = false;
      form.querySelector('input[name="taille"]')?.focus();
      return;
    }
    addLine(product, size);
    openCart();
  });
}

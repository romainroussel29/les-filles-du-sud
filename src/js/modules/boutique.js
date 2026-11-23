// Recherche et tri dans les pages de la boutique.
// Les produits sont déjà dans le HTML (lisibles par Google) : on ne fait que les masquer ou les réordonner.

import { pluralize } from './utils.js';

const SORTS = {
  default: (a, b) => a.order - b.order,
  'price-asc': (a, b) => a.price - b.price || a.order - b.order,
  'price-desc': (a, b) => b.price - a.price || a.order - b.order,
};

const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

export function initShop() {
  const shop = document.querySelector('[data-shop]');
  if (!shop) return;

  const grid = shop.querySelector('[data-shop-grid]');
  const search = shop.querySelector('[data-shop-search]');
  const sort = shop.querySelector('[data-shop-sort]');
  const count = shop.querySelector('[data-shop-count]');
  const empty = shop.querySelector('[data-shop-empty]');
  const emptyQuery = shop.querySelector('[data-shop-query]');

  const items = [...grid.children].map((element, order) => ({
    element,
    order,
    price: Number(element.dataset.price),
    text: normalize(element.dataset.search ?? element.textContent),
  }));

  function update() {
    const query = normalize(search?.value ?? '');
    const sorted = [...items].sort(SORTS[sort?.value] ?? SORTS.default);
    let visible = 0;
    for (const item of sorted) {
      const match = !query || item.text.includes(query);
      item.element.hidden = !match;
      if (match) visible++;
      grid.append(item.element); // réordonne sans recréer les éléments
    }
    if (count) count.textContent = `${visible} ${pluralize(visible, 'pièce')}`;
    if (empty) empty.hidden = visible > 0;
    if (emptyQuery) emptyQuery.textContent = search?.value ?? '';
  }

  search?.addEventListener('input', update);
  sort?.addEventListener('change', update);
  shop.querySelector('[data-shop-reset]')?.addEventListener('click', () => {
    search.value = '';
    update();
    search.focus();
  });

  // Lien « Recherche » de l'en-tête : /boutique/#recherche
  if (search && window.location.hash === '#recherche') {
    search.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#recherche') search?.focus({ preventScroll: true });
  });
}

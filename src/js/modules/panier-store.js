// Contenu du panier, enregistré dans le localStorage du navigateur et synchronisé entre onglets.
// Chaque ligne garde ce qu'il faut pour l'afficher (nom, prix, photo…), lu sur la page au moment de l'ajout.

const STORAGE_KEY = 'vds_panier_v2';
const LEGACY_KEYS = ['vds_cart', 'vds_panier', 'lfs_panier']; // anciennes versions du site

let lines = load();
const listeners = new Set();

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    return parsed.filter((line) => line.key && line.name && line.quantity > 0 && Number.isFinite(line.price));
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch {
    /* stockage indisponible (navigation privée) : le panier reste en mémoire */
  }
}

const notify = () => listeners.forEach((listener) => listener(getCart()));

// Garde le panier à jour quand il change dans un autre onglet.
window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY) return;
  lines = load();
  notify();
});

/** { lines, count, subtotal } */
export function getCart() {
  return {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
  };
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Ajoute une pièce au panier.
 * @param {{ id: string, name: string, price: number, color: string, image: string, url: string }} product
 * @param {string} size
 */
export function addLine(product, size) {
  const key = `${product.id}-${size}`;
  const existing = lines.find((line) => line.key === key);
  lines = existing
    ? lines.map((line) => (line.key === key ? { ...line, quantity: line.quantity + 1 } : line))
    : [...lines, { key, ...product, size, quantity: 1 }];
  save();
  notify();
}

export function changeQuantity(key, delta) {
  lines = lines
    .map((line) => (line.key === key ? { ...line, quantity: line.quantity + delta } : line))
    .filter((line) => line.quantity > 0);
  save();
  notify();
}

export function clearCart() {
  lines = [];
  save();
  notify();
}

/** Lit les informations produit portées par un élément HTML (attributs data-*). */
export function readProduct(element) {
  const { id, name, price, color, image, url, sizes } = element.dataset;
  return {
    product: { id, name, price: Number(price), color, image, url },
    sizes: sizes ? sizes.split('|') : [],
  };
}

import images from './images.json';

// Chemin de l'image générée pour un produit (id) ou un visuel (hero, robes…), ou null si absente.
export const imageDe = (cle) => images[String(cle)] ?? null;

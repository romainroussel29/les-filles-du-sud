// Vibe du Sud — point d'entrée du JavaScript.
// Compilé par `npm run build:js` en public/assets/js/main.min.js (un seul fichier, chargé en defer).
// Chaque module ne fait rien si les éléments qu'il gère sont absents de la page.

import { initHeader } from './modules/header.js';
import { initReveal } from './modules/reveal.js';
import { initScrollProgress } from './modules/progression.js';
import { initHeroVideo } from './modules/video-accueil.js';
import { initCart } from './modules/panier.js';
import { initQuickAdd } from './modules/ajout-rapide.js';
import { initProductForm } from './modules/fiche-produit.js';
import { initShop } from './modules/boutique.js';
import { initNewsletter } from './modules/newsletter.js';
import { initContactForm } from './modules/contact.js';
import { cleanUpLegacy } from './modules/nettoyage.js';

initHeader();
initReveal();
initScrollProgress();
initHeroVideo();
initCart();
initQuickAdd();
initProductForm();
initShop();
initNewsletter();
initContactForm();
cleanUpLegacy();

// Année du copyright toujours à jour
for (const element of document.querySelectorAll('[data-year]')) {
  element.textContent = String(new Date().getFullYear());
}

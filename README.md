# Vibe du Sud

Site de Vibe du Sud (vibe-du-sud.fr), marque de prêt-à-porter féminin née à Marseille.

Le site est **entièrement statique** : du HTML, un fichier CSS et un fichier JavaScript. Ni PHP, ni base de données, ni Node.js ne sont nécessaires sur le serveur. **Seul le dossier `public/` est mis en ligne.**

## Arborescence

```
vibe-du-sud/
├── public/                          ← seul dossier mis en ligne
│   ├── index.html                   → /
│   ├── boutique/
│   │   ├── index.html               → /boutique/              (les 43 pièces)
│   │   ├── nouveautes/index.html    → /boutique/nouveautes/
│   │   ├── robes/
│   │   │   ├── index.html           → /boutique/robes/        (une page par catégorie)
│   │   │   └── robe-calanque/
│   │   │       └── index.html       → /boutique/robes/robe-calanque/   (une page par produit)
│   │   └── hauts/, jupes-et-shorts/, pantalons/, maillots-de-bain/, sacs/, accessoires/
│   ├── a-propos/index.html          → notre histoire
│   ├── contact/index.html           → contact, FAQ livraison / retours, guide des tailles
│   ├── mentions-legales/index.html
│   ├── politique-confidentialite/index.html
│   ├── 404.html
│   ├── assets/
│   │   ├── css/style.min.css        ← compilé depuis src/scss (ne pas modifier à la main)
│   │   ├── js/main.min.js           ← compilé depuis src/js (ne pas modifier à la main)
│   │   ├── img/                     ← photos .webp, noms descriptifs, en 2 ou 3 largeurs
│   │   ├── video/                   ← vidéo de l'accueil (720 et 1280 px)
│   │   ├── fonts/                   ← polices .woff2 en local
│   │   └── icons/                   ← sprite.svg (icônes), favicon.svg, icônes du manifeste
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml
│   └── .htaccess                    ← HTTPS, redirections, cache, compression, sécurité
├── src/                             ← sources (jamais mises en ligne)
│   ├── scss/
│   │   ├── base/                    ← variables, polices et typo, reset, animations, utilitaires
│   │   ├── layout/                  ← header, footer, grille
│   │   ├── components/              ← boutons, cartes, formulaires, panier, commande…
│   │   ├── pages/                   ← accueil, boutique, produit, à propos, contact…
│   │   └── main.scss
│   ├── js/
│   │   ├── main.js                  ← point d'entrée
│   │   └── modules/                 ← panier, commande, recherche, menu, vidéo…
│   └── img-originales/              ← photos d'origine, avant compression
│       ├── portrait/                (produits et visuels verticaux)
│       ├── paysage/                 (grands visuels horizontaux)
│       └── archives/                (anciennes versions)
├── .gitignore
├── package.json
└── README.md
```

## Installation

Il faut [Node.js](https://nodejs.org) 22 ou plus récent, uniquement sur votre ordinateur.

```bash
npm install
```

## Commandes

| Commande          | Rôle                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `npm run dev`     | Compile, puis ouvre le site sur http://localhost:8080 et recompile à chaque modification.  |
| `npm run build`   | Compile `style.min.css` et `main.min.js`, puis met à jour leur version (`?v=…`) dans toutes les pages. |
| `npm run images`  | Optimise les photos de `src/img-originales/` vers `public/assets/img/`.                     |
| `npm run format`  | Met en forme le SCSS et le JavaScript (Prettier).                                          |

Lancez toujours `npm run build` avant une mise en ligne.

## Mise en ligne (OVH, hébergement mutualisé)

1. `npm run build`
2. Avec FileZilla ou Cyberduck, envoyez **le contenu** de `public/` (pas le dossier lui-même) dans `www/`.
3. Vérifiez que le fichier caché `.htaccess` est bien parti (FileZilla : Serveur › Forcer l'affichage des fichiers cachés).

Le `.htaccess` force `https://vibe-du-sud.fr` (sans www) et redirige les anciennes adresses (`/histoire` → `/a-propos/`).

## Modifier le site

**Un texte ou une page** : modifiez directement le fichier `index.html` concerné dans `public/`.

**L'en-tête, le pied de page ou le menu** sont répétés dans chaque page : dans VS Code, utilisez Rechercher/Remplacer dans les fichiers (Ctrl + Maj + H) sur le dossier `public/`.

**Le style** : modifiez les fichiers de `src/scss/`, puis `npm run build` (ou laissez tourner `npm run dev`).

**Le comportement** (panier, commande, recherche…) : modifiez `src/js/modules/`, puis `npm run build`. Les réglages de livraison sont dans `src/js/modules/config.js`. Le seuil de livraison offerte (80 €) est aussi écrit dans les pages : changez-le aux deux endroits.

**Ajouter un produit** :

1. Déposez sa photo (format portrait 3:4, JPEG, PNG ou WebP) dans `src/img-originales/portrait/`, nommée comme le produit : `robe-cassis.jpg`. Lancez `npm run images`.
2. Copiez le dossier d'un produit de la même catégorie (par exemple `public/boutique/robes/robe-cassis/`), renommez-le et adaptez son `index.html` : titre, description, prix, coloris, matière, tailles, photos, attributs `data-*` du formulaire et données structurées (`<script type="application/ld+json">`).
3. Ajoutez sa carte dans la page de sa catégorie et dans `public/boutique/index.html`.
4. Ajoutez son adresse dans `public/sitemap.xml`.

**Remplacer une photo** : les photos sont gardées un an en cache par les navigateurs. Donnez un **nouveau nom** à la nouvelle photo plutôt que d'écraser l'ancienne.

## Référencement (SEO)

- Une adresse propre et unique par page (`/boutique/robes/robe-calanque/`), avec URL canonique.
- Titre et meta description propres à chaque page, balises Open Graph pour le partage.
- Un seul `<h1>` par page, fil d'Ariane visible.
- Données structurées schema.org : `ClothingStore` et `WebSite` (accueil), `Product` avec prix, stock, livraison et politique de retour (fiches produit), `CollectionPage` (catégories), `FAQPage` (contact), `BreadcrumbList` (toutes les pages).
- `sitemap.xml` avec les photos des produits, `robots.txt`.
- Tout le contenu est dans le HTML : rien ne dépend du JavaScript pour être lu par Google.
- Performance : photos WebP responsives (`srcset`) avec dimensions déclarées, photo principale préchargée, polices locales préchargées, CSS et JS minifiés, cache long et compression via `.htaccess`.

## À compléter avant l'ouverture de la vente

- **Paiement** : le tunnel de commande est une maquette, rien n'est encaissé. Branchez un prestataire (Stripe Checkout, PayPal…) dans `src/js/modules/commande.js`.
- **Formulaire de contact** : il prépare le message dans la messagerie du visiteur (`mailto:`). Pour un envoi direct, utilisez un service comme Formspree (voir `src/js/modules/contact.js`).
- **Lettre d'information** : les inscriptions ne sont envoyées nulle part (voir `src/js/modules/newsletter.js`).
- **Mentions légales** : RCS, TVA, téléphone et médiateur de la consommation sont à remplir.
- **Guide des tailles** (page contact) : les mesures sont indicatives, à vérifier.

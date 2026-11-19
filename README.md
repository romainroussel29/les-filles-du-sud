# Vibe du Sud

Boutique en ligne de Vibe du Sud (vibe-du-sud.fr), marque de prêt-à-porter féminin née à Marseille : robes, hauts, jupes et shorts, pantalons, maillots de bain, sacs et accessoires.

## Fonctionnalités

- Page d’accueil avec photo plein écran, raccourcis par catégorie, nouveautés et présentation de la marque
- Catalogue de 43 pièces (`src/data/produits.js`), 7 catégories et un filtre Nouveautés
- Recherche par nom, coloris ou matière, tri par prix
- Ajout rapide au survol et fiche produit avec choix de la taille
- Panier persistant (`localStorage`) avec jauge vers la livraison offerte
- Commande en deux étapes : livraison (domicile, point relais, express) puis paiement (carte, PayPal, Apple Pay)
- Pages « Notre histoire » et « Mentions légales »

> **Paiement** : le tunnel de commande est une maquette, aucun paiement n’est encaissé et les données de carte ne sont ni enregistrées ni envoyées. Un prestataire de paiement (Stripe, PayPal…) doit être branché dans `src/components/Commande.jsx` avant toute mise en ligne.

## Stack

React, Vite, CSS natif. Polices : Instrument Serif et Instrument Sans (Google Fonts).

## Photos générées par IA

Les photos sont générées par `scripts/generer-images.mjs` à partir du champ `photo` de chaque produit et des `visuels` de la page d’accueil (`src/data/produits.js`). Elles sont converties en WebP, enregistrées dans `public/images/` et référencées dans `src/data/images.json`.

1. Créez un fichier `.env.local` (ignoré par Git) contenant `GEMINI_API_KEY=...` ou `OPENAI_API_KEY=...`.
2. Lancez `npm run images`.

Le script reprend là où il s’est arrêté. Pour refaire une image précise (PowerShell) :

```powershell
$env:IMAGES_SEULEMENT = "hero"; $env:IMAGES_FORCER = "1"; npm run images
```

`npm run images:compresser` convertit en WebP des images ajoutées à la main.

## Lancer le projet

```bash
npm install
npm run dev
```

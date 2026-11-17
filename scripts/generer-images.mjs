// Génère les photos du site par IA et les enregistre dans public/images/.
//
// Utilisation : mettez votre clé dans un fichier .env.local à la racine (ignoré par Git) :
//   OPENAI_API_KEY=sk-...      ou      GEMINI_API_KEY=...
// puis lancez : npm run images
//
// Options : IMAGES_SEULEMENT="1,2,hero" pour ne (re)générer que certaines images,
//           IMAGES_FORCER=1 pour écraser les images existantes.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { produits, visuels } from '../src/data/produits.js';
import { versWebp } from './compresser-images.mjs';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');

// Charge la clé depuis .env.local si elle n'est pas déjà dans l'environnement.
const fichierEnv = join(racine, '.env.local');
if (existsSync(fichierEnv)) process.loadEnvFile(fichierEnv);
const dossier = join(racine, 'public', 'images');
const manifeste = join(racine, 'src', 'data', 'images.json');

const STYLE_VETEMENT = (d) =>
  `Fashion e-commerce photograph for a premium French women's ready-to-wear brand. A model wearing ${d}. ` +
  'Full body, standing naturally with a relaxed pose, plain warm off-white plaster wall background, soft natural daylight, ' +
  'gentle shadow, photorealistic, sharp fabric detail, no text, no logo.';
const STYLE_OBJET = (d) =>
  `Product still life photograph for a premium French women's fashion brand: ${d}, placed on a warm beige linen cloth ` +
  'against a plain off-white plaster wall, soft natural Mediterranean daylight, gentle shadow, photorealistic, centered, no text, no logo.';

const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const taches = [
  ...Object.entries(visuels).map(([cle, v]) => ({
    cle, fichier: `visuel-${cle}`, format: v.format, visuel: true, prompt: `${v.photo}, photorealistic, no text, no logo.`,
  })),
  ...produits.map((p) => ({
    cle: String(p.id),
    fichier: `${String(p.id).padStart(2, '0')}-${slug(p.nom)}`,
    format: 'portrait',
    prompt: ['sacs', 'accessoires'].includes(p.categorie) ? STYLE_OBJET(p.photo) : STYLE_VETEMENT(p.photo),
  })),
];

async function viaOpenAI(t) {
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.IMAGE_MODEL || 'gpt-image-1',
      prompt: t.prompt,
      size: t.format === 'paysage' ? '1536x1024' : '1024x1536',
      quality: 'medium',
      output_format: 'webp',
      output_compression: 82,
      n: 1,
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || r.statusText);
  return { data: Buffer.from(j.data[0].b64_json, 'base64'), ext: 'webp' };
}

async function viaGemini(t) {
  // Les grandes photos de l'accueil utilisent le modèle Pro, les produits le modèle Flash.
  const modele = process.env.IMAGE_MODEL || (t.visuel ? 'gemini-3-pro-image' : 'gemini-3.1-flash-image');
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modele}:generateContent`, {
    method: 'POST',
    headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: t.prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: t.format === 'paysage' ? '16:9' : '3:4' },
      },
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || r.statusText);
  const image = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData;
  if (!image) throw new Error(`Aucune image renvoyée (${j.candidates?.[0]?.finishReason ?? 'raison inconnue'})`);
  return { data: Buffer.from(image.data, 'base64'), ext: image.mimeType === 'image/jpeg' ? 'jpg' : image.mimeType === 'image/webp' ? 'webp' : 'png' };
}

const generer = process.env.OPENAI_API_KEY ? viaOpenAI : process.env.GEMINI_API_KEY ? viaGemini : null;
if (!generer) {
  console.error('Aucune clé trouvée. Définissez OPENAI_API_KEY ou GEMINI_API_KEY puis relancez « npm run images ».');
  process.exit(1);
}

await mkdir(dossier, { recursive: true });
const images = existsSync(manifeste) ? JSON.parse(await readFile(manifeste, 'utf8')) : {};
const seulement = process.env.IMAGES_SEULEMENT?.split(',').map((s) => s.trim());
const aFaire = taches.filter((t) =>
  (!seulement || seulement.includes(t.cle)) &&
  (process.env.IMAGES_FORCER || !images[t.cle] || !existsSync(join(racine, 'public', images[t.cle])))
);

console.log(`${aFaire.length} image(s) à générer avec ${generer === viaOpenAI ? 'OpenAI' : 'Google Gemini'}.`);
let ok = 0;
const echecs = [];

async function traiter(t) {
  for (let essai = 1; essai <= 3; essai++) {
    try {
      const { data } = await generer(t);
      const nom = `${t.fichier}.webp`;
      await writeFile(join(dossier, nom), await versWebp(data, t.format === 'paysage'));
      images[t.cle] = `/images/${nom}`;
      await writeFile(manifeste, JSON.stringify(images, null, 2) + '\n');
      console.log(`✓ ${nom} (${++ok}/${aFaire.length})`);
      return;
    } catch (e) {
      console.warn(`… ${t.fichier}, essai ${essai} : ${e.message}`);
      await new Promise((r) => setTimeout(r, 4000 * essai));
    }
  }
  echecs.push(t.cle);
}

const file = [...aFaire];
await Promise.all(Array.from({ length: 3 }, async () => {
  while (file.length) await traiter(file.shift());
}));

console.log(echecs.length ? `Terminé avec ${echecs.length} échec(s) : ${echecs.join(', ')}. Relancez pour réessayer.` : 'Toutes les images sont prêtes.');

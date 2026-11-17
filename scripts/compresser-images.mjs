// Convertit les images de public/images/ en WebP, redimensionnées pour le web,
// et met à jour src/data/images.json. Utilisé aussi par generer-images.mjs.
//
// Utilisation : npm run images:compresser

import sharp from 'sharp';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const dossierPublic = join(racine, 'public');
const manifeste = join(racine, 'src', 'data', 'images.json');

// Les grandes photos plein écran gardent plus de pixels que les photos produits.
export async function versWebp(donnees, paysage) {
  return sharp(donnees)
    .resize({ width: paysage ? 2400 : 1100, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

async function compresserTout() {
  const images = JSON.parse(await readFile(manifeste, 'utf8'));
  let avant = 0, apres = 0, n = 0;

  for (const [cle, chemin] of Object.entries(images)) {
    if (chemin.endsWith('.webp')) continue;
    const source = join(dossierPublic, chemin);
    if (!existsSync(source)) continue;

    const donnees = await readFile(source);
    const { width, height } = await sharp(donnees).metadata();
    const webp = await versWebp(donnees, width > height);
    const nouveau = `/images/${parse(chemin).name}.webp`;

    await writeFile(join(dossierPublic, nouveau), webp);
    await unlink(source);
    images[cle] = nouveau;
    avant += donnees.length; apres += webp.length; n++;
  }

  await writeFile(manifeste, JSON.stringify(images, null, 2) + '\n');
  const mo = (o) => (o / 1024 / 1024).toFixed(1) + ' Mo';
  console.log(n ? `${n} image(s) converties : ${mo(avant)} → ${mo(apres)}.` : 'Rien à convertir.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await compresserTout();
}

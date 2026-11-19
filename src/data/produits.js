// Catalogue Vibe du Sud
// `photo` est la description envoyée au générateur d'images (scripts/generer-images.mjs).

export const categories = [
  { id: 'robes', nom: 'Robes' },
  { id: 'hauts', nom: 'Hauts' },
  { id: 'jupes-shorts', nom: 'Jupes & shorts' },
  { id: 'pantalons', nom: 'Pantalons' },
  { id: 'maillots', nom: 'Maillots de bain' },
  { id: 'sacs', nom: 'Sacs' },
  { id: 'accessoires', nom: 'Accessoires' },
];

const VETEMENT = ['XS', 'S', 'M', 'L', 'XL'];
const MAILLOT = ['34', '36', '38', '40', '42'];
const POINTURES = ['36', '37', '38', '39', '40', '41'];
const UNIQUE = ['Taille unique'];

export const produits = [
  // Robes
  { id: 1, nom: 'Robe Calanque', categorie: 'robes', prix: 89, nouveau: true, coloris: 'Bleu calanque', matiere: '100 % lin lavé', tailles: VETEMENT, description: 'Une robe longue à fines bretelles, fluide du matin au soir, avec un dos légèrement décolleté.', photo: 'a long sky blue washed linen slip dress with thin straps' },
  { id: 2, nom: 'Robe Cassis', categorie: 'robes', prix: 69, coloris: 'Vichy framboise', matiere: '100 % coton', tailles: VETEMENT, description: 'Le vichy des pique-niques sur une robe courte évasée, taille marquée par une couture.', photo: 'a short flared raspberry pink and white gingham cotton dress with a fitted waist and short puff sleeves' },
  { id: 3, nom: 'Robe Lavandin', categorie: 'robes', prix: 95, nouveau: true, coloris: 'Lavande fleurie', matiere: 'Viscose écoresponsable', tailles: VETEMENT, description: 'Imprimé de petites fleurs blanches sur fond lavande, coupe longue qui danse en marchant.', photo: 'a flowing long lavender maxi dress with a tiny white floral print and a V neckline' },
  { id: 4, nom: 'Robe Mimosa', categorie: 'robes', prix: 65, coloris: 'Jaune mimosa à pois', matiere: 'Coton et lin', tailles: VETEMENT, description: 'Jaune soleil et pois blancs : la robe qui annonce le printemps dès février.', photo: 'a short sunny mimosa yellow dress with small white polka dots and thin straps' },
  { id: 5, nom: 'Robe Porquerolles', categorie: 'robes', prix: 72, coloris: 'Rayé marine', matiere: 'Jersey de coton', tailles: VETEMENT, description: 'Les rayures de la marinière sur une robe courte facile, à porter avec des espadrilles.', photo: 'a navy and white Breton striped cotton jersey knee length dress, worn with espadrilles' },
  { id: 6, nom: 'Robe Garrigue', categorie: 'robes', prix: 99, coloris: 'Vert olivier', matiere: '100 % lin lavé', tailles: VETEMENT, description: 'Un vert profond comme les collines en août, en lin épais qui se froisse joliment.', photo: 'a long deep olive green washed linen dress with a square neckline and wide straps' },
  { id: 7, nom: 'Robe Ramatuelle', categorie: 'robes', prix: 79, coloris: 'Corail fleuri', matiere: 'Viscose écoresponsable', tailles: VETEMENT, description: 'Fleurs jaunes sur fond corail, pour les dîners en terrasse quand le soleil descend.', photo: 'a coral midi wrap dress with a small yellow flower print' },
  { id: 8, nom: 'Robe Collioure', categorie: 'robes', prix: 75, coloris: 'Rayé tomate', matiere: 'Popeline de coton', tailles: VETEMENT, description: 'Rayures rouges et blanches, comme les barques catalanes du port.', photo: 'a red and white vertical striped cotton poplin midi sundress with tie straps' },
  { id: 9, nom: 'Robe Sainte-Victoire', categorie: 'robes', prix: 110, coloris: 'Écru', matiere: 'Lin et coton brodés', tailles: VETEMENT, description: 'Notre robe longue la plus habillée, en écru, pour les mariages au milieu des vignes.', photo: 'an elegant long ecru linen dress with delicate white embroidery and puff sleeves' },

  // Hauts
  { id: 10, nom: 'Blouse Mistral', categorie: 'hauts', prix: 49, nouveau: true, coloris: 'Blanc chaux', matiere: 'Voile de coton', tailles: VETEMENT, description: 'Une blouse légère aux manches courtes bouffantes, presque transparente au soleil.', photo: 'a light white cotton voile blouse with short puff sleeves, tucked into light beige linen trousers' },
  { id: 11, nom: 'Marinière Cigale', categorie: 'hauts', prix: 45, coloris: 'Blanc et marine', matiere: 'Jersey de coton bio', tailles: VETEMENT, description: 'La marinière revisitée en manches courtes, coupe droite qui tombe juste.', photo: 'a short sleeve white and navy Breton striped top, with high waisted ecru trousers' },
  { id: 12, nom: 'Débardeur Olivette', categorie: 'hauts', prix: 29, coloris: 'Olive', matiere: 'Côtes de coton', tailles: VETEMENT, description: 'Le débardeur côtelé qu’on porte tous les jours, sous une chemise ou seul.', photo: 'a fitted olive green ribbed cotton tank top, with white linen trousers' },
  { id: 13, nom: 'Top Gordes', categorie: 'hauts', prix: 35, coloris: 'Vichy ciel', matiere: '100 % coton', tailles: VETEMENT, description: 'Un petit top à bretelles en vichy bleu ciel, frais et sans chichi.', photo: 'a cropped light blue and white gingham top with thin straps, with white jeans' },
  { id: 14, nom: 'Chemise Camargue', categorie: 'hauts', prix: 59, coloris: 'Rayé ciel', matiere: 'Popeline de coton', tailles: VETEMENT, description: 'Chemise ample à rayures bleu ciel, à nouer à la taille ou porter ouverte sur un maillot.', photo: 'an oversized light blue and white striped cotton poplin shirt, worn open over a white top' },
  { id: 15, nom: 'Blouse Arles', categorie: 'hauts', prix: 55, coloris: 'Écru fleuri rouge', matiere: 'Viscose écoresponsable', tailles: VETEMENT, description: 'Un imprimé inspiré des indiennes provençales, sur une blouse ample.', photo: 'a loose ecru blouse with a small red Provencal floral print, with a denim skirt' },
  { id: 16, nom: 'Caraco Menton', categorie: 'hauts', prix: 39, nouveau: true, coloris: 'Rose laurier', matiere: 'Satin de viscose', tailles: VETEMENT, description: 'Un caraco satiné couleur laurier-rose, du jean le jour à la jupe le soir.', photo: 'a satin camisole top in oleander pink, with straight blue jeans' },
  { id: 17, nom: 'Chemise Uzès', categorie: 'hauts', prix: 65, coloris: 'Sable', matiere: '100 % lin lavé', tailles: VETEMENT, description: 'La chemise en lin couleur sable, à manches longues qu’on retrousse.', photo: 'a relaxed sand beige washed linen shirt with rolled sleeves, with matching linen shorts' },

  // Jupes & shorts
  { id: 18, nom: 'Jupe Estérel', categorie: 'jupes-shorts', prix: 55, coloris: 'Corail', matiere: 'Lin et viscose', tailles: VETEMENT, description: 'Jupe mi-longue évasée, couleur des roches rouges au bord de l’eau.', photo: 'a flared coral orange midi skirt, with a white tank top' },
  { id: 19, nom: 'Jupe Biot', categorie: 'jupes-shorts', prix: 59, coloris: 'Ciel fleuri', matiere: 'Viscose écoresponsable', tailles: VETEMENT, description: 'Petites fleurs blanches sur fond bleu, taille élastiquée pour les longues journées.', photo: 'a long sky blue skirt with a small white floral print, with a white t-shirt' },
  { id: 20, nom: 'Jupe Bandol', categorie: 'jupes-shorts', prix: 49, coloris: 'Vichy jaune', matiere: '100 % coton', tailles: VETEMENT, description: 'Un vichy jaune pâle sur une jupe trapèze qui va avec tous les hauts blancs.', photo: 'a pale yellow and white gingham A-line midi skirt, with a white blouse' },
  { id: 21, nom: 'Short Saint-Tropez', categorie: 'jupes-shorts', prix: 45, coloris: 'Blanc', matiere: '100 % lin lavé', tailles: VETEMENT, description: 'Short taille haute en lin blanc, avec poches et ceinture froncée.', photo: 'high waisted white linen shorts with a gathered waist, with a navy striped top' },
  { id: 22, nom: 'Short Cap Ferrat', categorie: 'jupes-shorts', prix: 42, coloris: 'Rayé rose', matiere: 'Popeline de coton', tailles: VETEMENT, description: 'Rayures roses et blanches pour un short à porter avec la Chemise Camargue.', photo: 'pink and white striped cotton shorts, with a white shirt' },
  { id: 23, nom: 'Jupe Luberon', categorie: 'jupes-shorts', prix: 52, coloris: 'Lavande', matiere: 'Lin et viscose', tailles: VETEMENT, description: 'Une jupe fluide couleur lavande, plissée à la taille.', photo: 'a fluid lavender midi skirt pleated at the waist, with a cream knit top' },

  // Pantalons
  { id: 24, nom: 'Pantalon Lourmarin', categorie: 'pantalons', prix: 75, coloris: 'Écru', matiere: '100 % lin lavé', tailles: VETEMENT, description: 'Pantalon large en lin écru, taille haute et jambe qui flotte au vent.', photo: 'wide leg high waisted ecru linen trousers, with a fitted black tank top' },
  { id: 25, nom: 'Pantalon Tramontane', categorie: 'pantalons', prix: 79, coloris: 'Marine', matiere: 'Coton et lin', tailles: VETEMENT, description: 'Le pantalon marine bien coupé, pour les jours où le vent se lève.', photo: 'tailored straight navy blue cotton linen trousers, with a white shirt' },
  { id: 26, nom: 'Pantalon Sirocco', categorie: 'pantalons', prix: 69, nouveau: true, coloris: 'Rayé sable', matiere: 'Popeline de coton', tailles: VETEMENT, description: 'Rayures sable et blanc sur un pantalon de plage à cordon.', photo: 'relaxed drawstring beach trousers with sand and white vertical stripes, with a white tank top' },
  { id: 27, nom: 'Pantalon Aigues-Mortes', categorie: 'pantalons', prix: 72, coloris: 'Rose salin', matiere: '100 % lin lavé', tailles: VETEMENT, description: 'Le rose des marais salants sur un pantalon large et léger.', photo: 'wide leg soft dusty pink linen trousers, with a white top' },

  // Maillots de bain
  { id: 28, nom: 'Maillot Sanary', categorie: 'maillots', prix: 65, coloris: 'Rayé marine', matiere: 'Polyamide recyclé', tailles: MAILLOT, description: 'Maillot une pièce rayé, dos échancré et bretelles fines réglables.', photo: 'a navy and white striped one piece swimsuit with thin straps' },
  { id: 29, nom: 'Maillot Agay', categorie: 'maillots', prix: 59, coloris: 'Rouge tomate', matiere: 'Polyamide recyclé', tailles: MAILLOT, description: 'Un rouge franc qu’on repère de loin sur la plage, coupe simple et gainante.', photo: 'a tomato red one piece swimsuit with a scoop neckline' },
  { id: 30, nom: 'Maillot Pampelonne', categorie: 'maillots', prix: 62, nouveau: true, coloris: 'Vichy framboise', matiere: 'Polyamide recyclé', tailles: MAILLOT, description: 'Le vichy de la Robe Cassis, version maillot, pour l’ensemble parfait.', photo: 'a raspberry pink and white gingham one piece swimsuit' },

  // Sacs
  { id: 31, nom: 'Panier Marché d’Aix', categorie: 'sacs', prix: 49, coloris: 'Raphia naturel', matiere: 'Raphia tressé main', tailles: UNIQUE, description: 'Le panier rond pour le marché du samedi, anses en cuir et grand volume.', photo: 'a round natural raffia woven basket bag with brown leather handles' },
  { id: 32, nom: 'Cabas Vieux-Port', categorie: 'sacs', prix: 39, coloris: 'Écru rayé marine', matiere: 'Toile de coton épaisse', tailles: UNIQUE, description: 'Grand cabas en toile rayée, qui avale serviette, livre et crème solaire.', photo: 'a large ecru canvas tote bag with navy horizontal stripes and rope handles' },
  { id: 33, nom: 'Pochette Croisette', categorie: 'sacs', prix: 45, coloris: 'Rose laurier', matiere: 'Cuir grainé', tailles: UNIQUE, description: 'Petite pochette à rabat avec chaînette amovible, pour les soirées.', photo: 'a small oleander pink grained leather clutch with a flap and a thin gold chain' },
  { id: 34, nom: 'Panier Moustiers', categorie: 'sacs', prix: 55, nouveau: true, coloris: 'Raphia et mimosa', matiere: 'Raphia tressé main', tailles: UNIQUE, description: 'Le panier rond, tressé de fils jaunes, avec pompons sur les côtés.', photo: 'a woven raffia basket bag with yellow woven details and small yellow pompoms' },
  { id: 35, nom: 'Cabas Cours Mirabeau', categorie: 'sacs', prix: 42, coloris: 'Olive', matiere: 'Toile de coton épaisse', tailles: UNIQUE, description: 'Le cabas de tous les jours, poche intérieure zippée et fond renforcé.', photo: 'an olive green heavy cotton canvas tote bag with leather handles' },
  { id: 36, nom: 'Pochette Riviera', categorie: 'sacs', prix: 39, coloris: 'Rayé mimosa', matiere: 'Toile enduite', tailles: UNIQUE, description: 'Une pochette rayée jaune et blanc, comme les transats de plage.', photo: 'a yellow and white striped coated canvas pouch clutch with a zip' },

  // Accessoires
  { id: 37, nom: 'Capeline Soleil', categorie: 'accessoires', prix: 45, coloris: 'Paille et ruban rose', matiere: 'Paille naturelle', tailles: UNIQUE, description: 'Une capeline à large bord qui protège vraiment du soleil de midi.', photo: 'a wide brim natural straw sun hat with a pink ribbon' },
  { id: 38, nom: 'Chapeau Saintes-Maries', categorie: 'accessoires', prix: 49, coloris: 'Paille claire et ruban marine', matiere: 'Paille naturelle', tailles: UNIQUE, description: 'Bord moyen et ruban marine, le chapeau qui tient même quand ça souffle.', photo: 'a light straw hat with a medium brim and a navy ribbon' },
  { id: 39, nom: 'Foulard Cigalon', categorie: 'accessoires', prix: 29, coloris: 'Ciel fleuri', matiere: 'Soie et coton', tailles: UNIQUE, description: 'À nouer dans les cheveux, autour du cou ou sur l’anse d’un panier.', photo: 'a folded silk cotton square scarf in sky blue with a small white floral print' },
  { id: 40, nom: 'Foulard Calisson', categorie: 'accessoires', prix: 25, coloris: 'Vichy jaune', matiere: '100 % coton', tailles: UNIQUE, description: 'Un carré de coton vichy jaune, doux et facile à laver.', photo: 'a folded yellow and white gingham cotton square scarf' },
  { id: 41, nom: 'Créoles Soleil', categorie: 'accessoires', prix: 35, nouveau: true, coloris: 'Doré', matiere: 'Laiton doré à l’or fin', tailles: UNIQUE, description: 'Des créoles légères qu’on garde du café du matin au dernier bain.', photo: 'a pair of chunky gold hoop earrings' },
  { id: 42, nom: 'Lunettes Côte d’Azur', categorie: 'accessoires', prix: 59, coloris: 'Écaille', matiere: 'Acétate, verres catégorie 3', tailles: UNIQUE, description: 'Monture ronde écaille et verres fumés, protection UV 400.', photo: 'round tortoiseshell acetate sunglasses with dark tinted lenses' },
  { id: 43, nom: 'Sandales Camargue', categorie: 'accessoires', prix: 69, coloris: 'Cuir naturel', matiere: 'Cuir tanné végétal', tailles: POINTURES, description: 'Sandales plates à deux brides en cuir naturel, qui se patinent avec l’été.', photo: 'a pair of flat natural tan leather sandals with two straps' },
];

// Grandes images de la page d'accueil
export const visuels = {
  hero: { format: 'paysage', photo: 'Luxury fashion campaign photograph. A young woman wearing a long sky blue washed linen slip dress with thin straps, standing barefoot on white limestone rocks at the edge of a calanque near Marseille, the turquoise and deep blue Mediterranean water below, steep white cliffs with pine trees on the other side of the cove, late afternoon golden light, a soft sea breeze lifting the hem of the dress and her hair, she looks toward the sea, the dress fabric and color clearly visible, she stands in the right third of the frame, the left side of the frame shows calm sea and sky with open space for a headline, shot on medium format film, natural grain, warm and airy' },
  robes: { format: 'portrait', photo: 'Editorial fashion photograph. A woman in a long sky blue linen dress standing in a lavender field in Provence at golden hour, natural light, 35mm film' },
  maillots: { format: 'portrait', photo: 'Editorial fashion photograph. A woman in a navy and white striped one piece swimsuit sitting on white rocks by a turquoise Mediterranean cove, bright sun, 35mm film' },
  sacs: { format: 'portrait', photo: 'Editorial still life photograph. A raffia basket bag filled with lemons, a baguette and a straw hat, on a cafe chair in a sunny French village square, 35mm film' },
  accessoires: { format: 'portrait', photo: 'Editorial close up photograph. A woman wearing gold hoop earrings and tortoiseshell sunglasses, a silk scarf in her hair, Mediterranean sea behind, golden light, 35mm film' },
  maison: { format: 'paysage', photo: 'Editorial fashion photograph. Two women friends laughing at a terrace table with rose wine under a striped awning in a Provencal village, wearing linen summer dresses, warm evening light, 35mm film' },
  histoire: { format: 'paysage', photo: 'Editorial photograph. Two young French sisters in their bright sewing atelier in Provence, rolls of colorful linen fabric, a sewing machine, summer dresses on a rail, sunlight through tall windows, olive trees outside, warm and joyful, 35mm film' },
};

export const nomCategorie = (id) => categories.find((c) => c.id === id)?.nom ?? id;

export const formatPrix = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

export const SEUIL_LIVRAISON = 80;
export const FRAIS_LIVRAISON = 4.9;

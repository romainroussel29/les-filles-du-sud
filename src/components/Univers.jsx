import Photo from './Photo';
import ProductCard from './ProductCard';

const tuiles = [
  { id: 'robes', nom: 'Robes' },
  { id: 'maillots', nom: 'Maillots de bain' },
  { id: 'sacs', nom: 'Sacs' },
  { id: 'accessoires', nom: 'Accessoires' },
];

export function Categories({ choisirCategorie }) {
  return (
    <section className="section categories" aria-labelledby="titre-categories">
      <h2 id="titre-categories" className="titre-section">Par envie</h2>
      <div className="categories-grille">
        {tuiles.map((t) => (
          <a key={t.id} href="#boutique" className="tuile" onClick={() => choisirCategorie(t.id)}>
            <Photo cle={t.id} alt={t.nom} className="tuile-photo" />
            <span className="tuile-nom">{t.nom}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Nouveautes({ produits, ouvrir, ajouter, choisirCategorie }) {
  return (
    <section className="section nouveautes" aria-labelledby="titre-nouveautes">
      <div className="section-entete">
        <h2 id="titre-nouveautes" className="titre-section">Nouveautés</h2>
        <a href="#boutique" className="lien" onClick={() => choisirCategorie('nouveautes')}>Tout voir</a>
      </div>
      <div className="rangee">
        {produits.map((p) => <ProductCard key={p.id} produit={p} ouvrir={ouvrir} ajouter={ajouter} />)}
      </div>
    </section>
  );
}

export function Maison() {
  return (
    <section className="maison" aria-labelledby="titre-maison">
      <Photo cle="maison" alt="Deux amies à une terrasse de village, sous un store rayé" className="maison-photo" />
      <div className="maison-voile" aria-hidden="true" />
      <div className="maison-texte">
        <h2 id="titre-maison">Pensée dans le Sud, portée partout</h2>
        <p>
          Les Filles du Sud, ce sont des vêtements simples et lumineux, dessinés pour les marchés du matin,
          les criques à midi et les terrasses du soir.
        </p>
        <p>
          Du lin qui se froisse joliment, des imprimés qui sentent les vacances et des paniers qu’on garde
          d’un été à l’autre.
        </p>
        <a href="#histoire" className="bouton bouton-blanc">Lire notre histoire</a>
      </div>
    </section>
  );
}

export function Reassurance() {
  const points = [
    { titre: 'Livraison offerte', texte: 'Dès 80 € d’achat, en 2 à 4 jours ouvrés.' },
    { titre: 'Retours gratuits', texte: 'Vous avez 30 jours pour changer d’avis.' },
    { titre: 'Paiement sécurisé', texte: 'Carte bancaire, PayPal ou Apple Pay.' },
  ];
  return (
    <section className="reassurance" aria-label="Nos engagements">
      {points.map((p) => (
        <div key={p.titre}>
          <h3>{p.titre}</h3>
          <p>{p.texte}</p>
        </div>
      ))}
    </section>
  );
}

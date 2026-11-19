import Photo from './Photo';
import ProductCard from './ProductCard';
import Icone from './Icones';

const tuiles = [
  { id: 'robes', nom: 'Robes' },
  { id: 'maillots', nom: 'Maillots de bain' },
  { id: 'sacs', nom: 'Sacs' },
  { id: 'accessoires', nom: 'Accessoires' },
];

export function EnteteSection({ surtitre, titre, id, clair = false }) {
  return (
    <div className={`entete-section apparition ${clair ? 'entete-section-clair' : ''}`}>
      <p className="surtitre">{surtitre}</p>
      <h2 id={id} className="titre-section">{titre}</h2>
    </div>
  );
}

export function Categories({ choisirCategorie }) {
  return (
    <section className="categories" aria-labelledby="titre-categories">
      <div className="categories-blobs" aria-hidden="true"><span /><span /><span /></div>
      <EnteteSection surtitre="La collection" titre="Choisis ta vibe" id="titre-categories" clair />
      <div className="categories-grille">
        {tuiles.map((t, i) => (
          <a key={t.id} href="#boutique" className="tuile apparition" style={{ '--delai': `${i * 90}ms` }} onClick={() => choisirCategorie(t.id)}>
            <Photo cle={t.id} alt={t.nom} className="tuile-photo" />
            <span className="tuile-etiquette">
              <Icone nom={t.id} className="tuile-icone" />
              <span>{t.nom}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Nouveautes({ produits, ouvrir, ajouter, choisirCategorie }) {
  return (
    <section className="section nouveautes" aria-labelledby="titre-nouveautes">
      <EnteteSection surtitre="Tout frais, tout chaud" titre="Nouveautés" id="titre-nouveautes" />
      <div className="rangee">
        {produits.map((p) => <ProductCard key={p.id} produit={p} ouvrir={ouvrir} ajouter={ajouter} />)}
      </div>
      <div className="section-action">
        <a href="#boutique" className="bouton bouton-vibe" onClick={() => choisirCategorie('nouveautes')}>Tout voir</a>
      </div>
    </section>
  );
}

export function Maison() {
  return (
    <section className="maison" aria-labelledby="titre-maison">
      <Photo cle="maison" alt="Deux amies à une terrasse de village, sous un store rayé" className="maison-photo" />
      <div className="maison-voile" aria-hidden="true" />
      <div className="maison-texte apparition">
        <p className="surtitre">La maison</p>
        <h2 id="titre-maison">Pensée au soleil</h2>
        <p>
          Des pièces simples et lumineuses, dessinées à Marseille pour les marchés du matin,
          les criques à midi et les apéros en terrasse quand le soleil tombe.
        </p>
        <a href="#histoire" className="bouton bouton-fantome">Notre histoire</a>
      </div>
    </section>
  );
}

export function Reassurance() {
  const points = [
    { icone: '☀', titre: 'Livraison offerte', texte: 'Dès 80 € d’achat, en 2 à 4 jours ouvrés.' },
    { icone: '↺', titre: 'Retours gratuits', texte: 'Tu as 30 jours pour changer d’avis.' },
    { icone: '✓', titre: 'Paiement sécurisé', texte: 'Carte bancaire, PayPal ou Apple Pay.' },
  ];
  return (
    <section className="reassurance" aria-label="Nos engagements">
      {points.map((p, i) => (
        <div key={p.titre} className="apparition" style={{ '--delai': `${i * 100}ms` }}>
          <span className="reassurance-icone" aria-hidden="true">{p.icone}</span>
          <h3>{p.titre}</h3>
          <p>{p.texte}</p>
        </div>
      ))}
    </section>
  );
}

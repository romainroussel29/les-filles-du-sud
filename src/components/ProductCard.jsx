import Photo from './Photo';
import { formatPrix } from '../data/produits';

export default function ProductCard({ produit, ouvrir, ajouter }) {
  const unique = produit.tailles.length === 1;

  return (
    <article className="carte">
      <div className="carte-media">
        <button className="carte-image" onClick={() => ouvrir(produit)} aria-label={`Voir ${produit.nom}`}>
          <Photo cle={produit.id} alt={`${produit.nom}, ${produit.coloris}`} />
        </button>
        {produit.nouveau && <span className="etiquette">Nouveau</span>}
        <div className="ajout-rapide">
          {unique ? (
            <button onClick={() => ajouter(produit, produit.tailles[0])}>Ajouter au panier</button>
          ) : (
            <>
              <span className="ajout-libelle">Ajout rapide</span>
              <div className="ajout-tailles">
                {produit.tailles.map((t) => (
                  <button key={t} onClick={() => ajouter(produit, t)} aria-label={`Ajouter ${produit.nom} en ${t}`}>{t}</button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <button className="carte-infos" onClick={() => ouvrir(produit)} tabIndex={-1} aria-hidden="true">
        <span className="carte-nom">{produit.nom}</span>
        <span className="carte-prix">{formatPrix(produit.prix)}</span>
      </button>
      <p className="carte-coloris">{produit.coloris}</p>
    </article>
  );
}

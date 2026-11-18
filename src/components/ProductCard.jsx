import { useState } from 'react';
import Photo from './Photo';
import { formatPrix } from '../data/produits';

export default function ProductCard({ produit, ouvrir, ajouter }) {
  const unique = produit.tailles.length === 1;
  const [tailles, setTailles] = useState(false);

  const plus = () => (unique ? ajouter(produit, produit.tailles[0]) : setTailles((v) => !v));

  return (
    <article className="carte" onMouseLeave={() => setTailles(false)}>
      <div className="carte-media">
        <button className="carte-image" onClick={() => ouvrir(produit)} aria-label={`Voir ${produit.nom}`}>
          <Photo cle={produit.id} alt={`${produit.nom}, ${produit.coloris}`} />
        </button>
        {tailles && (
          <div className="carte-tailles" role="group" aria-label={`Choisir une taille pour ${produit.nom}`}>
            {produit.tailles.map((t) => (
              <button key={t} onClick={() => { ajouter(produit, t); setTailles(false); }}>{t}</button>
            ))}
          </div>
        )}
        <button
          className="carte-plus"
          onClick={plus}
          aria-label={unique ? `Ajouter ${produit.nom} au panier` : `Ajout rapide de ${produit.nom}`}
          aria-expanded={unique ? undefined : tailles}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M8 2 V14 M2 8 H14" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>
      <div className="carte-infos">
        <button className="carte-nom" onClick={() => ouvrir(produit)} tabIndex={-1} aria-hidden="true">{produit.nom}</button>
        {produit.nouveau && <span className="badge-nouveau">Nouveau</span>}
      </div>
      <p className="carte-prix">{formatPrix(produit.prix)}</p>
    </article>
  );
}

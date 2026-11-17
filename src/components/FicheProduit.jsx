import { useState } from 'react';
import Fenetre from './Fenetre';
import Photo from './Photo';
import { formatPrix, nomCategorie, SEUIL_LIVRAISON } from '../data/produits';

export default function FicheProduit({ produit, fermer, ajouter }) {
  return (
    <Fenetre ouvert={!!produit} fermer={fermer} variante="fiche" titre={produit?.nom}>
      {produit && <Contenu key={produit.id} produit={produit} ajouter={ajouter} />}
    </Fenetre>
  );
}

function Contenu({ produit, ajouter }) {
  const unique = produit.tailles.length === 1;
  const [taille, setTaille] = useState(unique ? produit.tailles[0] : null);
  const [erreur, setErreur] = useState(false);
  const libelle = produit.categorie === 'accessoires' && !unique ? 'Pointure' : 'Taille';

  const valider = () => {
    if (!taille) { setErreur(true); return; }
    ajouter(produit, taille);
  };

  return (
    <div className="fiche">
      <div className="fiche-visuel">
        <Photo cle={produit.id} alt={`${produit.nom}, ${produit.coloris}`} prioritaire />
      </div>
      <div className="fiche-infos">
        <p className="fiche-categorie">{nomCategorie(produit.categorie)}</p>
        <h2 className="fiche-nom">{produit.nom}</h2>
        <p className="fiche-prix">{formatPrix(produit.prix)}</p>
        <p className="fiche-description">{produit.description}</p>
        <p className="fiche-coloris">Coloris : {produit.coloris}</p>

        {!unique && (
          <fieldset className="tailles">
            <legend>{libelle}</legend>
            <div className="tailles-liste">
              {produit.tailles.map((t) => (
                <label key={t} className={`taille ${taille === t ? 'choisie' : ''}`}>
                  <input type="radio" name="taille" value={t} checked={taille === t} onChange={() => { setTaille(t); setErreur(false); }} />
                  {t}
                </label>
              ))}
            </div>
            {erreur && <p className="erreur" role="alert">Choisissez une {libelle.toLowerCase()} pour ajouter cette pièce au panier.</p>}
          </fieldset>
        )}

        <button className="bouton bouton-noir bouton-large" onClick={valider}>
          Ajouter au panier, {formatPrix(produit.prix)}
        </button>

        <div className="fiche-plus">
          <details>
            <summary>Matière et entretien</summary>
            <p>{produit.matiere}. Lavage délicat à 30 °C, séchage à plat.</p>
          </details>
          <details>
            <summary>Livraison et retours</summary>
            <p>Livraison offerte dès {SEUIL_LIVRAISON} € d’achat, en 2 à 4 jours ouvrés. Retours gratuits sous 30 jours.</p>
          </details>
        </div>
      </div>
    </div>
  );
}

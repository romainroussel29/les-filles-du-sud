import Fenetre from './Fenetre';
import Photo from './Photo';
import { formatPrix, SEUIL_LIVRAISON } from '../data/produits';

export default function Panier({ ouvert, fermer, articles, changerQuantite, sousTotal, nbArticles, commander }) {
  const reste = SEUIL_LIVRAISON - sousTotal;
  const progression = Math.min(100, (sousTotal / SEUIL_LIVRAISON) * 100);

  return (
    <Fenetre ouvert={ouvert} fermer={fermer} variante="tiroir" titre="Votre panier">
      <div className="panier">
        <h2 className="panier-titre">Panier ({nbArticles})</h2>

        {articles.length === 0 ? (
          <div className="panier-vide">
            <p>Votre panier est vide.</p>
            <button className="bouton bouton-noir" onClick={fermer}>Découvrir la collection</button>
          </div>
        ) : (
          <>
            <div className="panier-livraison">
              <p>
                {reste > 0
                  ? <>Plus que {formatPrix(reste)} pour profiter de la livraison offerte.</>
                  : <>La livraison vous est offerte.</>}
              </p>
              <div className="jauge" aria-hidden="true"><span style={{ width: `${progression}%` }} /></div>
            </div>
            <ul className="panier-liste">
              {articles.map((a) => (
                <li key={a.cle} className="ligne">
                  <Photo cle={a.produit.id} alt={a.produit.nom} className="ligne-photo" />
                  <div className="ligne-infos">
                    <p className="ligne-nom">{a.produit.nom}</p>
                    <p className="ligne-detail">{a.produit.coloris} · {a.taille}</p>
                    <div className="quantite">
                      <button onClick={() => changerQuantite(a.cle, -1)} aria-label={`Retirer un exemplaire de ${a.produit.nom}`}>−</button>
                      <span aria-live="polite">{a.quantite}</span>
                      <button onClick={() => changerQuantite(a.cle, 1)} aria-label={`Ajouter un exemplaire de ${a.produit.nom}`}>+</button>
                    </div>
                  </div>
                  <p className="ligne-prix">{formatPrix(a.produit.prix * a.quantite)}</p>
                </li>
              ))}
            </ul>
            <div className="panier-pied">
              <p className="total"><span>Sous-total</span><span>{formatPrix(sousTotal)}</span></p>
              <button className="bouton bouton-noir bouton-large" onClick={commander}>Passer commande</button>
            </div>
          </>
        )}
      </div>
    </Fenetre>
  );
}

import { useState } from 'react';
import { categories } from '../data/produits';
import { Embleme } from './Logo';

export default function Footer({ choisirCategorie }) {
  const [email, setEmail] = useState('');
  const [inscrite, setInscrite] = useState(false);

  return (
    <footer className="pied">
      <div className="pied-haut">
        <div className="pied-lettre">
          <h2>Rejoignez les Filles du Sud</h2>
          <p>Les nouveautés, les ventes privées et un peu de soleil dans votre boîte mail.</p>
          {inscrite ? (
            <p className="pied-confirmation" role="status">C’est noté : vous recevrez nos nouvelles à {email}.</p>
          ) : (
            <form className="pied-form" onSubmit={(e) => { e.preventDefault(); setInscrite(true); }}>
              <label htmlFor="newsletter" className="visuellement-cache">Votre adresse e-mail</label>
              <input id="newsletter" type="email" required placeholder="Votre adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit">S’inscrire</button>
            </form>
          )}
        </div>

        <div className="pied-colonnes">
          <div>
            <h3>Collection</h3>
            <ul>
              {categories.map((c) => (
                <li key={c.id}><a href="#boutique" onClick={() => choisirCategorie(c.id)}>{c.nom}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Aide</h3>
            <ul>
              <li><a href="#">Livraison</a></li>
              <li><a href="#">Retours et échanges</a></li>
              <li><a href="#">Guide des tailles</a></li>
              <li><a href="#">Nous contacter</a></li>
            </ul>
          </div>
          <div>
            <h3>La maison</h3>
            <ul>
              <li><a href="#histoire">Notre histoire</a></li>
              <li><a href="#mentions-legales">Mentions légales</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pied-marque" aria-hidden="true">
        <Embleme className="pied-embleme" />
        <p>Les Filles du Sud</p>
      </div>
      <p className="pied-bas">© {new Date().getFullYear()} Les Filles du Sud. Tous droits réservés.</p>
    </footer>
  );
}

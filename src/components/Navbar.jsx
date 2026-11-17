import { useEffect, useState } from 'react';
import Logo from './Logo';

const liens = [
  { id: 'nouveautes', nom: 'Nouveautés' },
  { id: 'robes', nom: 'Robes' },
  { id: 'maillots', nom: 'Maillots' },
  { id: 'sacs', nom: 'Sacs' },
  { id: 'accessoires', nom: 'Accessoires' },
];

export default function Navbar({ nbArticles, ouvrirPanier, choisirCategorie, toujoursPlein = false }) {
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const maj = () => setDefile(window.scrollY > 40);
    maj();
    window.addEventListener('scroll', maj, { passive: true });
    return () => window.removeEventListener('scroll', maj);
  }, []);

  return (
    <header className={`entete ${defile || toujoursPlein ? 'entete-plein' : ''}`}>
      <p className="annonce">Livraison offerte dès 80 € et retours gratuits sous 30 jours</p>
      <nav className="nav" aria-label="Navigation principale">
        <ul className="nav-liens">
          {liens.map((l) => (
            <li key={l.id}>
              <a href="#boutique" onClick={() => choisirCategorie(l.id)}>{l.nom}</a>
            </li>
          ))}
        </ul>
        <a href="#" className="logo" aria-label="Les Filles du Sud, accueil"><Logo /></a>
        <div className="nav-droite">
          <a href="#boutique" className="nav-icone" aria-label="Rechercher" onClick={() => choisirCategorie('tout', true)}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M15.5 15.5 L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
          <button className="nav-panier" onClick={ouvrirPanier} aria-label={`Ouvrir le panier, ${nbArticles} article${nbArticles > 1 ? 's' : ''}`}>
            Panier <span className="nav-compte">({nbArticles})</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

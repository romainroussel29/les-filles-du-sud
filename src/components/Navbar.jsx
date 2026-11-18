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
      <p className="annonce">Livraison offerte dès 80 € — Retours gratuits sous 30 jours</p>
      <nav className="nav" aria-label="Navigation principale">
        <a href="#" className="logo" aria-label="Les Filles du Sud, accueil"><Logo /></a>
        <ul className="nav-liens">
          {liens.map((l) => (
            <li key={l.id}>
              <a href="#boutique" onClick={() => choisirCategorie(l.id)}>{l.nom}</a>
            </li>
          ))}
        </ul>
        <div className="nav-droite">
          <a href="#boutique" className="nav-lien" onClick={() => choisirCategorie('tout', true)}>Recherche</a>
          <button className="nav-lien" onClick={ouvrirPanier} aria-label={`Ouvrir le panier, ${nbArticles} article${nbArticles > 1 ? 's' : ''}`}>
            Panier ({nbArticles})
          </button>
        </div>
      </nav>
    </header>
  );
}

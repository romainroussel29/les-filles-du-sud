import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Categories, Nouveautes, Maison, Reassurance, EnteteSection } from './components/Univers';
import ProductCard from './components/ProductCard';
import FicheProduit from './components/FicheProduit';
import Panier from './components/Panier';
import Commande from './components/Commande';
import Footer from './components/Footer';
import { Histoire, MentionsLegales } from './components/Pages';
import { categories, produits } from './data/produits';

const CLE_STOCKAGE = 'lfs_panier';

function lirePanier() {
  try {
    const brut = JSON.parse(localStorage.getItem(CLE_STOCKAGE)) ?? [];
    return brut.filter((a) => a.cle && produits.some((p) => p.id === a.id));
  } catch {
    return [];
  }
}

const filtres = [
  { id: 'tout', nom: 'Tout voir' },
  { id: 'nouveautes', nom: 'Nouveautés' },
  ...categories,
];

const tris = {
  defaut: { nom: 'Notre sélection', fn: (a, b) => a.id - b.id },
  croissant: { nom: 'Prix croissant', fn: (a, b) => a.prix - b.prix },
  decroissant: { nom: 'Prix décroissant', fn: (a, b) => b.prix - a.prix },
};

const nouveautes = produits.filter((p) => p.nouveau);

const PAGES = { '#histoire': Histoire, '#mentions-legales': MentionsLegales };
const lireHash = () => window.location.hash;

export default function App() {
  const [categorie, setCategorie] = useState('tout');
  const [recherche, setRecherche] = useState('');
  const [tri, setTri] = useState('defaut');
  const [panier, setPanier] = useState(lirePanier);
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [commandeOuverte, setCommandeOuverte] = useState(false);
  const [produitOuvert, setProduitOuvert] = useState(null);
  const champRecherche = useRef(null);
  const [hash, setHash] = useState(lireHash);

  // Navigation entre l'accueil et les pages « Notre histoire » / « Mentions légales »
  useEffect(() => {
    const maj = () => {
      const h = lireHash();
      setHash(h);
      if (PAGES[h]) window.scrollTo(0, 0);
      else if (h) requestAnimationFrame(() => document.querySelector(h)?.scrollIntoView());
      else window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', maj);
    return () => window.removeEventListener('hashchange', maj);
  }, []);
  const Page = PAGES[hash];

  useEffect(() => {
    try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify(panier)); } catch { /* stockage indisponible */ }
  }, [panier]);

  const affiches = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return produits
      .filter((p) => categorie === 'tout' || (categorie === 'nouveautes' ? p.nouveau : p.categorie === categorie))
      .filter((p) => !q || `${p.nom} ${p.coloris} ${p.matiere}`.toLowerCase().includes(q))
      .sort(tris[tri].fn);
  }, [categorie, recherche, tri]);

  const articles = panier.map((a) => ({ ...a, produit: produits.find((p) => p.id === a.id) }));
  const nbArticles = panier.reduce((s, a) => s + a.quantite, 0);
  const sousTotal = articles.reduce((s, a) => s + a.produit.prix * a.quantite, 0);

  const ajouter = (produit, taille) => {
    const cle = `${produit.id}-${taille}`;
    setPanier((prev) =>
      prev.some((a) => a.cle === cle)
        ? prev.map((a) => (a.cle === cle ? { ...a, quantite: a.quantite + 1 } : a))
        : [...prev, { cle, id: produit.id, taille, quantite: 1 }]
    );
    setProduitOuvert(null);
    setPanierOuvert(true);
  };

  const changerQuantite = (cle, delta) => {
    setPanier((prev) =>
      prev
        .map((a) => (a.cle === cle ? { ...a, quantite: a.quantite + delta } : a))
        .filter((a) => a.quantite > 0)
    );
  };

  const choisirCategorie = (id, chercher = false) => {
    setCategorie(id);
    setRecherche('');
    if (chercher) setTimeout(() => champRecherche.current?.focus({ preventScroll: true }), 400);
  };

  const titre = categorie === 'tout' ? 'La collection' : filtres.find((f) => f.id === categorie)?.nom;

  return (
    <>
      <Navbar nbArticles={nbArticles} ouvrirPanier={() => setPanierOuvert(true)} choisirCategorie={choisirCategorie} toujoursPlein={Page === MentionsLegales} />

      {Page ? <main><Page /></main> : (
      <main>
        <Hero choisirCategorie={choisirCategorie} />
        <Categories choisirCategorie={choisirCategorie} />
        <Nouveautes produits={nouveautes} ouvrir={setProduitOuvert} ajouter={ajouter} choisirCategorie={choisirCategorie} />
        <Maison />

        <section id="boutique" className="section boutique" aria-labelledby="titre-boutique">
          <EnteteSection surtitre={`Boutique — ${affiches.length} pièce${affiches.length > 1 ? 's' : ''}`} titre={titre} id="titre-boutique" />

          <div className="filtres">
            <div className="filtres-categories" role="group" aria-label="Catégories">
              {filtres.map((f) => (
                <button
                  key={f.id}
                  className={`filtre ${categorie === f.id ? 'actif' : ''}`}
                  aria-pressed={categorie === f.id}
                  onClick={() => setCategorie(f.id)}
                >
                  {f.nom}
                </button>
              ))}
            </div>
            <div className="filtres-outils">
              <label className="recherche">
                <span className="visuellement-cache">Rechercher</span>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M15.5 15.5 L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input ref={champRecherche} type="search" placeholder="Rechercher" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
              </label>
              <label className="tri">
                <span className="visuellement-cache">Trier par</span>
                <select value={tri} onChange={(e) => setTri(e.target.value)}>
                  {Object.entries(tris).map(([id, t]) => <option key={id} value={id}>{t.nom}</option>)}
                </select>
              </label>
            </div>
          </div>

          {affiches.length === 0 ? (
            <div className="aucun">
              <p>Aucune pièce ne correspond à « {recherche} ».</p>
              <button className="bouton bouton-noir" onClick={() => { setRecherche(''); setCategorie('tout'); }}>
                Voir toute la collection
              </button>
            </div>
          ) : (
            <div className="grille">
              {affiches.map((p) => <ProductCard key={p.id} produit={p} ouvrir={setProduitOuvert} ajouter={ajouter} />)}
            </div>
          )}
        </section>

        <Reassurance />
      </main>
      )}

      <Footer choisirCategorie={choisirCategorie} />

      <FicheProduit produit={produitOuvert} fermer={() => setProduitOuvert(null)} ajouter={ajouter} />
      <Panier
        ouvert={panierOuvert}
        fermer={() => setPanierOuvert(false)}
        articles={articles}
        changerQuantite={changerQuantite}
        sousTotal={sousTotal}
        nbArticles={nbArticles}
        commander={() => { setPanierOuvert(false); setCommandeOuverte(true); }}
      />
      <Commande
        ouvert={commandeOuverte}
        fermer={() => setCommandeOuverte(false)}
        articles={articles}
        sousTotal={sousTotal}
        valider={() => setPanier([])}
      />
    </>
  );
}

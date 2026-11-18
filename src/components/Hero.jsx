import Photo from './Photo';

export default function Hero({ choisirCategorie }) {
  return (
    <section className="hero">
      <Photo cle="hero" alt="Une femme en robe longue bleu ciel sur les rochers d’une calanque, face à la mer" className="hero-photo" prioritaire />
      <div className="hero-voile" aria-hidden="true" />
      <div className="hero-texte">
        <p className="surtitre">Collection été 2026</p>
        <h1>Nées sous le soleil</h1>
        <a href="#boutique" className="bouton bouton-fantome" onClick={() => choisirCategorie('tout')}>
          Découvrir la collection
        </a>
      </div>
    </section>
  );
}

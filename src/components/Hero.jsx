import Photo from './Photo';

export default function Hero({ choisirCategorie }) {
  return (
    <section className="hero">
      <Photo cle="hero" alt="Une femme en robe longue bleu ciel sur les rochers d’une calanque, face à la mer" className="hero-photo" prioritaire />
      <div className="hero-voile" aria-hidden="true" />
      <div className="hero-texte">
        <h1>Nées sous le soleil</h1>
        <p>La collection d’été : robes en lin, maillots de bain et paniers tressés.</p>
        <a href="#boutique" className="bouton bouton-blanc" onClick={() => choisirCategorie('tout')}>
          Découvrir la collection
        </a>
      </div>
    </section>
  );
}

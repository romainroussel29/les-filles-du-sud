import { imageDe } from '../data/images';
import { Sticker } from './Effets';

export default function Hero({ choisirCategorie }) {
  return (
    <section className="hero">
      <video
        className="photo hero-photo"
        src="/images/accueil.mp4"
        poster={imageDe('hero') ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-voile" aria-hidden="true" />
      <div className="hero-halo" aria-hidden="true" />
      <div className="hero-texte">
        <p className="surtitre hero-pastille">☀ Collection été 2026</p>
        <h1>
          <span className="hero-ligne">Toute la</span>
          <span className="hero-ligne hero-vibe">vibe</span>
          <span className="hero-ligne">du Sud</span>
        </h1>
        <p className="hero-manuscrit">soleil, sel &amp; lin</p>
        <a href="#boutique" className="bouton bouton-vibe" onClick={() => choisirCategorie('tout')}>
          Je découvre la collec
        </a>
      </div>
      <Sticker className="hero-sticker" />
      <a href="#titre-categories" className="hero-defiler" aria-label="Descendre vers la collection">
        <span />
      </a>
    </section>
  );
}

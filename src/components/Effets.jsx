import { useEffect, useState } from 'react';

// Bandeau de texte qui défile en boucle (le contenu est doublé pour un raccord invisible).
export function Defilant({ mots, variante = 'soleil', inverse = false }) {
  const suite = (cle) => (
    <span className="defilant-suite" key={cle} aria-hidden={cle > 0 || undefined}>
      {mots.map((m, i) => (
        <span key={i} className="defilant-mot">
          {m}<span className="defilant-etoile">✺</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={`defilant defilant-${variante} ${inverse ? 'defilant-inverse' : ''}`}>
      <div className="defilant-piste">{[0, 1].map(suite)}</div>
    </div>
  );
}

// Fine barre dégradée en haut de l'écran qui suit la lecture de la page.
export function BarreProgression() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const maj = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? window.scrollY / max : 0);
      });
    };
    maj();
    window.addEventListener('scroll', maj, { passive: true });
    window.addEventListener('resize', maj);
    return () => { window.removeEventListener('scroll', maj); window.removeEventListener('resize', maj); cancelAnimationFrame(raf); };
  }, []);
  return <div className="progression" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

// Pastille ronde avec un texte qui tourne autour d'un soleil.
export function Sticker({ texte = 'Vibe du Sud • Été 2026 • Marseille • ', className = '' }) {
  return (
    <span className={`sticker ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="sticker-texte">
        <defs>
          <path id="cercle-sticker" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <text><textPath href="#cercle-sticker">{texte}</textPath></text>
      </svg>
      <span className="sticker-coeur">☀</span>
    </span>
  );
}

// Fait apparaître en douceur tout élément portant la classe « apparition »
// quand il entre dans l'écran, y compris ceux ajoutés plus tard (filtres, pages).
export function Apparitions() {
  useEffect(() => {
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduit || !('IntersectionObserver' in window)) {
      const toutAfficher = () => document.querySelectorAll('.apparition').forEach((el) => el.classList.add('vu'));
      toutAfficher();
      const mo = new MutationObserver(toutAfficher);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    const brancher = () => document.querySelectorAll('.apparition:not(.vu)').forEach((el) => io.observe(el));
    brancher();
    const mo = new MutationObserver(brancher);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}

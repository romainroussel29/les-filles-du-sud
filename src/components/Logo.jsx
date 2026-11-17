// Logo Les Filles du Sud : un soleil qui se lève sur la Méditerranée, suivi du nom.
// Il prend la couleur du texte (currentColor) pour passer du blanc au noir avec l'en-tête.

export function Embleme({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M9.5 22 A10.5 10.5 0 0 1 30.5 22 Z" fill="currentColor" />
      <path d="M2 27.5 q4.5 -3 9 0 t9 0 t9 0 t9 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6.5 33 q4.5 -3 9 0 t9 0 t9 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ className = '' }) {
  return (
    <span className={`logo-marque ${className}`}>
      <Embleme className="logo-embleme" />
      <span className="logo-texte">Les Filles du Sud</span>
    </span>
  );
}

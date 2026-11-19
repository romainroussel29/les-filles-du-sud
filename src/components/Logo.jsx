// Logo Vibe du Sud : un soleil qui se lève sur la Méditerranée, suivi du nom.
// Il prend la couleur du texte (currentColor) pour passer du blanc au noir avec l'en-tête.

export function Embleme({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g className="embleme-rayons" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M20 4 V8" />
        <path d="M8.7 8.7 L11.5 11.5" />
        <path d="M31.3 8.7 L28.5 11.5" />
        <path d="M3 18 H7" />
        <path d="M33 18 H37" />
      </g>
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
      <span className="logo-texte">Vibe <em>du</em> Sud</span>
    </span>
  );
}

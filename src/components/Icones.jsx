// Petites silhouettes blanches pour les bandeaux de catégories (style étiquette).
const traits = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round', strokeLinecap: 'round' };

const chemins = {
  robes: <path {...traits} d="M9 2.5 L9.6 7 L8 9.5 L5 21.5 H19 L16 9.5 L14.4 7 L15 2.5 M9.6 7 H14.4" />,
  maillots: <path {...traits} d="M8.5 2.5 Q12 9 15.5 2.5 Q15.2 9 17 12 L17.3 16 Q14 17 12 21.5 Q10 17 6.7 16 L7 12 Q8.8 9 8.5 2.5 Z" />,
  sacs: <path {...traits} d="M4.5 9 H19.5 L18.5 21.5 H5.5 Z M8.5 9 Q8.5 3 12 3 Q15.5 3 15.5 9" />,
  accessoires: <path {...traits} d="M2 15.5 Q12 19.5 22 15.5 Q20 14 17 14 Q16.5 7 12 7 Q7.5 7 7 14 Q4 14 2 15.5 Z M7 13 Q12 14.5 17 13" />,
};

export default function Icone({ nom, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {chemins[nom]}
    </svg>
  );
}

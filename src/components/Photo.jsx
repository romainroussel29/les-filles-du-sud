import { useState } from 'react';
import { imageDe } from '../data/images';

// Affiche l'image générée ; tant qu'elle n'existe pas, un aplat pierre avec le nom.
export default function Photo({ cle, alt, className = '', prioritaire = false }) {
  const src = imageDe(cle);
  const [erreur, setErreur] = useState(false);

  if (!src || erreur) {
    return (
      <span className={`photo photo-attente ${className}`} role="img" aria-label={alt}>
        <span>{alt}</span>
      </span>
    );
  }

  return (
    <img
      className={`photo ${className}`}
      src={src}
      alt={alt}
      loading={prioritaire ? 'eager' : 'lazy'}
      fetchPriority={prioritaire ? 'high' : undefined}
      decoding="async"
      onError={() => setErreur(true)}
    />
  );
}

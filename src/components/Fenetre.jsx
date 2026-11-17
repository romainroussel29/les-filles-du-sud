import { useEffect, useRef } from 'react';

// Boîte de dialogue native : gère le focus, la touche Échap et le fond.
export default function Fenetre({ ouvert, fermer, variante = 'centre', titre, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (ouvert && !d.open) d.showModal();
    if (!ouvert && d.open) d.close();
  }, [ouvert]);

  return (
    <dialog
      ref={ref}
      className={`fenetre fenetre-${variante}`}
      aria-label={titre}
      onClose={fermer}
      onClick={(e) => { if (e.target === ref.current) fermer(); }}
    >
      {ouvert && (
        <div className="fenetre-contenu">
          <button className="fermer" onClick={fermer} aria-label="Fermer">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}

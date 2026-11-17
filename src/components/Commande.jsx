import { useState } from 'react';
import Fenetre from './Fenetre';
import Photo from './Photo';
import { formatPrix, SEUIL_LIVRAISON } from '../data/produits';

// ATTENTION : aucun paiement n'est réellement encaissé ici. Avant la mise en ligne,
// branchez un prestataire de paiement (Stripe, PayPal, etc.) dans `payer()`.
// Les données de carte ne sont ni enregistrées ni envoyées.

const MODES_LIVRAISON = [
  { id: 'domicile', nom: 'Colissimo à domicile', delai: '2 à 4 jours ouvrés', prix: 4.9 },
  { id: 'relais', nom: 'Point relais', delai: '3 à 5 jours ouvrés', prix: 3.9 },
  { id: 'express', nom: 'Express', delai: 'Livré demain avant 13 h', prix: 9.9, jamaisOffert: true },
];

const VIDE = { email: '', prenom: '', nom: '', adresse: '', complement: '', codePostal: '', ville: '', telephone: '', livraison: 'domicile' };
const CARTE_VIDE = { numero: '', titulaire: '', expiration: '', cvc: '' };

const chiffres = (s) => s.replace(/\D/g, '');

function luhn(numero) {
  const n = chiffres(numero);
  if (n.length < 13 || n.length > 19) return false;
  let somme = 0;
  for (let i = 0; i < n.length; i++) {
    let d = Number(n[n.length - 1 - i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    somme += d;
  }
  return somme % 10 === 0;
}

function reseau(numero) {
  const n = chiffres(numero);
  if (/^4/.test(n)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n)) return 'American Express';
  return null;
}

function expirationValide(exp) {
  const m = exp.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const mois = Number(m[1]);
  if (mois < 1 || mois > 12) return false;
  const fin = new Date(2000 + Number(m[2]), mois, 1);
  return fin > new Date();
}

export default function Commande({ ouvert, fermer, articles, sousTotal, valider }) {
  const [etape, setEtape] = useState('livraison');
  const [form, setForm] = useState(VIDE);
  const [moyen, setMoyen] = useState('carte');
  const [carte, setCarte] = useState(CARTE_VIDE);
  const [erreurs, setErreurs] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const mode = MODES_LIVRAISON.find((m) => m.id === form.livraison);
  const offert = sousTotal >= SEUIL_LIVRAISON && !mode.jamaisOffert;
  const livraison = offert ? 0 : mode.prix;
  const total = sousTotal + livraison;

  const maj = (champ) => (e) => setForm({ ...form, [champ]: e.target.value });

  const majCarte = (champ) => (e) => {
    let v = e.target.value;
    if (champ === 'numero') v = chiffres(v).slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
    if (champ === 'expiration') {
      const c = chiffres(v).slice(0, 4);
      v = c.length > 2 ? `${c.slice(0, 2)}/${c.slice(2)}` : c;
    }
    if (champ === 'cvc') v = chiffres(v).slice(0, 4);
    setCarte({ ...carte, [champ]: v });
    setErreurs({ ...erreurs, [champ]: null });
  };

  const continuer = (e) => {
    e.preventDefault();
    setEtape('paiement');
  };

  const payer = (e) => {
    e.preventDefault();
    if (moyen === 'carte') {
      const err = {};
      if (!luhn(carte.numero)) err.numero = 'Ce numéro de carte n’est pas valide.';
      if (!expirationValide(carte.expiration)) err.expiration = 'Date invalide ou carte expirée.';
      if (carte.cvc.length < 3) err.cvc = '3 ou 4 chiffres au dos de la carte.';
      if (!carte.titulaire.trim()) err.titulaire = 'Indiquez le nom inscrit sur la carte.';
      if (Object.keys(err).length) { setErreurs(err); return; }
    }
    setEtape('traitement');
    setTimeout(() => {
      setConfirmation({
        numero: 'LFS-' + Math.floor(100000 + Math.random() * 900000),
        total, mode, email: form.email, prenom: form.prenom,
        adresse: `${form.adresse}, ${form.codePostal} ${form.ville}`,
      });
      setCarte(CARTE_VIDE);
      setEtape('confirmee');
      valider();
    }, 2200);
  };

  const terminer = () => {
    setConfirmation(null);
    setForm(VIDE);
    setErreurs({});
    setEtape('livraison');
    fermer();
  };

  const fermerFenetre = () => {
    if (etape === 'traitement') return;
    if (etape === 'confirmee') terminer(); else fermer();
  };

  return (
    <Fenetre ouvert={ouvert} fermer={fermerFenetre} variante="commande" titre="Commande">
      {etape === 'confirmee' && confirmation ? (
        <div className="confirmation" role="status">
          <svg className="confirmation-coche" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 24.5 L21.5 31 L33.5 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2>Merci {confirmation.prenom} !</h2>
          <p>Votre commande <strong>{confirmation.numero}</strong> est confirmée.</p>
          <dl className="confirmation-details">
            <div><dt>Montant réglé</dt><dd>{formatPrix(confirmation.total)}</dd></div>
            <div><dt>Livraison</dt><dd>{confirmation.mode.nom}, {confirmation.mode.delai.toLowerCase()}</dd></div>
            <div><dt>Adresse</dt><dd>{confirmation.adresse}</dd></div>
          </dl>
          <p>Un e-mail de confirmation vient de partir à {confirmation.email}. Vous recevrez le lien de suivi dès l’expédition de votre colis.</p>
          <button className="bouton bouton-noir" onClick={terminer}>Continuer mes achats</button>
        </div>
      ) : etape === 'traitement' ? (
        <div className="traitement" role="status" aria-live="polite">
          <span className="roue" aria-hidden="true" />
          <p>Paiement sécurisé en cours…</p>
          <p className="traitement-aide">Merci de ne pas fermer cette fenêtre.</p>
        </div>
      ) : (
        <div className="caisse">
          <div className="caisse-formulaire">
            <ol className="etapes" aria-label="Étapes de la commande">
              <li className={etape === 'livraison' ? 'active' : 'faite'}>
                {etape === 'paiement' ? <button onClick={() => setEtape('livraison')}>Livraison</button> : 'Livraison'}
              </li>
              <li className={etape === 'paiement' ? 'active' : ''}>Paiement</li>
            </ol>

            {etape === 'livraison' ? (
              <form className="commande" onSubmit={continuer}>
                <h2>Vos coordonnées</h2>
                <label>E-mail
                  <input required type="email" autoComplete="email" value={form.email} onChange={maj('email')} />
                </label>
                <div className="commande-ligne commande-ligne-egale">
                  <label>Prénom<input required autoComplete="given-name" value={form.prenom} onChange={maj('prenom')} /></label>
                  <label>Nom<input required autoComplete="family-name" value={form.nom} onChange={maj('nom')} /></label>
                </div>
                <label>Adresse<input required autoComplete="address-line1" value={form.adresse} onChange={maj('adresse')} /></label>
                <label>Complément d’adresse (facultatif)<input autoComplete="address-line2" value={form.complement} onChange={maj('complement')} /></label>
                <div className="commande-ligne">
                  <label>Code postal
                    <input required inputMode="numeric" pattern="[0-9]{5}" title="5 chiffres" autoComplete="postal-code" value={form.codePostal} onChange={maj('codePostal')} />
                  </label>
                  <label>Ville<input required autoComplete="address-level2" value={form.ville} onChange={maj('ville')} /></label>
                </div>
                <label>Téléphone, pour le transporteur
                  <input required type="tel" autoComplete="tel" pattern="[0-9 +.]{10,}" title="Numéro de téléphone" value={form.telephone} onChange={maj('telephone')} />
                </label>

                <fieldset className="choix">
                  <legend>Mode de livraison</legend>
                  {MODES_LIVRAISON.map((m) => {
                    const gratuit = sousTotal >= SEUIL_LIVRAISON && !m.jamaisOffert;
                    return (
                      <label key={m.id} className={`choix-option ${form.livraison === m.id ? 'choisi' : ''}`}>
                        <input type="radio" name="livraison" value={m.id} checked={form.livraison === m.id} onChange={maj('livraison')} />
                        <span className="choix-texte"><strong>{m.nom}</strong><span>{m.delai}</span></span>
                        <span className="choix-prix">{gratuit ? 'Offerte' : formatPrix(m.prix)}</span>
                      </label>
                    );
                  })}
                </fieldset>

                <button type="submit" className="bouton bouton-noir bouton-large">Continuer vers le paiement</button>
              </form>
            ) : (
              <form className="commande" onSubmit={payer} noValidate>
                <h2>Paiement</h2>
                <fieldset className="choix">
                  <legend className="visuellement-cache">Moyen de paiement</legend>
                  {[
                    { id: 'carte', nom: 'Carte bancaire', detail: 'Visa, Mastercard, CB, American Express' },
                    { id: 'paypal', nom: 'PayPal', detail: 'Payez avec votre compte PayPal' },
                    { id: 'apple', nom: 'Apple Pay', detail: 'Validez avec Face ID ou Touch ID' },
                  ].map((m) => (
                    <label key={m.id} className={`choix-option ${moyen === m.id ? 'choisi' : ''}`}>
                      <input type="radio" name="moyen" value={m.id} checked={moyen === m.id} onChange={() => setMoyen(m.id)} />
                      <span className="choix-texte"><strong>{m.nom}</strong><span>{m.detail}</span></span>
                    </label>
                  ))}
                </fieldset>

                {moyen === 'carte' && (
                  <div className="carte-bancaire">
                    <label>Numéro de carte
                      <span className="champ-carte">
                        <input inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value={carte.numero} onChange={majCarte('numero')} aria-invalid={!!erreurs.numero} />
                        {reseau(carte.numero) && <span className="reseau">{reseau(carte.numero)}</span>}
                      </span>
                      {erreurs.numero && <span className="erreur">{erreurs.numero}</span>}
                    </label>
                    <div className="commande-ligne commande-ligne-egale">
                      <label>Date d’expiration
                        <input inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" value={carte.expiration} onChange={majCarte('expiration')} aria-invalid={!!erreurs.expiration} />
                        {erreurs.expiration && <span className="erreur">{erreurs.expiration}</span>}
                      </label>
                      <label>Cryptogramme
                        <input inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={carte.cvc} onChange={majCarte('cvc')} aria-invalid={!!erreurs.cvc} />
                        {erreurs.cvc && <span className="erreur">{erreurs.cvc}</span>}
                      </label>
                    </div>
                    <label>Nom sur la carte
                      <input autoComplete="cc-name" value={carte.titulaire} onChange={majCarte('titulaire')} aria-invalid={!!erreurs.titulaire} />
                      {erreurs.titulaire && <span className="erreur">{erreurs.titulaire}</span>}
                    </label>
                  </div>
                )}

                <button type="submit" className="bouton bouton-noir bouton-large">
                  {moyen === 'paypal' ? 'Payer avec PayPal' : moyen === 'apple' ? 'Payer avec Apple Pay' : `Payer ${formatPrix(total)}`}
                </button>
                <p className="securite">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 10 V7 a4 4 0 0 1 8 0 V10" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                  Paiement sécurisé, vos données bancaires sont chiffrées.
                </p>
              </form>
            )}
          </div>

          <aside className="caisse-recap" aria-label="Récapitulatif de la commande">
            <h2>Votre commande</h2>
            <ul>
              {articles.map((a) => (
                <li key={a.cle}>
                  <span className="recap-vignette">
                    <Photo cle={a.produit.id} alt={a.produit.nom} />
                    <span className="recap-quantite">{a.quantite}</span>
                  </span>
                  <span className="recap-nom">{a.produit.nom}<small>{a.produit.coloris}, {a.taille}</small></span>
                  <span>{formatPrix(a.produit.prix * a.quantite)}</span>
                </li>
              ))}
            </ul>
            <dl className="recap">
              <div><dt>Sous-total</dt><dd>{formatPrix(sousTotal)}</dd></div>
              <div><dt>Livraison</dt><dd>{livraison === 0 ? 'Offerte' : formatPrix(livraison)}</dd></div>
              <div className="recap-total"><dt>Total TTC</dt><dd>{formatPrix(total)}</dd></div>
            </dl>
          </aside>
        </div>
      )}
    </Fenetre>
  );
}

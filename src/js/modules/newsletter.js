// Inscription à la lettre d'information (pied de page).
// Aucune adresse n'est encore envoyée : branchez ici votre outil d'e-mailing (Brevo, Mailchimp…).

import { escapeHtml } from './utils.js';

export function initNewsletter() {
  for (const form of document.querySelectorAll('[data-newsletter]')) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = new FormData(form).get('email');
      const status = document.createElement('p');
      status.className = 'newsletter__status';
      status.setAttribute('role', 'status');
      status.innerHTML = `C’est noté : vous recevrez nos nouvelles à ${escapeHtml(email)}.`;
      form.replaceWith(status);
    });
  }
}

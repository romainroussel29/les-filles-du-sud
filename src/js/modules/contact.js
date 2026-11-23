// Formulaire de contact. Le site étant entièrement statique (aucun serveur), le message est préparé
// dans la messagerie du visiteur (lien mailto:). Pour un envoi direct, remplacez l'attribut action
// du formulaire par l'adresse d'un service comme Formspree ou un script PHP de votre hébergeur.

export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-contact-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `[${data.get('sujet')}] Message de ${data.get('nom')}`;
    const body = [
      data.get('message'),
      '',
      '—',
      `${data.get('nom')} · ${data.get('email')}`,
      data.get('commande') ? `Commande : ${data.get('commande')}` : '',
    ]
      .filter((line) => line !== null)
      .join('\n');

    window.location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) {
      status.hidden = false;
      status.textContent =
        'Votre messagerie s’ouvre avec le message prêt à partir. Si rien ne se passe, écrivez-nous directement à ' +
        `${form.dataset.to}.`;
    }
  });
}

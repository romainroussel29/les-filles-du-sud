// Tunnel de commande en fenêtre : livraison → paiement → paiement en cours → confirmation.
//
// ATTENTION : aucun paiement n'est réellement encaissé ici. Avant d'ouvrir la vente, branchez un
// prestataire de paiement (Stripe Checkout, PayPal…) dans `pay()`. Les données de carte ne sont
// ni enregistrées ni envoyées.

import { PAYMENT_METHODS, SHIPPING_METHODS, isShippingFree } from './config.js';
import { formatCardField, getCardNetwork, validateCard } from './carte-bancaire.js';
import { clearCart, getCart } from './panier-store.js';
import { escapeHtml, formatPrice, icon, setupDialog } from './utils.js';

const PROCESSING_DELAY = 2200; // simulation de l'appel au prestataire de paiement

const emptyAddress = () => ({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  addressLine2: '',
  postalCode: '',
  city: '',
  phone: '',
  shippingMethod: 'domicile',
});
const emptyCard = () => ({ number: '', holder: '', expiry: '', cvc: '' });

let dialog = null;
let state = { step: 'shipping', address: emptyAddress(), paymentMethod: 'card', card: emptyCard(), errors: {}, order: null };

const createOrderNumber = () => `VDS-${Math.floor(100000 + Math.random() * 900000)}`;

function totals() {
  const { lines, subtotal } = getCart();
  const method = SHIPPING_METHODS.find((m) => m.id === state.address.shippingMethod);
  const shippingCost = isShippingFree(method, subtotal) ? 0 : method.price;
  return { lines, subtotal, method, shippingCost, total: subtotal + shippingCost };
}

// ---------- Gabarits ----------

const field = (label, name, attributes = '', value = state.address[name]) => `
  <label class="field">
    ${label}
    <input name="${name}" value="${escapeHtml(value)}" ${attributes}>
  </label>`;

function shippingStep() {
  const { subtotal } = totals();
  return `
    <form class="checkout-form" data-step-form="shipping">
      <h2 class="title-wide">Vos coordonnées</h2>
      ${field('E-mail', 'email', 'required type="email" autocomplete="email"')}
      <div class="form-row form-row--even">
        ${field('Prénom', 'firstName', 'required autocomplete="given-name"')}
        ${field('Nom', 'lastName', 'required autocomplete="family-name"')}
      </div>
      ${field('Adresse', 'address', 'required autocomplete="address-line1"')}
      ${field('Complément d’adresse (facultatif)', 'addressLine2', 'autocomplete="address-line2"')}
      <div class="form-row">
        ${field('Code postal', 'postalCode', 'required inputmode="numeric" pattern="[0-9]{5}" title="5 chiffres" autocomplete="postal-code"')}
        ${field('Ville', 'city', 'required autocomplete="address-level2"')}
      </div>
      ${field('Téléphone, pour le transporteur', 'phone', 'required type="tel" autocomplete="tel" pattern="[0-9 +.]{10,}" title="Numéro de téléphone"')}
      <fieldset class="choice-group">
        <legend>Mode de livraison</legend>
        ${SHIPPING_METHODS.map(
          (method) => `
          <label class="choice">
            <input type="radio" name="shippingMethod" value="${method.id}" ${state.address.shippingMethod === method.id ? 'checked' : ''}>
            <span class="choice__text"><strong>${method.name}</strong><span>${method.delay}</span></span>
            <span class="choice__price">${isShippingFree(method, subtotal) ? 'Offerte' : formatPrice(method.price)}</span>
          </label>`,
        ).join('')}
      </fieldset>
      <button type="submit" class="btn btn--dark btn--block">Continuer vers le paiement</button>
    </form>`;
}

function cardField(label, name, attributes = '', badge = null) {
  const error = state.errors[name];
  const errorId = `card-${name}-error`;
  const input = `<input name="${name}" value="${escapeHtml(state.card[name])}" ${attributes}
    ${error ? `aria-invalid="true" aria-describedby="${errorId}"` : ''}>`;
  return `
    <label class="field">
      ${label}
      ${badge !== null ? `<span class="field__control">${input}<span class="field__badge" data-card-network>${escapeHtml(badge)}</span></span>` : input}
      ${error ? `<span id="${errorId}" class="field-error">${error}</span>` : ''}
    </label>`;
}

function paymentStep() {
  const { total } = totals();
  const payLabel =
    state.paymentMethod === 'paypal'
      ? 'Payer avec PayPal'
      : state.paymentMethod === 'apple-pay'
        ? 'Payer avec Apple Pay'
        : `Payer ${formatPrice(total)}`;
  return `
    <form class="checkout-form" data-step-form="payment" novalidate>
      <h2 class="title-wide">Paiement</h2>
      <fieldset class="choice-group">
        <legend class="visually-hidden">Moyen de paiement</legend>
        ${PAYMENT_METHODS.map(
          (option) => `
          <label class="choice">
            <input type="radio" name="paymentMethod" value="${option.id}" ${state.paymentMethod === option.id ? 'checked' : ''}>
            <span class="choice__text"><strong>${option.name}</strong><span>${option.detail}</span></span>
          </label>`,
        ).join('')}
      </fieldset>
      ${
        state.paymentMethod === 'card'
          ? `<div class="card-fields">
              ${cardField('Numéro de carte', 'number', 'inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456"', getCardNetwork(state.card.number))}
              <div class="form-row form-row--even">
                ${cardField('Date d’expiration', 'expiry', 'inputmode="numeric" autocomplete="cc-exp" placeholder="MM/AA"')}
                ${cardField('Cryptogramme', 'cvc', 'inputmode="numeric" autocomplete="cc-csc" placeholder="123"')}
              </div>
              ${cardField('Nom sur la carte', 'holder', 'autocomplete="cc-name"')}
            </div>`
          : ''
      }
      <button type="submit" class="btn btn--dark btn--block">${payLabel}</button>
      <p class="secure-note">${icon('cadenas')} Paiement sécurisé, vos données bancaires sont chiffrées.</p>
    </form>`;
}

function summary() {
  const { lines, subtotal, shippingCost, total } = totals();
  return `
    <aside class="checkout__summary" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title" class="title-wide">Votre commande</h2>
      <ul class="summary-list">
        ${lines
          .map(
            (line) => `
          <li>
            <span class="summary-thumb">
              <img class="media" src="${escapeHtml(line.image)}" alt="" width="56" height="72" loading="lazy">
              <span class="summary-thumb__quantity" aria-label="Quantité : ${line.quantity}">${line.quantity}</span>
            </span>
            <span class="summary-name">${escapeHtml(line.name)}<small>${escapeHtml(line.color)}, ${escapeHtml(line.size)}</small></span>
            <span>${formatPrice(line.price * line.quantity)}</span>
          </li>`,
          )
          .join('')}
      </ul>
      <dl class="totals">
        <div><dt>Sous-total</dt><dd>${formatPrice(subtotal)}</dd></div>
        <div><dt>Livraison</dt><dd>${shippingCost === 0 ? 'Offerte' : formatPrice(shippingCost)}</dd></div>
        <div class="totals__grand"><dt>Total TTC</dt><dd>${formatPrice(total)}</dd></div>
      </dl>
    </aside>`;
}

function confirmation(order) {
  return `
    <div class="order-confirmation" role="status">
      ${icon('valide', 'order-confirmation__icon')}
      <h2 class="title-wide">Merci ${escapeHtml(order.firstName)} !</h2>
      <p>Votre commande <strong>${order.number}</strong> est confirmée.</p>
      <dl class="order-confirmation__details">
        <div><dt>Montant réglé</dt><dd>${formatPrice(order.total)}</dd></div>
        <div><dt>Livraison</dt><dd>${order.shippingMethod.name}, ${order.shippingMethod.delay.toLowerCase()}</dd></div>
        <div><dt>Adresse</dt><dd>${escapeHtml(order.address)}</dd></div>
      </dl>
      <p>Un e-mail de confirmation vient de partir à ${escapeHtml(order.email)}. Vous recevrez le lien de suivi dès l’expédition de votre colis.</p>
      <button type="button" class="btn btn--dark" data-checkout-finish>Continuer mes achats</button>
    </div>`;
}

function render() {
  let content;
  if (state.step === 'confirmed') {
    content = confirmation(state.order);
  } else if (state.step === 'processing') {
    content = `
      <div class="checkout-processing" role="status" aria-live="polite">
        <span class="spinner" aria-hidden="true"></span>
        <p>Paiement sécurisé en cours…</p>
        <p class="checkout-processing__hint">Merci de ne pas fermer cette fenêtre.</p>
      </div>`;
  } else {
    const onPayment = state.step === 'payment';
    content = `
      <div class="checkout">
        <div class="checkout__main">
          <ol class="checkout-steps" aria-label="Étapes de la commande">
            <li ${onPayment ? '' : 'aria-current="step"'}>${onPayment ? '<button type="button" data-goto="shipping">Livraison</button>' : 'Livraison'}</li>
            <li ${onPayment ? 'aria-current="step"' : ''}>Paiement</li>
          </ol>
          ${onPayment ? paymentStep() : shippingStep()}
        </div>
        ${summary()}
      </div>`;
  }
  const closeButton =
    state.step === 'processing'
      ? ''
      : `<button type="button" class="dialog__close" data-dialog-close aria-label="Fermer">${icon('fermer')}</button>`;
  dialog.innerHTML = `<div class="dialog__body">${closeButton}${content}</div>`;
}

// ---------- Actions ----------

function goTo(step) {
  state.step = step;
  state.errors = {};
  render();
  dialog.querySelector('input:not([type="radio"]), button')?.focus();
}

function pay() {
  const { method, total } = totals();
  state.card = emptyCard(); // les données de carte ne sont pas conservées
  state.step = 'processing';
  render();
  setTimeout(() => {
    const { address } = state;
    state.order = {
      number: createOrderNumber(),
      total,
      shippingMethod: method,
      email: address.email,
      firstName: address.firstName,
      address: `${address.address}, ${address.postalCode} ${address.city}`,
    };
    state.step = 'confirmed';
    clearCart();
    render();
  }, PROCESSING_DELAY);
}

function finish() {
  state = { step: 'shipping', address: emptyAddress(), paymentMethod: 'card', card: emptyCard(), errors: {}, order: null };
  dialog.close();
}

function handleInput(event) {
  const input = event.target;
  const form = input.closest('[data-step-form]');
  if (!form) return;

  if (form.dataset.stepForm === 'shipping') {
    state.address[input.name] = input.value;
    // Le prix de la livraison choisie change le récapitulatif
    if (input.name === 'shippingMethod') {
      dialog.querySelector('.checkout__summary').outerHTML = summary();
    }
    return;
  }

  if (input.name === 'paymentMethod') {
    state.paymentMethod = input.value;
    state.errors = {};
    render();
    dialog.querySelector(`input[value="${input.value}"]`)?.focus();
    return;
  }
  if (input.name in formatCardField) {
    input.value = formatCardField[input.name](input.value);
    state.card[input.name] = input.value;
    // L'erreur du champ disparaît dès qu'on le corrige
    if (state.errors[input.name]) {
      delete state.errors[input.name];
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      dialog.querySelector(`#card-${input.name}-error`)?.remove();
    }
    if (input.name === 'number') {
      const badge = dialog.querySelector('[data-card-network]');
      if (badge) badge.textContent = getCardNetwork(input.value);
    }
  }
}

function handleSubmit(event) {
  const form = event.target.closest('[data-step-form]');
  if (!form) return;
  event.preventDefault();

  if (form.dataset.stepForm === 'shipping') {
    goTo('payment');
    return;
  }
  if (state.paymentMethod === 'card') {
    const errors = validateCard(state.card);
    if (Object.keys(errors).length) {
      state.errors = errors;
      render();
      dialog.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
  }
  pay();
}

export function openCheckout() {
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.className = 'dialog dialog--checkout';
    dialog.setAttribute('aria-label', 'Commande');
    document.body.append(dialog);

    // Pas de fermeture pendant le paiement ; après la confirmation, la commande est remise à zéro.
    setupDialog(dialog, () => {
      if (state.step === 'processing') return false;
      if (state.step === 'confirmed') {
        finish();
        return false;
      }
      return true;
    });
    dialog.addEventListener('input', handleInput);
    dialog.addEventListener('change', handleInput);
    dialog.addEventListener('submit', handleSubmit);
    dialog.addEventListener('click', (event) => {
      const back = event.target.closest('[data-goto]');
      if (back) goTo(back.dataset.goto);
      if (event.target.closest('[data-checkout-finish]')) finish();
    });
  }
  if (getCart().count === 0 && state.step !== 'confirmed') return;
  render();
  dialog.showModal();
}

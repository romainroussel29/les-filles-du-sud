// Vérifications et mise en forme d'une carte bancaire, côté navigateur uniquement.

export const digitsOnly = (value) => value.replace(/\D/g, '');

/** Algorithme de Luhn : détecte les fautes de frappe dans un numéro de carte. */
export function isValidCardNumber(number) {
  const digits = digitsOnly(number);
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function getCardNetwork(number) {
  const digits = digitsOnly(number);
  if (/^4/.test(digits)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'American Express';
  return '';
}

/** « MM/AA », non expirée. */
export function isValidExpiry(expiry) {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  if (month < 1 || month > 12) return false;
  const endOfValidity = new Date(2000 + Number(match[2]), month, 1);
  return endOfValidity > new Date();
}

/** Met en forme la saisie au fil de la frappe. */
export const formatCardField = {
  number: (value) =>
    digitsOnly(value)
      .slice(0, 19)
      .replace(/(.{4})/g, '$1 ')
      .trim(),
  expiry: (value) => {
    const digits = digitsOnly(value).slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  },
  cvc: (value) => digitsOnly(value).slice(0, 4),
  holder: (value) => value,
};

export function validateCard(card) {
  const errors = {};
  if (!isValidCardNumber(card.number)) errors.number = 'Ce numéro de carte n’est pas valide.';
  if (!isValidExpiry(card.expiry)) errors.expiry = 'Date invalide ou carte expirée.';
  if (card.cvc.length < 3) errors.cvc = '3 ou 4 chiffres au dos de la carte.';
  if (!card.holder.trim()) errors.holder = 'Indiquez le nom inscrit sur la carte.';
  return errors;
}

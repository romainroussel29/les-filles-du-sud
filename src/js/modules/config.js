// Réglages commerciaux de la boutique.
// Le seuil de livraison offerte est aussi écrit en toutes lettres dans les pages HTML
// (bandeau d'annonces, fiches produit, FAQ) : pensez à le modifier aux deux endroits.

export const FREE_SHIPPING_THRESHOLD = 80;

export const SHIPPING_METHODS = [
  { id: 'domicile', name: 'Colissimo à domicile', delay: '2 à 4 jours ouvrés', price: 4.9 },
  { id: 'relais', name: 'Point relais', delay: '3 à 5 jours ouvrés', price: 3.9 },
  { id: 'express', name: 'Express', delay: 'Livré demain avant 13 h', price: 9.9, neverFree: true },
];

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Carte bancaire', detail: 'Visa, Mastercard, CB, American Express' },
  { id: 'paypal', name: 'PayPal', detail: 'Payez avec votre compte PayPal' },
  { id: 'apple-pay', name: 'Apple Pay', detail: 'Validez avec Face ID ou Touch ID' },
];

/** La livraison est-elle offerte pour ce mode et ce montant ? */
export const isShippingFree = (method, subtotal) => !method.neverFree && subtotal >= FREE_SHIPPING_THRESHOLD;

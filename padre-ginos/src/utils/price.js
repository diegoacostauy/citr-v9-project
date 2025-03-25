
export const priceUYU = new Intl.NumberFormat('es-UY', {
  style: 'currency',
  currency: 'UYU',
});

export const formatPrice = (price) => priceUYU.format(price);

const USD_TO_INR = 85;
const ORIGINAL_PRICE_MULTIPLIER = 2.8;

export const getSalePrice = (usdPrice) => Math.round(usdPrice * USD_TO_INR);

export const getOriginalPrice = (usdPrice) =>
  Math.round(usdPrice * USD_TO_INR * ORIGINAL_PRICE_MULTIPLIER);

export const getDiscountPercent = (usdPrice) => {
  const sale = getSalePrice(usdPrice);
  const original = getOriginalPrice(usdPrice);
  return Math.round(((original - sale) / original) * 100);
};

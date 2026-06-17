// Product card image backgrounds — cycles left-to-right, top-to-bottom
export const PRODUCT_IMAGE_BACKGROUNDS = [
  '#E1E8EE', // light blue-gray
  '#1A1A1A', // charcoal
  '#D6C9F1', // lavender
  '#9D0A0E', // deep red
];

export const getProductImageBackground = (index) =>
  PRODUCT_IMAGE_BACKGROUNDS[index % PRODUCT_IMAGE_BACKGROUNDS.length];

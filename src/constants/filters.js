export const FILTER_TABS = [
  'Suggested filters',
  'New arrivals',
  'Gender',
  'Price',
  'Brand',
  'Fabric',
  'Fit',
  'Size',
  'Color',
  'Discounts',
  'Delivery time',
];

export const FILTER_OPTIONS = {
  'Suggested filters': ['2 days delivery', 'Brown', 'Under ₹700', '50% off'],
  'New arrivals': ['Past 24 hours', 'Past week', 'Past month'],
  Gender: ['Men', 'Women', 'Boys', 'Girls', 'Unisex'],
  Price: ['Under ₹500', '₹500-₹1000', '₹1000-₹1500', '₹1500+'],
  Brand: ['Nike', 'Puma', 'Adidas', 'Roadster'],
  Fabric: ['Cotton', 'Linen', 'Polyester', 'Blend'],
  Fit: ['Regular', 'Slim', 'Oversized'],
  Size: ['S', 'M', 'L', 'XL', 'XXL'],
  Color: ['Black', 'White', 'Blue', 'Brown'],
  Discounts: ['10% off', '25% off', '50% off'],
  'Delivery time': ['1 day', '2 days', 'Within a week'],
};

export const FILTER_SECTION_TITLES = {
  'Suggested filters': 'Choose from the mostly used filters',
  Gender: 'Select gender',
  Price: 'Select price range',
  Fit: 'Select fit',
  Color: 'Select color',
  Discounts: 'Select discounts',
  'Delivery time': 'Select delivery time',
};

export const getFilterSectionTitle = (tab) =>
  FILTER_SECTION_TITLES[tab] || `Select ${tab.toLowerCase()}`;

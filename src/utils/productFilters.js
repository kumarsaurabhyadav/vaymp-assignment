import { getSalePrice, getDiscountPercent } from './pricing';

const itemText = (item) =>
  `${item.title || ''} ${item.description || ''} ${item.category || ''}`.toLowerCase();

const matchesTextFilters = (item, filters = []) => {
  if (filters.length === 0) return true;
  const text = itemText(item);
  return filters.some((filter) => text.includes(filter.toLowerCase()));
};

const matchesSearchQuery = (item, query = '') => {
  if (!query?.trim()) return true;
  return itemText(item).includes(query.toLowerCase().trim());
};

const matchesPriceFilters = (item, filters = []) => {
  if (filters.length === 0) return true;
  const price = getSalePrice(item.price);
  return filters.some((value) => {
    if (value === 'Under ₹500') return price < 500;
    if (value === '₹500-₹1000') return price >= 500 && price <= 1000;
    if (value === '₹1000-₹1500') return price >= 1000 && price <= 1500;
    if (value === '₹1500+') return price > 1500;
    if (value === 'Under ₹700') return price < 700;
    return false;
  });
};

const matchesGenderFilters = (item, filters = []) => {
  if (filters.length === 0) return true;
  const category = item.category?.toLowerCase() || '';
  return filters.some((option) => {
    if (option === 'Men' || option === 'Boys') return category === "men's clothing";
    if (option === 'Women' || option === 'Girls') return category === "women's clothing";
    if (option === 'Unisex') return category === 'electronics' || category === 'jewelery';
    return false;
  });
};

const matchesSuggestedFilters = (item, filters = []) => {
  if (filters.length === 0) return true;
  const price = getSalePrice(item.price);
  const text = itemText(item);
  return filters.some((option) => {
    if (option === 'Under ₹700') return price < 700;
    if (option === 'Brown') return text.includes('brown');
    if (option === '50% off') return getDiscountPercent(item.price) >= 50;
    if (option === '2 days delivery') return (item.rating?.count || 0) > 50;
    return false;
  });
};

const TAB_MATCHERS = {
  Price: matchesPriceFilters,
  Gender: matchesGenderFilters,
  'Suggested filters': matchesSuggestedFilters,
  Brand: matchesTextFilters,
  Fabric: matchesTextFilters,
  Fit: matchesTextFilters,
  Size: matchesTextFilters,
  Color: matchesTextFilters,
};

export const filterProducts = (products, activeFilters = {}, searchQuery = '') =>
  products.filter((item) => {
    const tabMatches = Object.entries(TAB_MATCHERS).every(([tab, matcher]) =>
      matcher(item, activeFilters[tab]),
    );
    return tabMatches && matchesSearchQuery(item, searchQuery);
  });

export const sortProducts = (products, sortOption) => {
  const items = [...products];

  if (sortOption === 'lowToHigh') {
    return items.sort((a, b) => a.price - b.price);
  }
  if (sortOption === 'highToLow') {
    return items.sort((a, b) => b.price - a.price);
  }
  if (sortOption === 'newest') {
    return items.sort((a, b) => b.id - a.id);
  }
  if (sortOption === 'offers') {
    return items.sort((a, b) => getDiscountPercent(b.price) - getDiscountPercent(a.price));
  }
  if (sortOption === 'bestSellers') {
    return items.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
  }

  return items;
};

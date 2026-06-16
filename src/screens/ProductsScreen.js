import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import BottomActionBar from '../components/BottomActionBar';
import SortModal from '../components/SortModal';
import FilterModal from '../components/FilterModal';

const ProductsScreen = ({ onOpenLiked, likedMap = {}, likedCount = 0, onToggleLike }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [activeFilters, setActiveFilters] = useState({});

  const priceInRupees = (price) => price * 85;

  const itemText = (item) =>
    `${item.title || ''} ${item.description || ''} ${item.category || ''}`.toLowerCase();

  const matchesTextFilters = (item, filters = []) => {
    if (filters.length === 0) return true;
    const text = itemText(item);
    return filters.some((filter) => text.includes(filter.toLowerCase()));
  };

  const matchesSearchQuery = (item, query = '') => {
    if (!query || !query.trim()) return true;
    return itemText(item).includes(query.toLowerCase().trim());
  };

  const matchesPriceFilters = (item, filters = []) => {
    if (filters.length === 0) return true;
    const price = priceInRupees(item.price);
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
    const price = priceInRupees(item.price);
    const text = itemText(item);
    return filters.some((option) => {
      if (option === 'Under ₹700') return price < 700;
      if (option === 'Brown') return text.includes('brown');
      if (option === '50% off') return true;
      if (option === '2 days delivery') return true;
      return false;
    });
  };

  const matchesBrandFilters = (item, filters = []) =>
    matchesTextFilters(item, filters);

  const matchesFabricFilters = (item, filters = []) =>
    matchesTextFilters(item, filters);

  const matchesFitFilters = (item, filters = []) =>
    matchesTextFilters(item, filters);

  const matchesSizeFilters = (item, filters = []) =>
    matchesTextFilters(item, filters);

  const matchesColorFilters = (item, filters = []) =>
    matchesTextFilters(item, filters);

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters || {});
    setFilterVisible(false);
  };

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    return products.filter((item) => {
      return (
        matchesPriceFilters(item, activeFilters.Price) &&
        matchesGenderFilters(item, activeFilters.Gender) &&
        matchesSuggestedFilters(item, activeFilters['Suggested filters']) &&
        matchesBrandFilters(item, activeFilters.Brand) &&
        matchesFabricFilters(item, activeFilters.Fabric) &&
        matchesFitFilters(item, activeFilters.Fit) &&
        matchesSizeFilters(item, activeFilters.Size) &&
        matchesColorFilters(item, activeFilters.Color) &&
        matchesSearchQuery(item, searchQuery)
      );
    });
  }, [products, activeFilters, searchQuery]);

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];

    if (sortOption === 'lowToHigh') {
      return items.sort((a, b) => a.price - b.price);
    }

    if (sortOption === 'highToLow') {
      return items.sort((a, b) => b.price - a.price);
    }

    if (sortOption === 'rating') {
      return items.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return items;
  }, [filteredProducts, sortOption]);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.headerRow}>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.arrow}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => setSearchVisible(true)} style={styles.iconButton}>
            <Image
              source={require('../assets/search.png')}
              style={styles.actionIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onOpenLiked} style={styles.iconButton}>
            <Image
              source={require('../assets/heart.png')}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            {likedCount > 0 && (
              <View style={styles.heartBadge}>
                <Text style={styles.heartBadgeText}>{likedCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <Image
            source={require('../assets/bag.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      {searchVisible && (
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products"
            placeholderTextColor="#9CA3AF"
            autoFocus
          />
          <TouchableOpacity
            style={styles.searchCancelButton}
            onPress={() => {
              setSearchVisible(false);
              setSearchQuery('');
            }}
          >
            <Text style={styles.searchCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          Showing <Text style={styles.resultsCount}>{sortedProducts.length} results </Text> for "All Products"
        </Text>
      </View>

      {Object.values(activeFilters).flatMap((values) => values || []).length > 0 && (
        <View style={styles.filterChipsRow}>
          {Object.entries(activeFilters).flatMap(([tab, values]) =>
            (values || []).map((value) => (
              <View key={`${tab}-${value}`} style={styles.filterChip}>
                <Text style={styles.filterChipText}>{value}</Text>
              </View>
            )),
          )}
        </View>
      )}

      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            liked={!!likedMap[item.id]}
            onToggleLike={onToggleLike}
          />
        )}
      />

      <BottomActionBar
        onSortPress={() => setSortVisible(true)}
        onFilterPress={() => setFilterVisible(true)}
      />

      <SortModal
        visible={sortVisible}
        selectedSort={sortOption}
        onSelectSort={setSortOption}
        onClose={() => setSortVisible(false)}
        onApply={() => setSortVisible(false)}
      />

      <FilterModal
        visible={filterVisible}
        initialFilters={activeFilters}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
      />
    </View> 
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4,
    backgroundColor: '#F5F5F5',
  },

  resultsContainer: {
    marginBottom: 16,
  },

  resultsText: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
  resultsCount: {
    color: '#2563EB',
    fontWeight: '700',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBar: {
    width: '100%',
    height: 98,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  logo: {
    width: 140,
    height: 40,
  },

  arrow: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#222',
  },
  iconButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  heartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    color: '#111827',
  },
  searchCancelButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchCancelText: {
    color: '#4B50FF',
    fontWeight: '600',
  },

  filterChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    marginBottom: 8,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    color: '#1F2937',
  },

  listContent: {
    paddingBottom: 90,
  },

});
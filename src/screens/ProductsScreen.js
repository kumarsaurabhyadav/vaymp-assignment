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
import { colors } from '../constants/colors';
import { filterProducts, sortProducts } from '../utils/productFilters';

const ProductsScreen = ({
  onOpenDetail,
  onOpenBag,
  bagCount = 0,
  onOpenLiked,
  likedMap = {},
  likedCount = 0,
  onToggleLike,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [activeFilters, setActiveFilters] = useState({});

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters || {});
    setFilterVisible(false);
  };

  const removeFilter = (tab, value) => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      const updated = (next[tab] || []).filter((item) => item !== value);
      if (updated.length === 0) {
        delete next[tab];
      } else {
        next[tab] = updated;
      }
      return next;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(
    () => filterProducts(products, activeFilters, searchQuery),
    [products, activeFilters, searchQuery],
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortOption),
    [filteredProducts, sortOption],
  );

  const activeFilterEntries = Object.entries(activeFilters).flatMap(([tab, values]) =>
    (values || []).map((value) => ({ tab, value })),
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
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
          <TouchableOpacity onPress={onOpenBag} style={styles.iconButton}>
            <Image
              source={require('../assets/bag.png')}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            {bagCount > 0 && (
              <View style={styles.bagBadge}>
                <Text style={styles.bagBadgeText}>{bagCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {searchVisible && (
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products"
            placeholderTextColor={colors.placeholder}
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
          Showing <Text style={styles.resultsCount}>{sortedProducts.length} results </Text>
          for "All Products"
        </Text>
      </View>

      {activeFilterEntries.length > 0 && (
        <View style={styles.filterChipsRow}>
          {activeFilterEntries.map(({ tab, value }) => (
            <TouchableOpacity
              key={`${tab}-${value}`}
              style={styles.filterChip}
              onPress={() => removeFilter(tab, value)}
              activeOpacity={0.7}
            >
              <Text style={styles.filterChipText}>{value} ×</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductCard
            item={item}
            colorIndex={index}
            liked={!!likedMap[item.id]}
            onToggleLike={onToggleLike}
            onPress={() => onOpenDetail?.(item)}
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
    backgroundColor: colors.background,
  },
  resultsContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  resultsText: {
    fontSize: 15,
    color: '#444444',
    fontWeight: '500',
  },
  resultsCount: {
    color: colors.primary,
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
    backgroundColor: colors.surface,
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
    tintColor: colors.icon,
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
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  heartBadgeText: {
    color: colors.primaryText,
    fontSize: 10,
    fontWeight: '700',
  },
  bagBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  bagBadgeText: {
    color: colors.primaryText,
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
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    color: colors.textDark,
  },
  searchCancelButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchCancelText: {
    color: colors.primary,
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
    backgroundColor: colors.border,
    borderRadius: 999,
    marginBottom: 8,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    color: colors.textDark,
  },
  listContent: {
    paddingBottom: 90,
  },
});

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';

import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import BottomActionBar from '../components/BottomActionBar';
import SortModal from '../components/SortModal';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOption, setSortOption] = useState('featured');

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const sortedProducts = useMemo(() => {
    const items = [...products];

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
  }, [products, sortOption]);

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
            source={require('../../assets/arrow.png')}
            style={styles.arrow}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.actionsRow}>
          <Image
            source={require('../../assets/search.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/heart.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/bag.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          Showing <Text style={styles.resultsCount}>{products.length} results </Text> for "All Products"
        </Text>
      </View>

      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard item={item} />}
      />

      <BottomActionBar
        onSortPress={() => setSortVisible(true)}
        onFilterPress={() => {}}
      />

      <SortModal
        visible={sortVisible}
        selectedSort={sortOption}
        onSelectSort={setSortOption}
        onClose={() => setSortVisible(false)}
        onApply={() => setSortVisible(false)}
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

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  listContent: {
    paddingBottom: 90,
  },

});
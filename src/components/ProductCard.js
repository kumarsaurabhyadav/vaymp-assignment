import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getSalePrice, getOriginalPrice, getDiscountPercent } from '../utils/pricing';
import { colors } from '../constants/colors';
import { getProductImageBackground } from '../constants/productImageColors';

const ProductCard = ({ item, liked = false, onToggleLike, onPress, colorIndex = 0 }) => {
  const imageBackground = getProductImageBackground(colorIndex);
  const salePrice = getSalePrice(item.price);
  const originalPrice = getOriginalPrice(item.price);
  const discount = getDiscountPercent(item.price);

  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.imageContainer, { backgroundColor: imageBackground }]}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => onToggleLike?.(item)}
          activeOpacity={0.7}
        >
          <Image
            source={require('../assets/heart.png')}
            style={[
              styles.wishlistIcon,
              { tintColor: liked ? colors.error : colors.heartInactive },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.brand} numberOfLines={1}>
        {item.category}
      </Text>

      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.salePrice}>₹{salePrice}</Text>

        <View style={styles.tryBuyBadge}>
          <Image
            source={require('../assets/Group 5.png')}
            style={styles.tryBuyImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.discountRow}>
        <Text style={styles.originalPrice}>₹{originalPrice}</Text>
        <Text style={styles.discountText}>{discount}% OFF</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: '48%',
    marginBottom: 18,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '85%',
    height: '85%',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistIcon: {
    width: 24,
    height: 24,
  },
  brand: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
    marginTop: 12,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    minHeight: 40,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  salePrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  tryBuyBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryBuyImage: {
    width: 64,
    height: 14,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: '#777',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.discount,
  },
});

export default ProductCard;

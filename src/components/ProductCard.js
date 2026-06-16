import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ProductCard = ({ item, liked = false, onToggleLike }) => {
  const originalPrice = Math.round(item.price * 85 * 2.8);
  const salePrice = Math.round(item.price * 85);
  const discount = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100,
  );

  return (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
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
              { tintColor: liked ? '#EF4444' : '#A0A0A0' },
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

        <TouchableOpacity style={styles.tryBuyButton}>
          <Text style={styles.tryBuyText}>TRY N BUY</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.discountRow}>
        <Text style={styles.originalPrice}>₹{originalPrice}</Text>
        <Text style={styles.discountText}>{discount}% OFF</Text>
      </View>
    </View>
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
    backgroundColor: '#FFFFFF',
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
  tryBuyButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryBuyText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#666',
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
    color: '#4F46E5',
  },
});

export default ProductCard;

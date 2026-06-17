import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProductDetailView = ({
  product,
  selectedSize,
  quantity,
  onSelectSize,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) => {
  const originalPrice = Math.round(product.price * 85 * 2.8);
  const salePrice = Math.round(product.price * 85);
  const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.salePrice}>₹{salePrice}</Text>
        <Text style={styles.originalPrice}>₹{originalPrice}</Text>
        <Text style={styles.discountText}>{discount}% OFF</Text>
      </View>

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.selectorSection}>
        <Text style={styles.selectorLabel}>Size</Text>
        <View style={styles.selectorRow}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.sizePill, selectedSize === size && styles.sizePillSelected]}
              onPress={() => onSelectSize(size)}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextSelected]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.selectorSection}>
        <Text style={styles.selectorLabel}>Quantity</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity style={styles.qtyButton} onPress={onDecreaseQuantity}>
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.qtyValueBox}>
            <Text style={styles.qtyValueText}>{quantity}</Text>
          </View>
          <TouchableOpacity style={styles.qtyButton} onPress={onIncreaseQuantity}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  imageWrapper: {
    width: '100%',
    height: 320,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  image: {
    width: '75%',
    height: '75%',
  },
  category: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  salePrice: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#6B7280',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  discountText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 24,
  },
  selectorSection: {
    marginBottom: 20,
  },
  selectorLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  selectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizePill: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F8FAFC',
    marginRight: 10,
    marginBottom: 10,
  },
  sizePillSelected: {
    backgroundColor: '#4342FF',
    borderColor: '#4342FF',
  },
  sizeText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
  sizeTextSelected: {
    color: '#FFFFFF',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 22,
    color: '#111827',
    fontWeight: '700',
  },
  qtyValueBox: {
    minWidth: 56,
    height: 44,
    marginHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  qtyValueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
});

export default ProductDetailView;

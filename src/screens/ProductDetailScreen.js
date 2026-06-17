import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import ProductDetailView from '../components/ProductDetailView';

const ProductDetailScreen = ({ product, onBack, onAddToBag, onOpenBag }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showGoBag, setShowGoBag] = useState(false);

  const handleAddToCart = () => {
    onAddToBag?.(product, selectedSize, quantity);
    setShowGoBag(true);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  if (showGoBag) {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product details</Text>
        </View>

        <View style={styles.addedContainer}>
          <Text style={styles.addedTitle}>Added to bag!</Text>
          <Text style={styles.addedSubtitle}>{quantity} item(s) in size {selectedSize}</Text>
        </View>

        <View style={styles.footerBar}>
          <TouchableOpacity style={styles.continueBuyButton} onPress={onBack}>
            <Text style={styles.continueBuyText}>Continue shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={onOpenBag}>
            <Text style={styles.addButtonText}>Go to bag</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ProductDetailView
          product={product}
          selectedSize={selectedSize}
          quantity={quantity}
          onSelectSize={setSelectedSize}
          onDecreaseQuantity={handleDecrease}
          onIncreaseQuantity={handleIncrease}
        />
      </ScrollView>

      <View style={styles.footerBar}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add to bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 4,
  },
  topBar: {
    width: '100%',
    height: 98,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  addedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addedTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  addedSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  footerBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    gap: 12,
  },
  continueBuyButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#4342FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBuyText: {
    color: '#4342FF',
    fontSize: 16,
    fontWeight: '700',
  },
  addButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#4342FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProductDetailScreen;

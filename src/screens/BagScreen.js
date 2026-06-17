import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Platform,
} from 'react-native';

const BagScreen = ({ items = [], onBack, onRemoveItem, onUpdateQuantity }) => {
  const [selectedItems, setSelectedItems] = useState(items.map(() => true));

  const handleSelectItem = (index) => {
    const newSelected = [...selectedItems];
    newSelected[index] = !newSelected[index];
    setSelectedItems(newSelected);
  };

  const handleToggleSelectAll = () => {
    const allSelected = selectedItems.every(s => s);
    setSelectedItems(items.map(() => !allSelected));
  };

  const handleQuantityChange = (index, currentQty, operation) => {
    if (operation === 'plus') {
      onUpdateQuantity?.(index, currentQty + 1);
    } else if (operation === 'minus') {
      if (currentQty > 1) {
        onUpdateQuantity?.(index, currentQty - 1);
      } else {
        onRemoveItem?.(index);
      }
    }
  };

  const isAllSelected = selectedItems.length > 0 && selectedItems.every(s => s);

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
        <Text style={styles.title}>Bag</Text>
        <TouchableOpacity style={styles.heartButton}>
          <Image
            source={require('../assets/heart.png')}
            style={styles.heartIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Your bag is empty</Text>
          <Text style={styles.emptySubText}>Add items to continue shopping</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.deliveryInfo}>
                <Image
                  source={require('../assets/icon delivery 1.png')}
                  style={styles.deliveryIcon}
                  resizeMode="contain"
                />
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryLabel}>Delivering in just 60 min</Text>
                  <Text style={styles.deliveryAddress} numberOfLines={1}>
                    Full address - 29 Aparna Complex, Gurgaon...
                  </Text>
                </View>
                <Image
                  source={require('../assets/Vector-3.png')}
                  style={styles.expandIcon}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.freeDelivery}>
                <Image
                  source={require('../assets/Vector-4.png')}
                  style={styles.freeDeliveryIcon}
                  resizeMode="contain"
                />
                <Text style={styles.freeDeliveryText} numberOfLines={1}>
                  Yay! Your order is eligible for FREE delivery.
                </Text>
              </View>

              <TouchableOpacity onPress={handleToggleSelectAll} activeOpacity={0.7} style={styles.deselectButtonContainer}>
                <Text style={styles.deselectAll}>
                  {isAllSelected ? 'Deselect all items' : 'Select all items'}
                </Text>
              </TouchableOpacity>
            </>
          }
          renderItem={({ item, index }) => {
            const originalPrice = Math.round(item.price * 1.4);
            const salePrice = Math.round(item.price);

            return (
              <View style={styles.bagItem}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity
                    style={[
                      styles.itemCheckbox,
                      selectedItems[index] && styles.checkboxChecked,
                    ]}
                    onPress={() => handleSelectItem(index)}
                    activeOpacity={0.8}
                  >
                    {selectedItems[index] && <Text style={styles.checkboxMark}>✓</Text>}
                  </TouchableOpacity>

                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.title || 'Chanel Brown Top'}
                  </Text>
                  
                  <Text style={styles.itemDesc} numberOfLines={2}>
                    {item.description || 'Product description line 1\nProduct description line 2'}
                  </Text>

                  <View style={styles.itemPrice}>
                    <Text style={styles.salePrice}>₹{salePrice}</Text>
                    <Text style={styles.originalPrice}>₹{originalPrice}</Text>
                  </View>

                  <View style={styles.tryBuyContainer}>
                    <Image
                      source={require('../assets/Group 5.png')}
                      style={styles.tryBuyAsset}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.actionRow}>
                    <View style={styles.quantitySelector}>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => handleQuantityChange(index, item.quantity, 'minus')}
                        activeOpacity={0.6}
                      >
                        {item.quantity === 1 ? (
                          <Image 
                            source={require('../assets/delete.png')}
                            style={styles.iconAsset}
                            resizeMode="contain"
                          />
                        ) : (
                          <Image 
                            source={require('../assets/minus.png')}
                            style={styles.iconAsset1}
                            resizeMode="contain"
                          />
                        )}
                      </TouchableOpacity>
                      
                      <Text style={styles.qtyValue}>{item.quantity}</Text>
                      
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => handleQuantityChange(index, item.quantity, 'plus')}
                        activeOpacity={0.6}
                      >
                        <Image 
                          source={require('../assets/plus.png')}
                          style={styles.iconAsset}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.bagList}
        />
      )}

      {items.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.proceedButton} activeOpacity={0.9}>
            <Text style={styles.proceedText}>Proceed to pay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  topBar: {
    width: '100%',
    height: 124, 
    flexDirection: 'row',
    alignItems: 'flex-end', 
    justifyContent: 'space-between',
    backgroundColor: '#F0F2F4', 
    paddingHorizontal: 20,
    paddingBottom: 24, 
    ...Platform.select({
      ios: {
        shadowColor: '#E5E5E1',
        shadowOffset: { width: 0, height: 4.32 },
        shadowOpacity: 0.6,
        shadowRadius: 4.32,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#1F2937',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  heartButton: {
    padding: 4,
  },
  heartIcon: {
    width: 24,
    height: 24,
    tintColor: '#1F2937',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  deliveryInfo: {
    flexDirection: 'row',
    height: 40, 
    paddingLeft: 13, 
    paddingRight: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 10,
  },
  deliveryIcon: {
    width: 36, 
    height: 36,
  },
  deliveryTextContainer: {
    width: 337.42, 
    paddingLeft: 13, 
  },
  deliveryLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 20,
  },
  deliveryAddress: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginTop: 1,
  },
  expandIcon: {
    width: 14,
    height: 14,
    tintColor: '#6B7280',
    position: 'absolute',
    right: 16,
  },
  freeDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 384, 
    height: 24.52, 
    paddingLeft: 19, 
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  freeDeliveryIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: '#4342FF',
  },
  freeDeliveryText: {
    fontSize: 14,
    color: '#4342FF',
    fontWeight: '600',
    lineHeight: 24.52, 
  },
  deselectButtonContainer: {
    paddingHorizontal: 19,
    paddingTop: 14,
    paddingBottom: 10,
    alignSelf: 'flex-start',
  },
  deselectAll: {
    fontSize: 17.27, 
    color: '#4342FF', 
    fontWeight: '400', 
    textDecorationLine: 'underline', 
    height: 16, 
    lineHeight: 16, 
  },
  bagList: {
    paddingBottom: 110,
  },
  bagItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 21.58, 
    paddingRight: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 12,
    height: 141.38, 
  },
  imageContainer: {
    width: 114.4, 
    height: 114.4, 
    borderRadius: 8.63, 
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 20.51, 
  },
  itemCheckbox: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#4342FF',
    borderColor: '#4342FF',
  },
  checkboxMark: {
    color: '#FFFFFF',
    fontSize: 11.33, 
    fontWeight: '700',
    lineHeight: 11.33,
    textAlign: 'center',
  },
  itemImage: {
    width: 80,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'flex-start',
    height: '100%',
  },
  itemName: {
    fontFamily: Platform.OS === 'ios' ? 'League Spartan' : 'sans-serif-medium', 
    fontSize: 21.58, 
    fontWeight: '500', 
    color: '#29292C', 
    width: 163, 
    height: 20, 
    lineHeight: 20, 
    marginBottom: 2,
  },
  itemDesc: {
    fontFamily: Platform.OS === 'ios' ? 'League Spartan' : 'sans-serif',
    fontSize: 15.11, 
    fontWeight: '400', 
    color: '#29292C', 
    width: 157, 
    height: 28, 
    lineHeight: 14, 
    marginTop: 1,
    marginBottom: 4,
  },
  itemPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#29292C',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  tryBuyContainer: {
    marginTop: 3,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  tryBuyAsset: {
    width: 63.69, 
    height: 14.05, 
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 91.73, 
    height: 30.22, 
    borderWidth: 1.08, 
    borderColor: '#29292C', 
    borderRadius: 16, 
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  qtyButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAsset: {
    width: 14,
    height: 14,
    tintColor: '#29292C',
  },
  iconAsset1: {
    width: 12,
    height: 12,
    tintColor: '#29292C',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#29292C',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  proceedButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4342FF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  proceedText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default BagScreen;
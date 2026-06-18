import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import BagScreen from './screens/BagScreen';
import LikedScreen from './screens/LikedScreen';
import { addToBag, removeFromBag, increaseQuantity, decreaseQuantity, setBagItems } from './store/bagSlice';
import type { RootState, AppDispatch } from './store';

export default function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const bagItems = useSelector((state: RootState) => state.bag.items);

  const [page, setPage] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedItems, setLikedItems] = useState<Record<string, any>>({});

  // Load saved data on app start
  useEffect(() => {
    loadPersistentData();
  }, []);

  // Save bag items to AsyncStorage when they change
  useEffect(() => {
    if (bagItems.length > 0) {
      AsyncStorage.setItem('bagItems', JSON.stringify(bagItems)).catch((err) =>
        console.log('Error saving bag items:', err),
      );
    }
  }, [bagItems]);

  // Save liked items to AsyncStorage when they change
  useEffect(() => {
    if (Object.keys(likedItems).length > 0) {
      AsyncStorage.setItem('likedItems', JSON.stringify(likedItems)).catch((err) =>
        console.log('Error saving liked items:', err),
      );
    }
  }, [likedItems]);

  const loadPersistentData = async () => {
    try {
      const [savedBag, savedLiked] = await Promise.all([
        AsyncStorage.getItem('bagItems'),
        AsyncStorage.getItem('likedItems'),
      ]);

      if (savedBag) {
        const parsedBag = JSON.parse(savedBag);
        dispatch(setBagItems(parsedBag));
      }
      if (savedLiked) {
        setLikedItems(JSON.parse(savedLiked));
      }
    } catch (error) {
      console.log('Error loading persistent data:', error);
    }
  };

  const toggleLike = (item: any) => {
    setLikedItems((prev) => {
      const next = { ...prev };
      if (next[item.id]) {
        delete next[item.id];
      } else {
        next[item.id] = item;
      }
      return next;
    });
  };

  const handleAddToBag = (product: any, size: string, quantity: number) => {
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      size,
      quantity,
      bagId: `${product.id}-${size}-${Date.now()}`,
    };
    dispatch(addToBag(newItem));
  };

  const handleRemoveFromBag = (bagId: string) => {
    dispatch(removeFromBag(bagId));
  };

  const handleUpdateBagQuantity = (bagId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      const item = bagItems.find((i) => i.bagId === bagId);
      if (item) {
        const difference = newQuantity - item.quantity;
        if (difference > 0) {
          for (let i = 0; i < difference; i++) {
            dispatch(increaseQuantity(bagId));
          }
        } else if (difference < 0) {
          for (let i = 0; i < Math.abs(difference); i++) {
            dispatch(decreaseQuantity(bagId));
          }
        }
      }
    }
  };

  const likedList = Object.values(likedItems);

  if (page === 'detail' && selectedProduct) {
    return (
      <ProductDetailScreen
        product={selectedProduct}
        onBack={() => setPage('products')}
        onAddToBag={handleAddToBag}
        onOpenBag={() => setPage('bag')}
      />
    );
  }

  if (page === 'bag') {
    return (
      <BagScreen
        items={bagItems}
        onBack={() => setPage('products')}
        onRemoveItem={handleRemoveFromBag}
        onUpdateQuantity={handleUpdateBagQuantity}
      />
    );
  }

  return page === 'liked' ? (
    <LikedScreen
      items={likedList}
      onBack={() => setPage('products')}
      onToggleLike={toggleLike}
    />
  ) : (
    <ProductsScreen
      onOpenDetail={(item: any) => {
        setSelectedProduct(item);
        setPage('detail');
      }}
      onOpenBag={() => setPage('bag')}
      bagCount={bagItems.length}
      onOpenLiked={() => setPage('liked')}
      likedMap={likedItems}
      likedCount={likedList.length}
      onToggleLike={toggleLike}
    />
  );
}

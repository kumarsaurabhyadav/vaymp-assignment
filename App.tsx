import React, { useState } from 'react';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import BagScreen from './src/screens/BagScreen';
import LikedScreen from './src/screens/LikedScreen';

function App() {
  const [page, setPage] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bagItems, setBagItems] = useState<Record<string, any>[]>([]);
  const [likedItems, setLikedItems] = useState<Record<string, any>>({});

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
      ...product,
      size,
      quantity,
      bagId: `${product.id}-${size}-${Date.now()}`,
    };
    setBagItems((prev) => [...prev, newItem]);
  };

  const handleRemoveFromBag = (bagId: string) => {
    setBagItems((prev) => prev.filter((item) => item.bagId !== bagId));
  };

  const handleUpdateBagQuantity = (bagId: string, newQuantity: number) => {
    setBagItems((prev) =>
      prev.map((item) =>
        item.bagId === bagId ? { ...item, quantity: newQuantity } : item,
      ),
    );
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

export default App;
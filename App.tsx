import React, { useState } from 'react';
import ProductsScreen from './src/screens/ProductsScreen';
import LikedScreen from './src/screens/LikedScreen';

function App() {
  const [page, setPage] = useState('products');
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

  const likedList = Object.values(likedItems);

  return page === 'liked' ? (
    <LikedScreen
      items={likedList}
      onBack={() => setPage('products')}
      onToggleLike={toggleLike}
    />
  ) : (
    <ProductsScreen
      onOpenLiked={() => setPage('liked')}
      likedMap={likedItems}
      likedCount={likedList.length}
      onToggleLike={toggleLike}
    />
  );
}

export default App;
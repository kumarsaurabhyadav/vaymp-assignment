import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../components/ProductCard';

const LikedScreen = ({ items, onBack, onToggleLike }) => {
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

        <View style={styles.titleRow}>
          <Text style={styles.title}>Liked Products</Text>
          <Text style={styles.subTitle}>{items.length} items</Text>
        </View>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No liked products yet.</Text>
          <Text style={styles.emptySubText}>Tap the heart on any product to add it here.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              liked
              onToggleLike={onToggleLike}
            />
          )}
        />
      )}
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
  titleRow: {
    marginLeft: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  subTitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  listContent: {
    paddingBottom: 90,
  },
});

export default LikedScreen;

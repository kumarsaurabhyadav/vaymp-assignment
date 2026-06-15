import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

let BlurView = null;
try {
  const blurModule = require('@react-native-community/blur');
  BlurView = blurModule.BlurView;
} catch (error) {
  BlurView = null;
}

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest arrivals' },
  { id: 'lowToHigh', label: 'Price - low to high' },
  { id: 'highToLow', label: 'Price - high to low' },
  { id: 'offers', label: 'Offers and dicounts' },
  { id: 'bestSellers', label: 'Best sellers' },
];

const SortModal = ({ visible, onClose, selectedSort, onSelectSort }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        {BlurView ? (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={18}
            reducedTransparencyFallbackColor="rgba(0,0,0,0.65)"
          />
        ) : (
          <View style={styles.backdropOverlay} />
        )}

        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Sort by</Text>

          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionRow}
              onPress={() => onSelectSort(option.id)}
            >
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    width: '100%',
    height: 296,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
    color: '#4342FF',
    marginBottom: 18,
    fontFamily: 'LeagueSpartan-SemiBold',
  },
  optionRow: {
    paddingVertical: 10,
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 18,
    lineHeight: 18,
    color: '#29292C',
    fontWeight: '400',
    fontFamily: 'LeagueSpartan-Regular',
    letterSpacing: 0,
  },
});

export default SortModal;

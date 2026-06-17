import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';

let BlurView = null;
try {
  const blurModule = require('@react-native-community/blur');
  BlurView = blurModule.BlurView;
} catch (error) {
  BlurView = null;
}

const SORT_MODAL_WIDTH = 412;
const SORT_MODAL_HEIGHT = 296;
const SORT_MODAL_TOP_RADIUS = 20;

const { width: screenWidth } = Dimensions.get('window');
const modalWidth = Math.min(screenWidth, SORT_MODAL_WIDTH);

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest arrivals' },
  { id: 'lowToHigh', label: 'Price - low to high' },
  { id: 'highToLow', label: 'Price - high to low' },
  { id: 'offers', label: 'Offers and discounts' },
  { id: 'bestSellers', label: 'Best sellers' },
];

const SortModal = ({ visible, onClose, onSelectSort }) => {
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

          <View style={styles.optionsList}>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionRow}
                onPress={() => {
                  onSelectSort(option.id);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  sheet: {
    width: modalWidth,
    height: SORT_MODAL_HEIGHT,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: SORT_MODAL_TOP_RADIUS,
    borderTopRightRadius: SORT_MODAL_TOP_RADIUS,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 8,
    overflow: 'hidden',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
    color: '#4342FF',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  optionsList: {
    flex: 1,
  },
  optionRow: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 18,
    lineHeight: 18,
    color: '#29292C',
    fontWeight: '400',
  },
});

export default SortModal;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ModalSheet from './ModalSheet';
import { colors } from '../constants/colors';

const SORT_MODAL_WIDTH = 412;
const SORT_MODAL_HEIGHT = 296;
const SORT_MODAL_TOP_RADIUS = 20;

const { width: screenWidth } = Dimensions.get('window');
const modalWidth = Math.min(screenWidth, SORT_MODAL_WIDTH);

export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest arrivals' },
  { id: 'lowToHigh', label: 'Price - low to high' },
  { id: 'highToLow', label: 'Price - high to low' },
  { id: 'offers', label: 'Offers and discounts' },
  { id: 'bestSellers', label: 'Best sellers' },
];

const SortModal = ({ visible, onClose, selectedSort, onSelectSort }) => {
  return (
    <ModalSheet
      visible={visible}
      onClose={onClose}
      width={modalWidth}
      height={SORT_MODAL_HEIGHT}
      borderRadius={SORT_MODAL_TOP_RADIUS}
    >
      <Text style={styles.title}>Sort by</Text>

      <View style={styles.optionsList}>
        {SORT_OPTIONS.map((option) => {
          const isSelected = option.id === selectedSort;
          return (
            <TouchableOpacity
              key={option.id}
              style={styles.optionRow}
              onPress={() => {
                onSelectSort(option.id);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ModalSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.primary,
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
    color: colors.text,
    fontWeight: '400',
  },
  optionLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SortModal;

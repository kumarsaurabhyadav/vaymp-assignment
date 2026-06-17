import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ModalSheet from './ModalSheet';
import { colors } from '../constants/colors';
import {
  FILTER_TABS,
  FILTER_OPTIONS,
  getFilterSectionTitle,
} from '../constants/filters';

const FILTER_MODAL_WIDTH = 412;
const FILTER_MODAL_HEIGHT = 632;
const FILTER_MODAL_TOP_RADIUS = 20;

const { width: screenWidth } = Dimensions.get('window');
const modalWidth = Math.min(screenWidth, FILTER_MODAL_WIDTH);

const FilterModal = ({ visible, onClose, onApply, initialFilters }) => {
  const [selectedTab, setSelectedTab] = useState(FILTER_TABS[0]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    if (visible && initialFilters) {
      setSelectedFilters(initialFilters);
    }
  }, [visible, initialFilters]);

  const options = useMemo(
    () => FILTER_OPTIONS[selectedTab] || [],
    [selectedTab],
  );

  const selectedOptions = selectedFilters[selectedTab] || [];

  const toggleOption = (option) => {
    setSelectedFilters((prev) => {
      const current = prev[selectedTab] || [];
      return {
        ...prev,
        [selectedTab]: current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option],
      };
    });
  };

  const handleClear = () => {
    setSelectedFilters({});
  };

  const handleApply = () => {
    onApply?.(selectedFilters);
    onClose?.();
  };

  return (
    <ModalSheet
      visible={visible}
      onClose={onClose}
      width={modalWidth}
      height={FILTER_MODAL_HEIGHT}
      borderRadius={FILTER_MODAL_TOP_RADIUS}
    >
      <Text style={styles.heading}>Filters</Text>

      <View style={styles.modalBody}>
        <View style={styles.tabColumnContainer}>
          <View style={styles.tabList}>
            {FILTER_TABS.map((tab) => {
              const active = tab === selectedTab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabItem, active && styles.tabItemActive]}
                  onPress={() => setSelectedTab(tab)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[styles.tabLabel, active && styles.tabLabelActive]}
                    numberOfLines={2}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.contentColumn}>
          <Text style={styles.sectionTitle}>{getFilterSectionTitle(selectedTab)}</Text>

          <View style={styles.optionGroup}>
            {options.map((option) => {
              const selected = selectedOptions.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionPill, selected && styles.optionPillSelected]}
                  onPress={() => toggleOption(option)}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyText}>Apply filter</Text>
        </TouchableOpacity>
      </View>
    </ModalSheet>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalBody: {
    flexDirection: 'row',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  tabColumnContainer: {
    width: 140,
    backgroundColor: colors.sidebar,
  },
  tabList: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: colors.sidebar,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  tabItemActive: {
    backgroundColor: colors.sheet,
    borderLeftColor: colors.primary,
  },
  tabLabel: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '400',
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  contentColumn: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.sheet,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 15,
    color: colors.textDark,
    fontWeight: '700',
    marginBottom: 18,
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  optionPill: {
    height: 28,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  optionPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: colors.primaryText,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.sheet,
  },
  clearButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clearText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  applyButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyText: {
    color: colors.primaryText,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default FilterModal;

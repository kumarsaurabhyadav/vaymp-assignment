import React, { useMemo, useState, useEffect } from 'react';
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

const TABS = [
  'Suggested filters',
  'New arrivals',
  'Gender',
  'Price',
  'Brand',
  'Fabric',
  'Fit',
  'Size',
  'Color',
  'Discounts',
  'Delivery time',
];

const FILTER_CONTENT = {
  'Suggested filters': ['2 days delivery', 'Brown', 'Under ₹700', '50% off'],
  'New arrivals': ['Past 24 hours', 'Past week', 'Past month'],
  Gender: ['Men', 'Women', 'Boys', 'Girls', 'Unisex'],
  Price: ['Under ₹500', '₹500-₹1000', '₹1000-₹1500', '₹1500+'],
  Brand: ['Nike', 'Puma', 'Adidas', 'Roadster'],
  Fabric: ['Cotton', 'Linen', 'Polyester', 'Blend'],
  Fit: ['Regular', 'Slim', 'Oversized'],
  Size: ['S', 'M', 'L', 'XL', 'XXL'],
  Color: ['Black', 'White', 'Blue', 'Brown'],
  Discounts: ['10% off', '25% off', '50% off'],
  'Delivery time': ['1 day', '2 days', 'Within a week'],
};

const FILTER_MODAL_WIDTH = 412;
const FILTER_MODAL_HEIGHT = 632;
const FILTER_MODAL_TOP_RADIUS = 20;

const { width: screenWidth } = Dimensions.get('window');
const modalWidth = Math.min(screenWidth, FILTER_MODAL_WIDTH);

const FilterModal = ({ visible, onClose, onApply, initialFilters }) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    if (visible && initialFilters) {
      setSelectedFilters(initialFilters);
    }
  }, [visible, initialFilters]);

  const options = useMemo(
    () => FILTER_CONTENT[selectedTab] || [],
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

  // FIXED: Poore modal ke filters ek sath clear karne ke liye state ko empty object kiya
  const handleClear = () => {
    setSelectedFilters({});
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
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
          <Text style={styles.heading}>Filters</Text>

          <View style={styles.modalBody}>
            <View style={styles.tabColumnContainer}>
              <View style={styles.tabList}>
                {TABS.map((tab) => {
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
              <Text style={styles.sectionTitle}>
                {selectedTab === 'Suggested filters'
                  ? 'Choose from the mostly used filters'
                  : selectedTab === 'Gender'
                  ? 'Select gender'
                  : selectedTab === 'Price'
                  ? 'Select price range'
                  : selectedTab === 'Fit'
                  ? 'Select fit'
                  : selectedTab === 'Color'
                  ? 'Select color'
                  : selectedTab === 'Discounts'
                  ? 'Select discounts'
                  : selectedTab === 'Delivery time'
                  ? 'Select delivery time'
                  : `Select ${selectedTab.toLowerCase()}`}
              </Text>

              <View style={styles.optionGroup}>
                {options.map((option) => {
                  const selected = selectedOptions.includes(option);
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionPill,
                        selected ? styles.optionPillSelected : null,
                      ]}
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

          {/* Bottom Action Footer Row */}
          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                onApply?.(selectedFilters);
                onClose?.();
              }}
            >
              <Text style={styles.applyText}>Apply filter</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  sheet: {
    height: FILTER_MODAL_HEIGHT,
    width: modalWidth,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: FILTER_MODAL_TOP_RADIUS,
    borderTopRightRadius: FILTER_MODAL_TOP_RADIUS,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 8,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4342FF',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalBody: {
    flexDirection: 'row',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
  },
  tabColumnContainer: {
    width: 140,
    backgroundColor: '#F0F2F4',
  },
  tabList: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: '#F0F2F4',
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  tabItemActive: {
    backgroundColor: '#FAFAFA',
    borderLeftColor: '#4342FF',
  },
  tabLabel: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '400',
  },
  tabLabelActive: {
    color: '#4342FF',
    fontWeight: '700',
  },
  contentColumn: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 15,
    color: '#1F2937',
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
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  optionPillSelected: {
    backgroundColor: '#4342FF',
    borderColor: '#4342FF',
  },
  optionText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
  },
  clearButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#4342FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clearText: {
    color: '#4342FF',
    fontWeight: '600',
    fontSize: 14,
  },
  applyButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4342FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default FilterModal;
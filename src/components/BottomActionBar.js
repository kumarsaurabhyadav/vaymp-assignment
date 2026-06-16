import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BottomActionBar = ({ onSortPress, onFilterPress }) => {
  return (
    <View style={styles.bottomActionBar}>
      <TouchableOpacity style={styles.actionButton} onPress={onSortPress}>
        <Image
          source={require('../assets/Vector.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.actionText}>Sort</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.actionButton} onPress={onFilterPress}>
        <Image
          source={require('../assets/Vector-2.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.actionText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    width: 18,
    height: 18,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#D1D5DB',
  },
});

export default BottomActionBar;

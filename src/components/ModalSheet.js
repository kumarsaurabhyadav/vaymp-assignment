import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { colors } from '../constants/colors';

let BlurView = null;
try {
  const blurModule = require('@react-native-community/blur');
  BlurView = blurModule.BlurView;
} catch (error) {
  BlurView = null;
}

const ModalSheet = ({ visible, onClose, children, width, height, borderRadius = 20 }) => (
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

      <Pressable
        style={[styles.sheet, { width, height, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }]}
        onPress={(e) => e.stopPropagation()}
      >
        {children}
      </Pressable>
    </Pressable>
  </Modal>
);

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
    overflow: 'hidden',
    backgroundColor: colors.sheet,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 8,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 16,
  },
});

export default ModalSheet;

import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../theme/colors';

type Props = {
  title: string;
  icon?: string;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function PrimaryButton({ title, icon, color = Colors.primary, onPress, style }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      tension: 250,
      friction: 12,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={() => animateTo(0.96)}
        onPressOut={() => animateTo(1)}
      >
        <Text style={styles.text}>{title}</Text>
        
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 7,
  },
  icon: { fontSize: 18, marginRight: 8 },
  text: {
    color: Colors.textOnDark,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  arrow: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 8,
  },
});

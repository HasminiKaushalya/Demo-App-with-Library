import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme/colors';
import { Shadows } from '../theme/shadows';

type Props = {
  title: string;
  icon?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
};

export default function GradientButton({
  title,
  icon,
  onPress,
  style,
  colors = Colors.accentGradient,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      tension: 220,
      friction: 12,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        onPressIn={() => animate(0.97)}
        onPressOut={() => animate(1)}
      >
        <LinearGradient colors={colors} style={styles.button}>
          {icon ? <Text style={styles.icon}>{icon}</Text> : null}
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.arrow}>→</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    borderRadius: 18,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Shadows.glow,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  arrow: {
    color: Colors.white,
    fontSize: 20,
    marginLeft: 8,
    fontWeight: '900',
  },
});

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme/colors';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigations';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scaleAnim = Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    });

    const fadeAnim = Animated.timing(opacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    });

    const spinAnim = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 2600,
        useNativeDriver: true,
      })
    );

    Animated.parallel([scaleAnim, fadeAnim]).start();
    spinAnim.start();

    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2400);

    return () => {
      clearTimeout(timer);
      spinAnim.stop(); // ✅ important cleanup
    };
  }, [navigation, scale, opacity, rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      <LinearGradient colors={Colors.heroGradient} style={styles.gradient}>
        <View style={styles.blob1} />
        <View style={styles.blob2} />

        <Animated.View
          style={[
            styles.logoWrap,
            { opacity, transform: [{ scale }] },
          ]}
        >
          <Animated.View
            style={[
              styles.ring,
              { transform: [{ rotate: spin }] },
            ]}
          />

          <View style={styles.logo}>
            <Text style={styles.logoText}>CP</Text>
          </View>
        </Animated.View>

        <Animated.Text style={[styles.title, { opacity }]}>
          CareerPlus
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, { opacity }]}>
          Discover careers. Find dream jobs. Grow beautifully.
        </Animated.Text>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blob1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
    top: -50,
    right: -50,
  },
  blob2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(79,209,255,0.18)',
    bottom: -40,
    left: -40,
  },
  logoWrap: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#fff',
    borderTopColor: 'transparent',
    opacity: 0.85,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: '900',
  },
  title: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: '900',
    marginTop: 22,
    letterSpacing: -1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 14,
    marginTop: 8,
  },
});
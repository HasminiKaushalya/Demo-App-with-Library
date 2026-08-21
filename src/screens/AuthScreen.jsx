import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../components/GradientButton';
import { Colors } from '../theme/colors';

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goNext = () => navigation.replace('HomeChoice');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/images/auth-cover.jpg')}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={['rgba(11,16,32,0.15)', 'rgba(11,16,32,0.82)']}
            style={styles.heroOverlay}
          >
            <Text style={styles.brand}>CareerPlus</Text>
            <Text style={styles.tagline}>
              A brighter, more beautiful way to discover careers and jobs.
            </Text>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.card}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, mode === 'login' && styles.tabActive]}
              onPress={() => setMode('login')}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, mode === 'signup' && styles.tabActive]}
              onPress={() => setMode('signup')}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>
            {mode === 'login' ? 'Welcome back' : 'Create your glow-up account '}
          </Text>

          <Text style={styles.subtitle}>
            {mode === 'login'
              ? 'Continue your job and career journey with a luxury experience.'
              : 'Start exploring premium opportunities and inspiring career paths.'}
          </Text>

          {mode === 'signup' ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={Colors.textMuted}
            />
          ) : null}

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={Colors.textMuted}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry
          />

          
          <GradientButton
             title={mode === 'login' ? 'Sign In' : 'Create account'}
             onPress={goNext}
             style={{ marginTop: 8 }}
          />

          <TouchableOpacity onPress={goNext} activeOpacity={0.8}>
            <Text style={styles.skip}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40 },
  hero: {
    height: 290,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
  },
  heroImage: {
    borderRadius: 30,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 22,
  },
  brand: {
    color: Colors.white,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },
  tagline: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: '92%',
  },
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 18,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 5,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: 'rgba(124,92,255,0.32)',
  },
  tabText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  tabTextActive: {
    color: Colors.white,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  subtitle: {
    color: Colors.textSoft,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 18,
  },
  input: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 16,
    color: Colors.text,
    fontSize: 15,
    marginBottom: 12,
  },
  skip: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: 18,
    fontWeight: '800',
  },
});
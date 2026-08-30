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
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../components/GradientButton';
import { Colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigations';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage('');
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!trimmedPassword || trimmedPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login({ email: trimmedEmail, password: trimmedPassword });
      } else {
        await register({
          email: trimmedEmail,
          password: trimmedPassword,
          name: name.trim(),
          skills: ['JavaScript', 'React'],
          interests: ['engineering'],
        });
      }
      navigation.replace('HomeChoice');
    } catch (e: any) {
      setErrorMessage(e.userMessage || 'Authentication failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@careerplus.com');
    setPassword('password123');
    setSubmitting(true);
    setErrorMessage('');
    try {
      await login({ email: 'demo@careerplus.com', password: 'password123' });
      navigation.replace('HomeChoice');
    } catch (e) {
      navigation.replace('HomeChoice');
    } finally {
      setSubmitting(false);
    }
  };

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
            colors={['rgba(11,16,32,0.15)', 'rgba(11,16,32,0.85)']}
            style={styles.heroOverlay}
          >
            <Text style={styles.brand}>CareerPlus</Text>
            <Text style={styles.tagline}>
              A brighter, more beautiful way to discover careers and dream jobs.
            </Text>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.card}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, mode === 'login' && styles.tabActive]}
              onPress={() => {
                setMode('login');
                setErrorMessage('');
              }}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, mode === 'signup' && styles.tabActive]}
              onPress={() => {
                setMode('signup');
                setErrorMessage('');
              }}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </Text>

          <Text style={styles.subtitle}>
            {mode === 'login'
              ? 'Continue your career exploration and job discovery.'
              : 'Start exploring curated opportunities and inspiring career roadmaps.'}
          </Text>

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
            </View>
          ) : null}

          {mode === 'signup' ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="words"
            />
          ) : null}

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email address (e.g. alex@example.com)"
            placeholderTextColor={Colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Password (min 6 characters)"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry
          />

          <GradientButton
            title={
              submitting
                ? 'Authenticating...'
                : mode === 'login'
                ? 'Sign In'
                : 'Create Account'
            }
            onPress={handleSubmit}
            style={{ marginTop: 8 }}
          />

          {/* Quick Demo Access */}
          <TouchableOpacity
            style={styles.demoBtn}
            onPress={handleDemoLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.demoBtnText}>⚡ Quick Demo Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goNext} activeOpacity={0.8}>
            <Text style={styles.skip}>Explore as Guest →</Text>
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
    height: 250,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 18,
  },
  heroImage: {
    borderRadius: 28,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  brand: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  tagline: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
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
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: 'rgba(124,92,255,0.35)',
  },
  tabText: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  tabTextActive: {
    color: Colors.white,
  },
  title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: 'rgba(255,114,114,0.18)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,114,114,0.3)',
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    fontWeight: '700',
  },
  input: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 16,
    color: Colors.text,
    fontSize: 14,
    marginBottom: 12,
  },
  demoBtn: {
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79,209,255,0.4)',
    backgroundColor: 'rgba(79,209,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  demoBtnText: {
    color: Colors.cyan,
    fontSize: 13,
    fontWeight: '900',
  },
  skip: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: 16,
    fontWeight: '800',
    fontSize: 13,
  },
});

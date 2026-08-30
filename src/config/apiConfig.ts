import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Storage key for user-configured custom API Base URL.
 */
export const API_BASE_URL_KEY = '@careerplus_api_base_url';

/**
 * Default API host addresses:
 * - USB Debugging with 'adb reverse tcp:8000 tcp:8000' -> http://127.0.0.1:8000/api or http://localhost:8000/api
 * - Android Emulator -> http://10.0.2.2:8000/api
 * - Local Wi-Fi network fallback
 */
export const DEFAULT_DEV_HOSTS = [
  'http://localhost:8000/api',
  'http://127.0.0.1:8000/api',
  'http://10.0.2.2:8000/api',
];

/**
 * Default base URL for Android:
 * Uses localhost:8000 (works directly when adb reverse tcp:8000 tcp:8000 is run over USB)
 */
export const DEFAULT_API_BASE_URL = Platform.select({
  android: 'http://127.0.0.1:8000/api',
  ios: 'http://localhost:8000/api',
  default: 'http://localhost:8000/api',
});

let activeBaseURL = DEFAULT_API_BASE_URL;

/**
 * Initialize and load any custom configured Base URL from AsyncStorage.
 */
export const initApiBaseURL = async (): Promise<string> => {
  try {
    const saved = await AsyncStorage.getItem(API_BASE_URL_KEY);
    if (saved && saved.trim().length > 0) {
      activeBaseURL = saved.trim();
    }
  } catch (e) {
    console.warn('Could not load saved API base URL from storage', e);
  }
  return activeBaseURL;
};

/**
 * Set and persist a new Base URL (e.g. custom LAN IP).
 */
export const setApiBaseURL = async (newUrl: string): Promise<void> => {
  activeBaseURL = newUrl.trim();
  try {
    await AsyncStorage.setItem(API_BASE_URL_KEY, activeBaseURL);
  } catch (e) {
    console.warn('Could not save API base URL to storage', e);
  }
};

/**
 * Reset Base URL to default.
 */
export const resetApiBaseURL = async (): Promise<string> => {
  activeBaseURL = DEFAULT_API_BASE_URL;
  try {
    await AsyncStorage.removeItem(API_BASE_URL_KEY);
  } catch (e) {
    console.warn('Could not reset API base URL in storage', e);
  }
  return activeBaseURL;
};

/**
 * Synchronous getter for current in-memory Base URL.
 */
export const getApiBaseURL = (): string => activeBaseURL;

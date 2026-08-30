import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initApiBaseURL,
  getApiBaseURL,
  setApiBaseURL as setConfigBaseURL,
  DEFAULT_DEV_HOSTS,
} from '../config/apiConfig';

export const TOKEN_STORAGE_KEY = '@careerplus_auth_token';
export const USER_STORAGE_KEY = '@careerplus_auth_user';
export { DEFAULT_DEV_HOSTS };

const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Initialize persisted custom URL on module load
initApiBaseURL().then((url) => {
  apiClient.defaults.baseURL = url;
}).catch((err) => {
  console.warn('API base URL initialization failed:', err);
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Keep baseURL in sync with active configuration
      config.baseURL = getApiBaseURL();
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Error reading auth token from AsyncStorage', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format error messages
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    let errorMessage = 'Unable to connect to server. Please check your network or backend.';
    if (error.response?.data?.detail) {
      errorMessage = typeof error.response.data.detail === 'string'
        ? error.response.data.detail
        : JSON.stringify(error.response.data.detail);
    } else if (error.message) {
      errorMessage = error.message;
    }
    (error as any).userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export const setApiBaseURL = async (url: string) => {
  await setConfigBaseURL(url);
  apiClient.defaults.baseURL = url;
};

export { getApiBaseURL };

export default apiClient;

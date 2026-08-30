import apiClient, { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id: string;
  email: string;
  name: string;
  title?: string;
  bio?: string;
  location?: string;
  skills: string[];
  interests: string[];
  experience_level: string;
  saved_jobs_count?: number;
  applied_jobs_count?: number;
  created_at?: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: User;
};

export type RegisterData = {
  email: string;
  name: string;
  password: string;
  skills?: string[];
  interests?: string[];
  experience_level?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ProfileUpdateData = Partial<{
  name: string;
  title: string;
  bio: string;
  location: string;
  skills: string[];
  interests: string[];
  experience_level: string;
  phone: string;
}>;

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    const authData = response.data;
    if (authData.access_token) {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, authData.access_token);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authData.user));
    }
    return authData;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    const authData = response.data;
    if (authData.access_token) {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, authData.access_token);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authData.user));
    }
    return authData;
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data));
    return response.data;
  },

  async updateProfile(data: ProfileUpdateData): Promise<User> {
    const response = await apiClient.put<User>('/auth/profile', data);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data));
    return response.data;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  },

  async getStoredAuth(): Promise<{ token: string | null; user: User | null }> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const user = userJson ? JSON.parse(userJson) : null;
      return { token, user };
    } catch (e) {
      return { token: null, user: null };
    }
  },
};

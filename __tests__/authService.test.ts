import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, RegisterData, LoginData } from '../src/services/authService';
import apiClient, { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../src/services/api';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('../src/services/api', () => {
  const original = jest.requireActual('../src/services/api');
  return {
    __esModule: true,
    ...original,
    default: {
      post: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      defaults: { baseURL: 'http://localhost:8000/api' },
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    },
  };
});

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register user, store token and user in storage, and return auth response', async () => {
    const mockAuthResponse = {
      access_token: 'mock-jwt-token-123',
      token_type: 'bearer',
      user: {
        id: 'user-1',
        email: 'alex@example.com',
        name: 'Alex Rivera',
        skills: ['JavaScript'],
        interests: ['engineering'],
        experience_level: 'Beginner',
      },
    };

    (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockAuthResponse });

    const registerData: RegisterData = {
      email: 'alex@example.com',
      name: 'Alex Rivera',
      password: 'password123',
      skills: ['JavaScript'],
      interests: ['engineering'],
    };

    const res = await authService.register(registerData);

    expect(apiClient.post).toHaveBeenCalledWith('/auth/register', registerData);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, mockAuthResponse.access_token);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(USER_STORAGE_KEY, JSON.stringify(mockAuthResponse.user));
    expect(res).toEqual(mockAuthResponse);
  });

  it('should login user and persist auth credentials', async () => {
    const mockLoginResponse = {
      access_token: 'login-jwt-token-456',
      token_type: 'bearer',
      user: {
        id: 'user-1',
        email: 'alex@example.com',
        name: 'Alex Rivera',
        skills: ['React'],
        interests: ['engineering'],
        experience_level: 'Beginner',
      },
    };

    (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockLoginResponse });

    const loginData: LoginData = {
      email: 'alex@example.com',
      password: 'password123',
    };

    const res = await authService.login(loginData);

    expect(apiClient.post).toHaveBeenCalledWith('/auth/login', loginData);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, mockLoginResponse.access_token);
    expect(res.access_token).toBe('login-jwt-token-456');
  });

  it('should remove stored credentials on logout', async () => {
    await authService.logout();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(TOKEN_STORAGE_KEY);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(USER_STORAGE_KEY);
  });

  it('should restore stored auth credentials from storage', async () => {
    const mockUser = {
      id: 'user-1',
      email: 'alex@example.com',
      name: 'Alex Rivera',
      skills: ['React'],
      interests: [],
      experience_level: 'Beginner',
    };

    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      if (key === TOKEN_STORAGE_KEY) return Promise.resolve('stored-jwt-token');
      if (key === USER_STORAGE_KEY) return Promise.resolve(JSON.stringify(mockUser));
      return Promise.resolve(null);
    });

    const stored = await authService.getStoredAuth();

    expect(stored.token).toBe('stored-jwt-token');
    expect(stored.user).toEqual(mockUser);
  });
});

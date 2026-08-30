import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initApiBaseURL,
  getApiBaseURL,
  setApiBaseURL,
  resetApiBaseURL,
  API_BASE_URL_KEY,
  DEFAULT_API_BASE_URL,
} from '../src/config/apiConfig';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('apiConfig module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default API base URL when no custom URL is stored', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const url = await initApiBaseURL();
    expect(url).toBe(DEFAULT_API_BASE_URL);
    expect(getApiBaseURL()).toBe(DEFAULT_API_BASE_URL);
  });

  it('should load custom API base URL from AsyncStorage', async () => {
    const customHost = 'http://192.168.1.100:8000/api';
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(customHost);
    const url = await initApiBaseURL();
    expect(url).toBe(customHost);
    expect(getApiBaseURL()).toBe(customHost);
  });

  it('should save and update API base URL to AsyncStorage', async () => {
    const newHost = 'http://10.0.0.5:8000/api';
    await setApiBaseURL(newHost);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(API_BASE_URL_KEY, newHost);
    expect(getApiBaseURL()).toBe(newHost);
  });

  it('should reset API base URL to default', async () => {
    await resetApiBaseURL();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(API_BASE_URL_KEY);
    expect(getApiBaseURL()).toBe(DEFAULT_API_BASE_URL);
  });
});

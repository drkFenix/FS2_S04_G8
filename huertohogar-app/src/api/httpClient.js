import axios from 'axios';
import {
  getAuthSession,
  saveAuthSession,
  clearAuthSession,
} from '../utils/authSession';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

let refreshPromise = null;

function isAuthPublicEndpoint(url = '') {
  return (
    url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/refresh')
  );
}

httpClient.interceptors.request.use((config) => {
  const session = getAuthSession();
  if (session?.accessToken && !isAuthPublicEndpoint(config.url)) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${session.accessToken}`;
    config._sessionToken = session.accessToken;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthPublicEndpoint(originalRequest.url)
    ) {
      const currentSession = getAuthSession();
      if (currentSession?.refreshToken) {
        originalRequest._retry = true;
        try {
          if (!refreshPromise) {
            refreshPromise = axios
              .post(`${BASE_URL}/auth/refresh`, {
                refreshToken: currentSession.refreshToken,
              })
              .then((res) => {
                const updated = saveAuthSession(res.data);
                return updated.accessToken;
              })
              .finally(() => {
                refreshPromise = null;
              });
          }

          const newToken = await refreshPromise;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return httpClient(originalRequest);
        } catch (refreshError) {
          clearAuthSession();
          return Promise.reject(refreshError);
        }
      }

      if (
        originalRequest._sessionToken &&
        originalRequest._sessionToken === currentSession?.accessToken
      ) {
        clearAuthSession();
      }
    }

    return Promise.reject(error);
  }
);

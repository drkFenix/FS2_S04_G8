import { httpClient } from '../api/httpClient';

export const authService = {
  async login(correo, password) {
    const response = await httpClient.post('/auth/login', { correo, password });
    return response.data;
  },
  async register(payload) {
    const response = await httpClient.post('/auth/register', payload);
    return response.data;
  },
  async refresh(refreshToken) {
    const response = await httpClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },
  async me() {
    const response = await httpClient.get('/auth/me');
    return response.data;
  },
};

import { httpClient } from '../api/httpClient';

export const userService = {
  async getProfile() {
    const response = await httpClient.get('/usuarios/me');
    return response.data;
  },
  async updateProfile(payload) {
    const response = await httpClient.put('/usuarios/me', payload);
    return response.data;
  },
  async listAll() {
    const response = await httpClient.get('/usuarios');
    return response.data;
  },
  async create(payload) {
    const response = await httpClient.post('/usuarios', payload);
    return response.data;
  },
  async update(id, payload) {
    const response = await httpClient.put(`/usuarios/${id}`, payload);
    return response.data;
  },
  async remove(id) {
    await httpClient.delete(`/usuarios/${id}`);
  },
};

import { httpClient } from '../api/httpClient';

export const orderService = {
  async create(payload) {
    const response = await httpClient.post('/boletas', payload);
    return response.data;
  },
  async listAll() {
    const response = await httpClient.get('/boletas');
    return response.data;
  },
  async listMine() {
    const response = await httpClient.get('/boletas/mis-ordenes');
    return response.data;
  },
  async findById(id) {
    const response = await httpClient.get(`/boletas/${id}`);
    return response.data;
  },
  async updateEstado(id, estado) {
    const response = await httpClient.patch(`/boletas/${id}/estado`, { estado });
    return response.data;
  },
};

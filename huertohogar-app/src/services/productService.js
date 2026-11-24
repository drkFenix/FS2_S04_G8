import { httpClient } from '../api/httpClient';

export const productService = {
  async list(params = {}) {
    const response = await httpClient.get('/productos', { params });
    return response.data;
  },
  async findById(id) {
    const response = await httpClient.get(`/productos/${id}`);
    return response.data;
  },
  async create(producto) {
    const response = await httpClient.post('/productos', producto);
    return response.data;
  },
  async update(id, producto) {
    const response = await httpClient.put(`/productos/${id}`, producto);
    return response.data;
  },
  async remove(id) {
    await httpClient.delete(`/productos/${id}`);
  },
};

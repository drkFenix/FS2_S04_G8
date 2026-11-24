import { httpClient } from '../api/httpClient';

export const categoryService = {
  async list() {
    const response = await httpClient.get('/categorias');
    return response.data;
  },
  async findById(id) {
    const response = await httpClient.get(`/categorias/${id}`);
    return response.data;
  },
  async create(categoria) {
    const response = await httpClient.post('/categorias', categoria);
    return response.data;
  },
  async update(id, categoria) {
    const response = await httpClient.put(`/categorias/${id}`, categoria);
    return response.data;
  },
  async remove(id) {
    await httpClient.delete(`/categorias/${id}`);
  },
};

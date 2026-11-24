import { httpClient } from '../api/httpClient';

export const dashboardService = {
  async getResumen() {
    const response = await httpClient.get('/dashboard/resumen');
    return response.data;
  },
};

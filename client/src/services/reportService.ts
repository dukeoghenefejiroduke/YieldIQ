import api from './api';

export const getAggregatedReports = async () => {
  const response = await api.get('/reports/aggregated');
  return response.data;
};

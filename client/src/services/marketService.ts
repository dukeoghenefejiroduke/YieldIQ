import api from './api';

export const getMarketPrices = async () => {
  const { data } = await api.get('/market/prices');
  return data;
};

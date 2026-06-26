import api from './api';

export const getWhatsappHistory = async () => {
  const response = await api.get('/whatsapp/history');
  return response.data;
};

import api from './api';

export const getUssdLogs = async () => {
  const response = await api.get('/ussd/logs');
  return response.data;
};

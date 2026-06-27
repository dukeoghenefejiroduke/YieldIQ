import api from './api';

export const createTransaction = async (transactionData: {
  transcription: string;
  type: 'sale' | 'purchase' | 'credit';
  amount: number;
  item: string;
}) => {
  const { data } = await api.post('/logs', transactionData);
  return data;
};

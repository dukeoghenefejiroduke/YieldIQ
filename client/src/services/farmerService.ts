import api from './api';

export const getFarmerProfile = async () => {
  const { data } = await api.get('/farmer/profile');
  return data;
};

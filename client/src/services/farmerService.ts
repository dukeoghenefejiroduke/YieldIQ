import api from './api';

export const createFarmerProfile = async (profileData: { name: string; phoneNumber: string; location: string }) => {
  const { data } = await api.post('/farmer/profile', profileData);
  return data;
};

export const getFarmerProfile = async () => {
  const { data } = await api.get('/farmer/profile');
  return data;
};

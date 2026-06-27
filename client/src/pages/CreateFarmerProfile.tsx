import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFarmerProfile } from '../services/farmerService';
import toast from 'react-hot-toast';

export const CreateFarmerProfile = () => {
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', location: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFarmerProfile(formData);
      toast.success('Profile created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create profile');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 glass-card">
      <h2 className="text-2xl font-bold mb-6">Complete Farm Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg border border-gray-300" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="text" placeholder="Phone Number" className="w-full p-3 rounded-lg border border-gray-300" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} required />
        <input type="text" placeholder="Location" className="w-full p-3 rounded-lg border border-gray-300" onChange={(e) => setFormData({...formData, location: e.target.value})} required />
        <button type="submit" className="w-full p-3 bg-primary text-white rounded-lg font-bold">Save Profile</button>
      </form>
    </div>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { createTransaction } from '../../services/logService';
import toast from 'react-hot-toast';

export const CreateTransaction = () => {
  const [formData, setFormData] = useState({
    type: 'sale',
    amount: 0,
    item: '',
    transcription: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTransaction({
        transcription: formData.transcription,
        type: formData.type as 'sale' | 'purchase' | 'credit',
        amount: Number(formData.amount),
        item: formData.item
      });
      toast.success('Transaction logged successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to log transaction');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto mt-10 p-8 glass-card">
        <h2 className="text-2xl font-bold mb-6">Log New Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select 
            className="w-full p-3 rounded-lg border border-gray-300" 
            onChange={(e) => setFormData({...formData, type: e.target.value as any})}
          >
            <option value="sale">Sale</option>
            <option value="purchase">Purchase</option>
            <option value="credit">Credit</option>
          </select>
          <input type="number" placeholder="Amount (₦)" className="w-full p-3 rounded-lg border border-gray-300" onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})} required />
          <input type="text" placeholder="Item Name (e.g. Maize)" className="w-full p-3 rounded-lg border border-gray-300" onChange={(e) => setFormData({...formData, item: e.target.value})} required />
          <textarea placeholder="Description" className="w-full p-3 rounded-lg border border-gray-300" onChange={(e) => setFormData({...formData, transcription: e.target.value})} />
          <button type="submit" className="w-full p-3 bg-primary text-white rounded-lg font-bold">Log Transaction</button>
        </form>
      </div>
    </MainLayout>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', { username, email, password });
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch {
      toast.error('Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Username" className="w-full p-2 border" onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full p-2 border" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 border" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
};

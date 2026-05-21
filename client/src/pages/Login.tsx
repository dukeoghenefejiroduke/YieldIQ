import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loginStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      loginStore(data.user, data.token);
      toast.success('Welcome back to the field!', {
        icon: '🌾',
        style: { borderRadius: '12px', background: '#1a3c1a', color: '#fff' }
      });
      navigate('/dashboard');
    } catch {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-card p-10 max-w-md w-full flex flex-col gap-8 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-2">
          <h1 className="text-4xl">AgroPulse</h1>
          <p className="text-secondary font-medium">Precision Farming Command Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input
              type="email"
              placeholder="farmer@yieldiq.com"
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-forest-mid text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-forest-deep transition-all shadow-xl mt-4"
          >
            {isLoading ? 'Authenticating...' : (
              <>Sign In <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-secondary">
            New to the platform?{' '}
            <Link to="/signup" className="text-forest-mid font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

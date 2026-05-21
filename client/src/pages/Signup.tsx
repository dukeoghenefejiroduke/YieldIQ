import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, CheckCircle } from 'lucide-react';
import api from '../services/api';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/auth/signup', { username, email, password });
      toast.success('Account created! Ready to harvest.', {
        icon: '🚜',
        style: { borderRadius: '12px', background: '#1a3c1a', color: '#fff' }
      });
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Signup failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-card p-10 max-w-md w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="text-center space-y-2">
          <h1 className="text-4xl">Join AgroPulse</h1>
          <p className="text-secondary font-medium">Start your digital field journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input
              type="text"
              placeholder="John Farmer"
              className="input-field"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Secure Password
            </label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-forest-mid text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-forest-deep transition-all shadow-xl mt-6"
          >
            {isLoading ? 'Creating Account...' : (
              <>Create Account <CheckCircle className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-forest-mid font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

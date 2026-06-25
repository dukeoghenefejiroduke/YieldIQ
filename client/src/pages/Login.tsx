import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-forest-deep/10 to-soil-rich/10">
      <div className="glass-card p-10 max-w-md w-full flex flex-col gap-8 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-2">
          <h1 className="text-4xl text-forest-deep dark:text-forest-light">AgroPulse</h1>
          <p className="text-text-secondary font-medium">Precision Farming Command Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-forest-mid" /> Email Address
            </label>
            <input
              type="email"
              placeholder="farmer@yieldiq.com"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <Lock className="w-4 h-4 text-forest-mid" /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-forest-mid text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-forest-deep transition-all shadow-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-text-secondary">
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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({ username, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-forest-deep/10 to-soil-rich/10">
      <div className="glass-card p-10 max-w-md w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="text-center space-y-2">
          <h1 className="text-4xl text-forest-deep dark:text-forest-light">Join AgroPulse</h1>
          <p className="text-text-secondary font-medium">Start your digital field journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <User className="w-4 h-4 text-forest-mid" /> Full Name
            </label>
            <input
              type="text"
              placeholder="John Farmer"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-forest-mid" /> Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold ml-1 flex items-center gap-2">
              <Lock className="w-4 h-4 text-forest-mid" /> Secure Password
            </label>
            <input
              type="password"
              placeholder="Min. 8 characters"
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
            className="w-full bg-forest-mid text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-forest-deep transition-all shadow-xl mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Create Account <CheckCircle className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-text-secondary">
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

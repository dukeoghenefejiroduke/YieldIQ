import React from 'react';
import { LayoutDashboard, MapPin, TrendingUp, BarChart, Settings, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-slate-900 text-gray-50">
      {/* Sidebar */}
      <aside className="w-18 bg-slate-600 flex flex-col items-center py-6 gap-6 fixed h-full z-50">
        <div className="text-white font-bold text-xl cursor-pointer" onClick={() => navigate('/dashboard')}>AP</div>
        <nav className="flex flex-col gap-6">
          <LayoutDashboard className="text-white/70 hover:text-white cursor-pointer" onClick={() => navigate('/dashboard')} />
          <MapPin className="text-white/70 hover:text-white cursor-pointer" onClick={() => navigate('/whatsapp')} />
          <TrendingUp className="text-white/70 hover:text-white cursor-pointer" onClick={() => navigate('/ussd')} />
          <BarChart className="text-white/70 hover:text-white cursor-pointer" onClick={() => navigate('/reports')} />
          <Settings className="text-white/70 hover:text-white cursor-pointer" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-18 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/70 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-50">Field Command Center</h1>
          <div className="flex items-center gap-4 text-gray-300">
            <span className="text-sm">Friday, June 26, 2026</span>
            <Globe className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-xs">U</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>

      {/* Command Settings */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <button className="bg-slate-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform">
          <Settings className="w-6 h-6" />
        </button>
        <div className="absolute bottom-16 right-0 bg-slate-800 p-4 rounded-xl shadow-2xl border border-slate-700 hidden group-hover:block w-48">
          <p className="font-bold mb-2">Settings</p>
          <div className="space-y-2">
              <button className="text-sm block hover:text-green-400">Offline Mode</button>
              <button className="text-sm block hover:text-green-400">Sync Now</button>
              <button className="text-sm block hover:text-green-400">Switch Farm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

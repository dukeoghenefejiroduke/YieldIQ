import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, BarChart, Settings, Globe, LogOut, User, Users, CloudSun, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { SyncIndicator } from '../ui/SyncIndicator';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Forecast', path: '/forecast', icon: CloudSun },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Reports', path: '/reports', icon: BarChart },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-gray-50 pb-20">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/70 border-b border-slate-700 px-8 py-6 flex items-center justify-between">
          <SyncIndicator />
          <div className="flex items-center gap-6">
            <Globe className="w-5 h-5 cursor-pointer text-gray-300" />
            <div className="relative" ref={settingsRef}>
                <button 
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm"
                >
                    U
                </button>
                <AnimatePresence>
                    {isSettingsOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-2 z-50"
                        >
                            <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-slate-700 rounded-lg"><User className="w-4 h-4"/> Profile</button>
                            <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-slate-700 rounded-lg"><Settings className="w-4 h-4"/> Settings</button>
                            <hr className="my-1 border-slate-700" />
                            <button className="flex items-center gap-2 w-full p-2 text-sm text-red-400 hover:bg-red-900/20 rounded-lg"><LogOut className="w-4 h-4"/> Logout</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 md:p-10 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around p-3 z-50">
        {navItems.map(item => (
            <button 
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 active:scale-95 transition-transform ${location.pathname === item.path ? 'text-green-400' : 'text-gray-400'}`}
            >
                <item.icon className="w-6 h-6" />
                <span className="text-[10px]">{item.name}</span>
            </button>
        ))}
      </nav>
    </div>
  );
};

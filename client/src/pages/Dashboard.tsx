import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { StatsView } from '../components/StatsView';
import { VoiceEntry } from '../components/VoiceEntry';
import { ConnectionStatus } from '../components/ui/ConnectionStatus';
import { LogOut, LayoutDashboard, History, Settings, Cloud } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('journal');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get('/logs');
        setLogs(data);
      } catch (error) {
        console.error('Fetch logs error:', error);
        toast.error('Could not refresh cloud data');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen pb-24">
      <ConnectionStatus />
      
      {/* Premium Sidebar/Nav */}
      <nav className="fixed top-0 left-0 right-0 h-20 glass-card rounded-none border-t-0 border-x-0 z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-forest-mid rounded-xl flex items-center justify-center shadow-lg">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">AgroPulse Elite</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold">{user?.username}</p>
            <p className="text-xs text-secondary capitalize">{user?.role || 'Farmer'}</p>
          </div>
          <button
            onClick={logout}
            className="p-3 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="mt-28 max-w-7xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <header className="mb-10 text-left">
          <h1 className="text-4xl mb-2">Field Command Center</h1>
          <p className="text-secondary text-lg">Real-time agricultural intelligence and voice logging.</p>
        </header>

        <StatsView logsCount={logs.length} pendingCount={0} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Voice Entry - Primary Action */}
          <div className="lg:col-span-2 space-y-8">
            <VoiceEntry />
          </div>

          {/* Activity Feed / History */}
          <div className="space-y-6">
            <div className="glass-card p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-forest-mid" /> History
                </h3>
                <span className="text-xs font-bold px-2 py-1 bg-forest-light/10 text-forest-mid rounded-full">Recent</span>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center py-20">
                  <Cloud className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-secondary">No observations recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {logs.map((log: any) => (
                    <div key={log._id} className="p-4 bg-nature-bg rounded-xl border border-glass-border hover:border-forest-light transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-forest-mid opacity-60">
                          {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-forest-light shadow-[0_0_8px_rgba(76,140,74,0.5)]" />
                      </div>
                      <p className="text-sm line-clamp-2 group-hover:line-clamp-none transition-all">{log.transcription}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Nav (Mobile/Premium feel) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 glass-card rounded-2xl shadow-2xl border-forest-light/20 z-40">
        <button
          onClick={() => setActiveTab('journal')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
            activeTab === 'journal' ? 'bg-forest-mid text-white shadow-lg' : 'hover:bg-forest-light/10 text-secondary'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-bold hidden sm:inline">Command</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
            activeTab === 'settings' ? 'bg-forest-mid text-white shadow-lg' : 'hover:bg-forest-light/10 text-secondary'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-bold hidden sm:inline">Settings</span>
        </button>
      </div>
    </div>
  );
};

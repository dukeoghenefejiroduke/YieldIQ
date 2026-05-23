import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useLogStore } from '../store/logStore';
import { StatsView } from '../components/StatsView';
import { VoiceEntry } from '../components/VoiceEntry';
import { ConnectionStatus } from '../components/ui/ConnectionStatus';
import { LogOut, LayoutDashboard, History, Settings, Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { useSync } from '../hooks/useSync';

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { logs, fetchLogs, isLoading, isSyncing } = useLogStore();
  const [activeTab, setActiveTab] = useState('journal');

  useSync();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const pendingCount = logs.filter(l => l.syncStatus === 'pending').length;

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
        <header className="mb-10 text-left flex justify-between items-end">
          <div>
            <h1 className="text-4xl mb-2 text-forest-deep dark:text-forest-light">Field Command Center</h1>
            <p className="text-secondary text-lg">Real-time agricultural intelligence and voice logging.</p>
          </div>
          {isSyncing && (
            <div className="flex items-center gap-2 text-forest-mid font-bold animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Syncing...</span>
            </div>
          )}
        </header>

        <StatsView logsCount={logs.length} pendingCount={pendingCount} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Voice Entry - Primary Action */}
          <div className="lg:col-span-2 space-y-8">
            <VoiceEntry />
          </div>

          {/* Activity Feed / History */}
          <div className="space-y-6">
            <div className="glass-card p-6 h-[700px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-forest-mid" /> History
                </h3>
                <button 
                  onClick={() => fetchLogs()} 
                  className="p-2 hover:bg-forest-light/10 rounded-full transition-colors"
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-4 h-4 text-forest-mid ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {isLoading && logs.length === 0 ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center py-20">
                  <Cloud className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-secondary">No observations recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                  {logs.map((log) => (
                    <div key={log._id || log.id} className="p-4 bg-nature-bg rounded-xl border border-glass-border hover:border-forest-light transition-all cursor-pointer group relative">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-forest-mid opacity-60">
                          {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {log.syncStatus === 'pending' ? (
                          <CloudOff className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Cloud className="w-4 h-4 text-forest-light" />
                        )}
                      </div>
                      <p className="text-sm line-clamp-2 group-hover:line-clamp-none transition-all">{log.transcription}</p>
                      {log.location && (
                        <div className="mt-2 text-[10px] font-mono text-secondary flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-mid" />
                          {log.location.lat.toFixed(4)}, {log.location.lng.toFixed(4)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Nav */}
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

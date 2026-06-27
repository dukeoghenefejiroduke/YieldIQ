import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuthStore } from '../store/authStore';
import { useLogStore } from '../store/logStore';
import { KPICards } from '../components/dashboard/KPICards';
import { StatsView } from '../components/StatsView';
import { VoiceEntry } from '../components/VoiceEntry';
import { WeatherAlert } from '../components/ui/WeatherAlert';
import { ConnectionStatus } from '../components/ui/ConnectionStatus';
import { History, Cloud, CloudOff, RefreshCw, DollarSign, MessageSquare, Phone, BarChart } from 'lucide-react';
import { useSync } from '../hooks/useSync';
import { getFarmerProfile } from '../services/farmerService';
import { getMarketPrices } from '../services/marketService';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { logs, fetchLogs, isLoading, isSyncing } = useLogStore();
  const navigate = useNavigate();
  const [activeLogId, setActiveLogId] = useState<string | null>(null);
  const [farmer, setFarmer] = useState<any>(null);
  const [prices, setPrices] = useState<any[]>([]);

  useSync();

  const fetchData = useCallback(async () => {
    fetchLogs();
    
    const fetchFarmer = async () => {
      try {
        return await getFarmerProfile();
      } catch (error: any) {
        if (error.response?.status === 404) {
          navigate('/create-profile');
          return null;
        }
        console.error('Failed to fetch farmer profile', error);
        return null;
      }
    };

    const fetchPrices = async () => {
      try {
        return await getMarketPrices();
      } catch (error) {
        console.error('Failed to fetch market prices', error);
        return [];
      }
    };

    const [farmerData, pricesData] = await Promise.all([
      fetchFarmer(),
      fetchPrices()
    ]);
    
    setFarmer(farmerData);
    setPrices(pricesData);
  }, [fetchLogs, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const pendingCount = logs.filter(l => l.syncStatus === 'pending').length;
  const creditScore = farmer?.creditScore || 0;

  return (
    <MainLayout>
      <div className="min-h-screen pb-24">
      <ConnectionStatus />
      <WeatherAlert />
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <header className="mb-10 text-left flex justify-between items-end">
          <div>
            <h1 className="text-4xl mb-2 text-forest-deep dark:text-forest-light">Field Command Center</h1>
            <p className="text-text-secondary text-lg">
                Welcome, {farmer?.name || user?.username}. 
                <span className="ml-4 font-bold text-forest-mid">Credit Score: {creditScore}</span>
            </p>
          </div>
          {isSyncing && (
            <div className="flex items-center gap-2 text-forest-mid font-bold animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Syncing...</span>
            </div>
          )}
        </header>

        <StatsView logsCount={logs.length} pendingCount={pendingCount} />

        <KPICards farmer={farmer} logs={logs} pendingCount={pendingCount} entriesCount={logs.length} productivity="+12%" />
        
        <div className="mb-6 flex gap-4">
            <button onClick={() => navigate('/log-transaction')} className="bg-secondary text-primary px-6 py-2 rounded-lg font-bold">
                + Log New Transaction
            </button>
            <Link to="/whatsapp" className="bg-white border border-glass-border px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Whatsapp
            </Link>
            <Link to="/ussd" className="bg-white border border-glass-border px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <Phone className="w-4 h-4" /> USSD
            </Link>
            <Link to="/reports" className="bg-white border border-glass-border px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                <BarChart className="w-4 h-4" /> Reports
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Voice Entry - Primary Action */}
          <div className="lg:col-span-2 space-y-8">
            <VoiceEntry />
            
            {/* Market Prices Section */}
            <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" /> Real-time Market Prices
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-alert-success bg-alert-success/10 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-alert-success animate-pulse"></div> Live
                    </div>
                </div>
                <div className="space-y-4">
                    {prices.length === 0 ? (
                        [1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)
                    ) : (
                        prices.map((p, i) => (
                            <div key={i} className="flex justify-between items-center p-3 border-b border-glass-border">
                                <p className="font-bold">{p.crop}</p>
                                <p className="text-sm text-text-secondary">₦{p.price} / {p.unit}</p>
                                <p className="text-sm font-bold text-alert-success">+2.4%</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
          </div>
...

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
                  aria-label="Refresh logs"
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
                  <p className="text-text-secondary">No observations recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                  {logs.map((log) => {
                    const logId = log._id || log.id || '';
                    return (
                      <div 
                        key={logId} 
                        onClick={() => setActiveLogId(String(logId))}
                        className={`p-4 bg-nature-bg rounded-xl border transition-all cursor-pointer group relative ${
                          activeLogId === logId 
                            ? 'border-forest-mid ring-2 ring-forest-mid/20' 
                            : 'border-glass-border hover:border-forest-light'
                        }`}
                        role="button"
                        aria-pressed={activeLogId === logId}
                        aria-label="View log entry"
                      >
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
                        {log.source && log.source !== 'app' && (
                          <span className="text-[10px] uppercase font-bold text-forest-mid bg-forest-mid/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                             {log.source}
                          </span>
                        )}
                        <p className="text-sm line-clamp-2 group-hover:line-clamp-none transition-all">{log.transcription}</p>
                        {log.location && (
                          <div className="mt-2 text-[10px] font-mono text-text-secondary flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-forest-mid" />
                            {log.location.lat.toFixed(4)}, {log.location.lng.toFixed(4)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  </MainLayout>
  );
};

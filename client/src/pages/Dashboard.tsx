import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useLogStore } from '../store/logStore';
import { ConnectionStatus } from '../components/ui/ConnectionStatus';
import { TrendingUp, ArrowUp, CloudUpload, RefreshCw } from 'lucide-react';
import { useSync } from '../hooks/useSync';
import { getFarmerProfile } from '../services/farmerService';
import { getMarketPrices } from '../services/marketService';
import { EducationalTip } from '../components/ui/EducationalTip';
import { FieldForecast } from '../components/ui/FieldForecast';
import { CommunityBenchmark } from '../components/ui/CommunityBenchmark';

const MOCK_MARKET_TRENDS = [
    { crop: 'Cassava', price: 450, unit: 'kg', region: 'Rivers', sellSignal: false },
    { crop: 'Maize', price: 650, unit: 'mudu', region: 'Rivers', sellSignal: true },
    { crop: 'Yam', price: 1200, unit: 'tuber', region: 'Rivers', sellSignal: false }
];

export const Dashboard = () => {
  const { pendingCount, fetchLogs, syncLogs, isSyncing } = useLogStore();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState<any>(null);
  const [marketTrends, setMarketTrends] = useState<any[]>([]);

  useSync();

  const fetchData = useCallback(async () => {
    fetchLogs();
    try {
      const [profile, trends] = await Promise.all([
          getFarmerProfile(),
          getMarketPrices()
      ]);
      setFarmer(profile);
      setMarketTrends(trends.length > 0 ? trends : MOCK_MARKET_TRENDS);
    } catch (error: any) {
      if (error.response?.status === 404) {
        navigate('/create-profile');
      }
      setMarketTrends(MOCK_MARKET_TRENDS);
    }
  }, [fetchLogs, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainLayout>
      <div className="bg-slate-900 min-h-screen text-gray-50 space-y-6">
        <ConnectionStatus />

        {/* Personalized Welcome */}
        <header>
            <h1 className="text-2xl font-black text-white">Welcome, {farmer?.name || 'Farmer'}</h1>
            <p className="text-gray-400">Manage your farm operations seamlessly.</p>
        </header>

        {/* Educational Tip */}
        <EducationalTip 
            title="Grow Your Credit" 
            message="Logging transactions consistently and syncing your data helps build a credit profile that qualifies you for better insurance and loans."
        />

        <FieldForecast />
        <CommunityBenchmark />

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-600 p-4 rounded-xl">
                <p className="text-sm text-gray-300">Wallet Balance</p>
                <p className="text-2xl font-bold">₦{farmer?.balance || '0'}</p>
            </div>
            {pendingCount > 0 ? (
                <button 
                    onClick={syncLogs}
                    disabled={isSyncing}
                    className="bg-amber-600 p-4 rounded-xl flex flex-col justify-between items-start active:scale-95 transition-transform"
                >
                    <div className="flex items-center gap-2">
                        <CloudUpload className="w-5 h-5" />
                        <p className="text-sm font-bold">Pending Sync</p>
                    </div>
                    <p className="text-2xl font-bold">{pendingCount} items</p>
                    <p className="text-xs mt-1 flex items-center gap-1 font-semibold text-white/80">
                        <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} /> 
                        {isSyncing ? 'Syncing...' : 'Sync Now'}
                    </p>
                </button>
            ) : (
                <div className="bg-slate-700 p-4 rounded-xl">
                    <p className="text-sm text-gray-300">Sync Status</p>
                    <p className="text-2xl font-bold text-green-400">Synced</p>
                </div>
            )}
        </div>

        {/* Market Trends (Top 3) */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"><TrendingUp className="text-green-400" /> Top Market Signals</h2>
            <div className="space-y-3">
                {marketTrends.slice(0, 3).map(trend => (
                    <button 
                        key={trend.crop} 
                        onClick={() => navigate('/log-transaction', { state: { prefillItem: trend.crop } })}
                        className="w-full flex justify-between items-center bg-slate-700 p-3 rounded-lg active:scale-95 transition-transform"
                    >
                        <span className="font-bold text-white">{trend.crop}</span>
                        {trend.sellSignal ? (
                            <span className="bg-green-900 text-green-100 text-xs px-2 py-1 rounded flex items-center gap-1 font-bold">
                                <ArrowUp className="w-3 h-3"/> SELL NOW
                            </span>
                        ) : (
                            <span className="text-gray-400 text-xs">Wait</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </MainLayout>
  );
};

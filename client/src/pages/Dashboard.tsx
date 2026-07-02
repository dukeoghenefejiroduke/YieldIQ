import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuthStore } from '../store/authStore';
import { useLogStore } from '../store/logStore';
import { ConnectionStatus } from '../components/ui/ConnectionStatus';
import { Basket, Scale, Sprout, Shield, TrendingUp, AlertTriangle, ArrowUp, AlertCircle } from 'lucide-react';
import { useSync } from '../hooks/useSync';
import { getFarmerProfile } from '../services/farmerService';
import { getMarketPrices } from '../services/marketService';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { logs, fetchLogs } = useLogStore();
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
      setMarketTrends(trends);
    } catch (error: any) {
      if (error.response?.status === 404) {
        navigate('/create-profile');
      }
    }
  }, [fetchLogs, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainLayout>
      <div className="bg-slate-900 min-h-screen text-gray-50 p-4 space-y-6">
        <ConnectionStatus />

        {/* Header/Profile */}
        <header className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-white">Field Command Center</h1>
            <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center font-bold">
                {farmer?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </div>
        </header>


        {/* Metrics (2 Cards) */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-600 p-4 rounded-xl">
                <p className="text-sm text-gray-300">Wallet</p>
                <p className="text-2xl font-bold">₦{farmer?.balance || '0'}</p>
                <p className="text-[10px] text-gray-400 mt-2">Tip: Keep a small buffer for unexpected farm costs.</p>
            </div>
            <div className="bg-slate-600 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-300">Pending</p>
                        <p className="text-2xl font-bold">{pendingCount}</p>
                    </div>
                    {pendingCount > 0 && <AlertTriangle className="text-red-400" />}
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Tip: Syncing regularly improves your credit score faster.</p>
            </div>
        </div>

        {/* Market Trends (New Section) */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp /> Market Signals</h2>
            <div className="space-y-3">
                {marketTrends.map(trend => (
                    <div key={trend.crop} className="flex justify-between items-center bg-slate-700 p-3 rounded-lg">
                        <span className="font-bold">{trend.crop}</span>
                        {trend.sellSignal ? (
                            <span className="bg-green-900 text-green-100 text-xs px-2 py-1 rounded flex items-center gap-1 font-bold">
                                <ArrowUp className="w-3 h-3"/> SELL NOW
                            </span>
                        ) : (
                            <span className="text-gray-400 text-xs">Wait</span>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Actions (4 Grid) */}
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-green-900 p-6 rounded-xl flex flex-col items-center gap-2" onClick={() => navigate('/log-transaction')}>
                <Basket className="w-8 h-8" />
                <span className="text-sm font-bold">Record Harvest</span>
            </button>
            <button className="bg-slate-600 p-6 rounded-xl flex flex-col items-center gap-2" onClick={() => navigate('/market')}>
                <Scale className="w-8 h-8" />
                <span className="text-sm font-bold">Check Market</span>
            </button>
            <button className="bg-slate-600 p-6 rounded-xl flex flex-col items-center gap-2" onClick={() => navigate('/crops')}>
                <Sprout className="w-8 h-8" />
                <span className="text-sm font-bold">Update Crops</span>
            </button>
            <button className="bg-slate-600 p-6 rounded-xl flex flex-col items-center gap-2" onClick={() => navigate('/credit')}>
                <Shield className="w-8 h-8" />
                <span className="text-sm font-bold">Credit Score</span>
            </button>
        </div>
      </div>
    </MainLayout>
  );
};

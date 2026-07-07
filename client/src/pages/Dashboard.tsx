import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useLogStore } from '../store/logStore';
import { ConnectionStatus } from '../components/ui/ConnectionStatus';
import { CloudUpload, RefreshCw } from 'lucide-react';
import { useSync } from '../hooks/useSync';
import { getFarmerProfile } from '../services/farmerService';
import { EducationalTip } from '../components/ui/EducationalTip';

export const Dashboard = () => {
  const { pendingCount, fetchLogs, syncLogs, isSyncing } = useLogStore();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState<any>(null);

  useSync();

  const fetchData = useCallback(async () => {
    fetchLogs();
    try {
      const profile = await getFarmerProfile();
      setFarmer(profile);
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
      </div>
    </MainLayout>
  );
};

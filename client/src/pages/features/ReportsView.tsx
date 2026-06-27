import { useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { useLogStore } from '../../store/logStore';

export const ReportsView = () => {
  const { logs, fetchLogs, isLoading } = useLogStore();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const pendingCount = logs.filter(l => l.syncStatus === 'pending').length;
  const totalLogs = logs.length;
  const productivity = '+12%'; // Static placeholder as per current requirement

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-forest-deep">Agricultural Reports</h1>
        
        {isLoading ? (
          <p>Loading reports...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm">
              <p className="text-text-muted text-sm">Total Logs</p>
              <p className="text-3xl font-extrabold">{totalLogs}</p>
            </div>
            <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm">
              <p className="text-text-muted text-sm">Pending Sync</p>
              <p className="text-3xl font-extrabold">{pendingCount}</p>
            </div>
            <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm">
              <p className="text-text-muted text-sm">Field Entries</p>
              <p className="text-3xl font-extrabold">{totalLogs}</p>
            </div>
            <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm border-l-4 border-l-alert-success">
              <p className="text-text-muted text-sm">Productivity</p>
              <p className="text-3xl font-extrabold text-alert-success">{productivity}</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

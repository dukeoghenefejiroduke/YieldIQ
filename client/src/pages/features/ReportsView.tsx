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
  
  // Categorization
  const financialLogs = logs.filter(l => l.type === 'sale' || l.type === 'purchase' || l.type === 'credit');
  const materialLogs = logs.filter(l => l.type !== 'sale' && l.type !== 'purchase' && l.type !== 'credit');

  const totalFinancialAmount = financialLogs.reduce((acc, log) => acc + (log.amount || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-forest-deep">Detailed Reports</h1>
        
        {isLoading ? (
          <p>Loading reports...</p>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm">
                <p className="text-text-muted text-sm">Total Activities</p>
                <p className="text-3xl font-extrabold">{totalLogs}</p>
              </div>
              <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm">
                <p className="text-text-muted text-sm">Financial Volume</p>
                <p className="text-3xl font-extrabold">₦{totalFinancialAmount.toLocaleString()}</p>
              </div>
              <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm">
                <p className="text-text-muted text-sm">Material Entries</p>
                <p className="text-3xl font-extrabold">{materialLogs.length}</p>
              </div>
              <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm">
                <p className="text-text-muted text-sm">Pending Sync</p>
                <p className="text-3xl font-extrabold">{pendingCount}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm">
                <h2 className="text-xl font-bold mb-4">Financial Ledger</h2>
                <div className="space-y-2">
                  {financialLogs.map((log) => (
                    <div key={log.id} className="flex justify-between border-b pb-2 text-sm">
                      <span>{log.item} ({log.type})</span>
                      <span className="font-bold">₦{log.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm">
                <h2 className="text-xl font-bold mb-4">Material/Field Logs</h2>
                <div className="space-y-2">
                  {materialLogs.map((log) => (
                    <div key={log.id} className="text-sm border-b pb-2">
                      <p className="font-bold">{log.item}</p>
                      <p className="text-text-muted">{log.transcription}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

import { FileText, CloudUpload, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const KPICards = ({ farmer, logs, pendingCount, entriesCount, productivity }: { farmer?: any; logs?: any[]; pendingCount?: number; entriesCount?: number; productivity?: string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Credit Score Card */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary to-teal-600 p-6 rounded-2xl text-white shadow-lg">
        <h3 className="font-bold mb-1">Welcome, {farmer?.name || 'Farmer'}</h3>
        <p className="text-3xl font-black mb-4">Credit Score: {farmer?.creditScore || 0}</p>
        <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-secondary h-2 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs mt-3 opacity-90 italic">💡 Tip: Log transactions regularly to build trust and increase your credit limit.</p>
      </div>

      {/* KPI Cards */}
      <Link to="/reports" className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4 hover:border-primary transition-all active:scale-95 active:shadow-inner">
        <FileText className="text-primary w-8 h-8" />
        <div>
            <p className="text-text-muted text-sm font-semibold">Total Logs</p>
            <p className="text-3xl font-black">{logs?.length || 0}</p>
        </div>
      </Link>
      <Link to="/reports" className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4 hover:border-primary transition-all active:scale-95 active:shadow-inner">
        <CloudUpload className="text-primary w-8 h-8" />
        <div>
            <p className="text-text-muted text-sm font-semibold">Pending Sync</p>
            <p className="text-3xl font-black">{pendingCount || 0}</p>
        </div>
      </Link>
      <Link to="/reports" className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4 hover:border-primary transition-all active:scale-95 active:shadow-inner">
        <FileText className="text-primary w-8 h-8" />
        <div>
            <p className="text-text-muted text-sm font-semibold">Field Entries</p>
            <p className="text-3xl font-black">{entriesCount || 0}</p>
        </div>
      </Link>
      <Link to="/reports" className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4 border-l-4 border-l-alert-success hover:border-alert-success transition-all active:scale-95 active:shadow-inner">
        <TrendingUp className="text-alert-success w-8 h-8" />
        <div>
            <p className="text-text-muted text-sm font-semibold">Productivity</p>
            <p className="text-3xl font-black text-alert-success">{productivity || '+12%'}</p>
        </div>
      </Link>
    </div>
  );
};

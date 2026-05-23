import { TrendingUp, FileText, CloudUpload, Clock } from 'lucide-react';

export const StatsView = ({ logsCount, pendingCount }: { logsCount: number, pendingCount: number }) => {
  const todayCount = 0; // In a real app, calculate this from logs array

  const stats = [
    { label: 'Total Logs', value: logsCount, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Pending Sync', value: pendingCount, icon: CloudUpload, color: pendingCount > 0 ? 'text-amber-500' : 'text-emerald-500', bg: pendingCount > 0 ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Field Entries', value: todayCount, icon: Clock, color: 'text-forest-mid', bg: 'bg-forest-light/10' },
    { label: 'Productivity', value: '+12%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div key={i} className="glass-card p-6 flex items-center gap-4 hover:scale-[1.02] cursor-pointer group">
          <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:rotate-6`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-secondary uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

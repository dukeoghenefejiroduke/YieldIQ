import { TrendingUp, FileText, CloudUpload, Clock } from 'lucide-react';

export const StatsView = ({ logsCount, pendingCount }: { logsCount: number, pendingCount: number }) => {
  const stats = [
    { label: 'Total Logs', value: logsCount, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Pending Sync', value: pendingCount, icon: CloudUpload, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Today', value: 0, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div key={i} className="glass-card p-6 flex items-center gap-4 hover:scale-[1.02] cursor-pointer">
          <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
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

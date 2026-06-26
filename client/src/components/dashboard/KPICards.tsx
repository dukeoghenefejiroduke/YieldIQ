import React from 'react';
import { FileText, CloudUpload, MapPin, TrendingUp } from 'lucide-react';

export const KPICards = ({ farmer, logs, pendingCount, entriesCount, productivity }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Credit Score Card */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary to-teal-600 p-6 rounded-2xl text-white shadow-lg">
        <h3 className="font-semibold mb-1">Welcome, {farmer?.name || 'Farmer'}</h3>
        <p className="text-3xl font-extrabold mb-4">Credit Score: {farmer?.creditScore || 0}</p>
        <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-secondary h-2 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs mt-2 opacity-80">Improve Score</p>
      </div>

      {/* KPI Cards */}
      <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4">
        <FileText className="text-primary w-8 h-8" />
        <div>
            <p className="text-text-muted text-sm">Total Logs</p>
            <p className="text-3xl font-extrabold">{logs?.length || 0}</p>
        </div>
      </div>
      <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4">
        <CloudUpload className="text-primary w-8 h-8" />
        <div>
            <p className="text-text-muted text-sm">Pending Sync</p>
            <p className="text-3xl font-extrabold">{pendingCount || 0}</p>
        </div>
      </div>
      <div className="bg-background-card p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4 border-l-4 border-l-alert-success">
        <TrendingUp className="text-alert-success w-8 h-8" />
        <div>
            <p className="text-text-muted text-sm">Productivity</p>
            <p className="text-3xl font-extrabold text-alert-success">+12%</p>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get('/logs');
        setLogs(data);
      } catch (error) {
        console.error('Fetch logs error:', error);
        toast.error('Failed to load logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl">Dashboard</h1>
      <p className="mt-4 text-xl">Welcome, {user?.username || 'Farmer'}</p>
      
      <div className="mt-8">
        <h2 className="text-2xl">Your Logs</h2>
        {loading ? <p>Loading...</p> : (
          <ul className="mt-4 space-y-2">
            {logs.map((log: any) => (
              <li key={log._id} className="p-3 bg-gray-100 rounded">
                {new Date(log.timestamp).toLocaleDateString()} - {log.transcription}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

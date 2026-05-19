import { useAuthStore } from '../store/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();
  return (
    <div className="p-6">
      <h1 className="text-3xl">Dashboard</h1>
      <p className="mt-4 text-xl">Welcome, {user?.email || 'Farmer'}</p>
    </div>
  );
};

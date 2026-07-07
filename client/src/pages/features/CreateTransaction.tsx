import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { useLogStore } from '../../store/logStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { MapPin, QrCode } from 'lucide-react';
import { ScannerComponent } from '../../components/ui/ScannerComponent';

export const CreateTransaction = () => {
  const locationState = useLocation().state as { prefillItem?: string } | null;
  const [formData, setFormData] = useState({
    type: 'sale',
    amount: 0,
    item: locationState?.prefillItem || '',
    transcription: '',
    location: null as { lat: number; lng: number } | null
  });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const addLocalLog = useLogStore((state) => state.addLocalLog);
  const { user } = useAuthStore();

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
        setIsFetchingLocation(false);
      },
      (error) => {
        console.error("Error getting location", error);
        toast.error('Could not auto-detect location');
        setIsFetchingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
        toast.error('User not logged in');
        return;
    }
    try {
      await addLocalLog({
        uuid: 'temporary-uuid', // This will be overwritten by zustand's addLocalLog
        userId: user.id,
        transcription: formData.transcription,
        timestamp: Date.now(),
        type: formData.type as 'sale' | 'purchase' | 'credit',
        amount: Number(formData.amount),
        item: formData.item,
        location: formData.location
      });
      toast.success('Transaction logged successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to log transaction');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto mt-10 p-8 bg-slate-600 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-50">Log New Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select 
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-gray-50" 
            onChange={(e) => setFormData({...formData, type: e.target.value as any})}
          >
            <option value="sale">Sale</option>
            <option value="purchase">Purchase</option>
            <option value="credit">Credit</option>
          </select>
          <input type="number" placeholder="Amount (₦)" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-gray-50" onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})} required />
          <div className="flex gap-2">
            <input type="text" value={formData.item} placeholder="Item Name (e.g. Maize)" className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-700 text-gray-50" onChange={(e) => setFormData({...formData, item: e.target.value})} required />
            <button type="button" onClick={() => setIsScanning(true)} className="p-3 bg-slate-700 rounded-lg text-white">
                <QrCode className="w-6 h-6" />
            </button>
          </div>
          <textarea placeholder="Description" className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-gray-50" onChange={(e) => setFormData({...formData, transcription: e.target.value})} />
          
          {isScanning && (
            <ScannerComponent 
                onScan={(val) => { setFormData({...formData, item: val}); setIsScanning(false); }}
                onClose={() => setIsScanning(false)}
            />
          )}

          <div className="flex items-center gap-2 text-xs text-gray-300 bg-slate-900 p-2 rounded-lg">
            <MapPin className={`w-4 h-4 ${formData.location ? 'text-green-500' : 'text-yellow-500'}`} />
            {isFetchingLocation ? 'Detecting location...' : (formData.location ? '✓ Location automatically captured' : 'Location not captured')}
          </div>

          <button type="submit" className="w-full p-3 bg-green-900 text-white rounded-lg font-bold active:scale-95 transition-transform">Log Transaction</button>
        </form>
      </div>
    </MainLayout>
  );
};

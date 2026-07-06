import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { User, Globe } from 'lucide-react';
import { updateFarmerProfile, getFarmerProfile } from '../../services/farmerService';

export const ProfileSettings = () => {
  const [profile, setProfile] = useState({ name: '', phoneNumber: '', location: '' });
  const [lang, setLang] = useState(localStorage.getItem('voice-lang') || 'en-US');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getFarmerProfile();
        setProfile(data);
      } catch (_err) {
        toast.error('Failed to load profile');
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateFarmerProfile(profile);
      localStorage.setItem('voice-lang', lang);
      toast.success('Settings saved!');
    } catch (_err) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };
//...

  return (
    <div className="glass-card p-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" /> Profile & Settings
      </h2>
      <div className="space-y-4">
        <input className="w-full p-2 border rounded" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="Name" />
        <input className="w-full p-2 border rounded" value={profile.phoneNumber} onChange={e => setProfile({...profile, phoneNumber: e.target.value})} placeholder="Phone" />
        
        <div className="flex items-center gap-2 mt-4">
            <Globe className="w-4 h-4 text-text-muted" />
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full p-2 border rounded">
                <option value="en-US">English (US)</option>
                <option value="en-NG">English (Nigeria)</option>
                <option value="pcm-NG">Pidgin (Nigeria)</option>
            </select>
        </div>
        
        <button onClick={handleSave} disabled={isLoading} className="w-full bg-primary text-white p-3 rounded font-bold">
            {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

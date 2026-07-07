import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mic, MapPin, Globe } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLogStore } from '../store/logStore';
import { parseTransaction } from '../utils/aiParser';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export const VoiceEntry = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('voice-lang') || 'en-US'); // Initialize from localStorage
  
  const { isRecording, transcript, setTranscript, startRecording: hookStartRecording, stopRecording } = useSpeechRecognition();
  
  const { user } = useAuthStore();
  const addLocalLog = useLogStore((state) => state.addLocalLog);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsFetchingLocation(false);
        toast.success('Location tagged', { icon: '📍' });
      },
      (err) => {
        console.error('Location error:', err);
        setIsFetchingLocation(false);
        toast.error('Could not fetch location');
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const startRecording = () => {
    // Auto-fetch location when recording starts
    if (!location) fetchLocation();
    hookStartRecording(lang); // Pass language
  };

  const saveLog = async () => {
    if (!transcript.trim()) {
      toast.error('No transcript to save');
      return;
    }
    if (!user?.id) {
      toast.error('Please sign in before saving logs');
      return;
    }
    try {
      const { type, amount, item } = await parseTransaction(transcript);

      await addLocalLog({
        uuid: 'temporary-uuid', // This will be overwritten by zustand's addLocalLog
        userId: user.id,
        transcription: transcript,
        timestamp: Date.now(),
        location,
        type,
        amount,
        item
      });
      
      toast.success('Log saved and parsed!', {
        icon: '🌾',
        style: { borderRadius: '12px', background: '#1a3c1a', color: '#fff' }
      });
      
      setTranscript('');
      setLocation(null);
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save log');
    }
  };

  return (
    <div className={`glass-card p-8 flex flex-col gap-6 w-full ${isRecording ? 'border-secondary' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Voice Journal</h2>
        <button className="text-sm font-bold text-primary hover:underline">+ New</button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Globe className="w-4 h-4 text-text-muted" />
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-background border border-glass-border rounded-lg p-1 text-sm">
            <option value="en-US">English (US)</option>
            <option value="en-NG">English (Nigeria)</option>
            <option value="pcm-NG">Pidgin (Nigeria)</option>
        </select>
      </div>

      <div className="relative w-full">
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className={`w-full h-32 rounded-2xl p-4 text-lg bg-background border ${isRecording ? 'border-secondary' : 'border-glass-border'}`}
          placeholder="Your voice transcription will appear here..."
        />
        {!isRecording && !transcript && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 opacity-20">
                <div className="w-1 h-8 bg-primary animate-pulse"></div>
                <div className="w-1 h-12 bg-primary animate-pulse delay-75"></div>
                <div className="w-1 h-8 bg-primary animate-pulse delay-150"></div>
            </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className={`w-4 h-4 ${location ? 'text-primary' : 'text-text-muted'}`} />
          <span className="text-sm text-text-secondary">
            {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'No location tagged'}
          </span>
          <button 
            onClick={fetchLocation}
            disabled={isFetchingLocation}
            className="text-xs font-bold text-secondary hover:underline disabled:opacity-50"
          >
            {isFetchingLocation ? 'Locating...' : 'Refresh GPS'}
          </button>
        </div>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
            isRecording ? 'bg-alert-danger animate-pulse' : 'bg-primary'
          }`}
        >
          <Mic className="text-white w-6 h-6" />
        </button>
      </div>
        
      <button
        onClick={saveLog}
        disabled={!transcript.trim()}
        className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50"
      >
        Save to Journal
      </button>
    </div>
  );
};

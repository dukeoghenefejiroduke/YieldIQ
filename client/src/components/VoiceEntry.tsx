import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Mic, Square, Save, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLogStore } from '../store/logStore';
import { parseTransaction } from '../utils/aiParser';

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export const VoiceEntry = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  
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
    // ... (SpeechRecognition init remains same)
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Browser does not support voice recognition');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };
    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
    
    // Auto-fetch location when recording starts
    if (!location) fetchLocation();
    
    toast.success('Recording started...', { icon: '🎤' });
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    toast('Recording stopped', { icon: '⏹️' });
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
    <div className="glass-card p-8 flex flex-col items-center gap-6 max-w-2xl mx-auto mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Voice Journal</h2>
        <p className="text-secondary">Capture observations instantly with AgroPulse AI.</p>
      </div>

      <div className="relative flex items-center justify-center w-full py-10">
        {isRecording && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 bg-forest-mid rounded-full animate-ping opacity-20" />
            <div className="w-48 h-48 bg-forest-light rounded-full animate-pulse opacity-10" />
          </div>
        )}
        
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
            isRecording ? 'bg-red-500 scale-110' : 'bg-forest-mid hover:bg-forest-light'
          }`}
        >
          {isRecording ? <Square className="text-white w-10 h-10" /> : <Mic className="text-white w-10 h-10" />}
        </button>
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-sm font-semibold flex items-center gap-2 text-secondary">
            <MapPin className={`w-4 h-4 ${location ? 'text-forest-mid' : 'text-gray-300'}`} />
            {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'No location tagged'}
          </span>
          <button 
            onClick={fetchLocation}
            disabled={isFetchingLocation}
            className="text-xs font-bold text-forest-mid hover:underline disabled:opacity-50"
          >
            {isFetchingLocation ? 'Locating...' : 'Refresh GPS'}
          </button>
        </div>

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="input-field h-40 resize-none text-lg leading-relaxed mb-4"
          placeholder="Your voice transcription will appear here..."
        />
        
        <div className="flex gap-4">
          <button
            onClick={saveLog}
            disabled={!transcript.trim()}
            className="flex-1 bg-forest-mid text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-forest-deep disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Save className="w-5 h-5" />
            Save to Journal
          </button>
        </div>
      </div>
    </div>
  );
};

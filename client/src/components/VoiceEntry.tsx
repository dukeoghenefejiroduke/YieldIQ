import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Mic, MapPin } from 'lucide-react';
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
    <div className={`glass-card p-8 flex flex-col gap-6 w-full ${isRecording ? 'border-secondary' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Voice Journal</h2>
        <button className="text-sm font-bold text-primary hover:underline">+ New</button>
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

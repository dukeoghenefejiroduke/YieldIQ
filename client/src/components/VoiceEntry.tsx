import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Mic, Square, Save } from 'lucide-react';
import { db } from '../db/db';
import { useAuthStore } from '../store/authStore';

export const VoiceEntry = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const { user } = useAuthStore();

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Browser does not support voice recognition');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };
    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
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
    try {
      await db.logs.add({
        userId: user?.id,
        transcription: transcript,
        timestamp: Date.now(),
        location: null,
        syncStatus: 'pending'
      });
      toast.success('Log saved to field journal!', {
        style: {
          borderRadius: '12px',
          background: '#1a3c1a',
          color: '#fff',
        },
      });
      setTranscript('');
    } catch {
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

      <div className="w-full">
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

import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
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
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const saveLog = async () => {
    if (!transcript.trim()) return;
    try {
      await db.logs.add({
        userId: user?.id,
        transcription: transcript,
        timestamp: Date.now(),
        location: null,
        syncStatus: 'pending'
      });
      toast.success('Log saved locally!');
      setTranscript('');
    } catch {
      toast.error('Failed to save log');
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} className="w-full h-24 p-2 border" placeholder="Speak to record..." />
      <div className="flex gap-2 mt-2">
        <button onClick={isRecording ? stopRecording : startRecording} className={`p-2 rounded ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button onClick={saveLog} className="p-2 bg-blue-500 text-white rounded">Save</button>
      </div>
    </div>
  );
};

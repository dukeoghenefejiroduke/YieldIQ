import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const ConversationView = () => {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [input, setInput] = useState('');
    const { user } = useAuthStore();

    const sendMessage = async () => {
        if (!input.trim() || !user?.id) return;
        
        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const { data } = await api.post('/conversation', { userId: user.id, message: input });
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            toast.error('Failed to send message');
        }
    };

    return (
        <div className="glass-card p-6 flex flex-col gap-4 w-full">
            <h2 className="text-xl font-bold">AgroVoice Assistant</h2>
            <div className="h-64 overflow-y-auto flex flex-col gap-2 border p-2 rounded bg-background/50">
                {messages.map((msg, i) => (
                    <div key={i} className={`p-2 rounded max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-white self-end' : 'bg-white self-start border'}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow rounded p-2 bg-background border"
                    placeholder="Ask about crops or market..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="bg-primary text-white px-4 py-2 rounded">Send</button>
            </div>
        </div>
    );
};

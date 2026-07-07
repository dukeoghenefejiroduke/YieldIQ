import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { MessageSquare, Send } from 'lucide-react';
import api from '../../services/api';

export const ConversationsPage = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await api.get('/conversation');
                setMessages(res.data);
            } catch (error) {
                console.error('Error fetching conversations', error);
            }
        };
        fetchMessages();
    }, []);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            await api.post('/conversation', { message: newMessage });
            setNewMessage('');
            // Refresh
            const res = await api.get('/conversation');
            setMessages(res.data);
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <MainLayout>
            <div className="bg-slate-900 min-h-screen text-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-6">Conversations</h1>
                <div className="glass-card p-4 h-96 overflow-y-auto mb-4">
                    {messages.length === 0 ? (
                        <div className="text-center pt-20">
                            <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <p>No active conversations.</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`p-3 rounded-lg mb-2 ${msg.role === 'user' ? 'bg-green-900 ml-auto w-3/4' : 'bg-slate-700 mr-auto w-3/4'}`}>
                                {msg.content}
                            </div>
                        ))
                    )}
                </div>
                <div className="flex gap-2">
                    <input 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 bg-slate-800 p-2 rounded-lg border border-slate-700"
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage} className="bg-green-600 p-2 rounded-lg">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

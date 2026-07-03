import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import api from '../../services/api';

const MOCK_WA = [{ id: 1, message: 'How to plant maize?', timestamp: Date.now() }];

export const WhatsappView = () => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        api.get('/whatsapp/messages')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setMessages(res.data);
                } else {
                    setMessages(MOCK_WA);
                }
            })
            .catch(() => {
                setMessages(MOCK_WA);
            });
    }, []);

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-4">WhatsApp Conversations</h1>
            <div className="space-y-2">
                {messages.map(msg => <div key={msg.id} className="p-3 bg-slate-700 rounded-lg">{msg.message || msg.transcription}</div>)}
            </div>
        </MainLayout>
    );
};

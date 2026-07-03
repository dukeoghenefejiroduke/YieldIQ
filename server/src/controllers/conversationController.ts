import { Request, Response } from 'express';
import { ChatSession } from '../models/ChatSession.js';

export const handleConversation = async (req: Request, res: Response) => {
    const { userId, message } = req.body;
    
    if (!userId || !message) {
        return res.status(400).json({ error: 'userId and message are required' });
    }
    
    try {
        let chatSession = await ChatSession.findOne({ userId });
        
        if (!chatSession) {
            chatSession = new ChatSession({ userId, messages: [] });
        }
        
        chatSession.messages.push({ role: 'user', content: message });
        await chatSession.save();
        
        // No LLM integrated yet
        res.status(501).json({ error: 'AI Assistant service not yet integrated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process conversation' });
    }
};

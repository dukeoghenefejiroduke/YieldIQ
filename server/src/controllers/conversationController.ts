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
        
        // Mock LLM response
        const aiResponse = `I received your message: "${message}". As an AI assistant, I am still under development.`;
        
        chatSession.messages.push({ role: 'assistant', content: aiResponse });
        await chatSession.save();
        
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process conversation' });
    }
};

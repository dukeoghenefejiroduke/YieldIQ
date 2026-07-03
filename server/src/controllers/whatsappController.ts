import crypto from 'crypto';
import Log from '../models/Log.js';
import Farmer from '../models/Farmer.js';

export const getMessages = async (req, res) => {
    try {
        const logs = await Log.find({}).sort({ timestamp: -1 }); // Simplified for demo
        res.json(logs);
    } catch (error) {
        console.error('WhatsApp Logs Error:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Verify WhatsApp webhook signature
const verifySignature = (payload, signature) => {
    const hmac = crypto.createHmac('sha256', process.env.WHATSAPP_APP_SECRET || '');
    const digest = hmac.update(payload).digest('hex');
    return signature === digest;
};
// Placeholder for WhatsApp Webhook Verification
export const verifyWebhook = async (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        res.status(200).send(challenge);
    }
    else {
        res.sendStatus(403);
    }
};
// Handle incoming WhatsApp messages
export const handleMessage = async (req, res) => {
    try {
        // 1. Signature Verification (Simplified placeholder for raw body)
        const signature = req.headers['x-hub-signature-256'];
        const payload = JSON.stringify(req.body);
        if (process.env.NODE_ENV === 'production' && !verifySignature(payload, signature)) {
            console.error('WhatsApp signature verification failed');
            return res.status(403).send('Forbidden');
        }
        const { entry } = req.body;
        if (!entry || !entry[0].changes[0].value.messages) {
            return res.status(200).send('EVENT_RECEIVED');
        }
        const message = entry[0].changes[0].value.messages[0];
        const phoneNumber = message.from;
        const text = message.text.body;
        // Find farmer by phone number
        const farmer = await Farmer.findOne({ phoneNumber });
        if (!farmer) {
            console.log('Farmer not found for:', phoneNumber);
            return res.status(200).send('EVENT_RECEIVED');
        }
        // Basic keyword parsing
        const lower = text.toLowerCase();
        let type = 'sale';
        if (lower.includes('bought') || lower.includes('purchase'))
            type = 'purchase';
        if (lower.includes('credit') || lower.includes('owed'))
            type = 'credit';
        const amountMatch = lower.match(/(\d+)/);
        const amount = amountMatch ? parseInt(amountMatch[0], 10) : 0;
        const item = lower.split(' ').find((word) => ['maize', 'beans', 'rice', 'yam'].includes(word)) || 'general';
        // Create log
        const newLog = new Log({
            userId: farmer.userId,
            farmerId: farmer._id,
            type,
            amount,
            item,
            transcription: text,
            timestamp: Date.now()
        });
        await newLog.save();
        res.status(200).send('EVENT_RECEIVED');
    }
    catch (error) {
        console.error('WhatsApp error:', error);
        res.status(500).send('Internal Server Error');
    }
};

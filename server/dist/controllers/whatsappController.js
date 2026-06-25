"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = exports.verifyWebhook = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Log_1 = __importDefault(require("../models/Log"));
const Farmer_1 = __importDefault(require("../models/Farmer"));
// Verify WhatsApp webhook signature
const verifySignature = (payload, signature) => {
    const hmac = crypto_1.default.createHmac('sha256', process.env.WHATSAPP_APP_SECRET || '');
    const digest = hmac.update(payload).digest('hex');
    return signature === digest;
};
// Placeholder for WhatsApp Webhook Verification
const verifyWebhook = async (req, res) => {
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
exports.verifyWebhook = verifyWebhook;
// Handle incoming WhatsApp messages
const handleMessage = async (req, res) => {
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
        const farmer = await Farmer_1.default.findOne({ phoneNumber });
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
        const newLog = new Log_1.default({
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
exports.handleMessage = handleMessage;
//# sourceMappingURL=whatsappController.js.map
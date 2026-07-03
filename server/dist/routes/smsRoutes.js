import { Router } from 'express';
import crypto from 'crypto';
import Log from '../models/Log.js';
import Farmer from '../models/Farmer.js';
import { creditScoringService } from '../services/creditScoringService.js';
import { sendTransactionNotification } from '../services/notificationService.js';
const router = Router();
// Helper to verify webhook signature (example based on standard HMAC approach)
const verifySignature = (req, signature) => {
    const secret = process.env.SMS_WEBHOOK_SECRET;
    if (!secret)
        return true; // Fail safe or fail closed? Fail closed is better.
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(req.body));
    const computedSignature = hmac.digest('hex');
    return computedSignature === signature;
};
// Expected SMS Format: "SALE <amount> <item>" or "BUY <amount> <item>"
router.post('/webhook', async (req, res) => {
    // 1. Verify Signature
    const signature = req.headers['x-webhook-signature'];
    if (process.env.SMS_WEBHOOK_SECRET && !verifySignature(req, signature)) {
        console.error('Invalid SMS webhook signature');
        return res.status(401).send('Unauthorized');
    }
    const { from, text } = req.body;
    console.log(`Received SMS from ${from}: ${text}`);
    try {
        // ... (existing parsing and logging logic)
        const normalizedPhone = from.replace(/^\+234/, '0');
        const farmer = await Farmer.findOne({ phoneNumber: { $regex: normalizedPhone.slice(-10) } });
        if (!farmer) {
            console.error(`Unregistered farmer attempt: ${from}`);
            return res.status(200).send('SMS Received (Unregistered)');
        }
        const parts = text.trim().split(' ');
        if (parts.length < 3) {
            return res.status(200).send('Invalid format. Use: SALE/BUY <amount> <item>');
        }
        const type = parts[0].toLowerCase() === 'sale' ? 'sale' : 'purchase';
        const amount = parseFloat(parts[1]);
        const item = parts.slice(2).join(' ');
        if (isNaN(amount)) {
            return res.status(200).send('Invalid amount.');
        }
        const newLog = new Log({
            userId: farmer.userId,
            farmerId: farmer._id,
            type,
            amount,
            item,
            source: 'sms',
            transcription: `Logged via SMS: ${type} ${item} for ₦${amount}`,
            timestamp: Date.now(),
            paymentStatus: 'completed'
        });
        await newLog.save();
        await creditScoringService.recalculateFarmerScore(farmer._id.toString());
        // Send notification
        await sendTransactionNotification(from, `AgroVoice: ${type} of ${item} for ₦${amount} recorded.`);
        res.status(200).send('Transaction logged successfully.');
    }
    catch (error) {
        console.error('SMS Processing Error:', error);
        res.status(200).send('Processing error.');
    }
});
export default router;
//# sourceMappingURL=smsRoutes.js.map
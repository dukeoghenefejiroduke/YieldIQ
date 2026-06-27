import { Router } from 'express';
import Log from '../models/Log.js';
import Farmer from '../models/Farmer.js';
import { creditScoringService } from '../services/creditScoringService.js';

const router = Router();

// Expected SMS Format: "SALE <amount> <item>" or "BUY <amount> <item>"
router.post('/webhook', async (req, res) => {
    const { from, text } = req.body;
    console.log(`Received SMS from ${from}: ${text}`);
    
    try {
        // 1. Identify farmer
        const normalizedPhone = from.replace(/^\+234/, '0');
        const farmer = await Farmer.findOne({ phoneNumber: { $regex: normalizedPhone.slice(-10) } });
        
        if (!farmer) {
            console.error(`Unregistered farmer attempt: ${from}`);
            return res.status(200).send('SMS Received (Unregistered)');
        }

        // 2. Parse text (Basic parser: "TYPE AMOUNT ITEM")
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

        // 3. Create log entry
        const newLog = new Log({
            userId: farmer.userId,
            farmerId: farmer._id,
            type,
            amount,
            item,
            transcription: `Logged via SMS: ${type} ${item} for ₦${amount}`,
            timestamp: Date.now(),
            paymentStatus: 'completed'
        });
        
        await newLog.save();
        
        // 4. Update Credit Score
        await creditScoringService.recalculateFarmerScore(farmer._id.toString());
        
        res.status(200).send('Transaction logged successfully.');
    } catch (error) {
        console.error('SMS Processing Error:', error);
        res.status(200).send('Processing error.');
    }
});

export default router;

import { z } from 'zod';
import Log from '../models/Log.js';
const LogSchema = z.object({
    transcription: z.string().min(1),
    type: z.enum(['sale', 'purchase', 'credit']),
    amount: z.number().nonnegative(),
    item: z.string().min(1),
    timestamp: z.number().optional(),
    location: z.object({
        lat: z.number(),
        lng: z.number()
    }).nullable().optional(),
    farmerId: z.string().optional()
});
export const createLog = async (req, res) => {
    try {
        const validatedData = LogSchema.parse(req.body);
        const userId = req.user.userId;
        const newLog = new Log({
            userId,
            ...validatedData,
            timestamp: validatedData.timestamp || Date.now()
        });
        await newLog.save();
        res.status(201).json(newLog);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid transaction data', details: error.issues });
        }
        console.error('Create log error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getLogs = async (req, res) => {
    try {
        const userId = req.user.userId;
        const logs = await Log.find({ userId }).sort({ timestamp: -1 });
        res.json(logs);
    }
    catch (error) {
        console.error('Get logs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

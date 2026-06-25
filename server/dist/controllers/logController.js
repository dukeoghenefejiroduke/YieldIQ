"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogs = exports.createLog = void 0;
const zod_1 = require("zod");
const Log_1 = __importDefault(require("../models/Log"));
const LogSchema = zod_1.z.object({
    transcription: zod_1.z.string().min(1),
    type: zod_1.z.enum(['sale', 'purchase', 'credit']),
    amount: zod_1.z.number().positive(),
    item: zod_1.z.string().min(1),
    timestamp: zod_1.z.number().optional(),
    location: zod_1.z.object({
        lat: zod_1.z.number(),
        lng: zod_1.z.number()
    }).optional(),
    farmerId: zod_1.z.string().optional()
});
const createLog = async (req, res) => {
    try {
        const validatedData = LogSchema.parse(req.body);
        const userId = req.user.userId;
        const newLog = new Log_1.default({
            userId,
            ...validatedData,
            timestamp: validatedData.timestamp || Date.now()
        });
        await newLog.save();
        res.status(201).json(newLog);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: 'Invalid transaction data', details: error.issues });
        }
        console.error('Create log error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createLog = createLog;
const getLogs = async (req, res) => {
    try {
        const userId = req.user.userId;
        const logs = await Log_1.default.find({ userId }).sort({ timestamp: -1 });
        res.json(logs);
    }
    catch (error) {
        console.error('Get logs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getLogs = getLogs;
//# sourceMappingURL=logController.js.map
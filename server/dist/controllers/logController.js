"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogs = exports.createLog = void 0;
const Log_1 = __importDefault(require("../models/Log"));
const createLog = async (req, res) => {
    try {
        const { transcription, timestamp, location } = req.body;
        const userId = req.user.userId;
        const newLog = new Log_1.default({ userId, transcription, timestamp, location });
        await newLog.save();
        res.status(201).json(newLog);
    }
    catch (error) {
        res.status(500).json({ error: 'Error saving log' });
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
        res.status(500).json({ error: 'Error fetching logs' });
    }
};
exports.getLogs = getLogs;
//# sourceMappingURL=logController.js.map
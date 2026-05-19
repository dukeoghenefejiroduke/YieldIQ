import { Request, Response } from 'express';
import Log from '../models/Log';

export const createLog = async (req: Request, res: Response) => {
  try {
    const { transcription, timestamp, location } = req.body;
    const userId = (req as any).user.userId;
    const newLog = new Log({ userId, transcription, timestamp, location });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: 'Error saving log' });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const logs = await Log.find({ userId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching logs' });
  }
};

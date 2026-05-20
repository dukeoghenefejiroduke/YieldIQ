import { Request, Response } from 'express';
import Log from '../models/Log';

export const createLog = async (req: Request, res: Response) => {
  try {
    const { transcription, timestamp, location } = req.body;
    
    if (!transcription) {
      return res.status(400).json({ error: 'Transcription is required' });
    }

    const userId = (req as any).user.userId;
    const newLog = new Log({ 
      userId, 
      transcription, 
      timestamp: timestamp || Date.now(), 
      location 
    });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Create log error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const logs = await Log.find({ userId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

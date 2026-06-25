import { Request, Response } from 'express';
import Farmer from '../models/Farmer.js';

export const getFarmerProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.id;
    const farmer = await Farmer.findOne({ userId });
    
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer profile not found' });
    }
    
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farmer profile' });
  }
};

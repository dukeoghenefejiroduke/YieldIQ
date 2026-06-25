import { Request, Response } from 'express';
import { priceAggregatorService } from '../services/priceAggregatorService.js';

export const getMarketPrices = async (req: Request, res: Response) => {
  try {
    const prices = await priceAggregatorService.getLatestPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market prices' });
  }
};

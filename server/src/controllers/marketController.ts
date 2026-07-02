import { priceAggregatorService } from '../services/priceAggregatorService.js';
import Farmer from '../models/Farmer.js';

export const getMarketPrices = async (req, res) => {
    try {
        const prices = await priceAggregatorService.getLatestPrices();
        res.json(prices);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch market prices' });
    }
};

export const getMarketAlerts = async (req: any, res: any) => {
    try {
        const farmer = await Farmer.findById(req.user.id);
        if (!farmer) return res.status(404).json({ error: 'Farmer not found' });
        
        const alerts = await priceAggregatorService.checkPriceAlerts(farmer.location);
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch market alerts' });
    }
};

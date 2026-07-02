import { Router } from 'express';
import { getMarketPrices, getMarketAlerts } from '../controllers/marketController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/prices', authMiddleware, getMarketPrices);
router.get('/alerts', authMiddleware, getMarketAlerts);
export default router;

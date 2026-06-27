import { Router } from 'express';
import { getWeatherAlert } from '../controllers/weatherController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/alert', authMiddleware, getWeatherAlert);

export default router;

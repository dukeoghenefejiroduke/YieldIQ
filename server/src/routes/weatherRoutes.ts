import { Router } from 'express';
import { getWeatherAlert, getForecast } from '../controllers/weatherController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/alert', authMiddleware, getWeatherAlert);
router.get('/forecast', authMiddleware, getForecast);

export default router;

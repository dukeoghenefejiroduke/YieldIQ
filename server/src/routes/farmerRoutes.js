import { Router } from 'express';
import { getFarmerProfile } from '../controllers/farmerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/profile', authMiddleware, getFarmerProfile);
export default router;

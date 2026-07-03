import { Router } from 'express';
import { getFarmerProfile, createFarmerProfile, getBenchmark } from '../controllers/farmerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/profile', authMiddleware, getFarmerProfile);
router.post('/profile', authMiddleware, createFarmerProfile);
router.get('/benchmark', authMiddleware, getBenchmark);
export default router;
//# sourceMappingURL=farmerRoutes.js.map
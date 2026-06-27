import { Router } from 'express';
import { getFarmerProfile, createFarmerProfile } from '../controllers/farmerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/profile', authMiddleware, getFarmerProfile);
router.post('/profile', authMiddleware, createFarmerProfile);
export default router;
//# sourceMappingURL=farmerRoutes.js.map
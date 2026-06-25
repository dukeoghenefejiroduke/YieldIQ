import { Router } from 'express';
import { createLog, getLogs } from '../controllers/logController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.post('/', createLog);
router.get('/', getLogs);

export default router;

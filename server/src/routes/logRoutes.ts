import { Router } from 'express';
import { createLog, getLogs } from '../controllers/logController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', createLog);
router.get('/', getLogs);

export default router;

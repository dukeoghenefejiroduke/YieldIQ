import { Router } from 'express';
import { handleUSSDRequest, getLogs } from '../controllers/ussdController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/', handleUSSDRequest);
router.get('/logs', authMiddleware, getLogs);
export default router;

import { Router } from 'express';
import { handleConversation } from '../controllers/conversationController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authenticateToken, handleConversation);

export default router;

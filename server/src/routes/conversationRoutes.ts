import { Router } from 'express';
import { handleConversation } from '../controllers/conversationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, handleConversation);

export default router;

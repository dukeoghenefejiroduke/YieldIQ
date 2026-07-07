import { Router } from 'express';
import { handleConversation, getConversations } from '../controllers/conversationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, getConversations);
router.post('/', authMiddleware, handleConversation);

export default router;

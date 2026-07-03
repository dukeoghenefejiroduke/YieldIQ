import express from 'express';
import { verifyWebhook, handleMessage, getMessages } from '../controllers/whatsappController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/webhook', verifyWebhook);
router.post('/webhook', handleMessage);
router.get('/messages', authMiddleware, getMessages);
export default router;
//# sourceMappingURL=whatsappRoutes.js.map
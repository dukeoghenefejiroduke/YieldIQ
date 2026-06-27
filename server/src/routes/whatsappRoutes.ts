import express from 'express';
import { verifyWebhook, handleMessage } from '../controllers/whatsappController.js';
const router = express.Router();
router.get('/webhook', verifyWebhook);
router.post('/webhook', handleMessage);
export default router;

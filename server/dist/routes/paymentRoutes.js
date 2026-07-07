import express from 'express';
import { handlePaymentWebhook } from '../controllers/paymentController.js';
const router = express.Router();
// Webhook endpoint for payment providers
router.post('/webhook', handlePaymentWebhook);
export default router;
//# sourceMappingURL=paymentRoutes.js.map
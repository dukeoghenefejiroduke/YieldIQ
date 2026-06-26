import { Router } from 'express';
import { handleUSSDRequest } from '../controllers/ussdController.js';
const router = Router();
router.post('/', handleUSSDRequest);
export default router;

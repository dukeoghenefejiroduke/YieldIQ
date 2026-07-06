import express from 'express';
import { getPosts, createPost } from '../controllers/communityController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:cooperativeId', authMiddleware, getPosts);
router.post('/', authMiddleware, createPost);

export default router;

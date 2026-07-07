import { Request, Response } from 'express';
import mongoose from 'mongoose';
import CommunityPost from '../models/CommunityPost.js';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const { cooperativeId } = req.params;
        const posts = await CommunityPost.find({ 
            cooperativeId: new mongoose.Types.ObjectId(cooperativeId) 
        }).sort({ timestamp: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { cooperativeId, farmerId, content } = req.body;
        const post = new CommunityPost({ 
            cooperativeId: new mongoose.Types.ObjectId(cooperativeId), 
            farmerId: new mongoose.Types.ObjectId(farmerId), 
            content 
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};

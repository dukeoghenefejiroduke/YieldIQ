import mongoose from 'mongoose';
import CommunityPost from '../models/CommunityPost.js';
export const getPosts = async (req, res) => {
    try {
        const { cooperativeId } = req.params;
        const id = Array.isArray(cooperativeId) ? cooperativeId[0] : cooperativeId;
        if (!id) {
            return res.status(400).json({ error: 'Missing cooperativeId' });
        }
        const posts = await CommunityPost.find({
            cooperativeId: new mongoose.Types.ObjectId(id)
        }).sort({ timestamp: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
export const createPost = async (req, res) => {
    try {
        const { cooperativeId, farmerId, content } = req.body;
        const coopId = Array.isArray(cooperativeId) ? cooperativeId[0] : cooperativeId;
        const farmId = Array.isArray(farmerId) ? farmerId[0] : farmerId;
        if (!coopId || !farmId) {
            return res.status(400).json({ error: 'Missing required IDs' });
        }
        const post = new CommunityPost({
            cooperativeId: new mongoose.Types.ObjectId(coopId),
            farmerId: new mongoose.Types.ObjectId(farmId),
            content
        });
        await post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};
//# sourceMappingURL=communityController.js.map
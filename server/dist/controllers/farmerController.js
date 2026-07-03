import Farmer from '../models/Farmer.js';
import mongoose from 'mongoose';
export const getFarmerProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const farmer = await Farmer.findOne({ userId });
        if (!farmer) {
            return res.status(404).json({ error: 'Farmer profile not found' });
        }
        res.json(farmer);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch farmer profile' });
    }
};
export const getBenchmark = async (req, res) => {
    try {
        // Mock implementation of benchmark
        res.json({ percentile: 75 });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch benchmark' });
    }
};
export const createFarmerProfile = async (req, res) => {
    try {
        const rawUserId = req.user?.userId;
        if (!rawUserId || !mongoose.Types.ObjectId.isValid(rawUserId)) {
            return res.status(400).json({ error: 'Invalid or missing User ID' });
        }
        const userId = new mongoose.Types.ObjectId(rawUserId);
        const { name, phoneNumber, location } = req.body;
        // Validate if farmer already exists for this user
        const existingFarmer = await Farmer.findOne({ userId });
        if (existingFarmer) {
            return res.status(400).json({ error: 'Farmer profile already exists for this user' });
        }
        const newFarmer = await Farmer.create({
            name,
            phoneNumber,
            location,
            userId
        });
        res.status(201).json(newFarmer);
    }
    catch (error) {
        console.error('CRITICAL: Error creating farmer profile:', error);
        // Ensure error is a plain object or string for JSON serialization
        const errorMessage = error.message || String(error);
        // Check for duplicate key error (MongoDB code 11000)
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Phone number already registered' });
        }
        res.status(500).json({ error: 'Failed to create farmer profile', details: errorMessage });
    }
};
//# sourceMappingURL=farmerController.js.map
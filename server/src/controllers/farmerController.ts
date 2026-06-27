import Farmer from '../models/Farmer.js';
export const getFarmerProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
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

export const createFarmerProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { name, phoneNumber, location } = req.body;
        const newFarmer = await Farmer.create({
            name,
            phoneNumber,
            location,
            userId
        });
        res.status(201).json(newFarmer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create farmer profile' });
    }
};

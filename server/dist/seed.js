import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Farmer from './models/Farmer.js';
import Log from './models/Log.js';
import { connectDB } from './config/db.js';
dotenv.config();
const seedData = async () => {
    try {
        await connectDB();
        // Clear existing data
        await User.deleteMany({});
        await Farmer.deleteMany({});
        await Log.deleteMany({});
        // Create User
        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = await User.create({
            username: 'testfarmer',
            email: 'farmer@test.com',
            password: hashedPassword,
            role: 'farmer'
        });
        // Create Farmer
        const farmer = await Farmer.create({
            name: 'John Farmer',
            phoneNumber: '1234567890',
            location: 'Rural Area 1',
            creditScore: 75,
            userId: user._id
        });
        // Create Sample Logs
        await Log.create({
            userId: user._id,
            farmerId: farmer._id,
            type: 'sale',
            amount: 5000,
            item: 'Maize',
            transcription: 'Sold 5 bags of maize to local cooperative.',
            timestamp: Date.now(),
            location: { lat: 6.5244, lng: 3.3792 },
            paymentStatus: 'completed'
        });
        console.log('Database seeded successfully with Users, Farmers, and Logs!');
        process.exit(0);
    }
    catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};
seedData();
//# sourceMappingURL=seed.js.map
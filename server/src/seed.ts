import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Farmer from './models/Farmer.js';
import Log from './models/Log.js';
import Cooperative from './models/Cooperative.js';
import { connectDB } from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Farmer.deleteMany({});
    await Log.deleteMany({});
    await Cooperative.deleteMany({});

    // Create Cooperative
    const coop = await Cooperative.create({
        name: 'Rivers Agricultural Cooperative',
        description: 'Cooperative for farmers in Rivers State.'
    });

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
      userId: user._id,
      cooperativeId: coop._id
    });

    // Create Sample Logs (Diverse types)
    const logs = [
        {
            userId: user._id,
            farmerId: farmer._id,
            type: 'sale',
            amount: 5000,
            item: 'Maize',
            transcription: 'Sold 5 bags of maize to local cooperative.',
            timestamp: Date.now() - 86400000, // 1 day ago
            paymentStatus: 'completed'
        },
        {
            userId: user._id,
            farmerId: farmer._id,
            type: 'purchase',
            amount: 2000,
            item: 'Fertilizer',
            transcription: 'Bought fertilizer for dry season.',
            timestamp: Date.now() - 172800000, // 2 days ago
            paymentStatus: 'completed'
        },
        {
            userId: user._id,
            farmerId: farmer._id,
            type: 'credit',
            amount: 10000,
            item: 'Tractor Rental',
            transcription: 'Took credit for tractor rental.',
            timestamp: Date.now(),
            paymentStatus: 'pending'
        }
    ];
    
    await Log.insertMany(logs);

    console.log('Database seeded successfully with Users, Farmers, Logs, and Cooperative!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();

import mongoose from 'mongoose';
export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error('CRITICAL: MONGO_URI is not defined.');
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map
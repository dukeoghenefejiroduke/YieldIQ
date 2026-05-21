import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes';
import logRoutes from './routes/logRoutes';

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(cors({
  origin: ['https://yieldiq.onrender.com', 'http://localhost:5173'],
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.error('MONGO_URI is not defined. Database connection skipped.');
}

app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Serve static assets in production
// Since this file is in server/dist/index.js, we need to go up two levels to reach the root
const clientDistPath = path.resolve(__dirname, '..', '..', 'client', 'dist');
console.log('Current __dirname:', __dirname);
console.log('Attempting to serve static files from:', clientDistPath);

if (require('fs').existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
} else {
  // Fallback for different deployment structures
  const fallbackPath = path.join(process.cwd(), '..', 'client', 'dist');
  console.log('Primary path failed. Trying fallback:', fallbackPath);
  if (require('fs').existsSync(fallbackPath)) {
    app.use(express.static(fallbackPath));
  } else {
    console.error('CRITICAL: client/dist directory not found!');
  }
}

// Catch-all route using Regex to serve index.html for any non-API route
app.get(/^((?!\/api).)*$/, (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend build not found. Please ensure "npm run build" has completed.');
  }
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false).then(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

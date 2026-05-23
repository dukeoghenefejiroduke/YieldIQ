import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
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

const corsOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.CORS_ORIGINS?.split(',') || []),
  'https://yieldiq.onrender.com',
  'https://yieldiq2.onrender.com',
  'http://localhost:5173',
].filter((origin): origin is string => Boolean(origin));

const allowedOrigins = new Set(corsOrigins.map((origin) => origin.trim().replace(/\/$/, '')));

// Allow the static frontend domain plus local development.
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.has(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
}));

// Rate Limiting - increased for smoother production experience
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500, 
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.error('CRITICAL: MONGO_URI is not defined in environment variables.');
  process.exit(1);
}

app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString()
  });
});

// Robust Static File Serving
const possiblePaths = [
  path.resolve(__dirname, '..', '..', 'client', 'dist'),
  path.join(process.cwd(), 'client', 'dist'),
  path.join(process.cwd(), '..', 'client', 'dist'),
  path.join('/opt/render/project/src', 'client', 'dist'),
  path.join(__dirname, '..', 'client', 'dist')
];

let clientDistPath = '';
for (const p of possiblePaths) {
  try {
    if (fs.existsSync(p) && fs.readdirSync(p).length > 0) {
      clientDistPath = p;
      console.log('SUCCESS: Found non-empty client/dist at:', p);
      break;
    } else {
      console.log('Checked path (not found or empty):', p);
    }
  } catch (e) {
    console.log('Error checking path:', p, e);
  }
}

if (clientDistPath) {
  app.use(express.static(clientDistPath));
} else {
  console.error('CRITICAL ERROR: Could not locate client/dist directory in any expected location.');
}

// Catch-all route using Regex to serve index.html for any non-API route
app.get(/^((?!\/api).)*$/, (req, res) => {
  if (clientDistPath) {
    const indexPath = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }
  res.status(404).send('<h1>Frontend build not found</h1><p>Please check the deployment logs to verify the build process.</p>');
});

// Final fallback for any other unmatched requests
app.use((req, res) => {
  if (clientDistPath) {
    const indexPath = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }
  res.status(404).send('Not Found');
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

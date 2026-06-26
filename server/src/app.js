import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import logRoutes from './routes/logRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import ussdRoutes from './routes/ussdRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import marketRoutes from './routes/marketRoutes.js';

dotenv.config();

const app = express();

connectDB();

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
].filter((origin) => Boolean(origin));

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

app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/ussd', ussdRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/market', marketRoutes);

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

export { app };

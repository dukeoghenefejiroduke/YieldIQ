"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Security Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
app.use(express_1.default.json());
const corsOrigins = [
    process.env.FRONTEND_URL,
    ...(process.env.CORS_ORIGINS?.split(',') || []),
    'https://agrovoice.onrender.com',
    'https://yieldiq.onrender.com',
    'https://yieldiq2.onrender.com',
    'http://localhost:5173',
].filter((origin) => Boolean(origin));
const allowedOrigins = new Set(corsOrigins.map((origin) => origin.trim().replace(/\/$/, '')));
// Allow the static frontend domain plus local development.
app.use((0, cors_1.default)({
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
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);
if (process.env.MONGO_URI) {
    mongoose_1.default.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));
}
else {
    console.error('CRITICAL: MONGO_URI is not defined in environment variables.');
}
app.use('/api/auth', authRoutes_1.default);
app.use('/api/logs', logRoutes_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        database: mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected',
        time: new Date().toISOString()
    });
});
// Robust Static File Serving
const possiblePaths = [
    path_1.default.resolve(__dirname, '..', '..', 'client', 'dist'),
    path_1.default.join(process.cwd(), 'client', 'dist'),
    path_1.default.join(process.cwd(), '..', 'client', 'dist'),
    path_1.default.join('/opt/render/project/src', 'client', 'dist'),
    path_1.default.join(__dirname, '..', 'client', 'dist')
];
let clientDistPath = '';
for (const p of possiblePaths) {
    try {
        if (fs_1.default.existsSync(p) && fs_1.default.readdirSync(p).length > 0) {
            clientDistPath = p;
            console.log('SUCCESS: Found non-empty client/dist at:', p);
            break;
        }
        else {
            console.log('Checked path (not found or empty):', p);
        }
    }
    catch (e) {
        console.log('Error checking path:', p, e);
    }
}
if (clientDistPath) {
    app.use(express_1.default.static(clientDistPath));
}
else {
    console.error('CRITICAL ERROR: Could not locate client/dist directory in any expected location.');
}
// Catch-all route using Regex to serve index.html for any non-API route
app.get(/^((?!\/api).)*$/, (req, res) => {
    if (clientDistPath) {
        const indexPath = path_1.default.join(clientDistPath, 'index.html');
        if (fs_1.default.existsSync(indexPath)) {
            return res.sendFile(indexPath);
        }
    }
    res.status(404).send('<h1>Frontend build not found</h1><p>Please check the deployment logs to verify the build process.</p>');
});
// Final fallback for any other unmatched requests
app.use((req, res) => {
    if (clientDistPath) {
        const indexPath = path_1.default.join(clientDistPath, 'index.html');
        if (fs_1.default.existsSync(indexPath)) {
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
        mongoose_1.default.connection.close(false).then(() => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
//# sourceMappingURL=index.js.map
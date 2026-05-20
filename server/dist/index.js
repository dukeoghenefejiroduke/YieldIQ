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
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Security Middleware
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/agrovoice')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/logs', logRoutes_1.default);
// Serve static files from the React app
const clientDistPath = path_1.default.join(__dirname, '../../client/dist');
app.use(express_1.default.static(clientDistPath));
// Express 5 wildcard fix: use (.*) instead of *
app.get('(.*)', (req, res) => {
    res.sendFile(path_1.default.join(clientDistPath, 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map
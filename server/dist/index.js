import { app } from './app.js';
import mongoose from 'mongoose';
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
//# sourceMappingURL=index.js.map
import cron from 'node-cron';
import { priceAggregatorService } from './services/priceAggregatorService.js';
import { sendTransactionNotification } from './services/notificationService.js';
import Farmer from './models/Farmer.js';
export const startCronJobs = () => {
    // Runs every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Running price alert check...');
        try {
            const farmers = await Farmer.find();
            for (const farmer of farmers) {
                const alerts = await priceAggregatorService.checkPriceAlerts(farmer.location);
                for (const alert of alerts) {
                    const message = `Price Alert: ${alert.crop} in ${farmer.location} is now ${alert.price} ${alert.unit}. Trend: ${alert.trend}. Consider selling!`;
                    await sendTransactionNotification(farmer.phoneNumber, message);
                }
            }
        }
        catch (error) {
            console.error('Error running price alert check:', error);
        }
    });
};
//# sourceMappingURL=cronJobs.js.map
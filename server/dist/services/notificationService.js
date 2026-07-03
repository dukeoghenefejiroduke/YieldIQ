import { sms } from './africasTalkingService.js';
export const sendTransactionNotification = async (phoneNumber, message) => {
    try {
        console.log(`Attempting to send SMS to ${phoneNumber}: ${message}`);
        const response = await sms.send({
            to: phoneNumber,
            message: message,
        });
        console.log(`Notification sent successfully to ${phoneNumber}:`, response);
    }
    catch (error) {
        console.error(`Failed to send notification to ${phoneNumber}:`, error);
        // We catch the error to ensure the main transaction flow (logging) is not interrupted.
    }
};
//# sourceMappingURL=notificationService.js.map
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AfricasTalking = require('africastalking');
if (!process.env.AT_USERNAME || !process.env.AT_API_KEY) {
    console.warn('WARNING: Africa\'s Talking credentials (AT_USERNAME, AT_API_KEY) are not defined.');
}
const credentials = {
    apiKey: process.env.AT_API_KEY || 'sandbox',
    username: process.env.AT_USERNAME || 'sandbox',
};
const at = AfricasTalking(credentials);
export const sms = at.SMS;
export const voice = at.Voice;
export const ussd = at.USSD;
//# sourceMappingURL=africasTalkingService.js.map
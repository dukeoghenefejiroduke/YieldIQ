"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentWebhook = void 0;
const Log_1 = __importDefault(require("../models/Log"));
// Handle webhook callbacks from OPay (Placeholder for OPay API integration)
const handlePaymentWebhook = async (req, res) => {
    try {
        // OPay webhook payload structure typically involves verifying a hash/signature
        const { reference, status, order_no } = req.body;
        console.log('Processing OPay webhook for reference:', reference);
        // Update the log status based on OPay status
        // OPay status 'SUCCESS' mapped to 'completed'
        const updatedLog = await Log_1.default.findOneAndUpdate({ transactionReference: reference }, { paymentStatus: status === 'SUCCESS' ? 'completed' : 'failed' }, { new: true });
        if (!updatedLog) {
            console.error('Log not found for OPay reference:', reference);
            return res.status(404).json({ error: 'Log not found' });
        }
        res.status(200).send('OPAY_WEBHOOK_PROCESSED');
    }
    catch (error) {
        console.error('OPay webhook error:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.handlePaymentWebhook = handlePaymentWebhook;
//# sourceMappingURL=paymentController.js.map
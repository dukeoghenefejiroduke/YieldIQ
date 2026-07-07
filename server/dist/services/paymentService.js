// Mock service for Paystack/Flutterwave
export const paymentService = {
    initializePayment: async (amount, email, reference) => {
        console.log(`[Mock] Initializing payment: ${amount} for ${email}, ref: ${reference}`);
        return { authorizationUrl: 'https://checkout.paystack.com/mock-url' };
    },
    verifyPayment: async (reference) => {
        console.log(`[Mock] Verifying payment ref: ${reference}`);
        // Simulate successful payment
        return { status: 'success' };
    }
};
export const handlePaymentWebhook = async (req, res) => {
    const { event, data } = req.body;
    console.log(`[Mock] Received payment webhook: ${event}`, data);
    res.status(200).send('Webhook received');
};
//# sourceMappingURL=paymentService.js.map
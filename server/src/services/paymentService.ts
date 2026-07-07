import { Request, Response } from 'express';

// Mock service for Paystack/Flutterwave
export const paymentService = {
  initializePayment: async (amount: number, email: string, reference: string) => {
    console.log(`[Mock] Initializing payment: ${amount} for ${email}, ref: ${reference}`);
    return { authorizationUrl: 'https://checkout.paystack.com/mock-url' };
  },
  verifyPayment: async (reference: string) => {
    console.log(`[Mock] Verifying payment ref: ${reference}`);
    // Simulate successful payment
    return { status: 'success' };
  }
};

export const handlePaymentWebhook = async (req: Request, res: Response) => {
  const { event, data } = req.body;
  console.log(`[Mock] Received payment webhook: ${event}`, data);
  res.status(200).send('Webhook received');
};

export interface PaymentGateway {
  initializePayment(amount: number, email: string, reference: string): Promise<{ authorizationUrl: string }>;
  verifyPayment(reference: string): Promise<{ status: string }>;
}

export class PaystackGateway implements PaymentGateway {
  async initializePayment(amount: number, email: string, reference: string): Promise<{ authorizationUrl: string }> {
    // Implementation for Paystack initialization (using axios for API call)
    console.log('Initializing Paystack payment...', { amount, email, reference });
    return { authorizationUrl: 'https://checkout.paystack.com/...' };
  }

  async verifyPayment(reference: string): Promise<{ status: string }> {
    // Implementation for Paystack verification
    console.log('Verifying Paystack payment...', { reference });
    return { status: 'success' };
  }
}

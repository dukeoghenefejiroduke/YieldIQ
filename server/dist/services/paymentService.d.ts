export interface PaymentGateway {
    initializePayment(amount: number, email: string, reference: string): Promise<{
        authorizationUrl: string;
    }>;
    verifyPayment(reference: string): Promise<{
        status: string;
    }>;
}
export declare class PaystackGateway implements PaymentGateway {
    initializePayment(amount: number, email: string, reference: string): Promise<{
        authorizationUrl: string;
    }>;
    verifyPayment(reference: string): Promise<{
        status: string;
    }>;
}
//# sourceMappingURL=paymentService.d.ts.map
import { Request, Response } from 'express';
export declare const paymentService: {
    initializePayment: (amount: number, email: string, reference: string) => Promise<{
        authorizationUrl: string;
    }>;
    verifyPayment: (reference: string) => Promise<{
        status: string;
    }>;
};
export declare const handlePaymentWebhook: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=paymentService.d.ts.map
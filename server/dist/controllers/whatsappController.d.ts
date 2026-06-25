import { Request, Response } from 'express';
export declare const verifyWebhook: (req: Request, res: Response) => Promise<void>;
export declare const handleMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=whatsappController.d.ts.map
import { Request, Response } from 'express';
import { paymentService, handlePaymentWebhook as serviceHandlePaymentWebhook } from '../services/paymentService.js';
import { creditScoringService } from '../services/creditScoringService.js';
import Log from '../models/Log.js';
import Farmer from '../models/Farmer.js';

interface IFarmerDocument {
    _id: any;
    cooperativeId?: any;
}

export const handlePaymentWebhook = async (req: Request, res: Response) => {
    // 1. Process payment via service
    const result = await serviceHandlePaymentWebhook(req, res);

    // 2. Extract data needed for scoring (assuming webhook provides it in req.body)
    const { status, logId } = req.body; 

    // 3. Reinstated Credit Scoring Logic
    if (status === 'SUCCESS' && logId) {
        const updatedLog = await Log.findById(logId).populate<{ farmerId: IFarmerDocument }>('farmerId');
        
        if (updatedLog && updatedLog.farmerId) {
            const farmer = updatedLog.farmerId as IFarmerDocument;
            
            // Recalculate Farmer Score
            await creditScoringService.recalculateFarmerScore(farmer._id.toString());

            // Recalculate Cooperative Score
            if (farmer.cooperativeId) {
                await creditScoringService.recalculateCooperativeScore(farmer.cooperativeId.toString());
            }
        }
    }
    
    return result;
};

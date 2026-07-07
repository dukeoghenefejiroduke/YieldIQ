import { handlePaymentWebhook as serviceHandlePaymentWebhook } from '../services/paymentService.js';
import { creditScoringService } from '../services/creditScoringService.js';
import Log from '../models/Log.js';
export const handlePaymentWebhook = async (req, res) => {
    // 1. Process payment via service
    const result = await serviceHandlePaymentWebhook(req, res);
    // 2. Extract data needed for scoring (assuming webhook provides it in req.body)
    const { status, logId } = req.body;
    // 3. Reinstated Credit Scoring Logic
    if (status === 'SUCCESS' && logId) {
        const updatedLog = await Log.findById(logId).populate('farmerId');
        if (updatedLog && updatedLog.farmerId) {
            const farmer = updatedLog.farmerId;
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
//# sourceMappingURL=paymentController.js.map
import Log from '../models/Log.js';
import { PaystackGateway } from '../services/paymentService.js';
import { creditScoringService } from '../services/creditScoringService.js';
const paymentGateway = new PaystackGateway();
export const handlePaymentWebhook = async (req, res) => {
    try {
        const { reference, status } = req.body;
        console.log('Processing webhook for reference:', reference);
        const updatedLog = await Log.findOneAndUpdate({ transactionReference: reference }, { paymentStatus: status === 'SUCCESS' ? 'completed' : 'failed' }, { new: true });
        if (!updatedLog) {
            return res.status(404).json({ error: 'Log not found' });
        }
        // Trigger credit score recalculation if payment succeeded
        if (status === 'SUCCESS' && updatedLog.farmerId) {
            await creditScoringService.recalculateFarmerScore(updatedLog.farmerId.toString());
            const farmer = await Log.findById(updatedLog._id).populate('farmerId');
            if (farmer && farmer.farmerId && typeof farmer.farmerId === 'object' && 'cooperativeId' in farmer.farmerId) {
                // @ts-ignore
                if (farmer.farmerId.cooperativeId) {
                    // @ts-ignore
                    await creditScoringService.recalculateCooperativeScore(farmer.farmerId.cooperativeId.toString());
                }
            }
        }
        res.status(200).send('WEBHOOK_PROCESSED');
    }
    catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Internal Server Error');
    }
};
//# sourceMappingURL=paymentController.js.map
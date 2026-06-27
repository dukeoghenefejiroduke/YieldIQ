import Farmer from '../models/Farmer.js';
import Cooperative from '../models/Cooperative.js';
import Log from '../models/Log.js';
export const creditScoringService = {
    async recalculateFarmerScore(farmerId) {
        const logs = await Log.find({ farmerId });
        const transactionVolume = logs.reduce((sum, log) => sum + log.amount, 0);
        // Simple algorithm: 1 point per 1000 units + activity bonus
        const newScore = Math.floor(transactionVolume / 1000) + (logs.length * 5);
        await Farmer.findByIdAndUpdate(farmerId, { creditScore: newScore });
        return newScore;
    },
    async recalculateCooperativeScore(cooperativeId) {
        const farmers = await Farmer.find({ cooperativeId });
        const totalScore = farmers.reduce((sum, farmer) => sum + (farmer.creditScore || 0), 0);
        await Cooperative.findByIdAndUpdate(cooperativeId, { totalCreditScore: totalScore });
        return totalScore;
    }
};

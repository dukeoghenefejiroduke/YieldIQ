import Farmer from '../models/Farmer.js';
import Log from '../models/Log.js';
import { creditScoringService } from '../services/creditScoringService.js';
import { priceAggregatorService } from '../services/priceAggregatorService.js';
export const handleUSSDRequest = async (req, res) => {
    try {
        const { sessionId, serviceCode, phoneNumber, text } = req.body;
        console.log('USSD Request:', { sessionId, serviceCode, phoneNumber, text });
        // Lookup farmer by phone number
        const normalizedPhone = phoneNumber ? phoneNumber.replace(/^\+234/, '0') : '';
        const farmer = await Farmer.findOne({
            phoneNumber: { $regex: normalizedPhone.slice(-10) }
        });
        if (!farmer) {
            return res.status(200).send('END Welcome to AgroVoice. Your phone number is not registered. Please visit your local cooperative to register.');
        }
        const inputParts = text ? text.split('*') : [];
        let responseText = '';
        if (inputParts.length === 0 || inputParts[0] === '') {
            responseText = `CON Welcome, ${farmer.name} to AgroVoice.
1. Check Credit Score
2. Check Market Prices
3. Log Sale Transaction`;
        }
        else {
            const mainChoice = inputParts[0];
            if (mainChoice === '1') {
                responseText = `END Your current AgroVoice Credit Score is: ${farmer.creditScore || 0} pts.`;
            }
            else if (mainChoice === '2') {
                const prices = await priceAggregatorService.getLatestPrices();
                if (inputParts.length === 1) {
                    responseText = `CON Select Crop:\n` + prices.map((p, i) => `${i + 1}. ${p.crop}`).join('\n');
                }
                else {
                    const cropChoice = parseInt(inputParts[1]);
                    const selectedCrop = prices[cropChoice - 1];
                    if (selectedCrop) {
                        responseText = `END ${selectedCrop.crop}: ₦${selectedCrop.price} per ${selectedCrop.unit} (${selectedCrop.region})`;
                    }
                    else {
                        responseText = `END Invalid selection.`;
                    }
                }
            }
            else if (mainChoice === '3') {
                // ... (Transaction logging code remains the same)
                if (inputParts.length === 1) {
                    responseText = `CON Enter transaction amount (₦):`;
                }
                else if (inputParts.length === 2) {
                    responseText = `CON Enter crop item name:`;
                }
                else if (inputParts.length === 3) {
                    const amount = parseFloat(inputParts[1]);
                    const cropItem = inputParts[2];
                    const newLog = new Log({
                        userId: farmer.userId,
                        farmerId: farmer._id,
                        type: 'sale',
                        amount,
                        item: cropItem,
                        transcription: `Logged via USSD: sold ${cropItem} for ₦${amount}`,
                        timestamp: Date.now(),
                        paymentStatus: 'completed'
                    });
                    await newLog.save();
                    await creditScoringService.recalculateFarmerScore(farmer._id.toString());
                    if (farmer.cooperativeId) {
                        await creditScoringService.recalculateCooperativeScore(farmer.cooperativeId.toString());
                    }
                    responseText = `END Success! Logged sale of ${cropItem} for ₦${amount}.`;
                }
            }
            else {
                responseText = `END Invalid selection.`;
            }
        }
        res.set('Content-Type', 'text/plain');
        res.status(200).send(responseText);
    }
    catch (error) {
        console.error('USSD Error:', error);
        res.set('Content-Type', 'text/plain');
        res.status(200).send('END An error occurred.');
    }
};
//# sourceMappingURL=ussdController.js.map
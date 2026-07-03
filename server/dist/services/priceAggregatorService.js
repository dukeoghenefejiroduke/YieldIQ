import axios from 'axios';
export const priceAggregatorService = {
    async getLatestPrices() {
        try {
            // In production, fetch from a real market API or DB
            const response = await axios.get(process.env.MARKET_API_URL || 'https://api.example.com/prices');
            return response.data;
        }
        catch (error) {
            console.error('Failed to fetch real market prices:', error);
            // Return empty array instead of hardcoded mock to force frontend fallback
            return [];
        }
    },
    async checkPriceAlerts(userRegion) {
        const prices = await this.getLatestPrices();
        return prices.filter((p) => p.region === userRegion && p.sellSignal === true);
    }
};
//# sourceMappingURL=priceAggregatorService.js.map
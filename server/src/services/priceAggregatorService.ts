export const priceAggregatorService = {
    async getLatestPrices() {
        // Mocked response with trend analysis
        return [
            { crop: 'Cassava', price: 450, unit: 'kg', region: 'Rivers', trend: 'up', sellSignal: false },
            { crop: 'Maize', price: 650, unit: 'mudu', region: 'Rivers', trend: 'peak', sellSignal: true },
            { crop: 'Yam', price: 1200, unit: 'tuber', region: 'Rivers', trend: 'down', sellSignal: false },
            { crop: 'Cocoa', price: 2500, unit: 'kg', region: 'Ondo', trend: 'stable', sellSignal: false }
        ];
    },
    
    async checkPriceAlerts(userRegion: string) {
        const prices = await this.getLatestPrices();
        return prices.filter(p => p.region === userRegion && p.sellSignal === true);
    }
};

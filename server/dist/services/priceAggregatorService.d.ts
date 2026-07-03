export declare const priceAggregatorService: {
    getLatestPrices(): Promise<{
        crop: string;
        price: number;
        unit: string;
        region: string;
        trend: string;
        sellSignal: boolean;
    }[]>;
    checkPriceAlerts(userRegion: string): Promise<{
        crop: string;
        price: number;
        unit: string;
        region: string;
        trend: string;
        sellSignal: boolean;
    }[]>;
};
//# sourceMappingURL=priceAggregatorService.d.ts.map
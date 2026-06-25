export interface MarketPrice {
    crop: string;
    price: number;
    unit: string;
    region: string;
}
export declare const priceAggregatorService: {
    getLatestPrices(): Promise<MarketPrice[]>;
};
//# sourceMappingURL=priceAggregatorService.d.ts.map
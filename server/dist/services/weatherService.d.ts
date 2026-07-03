export interface WeatherData {
    lga: string;
    rainfallMm: number;
    thresholdMm: number;
    temp: number;
    condition: string;
}
export declare const checkInsuranceTrigger: (weather: WeatherData) => Promise<boolean>;
export declare const fetchLocalizedWeather: (lga: string) => Promise<WeatherData>;
//# sourceMappingURL=weatherService.d.ts.map
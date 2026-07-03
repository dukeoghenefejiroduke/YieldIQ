/**
 * Weather Insurance Service Architecture
 *
 * Purpose: Monitor localized weather data and trigger micro-insurance
 * events based on predefined agricultural risk thresholds.
 */
export interface WeatherData {
    lga: string;
    rainfallMm: number;
    thresholdMm: number;
}
export declare const checkInsuranceTrigger: (weather: WeatherData) => Promise<boolean>;
export declare const fetchLocalizedWeather: (lga: string) => Promise<{
    lga: string;
    rainfallMm: number;
    thresholdMm: number;
}>;
//# sourceMappingURL=weatherService.d.ts.map
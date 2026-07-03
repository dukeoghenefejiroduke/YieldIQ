import axios from 'axios';

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

export const checkInsuranceTrigger = async (weather: WeatherData): Promise<boolean> => {
    return weather.rainfallMm < (weather.thresholdMm * 0.5);
};

export const fetchLocalizedWeather = async (lga: string) => {
    // Safely attempt to access environment variable
    const apiKey = process.env.OPENWEATHERMAP_API_KEY || 'dummy_key';
    
    console.log(`Fetching weather data for LGA: ${lga}`);
    
    // Returning dummy data for placeholder structure, removing throw
    return { lga, rainfallMm: 10, thresholdMm: 50 };
};

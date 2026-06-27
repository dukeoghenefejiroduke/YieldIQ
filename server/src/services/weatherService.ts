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
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
        throw new Error('OPENWEATHERMAP_API_KEY is not configured');
    }
    
    console.log(`Fetching weather data for LGA: ${lga}`);
    // Example call:
    // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${lga}&appid=${apiKey}`);
    
    // Returning dummy data for placeholder structure
    return { lga, rainfallMm: 10, thresholdMm: 50 };
};

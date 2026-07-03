import axios from 'axios';

export interface WeatherData {
    lga: string;
    rainfallMm: number;
    thresholdMm: number;
    temp: number;
    condition: string;
}

export const checkInsuranceTrigger = async (weather: WeatherData): Promise<boolean> => {
    return weather.rainfallMm < (weather.thresholdMm * 0.5);
};

export const fetchLocalizedWeather = async (lga: string): Promise<WeatherData> => {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
        throw new Error('OPENWEATHERMAP_API_KEY is not configured');
    }
    
    // Call real API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${lga}&units=metric&appid=${apiKey}`);
    
    return {
        lga,
        temp: Math.round(response.data.main.temp),
        condition: response.data.weather[0].main,
        rainfallMm: response.data.rain?.['1h'] || 0,
        thresholdMm: 50 // Static threshold for this context
    };
};

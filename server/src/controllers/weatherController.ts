import { fetchLocalizedWeather, checkInsuranceTrigger } from '../services/weatherService.js';

export const getWeatherAlert = async (req, res) => {
    try {
        // In a real app, get LGA from farmer profile
        const lga = 'Bayelsa'; 
        const weather = await fetchLocalizedWeather(lga);
        const alert = await checkInsuranceTrigger(weather);
        res.json({ alert, weather });
    } catch (error) {
        console.error('Weather error:', error);
        res.status(500).json({ error: 'Failed to fetch weather status' });
    }
};

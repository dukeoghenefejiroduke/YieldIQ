export const checkInsuranceTrigger = async (weather) => {
    return weather.rainfallMm < (weather.thresholdMm * 0.5);
};
export const fetchLocalizedWeather = async (lga) => {
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
//# sourceMappingURL=weatherService.js.map
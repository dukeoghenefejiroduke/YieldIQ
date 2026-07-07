import { useEffect, useState } from 'react';
import { CloudRain, Sun, Cloud } from 'lucide-react';
import api from '../../services/api';

const MOCK_WEATHER = { temp: 28, condition: 'Sunny' };

export const FieldForecast = () => {
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        api.get('/weather/forecast')
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setWeather(res.data);
                } else {
                    setWeather(MOCK_WEATHER);
                }
            })
            .catch(() => {
                setWeather(MOCK_WEATHER);
            });
    }, []);

    if (!weather) return null;

    return (
        <div className="bg-slate-700 p-4 rounded-xl border border-slate-600 flex items-center justify-between">
            <div>
                <h4 className="font-bold text-white text-sm">Field Forecast</h4>
                <p className="text-2xl font-black text-white">{weather.temp}°C</p>
                <p className="text-xs text-gray-300">{weather.condition}</p>
                <p className="text-xs text-blue-300 mt-1">Rain: {weather.rainfallMm || 0}mm</p>
            </div>
            {weather.condition.includes('Rain') ? <CloudRain className="w-10 h-10 text-blue-400"/> : 
             weather.condition.includes('Cloud') ? <Cloud className="w-10 h-10 text-gray-400"/> : 
             <Sun className="w-10 h-10 text-yellow-400"/>}
        </div>
    );
};

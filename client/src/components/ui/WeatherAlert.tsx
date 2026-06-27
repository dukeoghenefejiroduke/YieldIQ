import { useEffect, useState } from 'react';
import api from '../../services/api';
import { AlertTriangle, CloudRain } from 'lucide-react';

export const WeatherAlert = () => {
    const [alert, setAlert] = useState<boolean>(false);
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        api.get('/weather/alert').then(res => {
            setAlert(res.data.alert);
            setWeather(res.data.weather);
        }).catch(console.error);
    }, []);

    if (!alert) return null;

    return (
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-lg mb-6 flex items-center gap-4">
            <AlertTriangle className="text-amber-600 w-8 h-8" />
            <div>
                <h3 className="font-bold text-amber-900">Weather Risk Alert</h3>
                <p className="text-sm text-amber-800">
                    High risk of crop loss in {weather?.lga} due to low rainfall ({weather?.rainfallMm}mm). 
                    Contact your cooperative for insurance options.
                </p>
            </div>
        </div>
    );
};

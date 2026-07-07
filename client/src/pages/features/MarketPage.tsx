import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { getMarketPrices } from '../../services/marketService';
import { TrendingUp, ArrowUp } from 'lucide-react';

const MOCK_MARKET_TRENDS = [
    { crop: 'Cassava', price: 450, unit: 'kg', region: 'Rivers', sellSignal: false },
    { crop: 'Maize', price: 650, unit: 'mudu', region: 'Rivers', sellSignal: true },
    { crop: 'Yam', price: 1200, unit: 'tuber', region: 'Rivers', sellSignal: false }
];

export const MarketPage = () => {
    const [marketTrends, setMarketTrends] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const trends = await getMarketPrices();
                setMarketTrends(trends.length > 0 ? trends : MOCK_MARKET_TRENDS);
            } catch {
                setMarketTrends(MOCK_MARKET_TRENDS);
            }
        };
        fetchTrends();
    }, []);

    return (
        <MainLayout>
            <div className="bg-slate-900 min-h-screen text-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-green-400" /> Market Signals</h1>
                <div className="space-y-3">
                    {marketTrends.map(trend => (
                        <button 
                            key={trend.crop} 
                            onClick={() => navigate('/log-transaction', { state: { prefillItem: trend.crop } })}
                            className="w-full flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 active:scale-95 transition-transform"
                        >
                            <span className="font-bold text-white text-lg">{trend.crop}</span>
                            {trend.sellSignal ? (
                                <span className="bg-green-900 text-green-100 text-xs px-3 py-1.5 rounded flex items-center gap-1 font-bold">
                                    <ArrowUp className="w-4 h-4"/> SELL NOW
                                </span>
                            ) : (
                                <span className="text-gray-400">Wait: ₦{trend.price}/{trend.unit}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

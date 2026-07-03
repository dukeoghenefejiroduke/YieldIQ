import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import api from '../../services/api';

export const CommunityBenchmark = () => {
    const [percentile, setPercentile] = useState<number | null>(null);

    useEffect(() => {
        api.get('/farmer/benchmark')
            .then(res => {
                if (res.data && res.data.percentile !== undefined && res.data.percentile !== null) {
                    setPercentile(res.data.percentile);
                } else {
                    setPercentile(75);
                }
            })
            .catch(() => {
                setPercentile(75);
            });
    }, []);

    if (percentile === null) return null;

    return (
        <div className="bg-slate-700 p-4 rounded-xl border border-slate-600 flex items-center gap-4">
            <div className="bg-green-900 p-3 rounded-full">
                <Users className="text-green-400 w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-white text-sm">Community Benchmark</h4>
                <p className="text-sm text-gray-300">
                    You are in the top <span className="font-bold text-white">{percentile}%</span> of farmers in your region.
                </p>
            </div>
        </div>
    );
};

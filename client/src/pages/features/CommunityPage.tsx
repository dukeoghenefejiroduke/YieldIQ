import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { CommunityHub } from '../../components/features/CommunityHub';
import { getFarmerProfile } from '../../services/farmerService';

export const CommunityPage = () => {
    const [farmer, setFarmer] = useState<any>(null);

    useEffect(() => {
        const fetchFarmer = async () => {
            const profile = await getFarmerProfile();
            setFarmer(profile);
        };
        fetchFarmer();
    }, []);

    return (
        <MainLayout>
            <div className="bg-slate-900 min-h-screen text-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-6">Community Hub</h1>
                {farmer && <CommunityHub cooperativeId={farmer.cooperativeId || 'default-coop'} />}
            </div>
        </MainLayout>
    );
};

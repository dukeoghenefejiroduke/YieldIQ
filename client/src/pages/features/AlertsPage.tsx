import { MainLayout } from '../../components/layout/MainLayout';
import { AlertsFeed } from '../../components/ui/AlertsFeed';

export const AlertsPage = () => {
    return (
        <MainLayout>
            <div className="bg-slate-900 min-h-screen text-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-6">Alerts</h1>
                <AlertsFeed />
            </div>
        </MainLayout>
    );
};

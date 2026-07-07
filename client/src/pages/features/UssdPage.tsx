import { MainLayout } from '../../components/layout/MainLayout';
import { UssdView } from '../../components/features/UssdView';

export const UssdPage = () => {
    return (
        <MainLayout>
            <div className="bg-slate-900 min-h-screen text-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-6">USSD History</h1>
                <UssdView />
            </div>
        </MainLayout>
    );
};

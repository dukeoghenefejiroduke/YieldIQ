import { MainLayout } from '../../components/layout/MainLayout';
import { WhatsappView } from '../../components/features/WhatsappView';

export const MessagesPage = () => {
    return (
        <MainLayout>
            <div className="bg-slate-900 min-h-screen text-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-6">Messages</h1>
                <WhatsappView />
            </div>
        </MainLayout>
    );
};

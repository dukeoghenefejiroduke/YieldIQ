import { MainLayout } from '../../components/layout/MainLayout';
import { FieldForecast } from '../../components/ui/FieldForecast';

export const ForecastPage = () => {
    return (
        <MainLayout>
            <div className="bg-slate-900 min-h-screen text-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-6">Field Forecast</h1>
                <FieldForecast />
            </div>
        </MainLayout>
    );
};

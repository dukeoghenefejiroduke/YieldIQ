import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import api from '../../services/api';

const MOCK_USSD = [{ id: 1, message: 'Balance Check', timestamp: Date.now() }];

export const UssdView = () => {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        api.get('/ussd/logs')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setLogs(res.data);
                } else {
                    setLogs(MOCK_USSD);
                }
            })
            .catch(() => setLogs(MOCK_USSD));
    }, []);

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-4">USSD Interaction Logs</h1>
            <div className="space-y-2">
                {logs.map(log => <div key={log.id} className="p-3 bg-slate-700 rounded-lg">{log.message || log.transcription}</div>)}
            </div>
        </MainLayout>
    );
};

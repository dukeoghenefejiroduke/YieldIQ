import React from 'react';
import { Lightbulb } from 'lucide-react';

export const EducationalTip = ({ title, message }: { title: string; message: string }) => {
  return (
    <div className="bg-slate-700 p-4 rounded-xl border-l-4 border-l-green-500 flex items-start gap-3">
        <Lightbulb className="text-yellow-400 w-6 h-6 flex-shrink-0 mt-0.5" />
        <div>
            <h4 className="font-bold text-white">{title}</h4>
            <p className="text-sm text-gray-300">{message}</p>
        </div>
    </div>
  );
};

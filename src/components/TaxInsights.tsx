import React from 'react';
import { Plane, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface TaxInsightsProps {
  insights: {
    name: string;
    rate: number;
    flag: string;
    savedAmount: number;
    totalNet: number;
  }[];
  currentTaxAmount: number;
  className?: string;
}

export const TaxInsights: React.FC<TaxInsightsProps> = ({
  insights,
  currentTaxAmount,
  className
}) => {
  if (currentTaxAmount <= 0) return null;

  return (
    <div className={cn("bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-blue-100", className)}>
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Plane className="w-5 h-5 text-indigo-600" />
        Migration Insights (Just Kidding... Unless?)
      </h2>
      
      <p className="text-sm text-slate-600 mb-4">
        If you moved to a tax-haven tomorrow, here is how much extra cash you'd pocket instead of paying taxes:
      </p>

      <div className="space-y-3">
        {insights.map((region) => (
          <div key={region.name} className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">{region.flag}</span>
              <div>
                <p className="font-semibold text-slate-700 text-sm">{region.name}</p>
                <p className="text-xs text-slate-400">0% Cap Gains (Est.)</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600 text-sm">
                + {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(region.savedAmount)}
              </p>
              <p className="text-xs text-slate-400">Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(region.totalNet)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-indigo-600 bg-indigo-100/50 p-3 rounded-lg">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          Warning: Moving to Singapore purely for tax reasons may result in excessive humidity, expensive cars, and a lack of chewing gum.
        </p>
      </div>
    </div>
  );
};


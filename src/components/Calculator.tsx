import React from 'react';
import { DollarSign, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

interface CalculatorProps {
  rsuCount: number;
  onRsuCountChange: (val: number) => void;
  sharePrice: number;
  onSharePriceChange: (val: number) => void;
  className?: string;
}

export const Calculator: React.FC<CalculatorProps> = ({
  rsuCount,
  onRsuCountChange,
  sharePrice,
  onSharePriceChange,
  className
}) => {
  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-sm border border-slate-200", className)}>
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Layers className="w-6 h-6 text-databricks-red" />
        Asset Details
      </h2>
      
      <div className="space-y-6">
        {/* RSU Count Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">
            Total RSUs Granted
          </label>
          <div className="relative group">
            <input
              type="number"
              min="0"
              value={rsuCount || ''}
              onChange={(e) => onRsuCountChange(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 5000"
              className="w-full p-3 pl-4 rounded-xl border border-slate-200 bg-slate-50 text-lg font-semibold text-slate-900 focus:ring-2 focus:ring-databricks-red/20 focus:border-databricks-red outline-none transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Share Price Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex justify-between">
            <span>Estimated Share Price</span>
            <span className="text-slate-400 font-normal text-xs">Based on secondary market</span>
          </label>
          <div className="relative group">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-databricks-red transition-colors" />
            <input
              type="number"
              min="0"
              step="0.01"
              value={sharePrice || ''}
              onChange={(e) => onSharePriceChange(parseFloat(e.target.value) || 0)}
              placeholder="73.00"
              className="w-full p-3 pl-11 rounded-xl border border-slate-200 bg-slate-50 text-lg font-semibold text-slate-900 focus:ring-2 focus:ring-databricks-red/20 focus:border-databricks-red outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


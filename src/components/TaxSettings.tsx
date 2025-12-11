import React from 'react';
import { TAX_REGIONS } from '../data/taxes';
import { Globe, Percent } from 'lucide-react';
import { cn } from '../lib/utils';

interface TaxSettingsProps {
  selectedRegionId: string;
  onRegionChange: (id: string) => void;
  taxRate: number;
  onRateChange: (rate: number) => void;
  className?: string;
}

export const TaxSettings: React.FC<TaxSettingsProps> = ({
  selectedRegionId,
  onRegionChange,
  taxRate,
  onRateChange,
  className
}) => {
  return (
    <div className={cn("p-4 bg-white/50 rounded-xl border border-slate-200 shadow-sm space-y-4", className)}>
      <div className="flex items-center gap-2 text-slate-700 font-semibold border-b border-slate-100 pb-2">
        <Globe className="w-5 h-5 text-blue-500" />
        <h3>Tax Settings</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm text-slate-500 font-medium">Tax Region</label>
          <select
            value={selectedRegionId}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full p-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {TAX_REGIONS.map((region) => (
              <option key={region.id} value={region.id}>
                {region.flag} {region.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-slate-500 font-medium">Effective Tax Rate (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={taxRate}
              onChange={(e) => onRateChange(parseFloat(e.target.value) || 0)}
              className="w-full pl-9 p-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


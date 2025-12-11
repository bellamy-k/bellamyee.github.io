import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface VestingProps {
  grantDate: string;
  onGrantDateChange: (date: string) => void;
  durationYears: number;
  onDurationChange: (years: number) => void;
  vestingProgress: {
    percentage: number;
    yearsLeft: number;
  };
  className?: string;
}

export const VestingSchedule: React.FC<VestingProps> = ({
  grantDate,
  onGrantDateChange,
  durationYears,
  onDurationChange,
  vestingProgress,
  className
}) => {
  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-sm border border-slate-200", className)}>
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6 text-databricks-red" />
        Vesting Schedule
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Grant Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="date"
              value={grantDate}
              onChange={(e) => onGrantDateChange(e.target.value)}
              className="w-full pl-10 p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900 focus:ring-2 focus:ring-databricks-red/20 outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Vesting Period (Years)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={durationYears}
            onChange={(e) => onDurationChange(parseInt(e.target.value) || 4)}
            className="w-full p-3 pl-4 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900 focus:ring-2 focus:ring-databricks-red/20 outline-none"
          />
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4">
        <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
          <span>Vested: {vestingProgress.percentage.toFixed(1)}%</span>
          <span>{vestingProgress.yearsLeft.toFixed(1)} years left</span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-databricks-red rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${vestingProgress.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};


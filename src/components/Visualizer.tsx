import React from 'react';
import { motion } from 'framer-motion';
import { REAL_ESTATE_TIERS } from '../data/tiers';
import { Building2, Home, CheckCircle2, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface VisualizerProps {
  netValue: number;
  grossValue: number;
  selectedTierId: string;
  onTierChange: (id: string) => void;
  vestingProgress: {
    vestedNetValue: number;
    futureNetValue: number;
    percentage: number;
  };
}

export const Visualizer: React.FC<VisualizerProps> = ({
  netValue,
  grossValue,
  selectedTierId,
  onTierChange,
  vestingProgress
}) => {
  const selectedTier = REAL_ESTATE_TIERS.find(t => t.id === selectedTierId) || REAL_ESTATE_TIERS[0];
  const vestedPercentage = (vestingProgress.vestedNetValue / selectedTier.price) * 100;
  const futurePercentage = (netValue / selectedTier.price) * 100;

  // Determine current "Level" based on price
  const currentLevelIndex = REAL_ESTATE_TIERS.reduce((acc, tier, index) => {
    return vestingProgress.vestedNetValue >= tier.price ? index : acc;
  }, -1);
  const nextLevel = REAL_ESTATE_TIERS[currentLevelIndex + 1];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Goal Selector */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-databricks-red/10 rounded-lg">
            <Building2 className="w-6 h-6 text-databricks-red" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Your Goal</h3>
            <p className="text-sm text-slate-500">Target Lifestyle</p>
          </div>
        </div>
        
        <select
          value={selectedTierId}
          onChange={(e) => onTierChange(e.target.value)}
          className="w-full sm:w-auto p-2 pr-8 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-databricks-red/20 outline-none cursor-pointer hover:border-databricks-red/30 transition-colors"
        >
          {REAL_ESTATE_TIERS.map((tier) => (
            <option key={tier.id} value={tier.id}>
              {tier.name} — {formatCurrency(tier.price)}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Visualization */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
        
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Vested Purchasing Power</p>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              {formatCurrency(vestingProgress.vestedNetValue)}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Total Projected Net: {formatCurrency(netValue)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-databricks-red">
              {vestedPercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-400">of goal (vested)</p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="h-8 bg-slate-100 rounded-full overflow-hidden relative border border-slate-100">
          {/* Future Projected Bar (Ghost) */}
          <motion.div 
            className="absolute top-0 left-0 h-full bg-databricks-red/20 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(futurePercentage, 100)}%` }}
            transition={{ duration: 1 }}
          />
          
          {/* Current Vested Bar */}
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-databricks-red rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(vestedPercentage, 100)}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </div>

        {/* Tier Info */}
        <div className="mt-6 flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Home className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">{selectedTier.name}</h4>
            <p className="text-sm text-slate-500 mt-1">{selectedTier.description}</p>
          </div>
          {vestedPercentage >= 100 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="ml-auto bg-green-100 p-2 rounded-full"
            >
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </motion.div>
          )}
        </div>

        {/* You Are Here Indicator */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h4 className="text-sm font-semibold text-slate-600 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-databricks-red" />
            Your Current Status
          </h4>
          
          <div className="flex flex-wrap gap-2">
             {REAL_ESTATE_TIERS.map((tier, index) => {
               const isPassed = index <= currentLevelIndex;
               const isNext = index === currentLevelIndex + 1;
               
               return (
                 <div 
                  key={tier.id}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    isPassed 
                      ? "bg-green-100 text-green-700 border-green-200" 
                      : isNext
                        ? "bg-databricks-red/10 text-databricks-red border-databricks-red/20 animate-pulse"
                        : "bg-slate-50 text-slate-400 border-slate-100"
                  )}
                 >
                   {tier.name}
                   {isPassed && " ✓"}
                 </div>
               )
             })}
          </div>
          {nextLevel && (
             <p className="text-xs text-slate-500 mt-3">
               Next Milestone: <strong>{nextLevel.name}</strong> (${formatCurrency(nextLevel.price - vestingProgress.vestedNetValue)} to go)
             </p>
          )}
        </div>

      </div>
    </div>
  );
};

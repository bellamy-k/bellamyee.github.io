import React from 'react';
import { useCalculator } from './hooks/useCalculator';
import { Calculator } from './components/Calculator';
import { TaxSettings } from './components/TaxSettings';
import { Visualizer } from './components/Visualizer';
import { VestingSchedule } from './components/VestingSchedule';
import { TaxInsights } from './components/TaxInsights';
import { Building } from 'lucide-react';

function App() {
  const {
    rsuCount, setRsuCount,
    sharePrice, setSharePrice,
    selectedRegionId, setSelectedRegionId,
    customTaxRate, setCustomTaxRate,
    selectedTierId, setSelectedTierId,
    grantDate, setGrantDate,
    vestingDurationYears, setVestingDurationYears,
    netValue,
    grossValue,
    taxAmount,
    vestingProgress,
    taxInsights
  } = useCalculator();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4">
            <Building className="w-8 h-8 text-databricks-red" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Databricks RSU <span className="text-databricks-red">To Home</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Visualize your Databricks equity against the Manhattan real estate market.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-5 space-y-6">
            <Calculator 
              rsuCount={rsuCount}
              onRsuCountChange={setRsuCount}
              sharePrice={sharePrice}
              onSharePriceChange={setSharePrice}
            />
            
            <VestingSchedule 
              grantDate={grantDate}
              onGrantDateChange={setGrantDate}
              durationYears={vestingDurationYears}
              onDurationChange={setVestingDurationYears}
              vestingProgress={{
                percentage: vestingProgress.percentage,
                yearsLeft: vestingProgress.yearsLeft
              }}
            />

            <TaxSettings 
              selectedRegionId={selectedRegionId}
              onRegionChange={setSelectedRegionId}
              taxRate={customTaxRate}
              onRateChange={setCustomTaxRate}
            />

            <TaxInsights 
              insights={taxInsights}
              currentTaxAmount={taxAmount}
            />
          </div>

          {/* Visualization Section */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-8">
              <Visualizer 
                netValue={netValue}
                grossValue={grossValue}
                selectedTierId={selectedTierId}
                onTierChange={setSelectedTierId}
                vestingProgress={vestingProgress}
              />

              <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
                <p>Disclaimer: Share prices are estimates based on secondary markets. Tax rates are approximations. Real estate prices are illustrative averages.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

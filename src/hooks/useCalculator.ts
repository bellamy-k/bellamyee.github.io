import { useState, useMemo, useEffect } from 'react';
import { TAX_REGIONS, TaxRegion } from '../data/taxes';
import { REAL_ESTATE_TIERS, RealEstateTier } from '../data/tiers';

export function useCalculator() {
  const [rsuCount, setRsuCount] = useState<number>(0);
  const [sharePrice, setSharePrice] = useState<number>(180); // Default updated to $180
  const [selectedRegionId, setSelectedRegionId] = useState<string>(TAX_REGIONS[0].id);
  const [customTaxRate, setCustomTaxRate] = useState<number>(TAX_REGIONS[0].estimatedRate);
  const [selectedTierId, setSelectedTierId] = useState<string>(REAL_ESTATE_TIERS[1].id); // Default to Studio
  
  // Vesting State
  const [grantDate, setGrantDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [vestingDurationYears, setVestingDurationYears] = useState<number>(4);

  const selectedRegion = TAX_REGIONS.find(r => r.id === selectedRegionId) || TAX_REGIONS[0];
  const selectedTier = REAL_ESTATE_TIERS.find(t => t.id === selectedTierId) || REAL_ESTATE_TIERS[0];

  useEffect(() => {
    const region = TAX_REGIONS.find(r => r.id === selectedRegionId);
    if (region && region.id !== 'custom') {
      setCustomTaxRate(region.estimatedRate);
    }
  }, [selectedRegionId]);

  const grossValue = useMemo(() => rsuCount * sharePrice, [rsuCount, sharePrice]);
  
  const taxAmount = useMemo(() => {
    return grossValue * (customTaxRate / 100);
  }, [grossValue, customTaxRate]);

  const netValue = useMemo(() => {
    return grossValue - taxAmount;
  }, [grossValue, taxAmount]);

  // Vesting Calculations
  const vestingProgress = useMemo(() => {
    const start = new Date(grantDate);
    const now = new Date();
    const end = new Date(start);
    end.setFullYear(start.getFullYear() + vestingDurationYears);

    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    // Clamp between 0 and 1
    const progress = Math.max(0, Math.min(1, elapsed / totalDuration));
    
    // Calculate vested value
    const vestedNetValue = netValue * progress;
    const futureNetValue = netValue; // Full value after 4 years

    return {
      percentage: progress * 100,
      vestedNetValue,
      futureNetValue,
      yearsLeft: Math.max(0, (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    };
  }, [grantDate, vestingDurationYears, netValue]);

  // Insights
  const taxInsights = useMemo(() => {
    const lowTaxRegions = [
      { name: 'Singapore', rate: 0, flag: '🇸🇬' }, // No cap gains tax generally for individuals, income tax varies but lower
      { name: 'Malaysia', rate: 0, flag: '🇲🇾' }, // No cap gains on foreign equity usually
      { name: 'Dubai', rate: 0, flag: '🇦🇪' }
    ];

    const currentTaxLoss = taxAmount;
    
    return lowTaxRegions.map(region => ({
      ...region,
      savedAmount: currentTaxLoss - (grossValue * (region.rate / 100)),
      totalNet: grossValue - (grossValue * (region.rate / 100))
    }));
  }, [grossValue, taxAmount]);

  return {
    rsuCount, setRsuCount,
    sharePrice, setSharePrice,
    selectedRegionId, setSelectedRegionId,
    customTaxRate, setCustomTaxRate,
    selectedTierId, setSelectedTierId,
    grantDate, setGrantDate,
    vestingDurationYears, setVestingDurationYears,
    selectedRegion,
    selectedTier,
    grossValue,
    taxAmount,
    netValue,
    vestingProgress,
    taxInsights
  };
}

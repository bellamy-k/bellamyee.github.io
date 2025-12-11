export interface TaxRegion {
  id: string;
  name: string;
  estimatedRate: number; // Percentage (0-100)
  flag: string; // Emoji flag
}

export const TAX_REGIONS: TaxRegion[] = [
  {
    id: 'usa_ca',
    name: 'USA (California)',
    estimatedRate: 45, // Federal + CA State + FICA
    flag: '🇺🇸'
  },
  {
    id: 'usa_ny',
    name: 'USA (New York)',
    estimatedRate: 45, // Federal + NY State + City + FICA
    flag: '🇺🇸'
  },
  {
    id: 'kr',
    name: 'South Korea',
    estimatedRate: 28, // Conservative estimate (Mix of income/cap gains rules varies by visa/resident status)
    flag: '🇰🇷'
  },
  {
    id: 'ca',
    name: 'Canada',
    estimatedRate: 40, // Federal + Provincial avg
    flag: '🇨🇦'
  },
  {
    id: 'custom',
    name: 'Custom Rate',
    estimatedRate: 0,
    flag: '🌍'
  }
];


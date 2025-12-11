export interface RealEstateTier {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string; // Optional for future use
}

export const REAL_ESTATE_TIERS: RealEstateTier[] = [
  {
    id: 'car_living',
    name: 'Living in a Used Honda Civic',
    price: 5000,
    description: 'A cozy 2010 sedan. Shower at the gym. No rent!'
  },
  {
    id: 'starter_studio',
    name: 'Manhattan Starter Studio',
    price: 950000,
    description: 'A cozy 400 sqft studio in Hell\'s Kitchen.'
  },
  {
    id: 'luxury_1bd',
    name: 'Luxury 1-Bedroom',
    price: 1800000,
    description: 'A modern 1-bedroom condo in Tribeca with amenities.'
  },
  {
    id: 'penthouse',
    name: 'Manhattan Penthouse',
    price: 8500000,
    description: 'A sprawling penthouse overlooking Central Park.'
  }
];

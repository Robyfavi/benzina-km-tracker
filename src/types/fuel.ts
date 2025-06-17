
export interface FuelEntry {
  id: string;
  date: string;
  liters: number;
  kilometers: number;
  totalKilometers: number;
  costPerLiter?: number;
  totalCost?: number;
  notes?: string;
}

export interface FuelStats {
  totalRefuels: number;
  totalLiters: number;
  totalKilometers: number;
  averageConsumption: number; // km per liter
  averageCostPerKm?: number;
}


import { useState, useEffect } from 'react';
import { FuelEntry, FuelStats } from '../types/fuel';

const STORAGE_KEY = 'fuel-entries';

export const useFuelData = () => {
  const [entries, setEntries] = useState<FuelEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedEntries = JSON.parse(stored);
        setEntries(parsedEntries);
      } catch (error) {
        console.error('Error parsing stored fuel entries:', error);
      }
    }
  }, []);

  const saveEntries = (newEntries: FuelEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
  };

  const addEntry = (entry: Omit<FuelEntry, 'id'>) => {
    const newEntry: FuelEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    const newEntries = [newEntry, ...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    saveEntries(newEntries);
  };

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    saveEntries(newEntries);
  };

  const calculateStats = (): FuelStats => {
    if (entries.length === 0) {
      return {
        totalRefuels: 0,
        totalLiters: 0,
        totalKilometers: 0,
        averageConsumption: 0,
      };
    }

    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const totalLiters = entries.reduce((sum, entry) => sum + entry.liters, 0);
    const totalCost = entries.reduce((sum, entry) => sum + (entry.totalCost || 0), 0);
    
    let totalKilometers = 0;
    if (sortedEntries.length > 1) {
      const firstEntry = sortedEntries[0];
      const lastEntry = sortedEntries[sortedEntries.length - 1];
      totalKilometers = lastEntry.totalKilometers - firstEntry.totalKilometers;
    }

    const averageConsumption = totalKilometers > 0 ? totalKilometers / totalLiters : 0;
    const averageCostPerKm = totalKilometers > 0 && totalCost > 0 ? totalCost / totalKilometers : undefined;

    return {
      totalRefuels: entries.length,
      totalLiters,
      totalKilometers,
      averageConsumption,
      averageCostPerKm,
    };
  };

  return {
    entries,
    addEntry,
    deleteEntry,
    stats: calculateStats(),
  };
};

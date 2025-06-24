import React from 'react';
import { TrendingUp } from 'lucide-react';

const FuelStats = ({ stats }) => {
  if (!stats) return null;

  const totalKm = typeof stats.totalKm === 'number' ? stats.totalKm.toFixed(2) : '0.00';
  const totalLiters = typeof stats.totalLiters === 'number' ? stats.totalLiters.toFixed(2) : '0.00';
  const avgCons = typeof stats.averageConsumption === 'number' ? stats.averageConsumption.toFixed(2) : '0.00';

  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Statistiche
      </h2>
      <ul className="space-y-2">
        <li>Numero rifornimenti: <strong>{stats.totalEntries ?? 0}</strong></li>
        <li>Totale litri: <strong>{totalLiters}</strong></li>
        <li>Totale km: <strong>{totalKm}</strong></li>
        <li>Consumo medio: <strong>{avgCons} km/l</strong></li>
      </ul>
    </section>
  );
};

export default FuelStats;

import { TrendingUp } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Fuel, DollarSign } from 'lucide-react';
import { FuelStats as FuelStatsType } from '../types/fuel';

interface FuelStatsProps {
  stats: FuelStatsType;
}

const FuelStats: React.FC<FuelStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            <span>Rifornimenti</span>
            <BarChart3 className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRefuels}</div>
          <p className="text-xs text-blue-100">Totali registrati</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            <span>Litri Totali</span>
            <Fuel className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalLiters.toFixed(1)}L</div>
          <p className="text-xs text-orange-100">Benzina consumata</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            <span>Km Totali</span>
            <TrendingUp className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalKilometers.toFixed(0)}</div>
          <p className="text-xs text-green-100">Chilometri percorsi</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            <span>Consumo Medio</span>
            <TrendingUp className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.averageConsumption > 0 ? `${stats.averageConsumption.toFixed(1)}` : '0'}
          </div>
          <p className="text-xs text-purple-100">km/litro</p>
        </CardContent>
      </Card>

      {stats.averageCostPerKm && (
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg md:col-span-2 lg:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              <span>Costo Medio per Km</span>
              <DollarSign className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.averageCostPerKm.toFixed(3)}</div>
            <p className="text-xs text-red-100">Costo al chilometro</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FuelStats;

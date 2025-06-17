
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, Fuel, Gauge, Euro } from 'lucide-react';
import { FuelEntry } from '../types/fuel';

interface FuelEntryListProps {
  entries: FuelEntry[];
  onDeleteEntry: (id: string) => void;
}

const FuelEntryList: React.FC<FuelEntryListProps> = ({ entries, onDeleteEntry }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateConsumption = (entry: FuelEntry, previousEntry?: FuelEntry) => {
    if (!previousEntry) return null;
    const kmDifference = entry.totalKilometers - previousEntry.totalKilometers;
    return kmDifference / entry.liters;
  };

  if (entries.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="text-center py-8">
          <Fuel className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Nessun rifornimento registrato ancora.</p>
          <p className="text-slate-500 text-sm">Aggiungi il tuo primo rifornimento sopra!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Storico Rifornimenti</h2>
      
      {entries.map((entry, index) => {
        const previousEntry = entries[index + 1];
        const consumption = calculateConsumption(entry, previousEntry);
        
        return (
          <Card key={entry.id} className="bg-white border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  {formatDate(entry.date)}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeleteEntry(entry.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-slate-600">Litri:</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {entry.liters.toFixed(2)}L
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-slate-600">Km percorsi:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {entry.kilometers.toFixed(0)} km
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-slate-600">Km totali:</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {entry.totalKilometers.toFixed(0)}
                  </Badge>
                </div>
              </div>

              {(entry.costPerLiter || entry.totalCost) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  {entry.costPerLiter && (
                    <div className="flex items-center gap-2">
                      <Euro className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-slate-600">Prezzo/L:</span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        €{entry.costPerLiter.toFixed(3)}
                      </Badge>
                    </div>
                  )}
                  
                  {entry.totalCost && (
                    <div className="flex items-center gap-2">
                      <Euro className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-slate-600">Totale:</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        €{entry.totalCost.toFixed(2)}
                      </Badge>
                    </div>
                  )}
                </div>
              )}

              {consumption && (
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm text-slate-600">Consumo:</span>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        consumption > 15 ? 'bg-green-100 text-green-800' :
                        consumption > 12 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {consumption.toFixed(1)} km/L
                    </Badge>
                  </div>
                </div>
              )}

              {entry.notes && (
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-sm text-slate-600 italic">"{entry.notes}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FuelEntryList;

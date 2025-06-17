
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, Fuel, Gauge } from 'lucide-react';
import { FuelEntry } from '../types/fuel';

interface FuelEntryFormProps {
  onAddEntry: (entry: Omit<FuelEntry, 'id'>) => void;
}

const FuelEntryForm: React.FC<FuelEntryFormProps> = ({ onAddEntry }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    liters: '',
    kilometers: '',
    totalKilometers: '',
    costPerLiter: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.liters || !formData.kilometers || !formData.totalKilometers) {
      alert('Per favore compila tutti i campi obbligatori');
      return;
    }

    const liters = parseFloat(formData.liters);
    const kilometers = parseFloat(formData.kilometers);
    const totalKilometers = parseFloat(formData.totalKilometers);
    const costPerLiter = formData.costPerLiter ? parseFloat(formData.costPerLiter) : undefined;

    const entry: Omit<FuelEntry, 'id'> = {
      date: formData.date,
      liters,
      kilometers,
      totalKilometers,
      costPerLiter,
      totalCost: costPerLiter ? liters * costPerLiter : undefined,
      notes: formData.notes || undefined,
    };

    onAddEntry(entry);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      liters: '',
      kilometers: '',
      totalKilometers: '',
      costPerLiter: '',
      notes: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-orange-50 border-0 shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
          <Fuel className="h-6 w-6 text-orange-500" />
          Nuovo Rifornimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2 text-slate-700 font-medium">
              <CalendarDays className="h-4 w-4" />
              Data
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liters" className="flex items-center gap-2 text-slate-700 font-medium">
              <Fuel className="h-4 w-4" />
              Litri di benzina
            </Label>
            <Input
              id="liters"
              type="number"
              step="0.01"
              placeholder="es. 45.50"
              value={formData.liters}
              onChange={(e) => handleInputChange('liters', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kilometers" className="flex items-center gap-2 text-slate-700 font-medium">
              <Gauge className="h-4 w-4" />
              Km percorsi dal ultimo rifornimento
            </Label>
            <Input
              id="kilometers"
              type="number"
              step="0.1"
              placeholder="es. 520"
              value={formData.kilometers}
              onChange={(e) => handleInputChange('kilometers', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalKilometers" className="flex items-center gap-2 text-slate-700 font-medium">
              <Gauge className="h-4 w-4" />
              Km totali sul contachilometri
            </Label>
            <Input
              id="totalKilometers"
              type="number"
              step="0.1"
              placeholder="es. 15250"
              value={formData.totalKilometers}
              onChange={(e) => handleInputChange('totalKilometers', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="costPerLiter" className="text-slate-700 font-medium">
              Prezzo al litro (€) - opzionale
            </Label>
            <Input
              id="costPerLiter"
              type="number"
              step="0.001"
              placeholder="es. 1.650"
              value={formData.costPerLiter}
              onChange={(e) => handleInputChange('costPerLiter', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-700 font-medium">
              Note - opzionale
            </Label>
            <Textarea
              id="notes"
              placeholder="es. Rifornimento sulla A1..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="border-slate-300 focus:border-blue-500 min-h-[60px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Aggiungi Rifornimento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FuelEntryForm;

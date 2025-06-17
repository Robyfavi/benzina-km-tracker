
import React from 'react';
import { Car } from 'lucide-react';
import { useFuelData } from '../hooks/useFuelData';
import FuelEntryForm from '../components/FuelEntryForm';
import FuelStats from '../components/FuelStats';
import FuelEntryList from '../components/FuelEntryList';

const Index = () => {
  const { entries, addEntry, deleteEntry, stats } = useFuelData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <Car className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Benzina Tracker</h1>
          </div>
          <p className="text-center text-blue-100 mt-2">
            Tieni traccia dei tuoi rifornimenti e consumi
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Statistics */}
        <FuelStats stats={stats} />

        {/* Add New Entry Form */}
        <section>
          <FuelEntryForm onAddEntry={addEntry} />
        </section>

        {/* Entries List */}
        <section>
          <FuelEntryList entries={entries} onDeleteEntry={deleteEntry} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Benzina Tracker - Gestisci i tuoi rifornimenti in modo smart
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

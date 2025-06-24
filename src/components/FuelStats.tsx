import React from 'react';
import { TrendingUp, Fuel } from 'lucide-react';

const FuelStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Statistiche
      </h2>
      <ul className="space-y-2">
        <li className="text-gray-700">
          Numero rifornimenti: <strong

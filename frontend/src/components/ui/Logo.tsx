// components/Logo.tsx
import React from 'react';
import { Zap } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
        <Zap className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white">FITIX</h1>
        <p className="text-green-500 text-xs font-medium">PERFORMANCE WEAR</p>
      </div>
    </div>
  );
};
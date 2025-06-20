// components/HeroSection.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, Target, Trophy } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-black items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-green-500/5 to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-green-500/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-green-500/20 transform rotate-45"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-white/20 transform rotate-12"></div>

      {/* Sport Icons */}
      <div className="absolute top-16 left-16">
        <Target className="w-8 h-8 text-green-500/50" />
      </div>
      <div className="absolute bottom-16 right-32">
        <Trophy className="w-8 h-8 text-green-500/50" />
      </div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-md px-8">
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
          Elevate Your <span className="text-green-500">Performance</span> with Premium Sports Gear
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Discover the latest collection of high-performance athletic wear designed for champions.
        </p>

        {/* Features */}
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Premium Quality Materials</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Professional Athlete Approved</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Free Shipping Worldwide</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        <button 
          type="button" 
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          type="button" 
          className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};
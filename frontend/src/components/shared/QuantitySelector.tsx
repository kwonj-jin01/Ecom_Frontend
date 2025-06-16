import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
  min?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  max = 99,
  min = 1,
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value > max) {
        onChange(max);
      } else if (value < min) {
        onChange(min);
      } else {
        onChange(value);
      }
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={`p-2 text-gray-500 hover:text-gray-700 focus:outline-none ${
          quantity <= min ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      
      <input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleChange}
        className="w-12 text-center border-0 focus:outline-none focus:ring-0 p-0 text-gray-900"
      />
      
      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={`p-2 text-gray-500 hover:text-gray-700 focus:outline-none ${
          quantity >= max ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;
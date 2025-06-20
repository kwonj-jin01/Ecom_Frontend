// components/InputField.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  required?: boolean;
  compact?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  compact = false
}) => {
  return (
    <div>
      <label className={`block text-gray-300 text-sm font-medium ${compact ? 'mb-1' : 'mb-2'}`}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-gray-900 border border-gray-700 rounded-lg ${
            Icon ? 'pl-10 pr-4' : 'px-4'
          } ${compact ? 'py-2.5' : 'py-3'} text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors`}
          required={required}
        />
      </div>
    </div>
  );
};
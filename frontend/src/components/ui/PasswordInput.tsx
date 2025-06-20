// components/PasswordInput.tsx
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggleVisibility: () => void;
  required?: boolean;
  compact?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  required = false,
  compact = false
}) => {
  return (
    <div>
      <label className={`block text-gray-300 text-sm font-medium ${compact ? 'mb-1' : 'mb-2'}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 ${
            compact ? 'py-2.5 pr-10' : 'py-3 pr-12'
          } text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors`}
          required={required}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className={`absolute ${
            compact ? 'right-3' : 'right-4'
          } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors`}
        >
          {showPassword ? (
            <EyeOff className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
          ) : (
            <Eye className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
          )}
        </button>
      </div>
    </div>
  );
};
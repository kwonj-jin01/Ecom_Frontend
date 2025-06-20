// components/CheckboxField.tsx
import React from 'react';

interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  alignTop?: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  checked,
  onChange,
  children,
  alignTop = false
}) => {
  return (
    <label className={`flex ${alignTop ? 'items-start' : 'items-center'} space-x-3`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`w-4 h-4 text-green-500 bg-gray-900 border-gray-700 rounded focus:ring-green-500 ${
          alignTop ? 'mt-0.5' : ''
        }`}
      />
      <span className="text-sm text-gray-400">
        {children}
      </span>
    </label>
  );
};
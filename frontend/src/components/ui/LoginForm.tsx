// components/LoginForm.tsx
import React from 'react';
import { InputField } from './InputField';
import { PasswordInput } from './PasswordInput';
import { CheckboxField } from './CheckboxField';
import { Button2 } from './Button2';
import type * as auth from '../../types/auth';

interface LoginFormProps {
  formData: auth.LoginFormData;
  showPassword: boolean;
  loading: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  showPassword,
  loading,
  onInputChange,
  onTogglePassword,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <InputField
        label="Email Address"
        type="email"
        placeholder="athlete@fitix.com"
        value={formData.email}
        onChange={(value) => onInputChange('email', value)}
        required
      />

      <PasswordInput
        label="Password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(value) => onInputChange('password', value)}
        showPassword={showPassword}
        onToggleVisibility={onTogglePassword}
        required
      />

      {/* Remember + Forgot */}
      <div className="flex justify-between items-center">
        <CheckboxField
          checked={false}
          onChange={() => {}}
        >
          Remember me
        </CheckboxField>
        <button 
          type="button" 
          className="text-green-500 text-sm hover:text-green-400 transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      <Button2
        type="submit"
        disabled={loading}
        loading={loading}
      >
        {loading ? 'SIGNING IN' : 'SIGN IN'}
      </Button2>
    </form>
  );
};
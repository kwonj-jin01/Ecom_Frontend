// components/RegisterForm.tsx
import React from 'react';
import { User, Mail, Phone, MapPin, Target } from 'lucide-react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { PasswordInput } from './PasswordInput';
import { CheckboxField } from './CheckboxField';
import { Button2 } from './Button2';
import { SPORT_TYPES, COUNTRIES } from '../../data/index';
import type { RegisterFormData } from '../../types/auth';

interface RegisterFormProps {
  formData: RegisterFormData;
  showPassword: boolean;
  loading: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  showPassword,
  loading,
  onInputChange,
  onTogglePassword,
  onSubmit
}) => {
  const countryOptions = COUNTRIES.map(country => ({
    value: country.code,
    label: country.name
  }));

  const sportOptions = SPORT_TYPES.map(sport => ({
    value: sport,
    label: sport
  }));

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          type="text"
          placeholder="John"
          value={formData.firstName}
          onChange={(value) => onInputChange('firstName', value)}
          icon={User}
          required
          compact
        />
        <InputField
          label="Last Name"
          type="text"
          placeholder="Athlete"
          value={formData.lastName}
          onChange={(value) => onInputChange('lastName', value)}
          icon={User}
          required
          compact
        />
      </div>

      {/* Email Field */}
      <InputField
        label="Email Address"
        type="email"
        placeholder="athlete@example.com"
        value={formData.email}
        onChange={(value) => onInputChange('email', value)}
        icon={Mail}
        required
        compact
      />

      {/* Phone & Country */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Phone"
          type="tel"
          placeholder="+1 234 567 890"
          value={formData.phone}
          onChange={(value) => onInputChange('phone', value)}
          icon={Phone}
          compact
        />
        <SelectField
          label="Country"
          value={formData.country}
          onChange={(value) => onInputChange('country', value)}
          options={countryOptions}
          placeholder="Select"
          icon={MapPin}
        />
      </div>

      {/* Sport Type */}
      <SelectField
        label="Primary Sport"
        value={formData.sportType}
        onChange={(value) => onInputChange('sportType', value)}
        options={sportOptions}
        placeholder="Select your sport"
        icon={Target}
      />

      {/* Password Field */}
      <PasswordInput
        label="Password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(value) => onInputChange('password', value)}
        showPassword={showPassword}
        onToggleVisibility={onTogglePassword}
        required
        compact
      />

      {/* Checkboxes */}
      <div className="space-y-3">
        <CheckboxField
          checked={formData.agreeTerms}
          onChange={(checked) => onInputChange('agreeTerms', checked)}
          alignTop
        >
          I agree to the{' '}
          <button 
            type="button" 
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            Terms of Service
          </button>
          {' '}and{' '}
          <button 
            type="button" 
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            Privacy Policy
          </button>
        </CheckboxField>
        <CheckboxField
          checked={formData.newsletter}
          onChange={(checked) => onInputChange('newsletter', checked)}
        >
          Subscribe to our newsletter for exclusive offers
        </CheckboxField>
      </div>

      {/* Register Button2 */}
      <Button2
        type="submit"
        disabled={loading}
        loading={loading}
        className="mt-6"
      >
        {loading ? 'CREATING ACCOUNT' : 'CREATE ACCOUNT'}
      </Button2>
    </form>
  );
};
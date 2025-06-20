// components/AuthToggle.tsx
import React from 'react';

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

export const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => {
  return (
    <p className="text-center text-gray-400 text-sm mt-8">
      {isLogin ? 'New to FITIX?' : 'Already have an account?'}{' '}
      <button
        type="button"
        onClick={onToggle}
        className="text-green-500 hover:text-green-400 transition-colors font-medium"
      >
        {isLogin ? 'Create Account' : 'Sign In'}
      </button>
    </p>
  );
};
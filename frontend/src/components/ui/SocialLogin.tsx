// components/SocialLogin.tsx
import React from 'react';
import { Button2 } from './Button2';

export const SocialLogin: React.FC = () => {
  return (
    <>
      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-gray-400">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button2
          type="button"
          variant="secondary"
          className="!py-2"
        >
          <span className="text-sm">Google</span>
        </Button2>
        <Button2
          type="button"
          variant="secondary"
          className="!py-2"
        >
          <span className="text-sm">Facebook</span>
        </Button2>
      </div>
    </>
  );
};
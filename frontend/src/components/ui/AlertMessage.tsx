// components/AlertMessage.tsx
import React from 'react';

interface AlertMessageProps {
  message: string;
  type?: 'error' | 'success'; // Par défaut 'error'
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type = 'error',
}) => {
  if (!message) return null;

  const baseStyle = 'px-4 py-3 rounded-lg mb-4';
  const styles = {
    error: 'bg-red-50 border border-red-200 text-red-700',
    success: 'bg-green-50 border border-green-200 text-green-700',
  };

  return <div className={`${baseStyle} ${styles[type]}`}>{message}</div>;
};

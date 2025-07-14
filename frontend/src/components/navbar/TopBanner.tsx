// components/TopBanner.tsx
import React from 'react';

interface TopBannerProps {
  message?: string;
  backgroundColor?: string;
  textColor?: string;
}

const TopBanner: React.FC<TopBannerProps> = ({ 
  message = "Livraison gratuite pour les commandes de plus de 45 000 XOF | Retours sous 30 jours",
  backgroundColor = "bg-black",
  textColor = "text-white"
}) => {
  return (
    <div className={`${backgroundColor} ${textColor} py-2 px-4 text-center`}>
      <p className="text-sm">
        {message}
      </p>
    </div>
  );
};

export default TopBanner;
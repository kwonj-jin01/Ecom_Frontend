// components/TopBanner.tsx
import React from 'react';

interface TopBannerProps {
  message?: string;
  backgroundColor?: string;
  textColor?: string;
}

const TopBanner: React.FC<TopBannerProps> = ({ 
  message = "Free shipping on orders over $75\u00A0|\u00A030‑day returns",
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
// src/components/ui/LoaderOrError.tsx

import React from "react";

type LoaderOrErrorProps = {
  loading: boolean;
  error: string | null;
  retry?: () => void;
};

const LoaderOrError: React.FC<LoaderOrErrorProps> = ({ loading, error, retry }) => {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p>Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={retry ?? (() => window.location.reload())}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default LoaderOrError;

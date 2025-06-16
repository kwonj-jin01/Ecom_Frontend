import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found - Chance Baaba';
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto">
          <div className="bg-red-50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-10 w-10 text-[#C0392B]" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full bg-[#1A5276] hover:bg-[#154360] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            
            <Link
              to="/products"
              className="block w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
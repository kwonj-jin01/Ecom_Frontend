// Composant Indicateur d'Étapes
export const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center mb-8">
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          currentStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          1
        </div>
        <span className={`ml-2 text-sm font-medium ${
          currentStep >= 1 ? 'text-emerald-600' : 'text-gray-500'
        }`}>
          Livraison
        </span>
      </div>
      <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          currentStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          2
        </div>
        <span className={`ml-2 text-sm font-medium ${
          currentStep >= 2 ? 'text-emerald-600' : 'text-gray-500'
        }`}>
          Paiement
        </span>
      </div>
      <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          currentStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          3
        </div>
        <span className={`ml-2 text-sm font-medium ${
          currentStep >= 3 ? 'text-emerald-600' : 'text-gray-500'
        }`}>
          Finaliser
        </span>
      </div>
    </div>
  </div>
);
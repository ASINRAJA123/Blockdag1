//  ProgressBar.jsx

import React from 'react';
import { Check } from 'lucide-react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Category' },
    { number: 2, title: 'Personal Info' },
    { number: 3, title: 'Specific Details' },
    { number: 4, title: 'Results' }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step.number < currentStep
                    ? 'bg-green-500 text-white animate-pulse'
                    : step.number === currentStep
                    ? 'bg-white text-blue-600 ring-4 ring-blue-200 animate-bounce'
                    : 'bg-white/30 text-white/70'
                }`}
              >
                {step.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-all duration-300 ${
                  step.number <= currentStep ? 'text-white' : 'text-white/60'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                  step.number < currentStep
                    ? 'bg-green-400 animate-pulse'
                    : 'bg-white/30'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Progress percentage */}
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-700 ease-out animate-pulse"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="text-center mt-2">
        <span className="text-white/80 text-sm font-medium">
          Step {currentStep} of {totalSteps} - {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
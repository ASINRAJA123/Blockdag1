// App.jsx

import React, { useState } from 'react';
import CategorySelection from './components/CategorySelection';
import CommonQuestions from './components/CommonQuestions';
import CategorySpecificQuestions from './components/CategorySpecificQuestions';
import PredictionResult from './components/PredictionResult';
import ProgressBar from './components/ProgressBar';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [commonData, setCommonData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep(2);
  };

  const handleCommonDataSubmit = (data) => {
    setCommonData(data);
    setCurrentStep(3);
  };

  const handleCategoryDataSubmit = async (data) => {
    setCategoryData(data);
    setIsLoading(true);

    try {
      let apiData = {};
      
      if (selectedCategory === 'medical') {
        apiData = {
          age: commonData.age,
          bmi: parseFloat(commonData.weight) / Math.pow(parseFloat(commonData.height) / 100, 2),
          children: commonData.maritalStatus === 'single' ? 0 : (commonData.numberOfChildren || 0),
          sex: commonData.gender,
          smoker: commonData.smokingStatus === 'current' ? 'yes' : 'no',
          region: data.region || 'northeast'
        };
      } else if (selectedCategory === 'agriculture') {
        apiData = {
          state_name: commonData.state,
          crop_name: data.cropType,
          cost_cultivation_a2fl: data.costCultivationA2FL || 0,
          cost_cultivation_c2: data.costCultivationC2 || 0,
          cost_production_c2: data.costProductionC2 || 0
        };
      } else if (selectedCategory === 'property') {
        apiData = {
          property_type: data.propertyType,
          property_age: data.propertyAge,
          location: commonData.state,
          security_features: data.securityFeatures
        };
      }

      const response = await fetch(`https://blockdag1.vercel.app//predict/${selectedCategory}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setPredictionResult(result.risk_level);
      } else {
        setPredictionResult('Error: ' + (result.error || 'Unknown error occurred'));
      }
      
      setCurrentStep(4);
    } catch (error) {
      console.error('Prediction error:', error);
      setPredictionResult('Error: Unable to connect to prediction service');
      setCurrentStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedCategory(null);
    setCommonData({});
    setCategoryData({});
    setPredictionResult(null);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Select Insurance Category';
      case 2: return 'Personal Information';
      case 3: return `${selectedCategory?.charAt(0).toUpperCase() + selectedCategory?.slice(1)} Insurance Details`;
      case 4: return 'Risk Assessment Result';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse-slow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
              Insurance Risk Predictor
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get personalized insurance risk assessment powered by advanced AI algorithms
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30 animate-slide-up hover:shadow-3xl transition-all duration-500">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-shimmer"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-semibold mb-4 animate-slide-in-left">{getStepTitle()}</h2>
                <ProgressBar currentStep={currentStep} totalSteps={4} />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full animate-bounce-slow"></div>
            </div>

            <div className="p-8 lg:p-12">
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <CategorySelection onCategorySelect={handleCategorySelect} />
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-slide-in-right">
                  <CommonQuestions 
                    onSubmit={handleCommonDataSubmit}
                    onBack={() => setCurrentStep(1)}
                  />
                </div>
              )}

              {currentStep === 3 && selectedCategory && (
                <div className="animate-slide-in-right">
                  <CategorySpecificQuestions
                    category={selectedCategory}
                    onSubmit={handleCategoryDataSubmit}
                    onBack={() => setCurrentStep(2)}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="animate-fade-in">
                  <PredictionResult
                    result={predictionResult}
                    category={selectedCategory}
                    onRestart={handleRestart}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default App;

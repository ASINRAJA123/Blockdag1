//  PredictionResult.jsx

import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Shield, TrendingUp, FileText, Phone } from 'lucide-react';

const PredictionResult = ({ result, category, onRestart }) => {
  const getRiskLevel = () => {
    if (result?.includes('Low Risk')) return 'low';
    if (result?.includes('Medium Risk')) return 'medium';
    if (result?.includes('High Risk')) return 'high';
    return 'error';
  };

  const riskLevel = getRiskLevel();

  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'low':
        return {
          icon: CheckCircle,
          color: 'green',
          bgColor: 'from-green-50 to-emerald-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600',
          title: 'Low Risk Assessment',
          description: 'Excellent! You qualify for our best rates and comprehensive coverage.',
          recommendations: [
            'You are eligible for premium insurance plans',
            'Enjoy lower premium rates due to low risk profile',
            'Consider additional coverage options for enhanced protection',
            'Regular health check-ups recommended to maintain low risk status'
          ]
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          color: 'yellow',
          bgColor: 'from-yellow-50 to-orange-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
          title: 'Medium Risk Assessment',
          description: 'You qualify for standard coverage with moderate premium rates.',
          recommendations: [
            'Standard insurance plans available with competitive rates',
            'Consider lifestyle improvements to reduce risk factors',
            'Regular monitoring and preventive measures recommended',
            'Explore additional coverage options for better protection'
          ]
        };
      case 'high':
        return {
          icon: XCircle,
          color: 'red',
          bgColor: 'from-red-50 to-pink-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          title: 'High Risk Assessment',
          description: 'Higher premium rates apply due to elevated risk factors.',
          recommendations: [
            'Specialized insurance plans available with higher premiums',
            'Immediate action recommended to address risk factors',
            'Consult with our specialists for personalized solutions',
            'Consider risk mitigation strategies to improve your profile'
          ]
        };
      default:
        return {
          icon: XCircle,
          color: 'gray',
          bgColor: 'from-gray-50 to-slate-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-600',
          title: 'Assessment Error',
          description: 'Unable to complete risk assessment. Please try again.',
          recommendations: [
            'Please check your internet connection',
            'Verify all information provided is accurate',
            'Contact our support team if the issue persists',
            'Try restarting the assessment process'
          ]
        };
    }
  };

  const config = getRiskConfig();
  const IconComponent = config.icon;

  const getCategorySpecificInfo = () => {
    switch (category) {
      case 'medical':
        return {
          nextSteps: [
            'Schedule a medical examination',
            'Gather medical history documents',
            'Review available health insurance plans',
            'Consult with our health insurance specialists'
          ],
          coverage: [
            'Hospitalization expenses',
            'Outpatient treatments',
            'Prescription medications',
            'Preventive care services',
            'Emergency medical services'
          ]
        };
      case 'property':
        return {
          nextSteps: [
            'Property inspection scheduling',
            'Gather property documents',
            'Review home insurance options',
            'Consult with property insurance experts'
          ],
          coverage: [
            'Property damage protection',
            'Personal belongings coverage',
            'Liability protection',
            'Additional living expenses',
            'Natural disaster coverage'
          ]
        };
      case 'agriculture':
        return {
          nextSteps: [
            'Farm inspection arrangement',
            'Crop documentation review',
            'Explore crop insurance plans',
            'Consult with agricultural insurance specialists'
          ],
          coverage: [
            'Crop loss protection',
            'Weather-related damages',
            'Pest and disease coverage',
            'Equipment protection',
            'Income loss compensation'
          ]
        };
      default:
        return {
          nextSteps: ['Contact our support team'],
          coverage: ['Basic coverage information']
        };
    }
  };

  const categoryInfo = getCategorySpecificInfo();

  return (
    <div className="space-y-8">
      {/* Main Result Card */}
      <div className={`bg-gradient-to-r ${config.bgColor} rounded-3xl p-8 border-2 ${config.borderColor} shadow-xl animate-fade-in`}>
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg animate-bounce-slow`}>
            <IconComponent className={`w-10 h-10 ${config.iconColor}`} />
          </div>
          <h2 className={`text-3xl font-bold ${config.textColor} mb-4`}>
            {config.title}
          </h2>
          <p className={`text-lg ${config.textColor} opacity-80 max-w-2xl mx-auto`}>
            {config.description}
          </p>
        </div>

        {/* Risk Level Indicator */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center space-x-4">
              <Shield className={`w-8 h-8 ${config.iconColor}`} />
              <div>
                <p className="text-sm text-gray-600 font-medium">Risk Level</p>
                <p className={`text-2xl font-bold ${config.textColor}`}>
                  {result || 'Assessment Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/70 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className={`text-xl font-semibold ${config.textColor} mb-4 flex items-center`}>
            <TrendingUp className={`w-6 h-6 mr-2 ${config.iconColor}`} />
            Recommendations
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {config.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-2 h-2 bg-${config.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                <p className="text-gray-700 text-sm leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Information */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            Coverage Includes
          </h3>
          <div className="space-y-3">
            {categoryInfo.coverage.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-6 h-6 mr-2 text-green-600" />
            Next Steps
          </h3>
          <div className="space-y-3">
            {categoryInfo.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Our insurance specialists are ready to help you find the perfect coverage for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Contact Specialist
          </button>
          <button className="px-8 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 border-2 border-blue-400">
            Get Quote
          </button>
        </div>
      </div>

      {/* Restart Button */}
      <div className="text-center pt-8">
        <button
          onClick={onRestart}
          className="flex items-center px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Start New Assessment
        </button>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default PredictionResult;
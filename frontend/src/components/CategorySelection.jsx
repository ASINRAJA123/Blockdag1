// CategorySelection.jsx

import React from 'react';
import { Heart, Home, Wheat, Sparkles, Shield, TrendingUp } from 'lucide-react';

const CategorySelection = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'medical',
      title: 'Medical Insurance',
      description: 'Comprehensive health coverage for medical expenses, treatments, and healthcare services',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      hoverColor: 'hover:from-red-600 hover:to-pink-600',
      features: ['Health assessments', 'Medical history evaluation', 'Lifestyle factors', 'Chronic conditions'],
      bgPattern: 'bg-red-50',
      accentColor: 'red'
    },
    {
      id: 'property',
      title: 'Property Insurance',
      description: 'Complete protection for your home, belongings, and real estate investments',
      icon: Home,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
      features: ['Property valuation', 'Location risk factors', 'Security measures', 'Natural disaster coverage'],
      bgPattern: 'bg-blue-50',
      accentColor: 'blue'
    },
    {
      id: 'agriculture',
      title: 'Agriculture Insurance',
      description: 'Advanced crop and livestock protection against weather, pests, and market risks',
      icon: Wheat,
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600',
      features: ['Crop types', 'Weather patterns', 'Soil conditions', 'Farming experience'],
      bgPattern: 'bg-green-50',
      accentColor: 'green'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 animate-pulse shadow-lg">
          <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
        </div>
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Choose the type of insurance you want to assess and get personalized risk analysis
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2 text-blue-500" />
            AI-Powered Analysis
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
            Real-time Assessment
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`group cursor-pointer bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${category.bgPattern} hover:bg-white animate-fade-in hover:scale-105`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${category.color} ${category.hoverColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                  <IconComponent className="w-10 h-10 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {category.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {category.description}
              </p>
              
              <div className="space-y-3 mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">Assessment includes:</p>
                {category.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    <div className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mr-3 group-hover:scale-125 transition-transform duration-300 animate-pulse`}></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${category.color} text-white rounded-xl font-semibold group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-${category.accentColor}-500/25`}>
                  Select Category
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-bounce-slow"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelection;
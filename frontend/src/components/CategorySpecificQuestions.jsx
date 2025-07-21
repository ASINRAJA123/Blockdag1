// CategorySpecificQuestions.jsx

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Home, Wheat, Loader } from 'lucide-react';

const CategorySpecificQuestions = ({ category, onSubmit, onBack, isLoading }) => {
  const [formData, setFormData] = useState({
    // Medical specific
    region: '',
    familyMedicalHistory: '',
    currentMedications: '',
    allergies: '',
    exerciseFrequency: '',
    dietType: '',
    stressLevel: '',
    sleepHours: '',
    previousSurgeries: '',
    chronicConditions: '',
    
    // Property specific
    propertyType: '',
    propertyAge: '',
    propertyValue: '',
    securityFeatures: '',
    locationRisk: '',
    constructionMaterial: '',
    roofType: '',
    floodZone: '',
    crimeRate: '',
    fireStation: '',
    
    // Agriculture specific
    cropType: '',
    farmSize: '',
    irrigationType: '',
    soilType: '',
    farmingExperience: '',
    previousCropLoss: '',
    weatherPatterns: '',
    pestControl: '',
    storageCapacity: '',
    marketAccess: '',
    costCultivationA2FL: '',
    costCultivationC2: '',
    costProductionC2: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (category === 'medical') {
      if (!formData.region) newErrors.region = 'Region is required';
      if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise frequency is required';
      if (!formData.dietType) newErrors.dietType = 'Diet type is required';
      if (!formData.stressLevel) newErrors.stressLevel = 'Stress level is required';
      if (!formData.sleepHours) newErrors.sleepHours = 'Sleep hours is required';
    } else if (category === 'property') {
      if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
      if (!formData.propertyAge) newErrors.propertyAge = 'Property age is required';
      if (!formData.propertyValue) newErrors.propertyValue = 'Property value is required';
      if (!formData.securityFeatures) newErrors.securityFeatures = 'Security features is required';
      if (!formData.constructionMaterial) newErrors.constructionMaterial = 'Construction material is required';
    } else if (category === 'agriculture') {
      if (!formData.cropType) newErrors.cropType = 'Crop type is required';
      if (!formData.farmSize) newErrors.farmSize = 'Farm size is required';
      if (!formData.irrigationType) newErrors.irrigationType = 'Irrigation type is required';
      if (!formData.soilType) newErrors.soilType = 'Soil type is required';
      if (!formData.farmingExperience) newErrors.farmingExperience = 'Farming experience is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getIcon = () => {
    switch (category) {
      case 'medical': return Heart;
      case 'property': return Home;
      case 'agriculture': return Wheat;
      default: return Heart;
    }
  };

  const getColor = () => {
    switch (category) {
      case 'medical': return 'red';
      case 'property': return 'blue';
      case 'agriculture': return 'green';
      default: return 'blue';
    }
  };

  const IconComponent = getIcon();
  const color = getColor();

  const renderMedicalQuestions = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical History & Lifestyle</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Region *</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.region ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
            >
              <option value="">Select region</option>
              <option value="northeast">Northeast</option>
              <option value="northwest">Northwest</option>
              <option value="southeast">Southeast</option>
              <option value="southwest">Southwest</option>
            </select>
            {errors.region && <p className="text-red-500 text-sm animate-shake">{errors.region}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Exercise Frequency *</label>
            <select
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.exerciseFrequency ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
            >
              <option value="">Select frequency</option>
              <option value="never">Never</option>
              <option value="rarely">Rarely (1-2 times/month)</option>
              <option value="sometimes">Sometimes (1-2 times/week)</option>
              <option value="regularly">Regularly (3-4 times/week)</option>
              <option value="daily">Daily</option>
            </select>
            {errors.exerciseFrequency && <p className="text-red-500 text-sm animate-shake">{errors.exerciseFrequency}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Diet Type *</label>
            <select
              name="dietType"
              value={formData.dietType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.dietType ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
            >
              <option value="">Select diet type</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non-vegetarian">Non-vegetarian</option>
              <option value="balanced">Balanced</option>
              <option value="junk">Mostly junk food</option>
            </select>
            {errors.dietType && <p className="text-red-500 text-sm animate-shake">{errors.dietType}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Stress Level *</label>
            <select
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.stressLevel ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
            >
              <option value="">Select stress level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="very-high">Very High</option>
            </select>
            {errors.stressLevel && <p className="text-red-500 text-sm animate-shake">{errors.stressLevel}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Sleep Hours per Night *</label>
            <select
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.sleepHours ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
            >
              <option value="">Select sleep hours</option>
              <option value="less-than-5">Less than 5 hours</option>
              <option value="5-6">5-6 hours</option>
              <option value="7-8">7-8 hours</option>
              <option value="more-than-8">More than 8 hours</option>
            </select>
            {errors.sleepHours && <p className="text-red-500 text-sm animate-shake">{errors.sleepHours}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Family Medical History</label>
            <textarea
              name="familyMedicalHistory"
              value={formData.familyMedicalHistory}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400"
              placeholder="Any family history of diseases..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Current Medications</label>
            <textarea
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400"
              placeholder="List any current medications..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400"
              placeholder="List any known allergies..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Previous Surgeries</label>
            <textarea
              name="previousSurgeries"
              value={formData.previousSurgeries}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400"
              placeholder="List any previous surgeries..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Chronic Conditions</label>
            <textarea
              name="chronicConditions"
              value={formData.chronicConditions}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400"
              placeholder="List any chronic conditions..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPropertyQuestions = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Property Type *</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.propertyType ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
            >
              <option value="">Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
            {errors.propertyType && <p className="text-red-500 text-sm animate-shake">{errors.propertyType}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Property Age (years) *</label>
            <input
              type="number"
              name="propertyAge"
              value={formData.propertyAge}
              onChange={handleInputChange}
              min="0"
              max="100"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.propertyAge ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
              placeholder="Enter property age"
            />
            {errors.propertyAge && <p className="text-red-500 text-sm animate-shake">{errors.propertyAge}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Property Value *</label>
            <input
              type="number"
              name="propertyValue"
              value={formData.propertyValue}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.propertyValue ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
              placeholder="Enter property value"
            />
            {errors.propertyValue && <p className="text-red-500 text-sm animate-shake">{errors.propertyValue}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Security Features *</label>
            <select
              name="securityFeatures"
              value={formData.securityFeatures}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.securityFeatures ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
            >
              <option value="">Select security level</option>
              <option value="basic">Basic (locks only)</option>
              <option value="standard">Standard (alarm system)</option>
              <option value="advanced">Advanced (CCTV + alarm)</option>
              <option value="premium">Premium (full security system)</option>
            </select>
            {errors.securityFeatures && <p className="text-red-500 text-sm animate-shake">{errors.securityFeatures}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Construction Material *</label>
            <select
              name="constructionMaterial"
              value={formData.constructionMaterial}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.constructionMaterial ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
            >
              <option value="">Select material</option>
              <option value="concrete">Concrete</option>
              <option value="brick">Brick</option>
              <option value="wood">Wood</option>
              <option value="steel">Steel</option>
              <option value="mixed">Mixed materials</option>
            </select>
            {errors.constructionMaterial && <p className="text-red-500 text-sm animate-shake">{errors.constructionMaterial}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Roof Type</label>
            <select
              name="roofType"
              value={formData.roofType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
            >
              <option value="">Select roof type</option>
              <option value="concrete">Concrete</option>
              <option value="tile">Tile</option>
              <option value="metal">Metal</option>
              <option value="asphalt">Asphalt</option>
              <option value="thatch">Thatch</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location Risk Level</label>
            <select
              name="locationRisk"
              value={formData.locationRisk}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
            >
              <option value="">Select risk level</option>
              <option value="low">Low risk area</option>
              <option value="moderate">Moderate risk area</option>
              <option value="high">High risk area</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Flood Zone</label>
            <select
              name="floodZone"
              value={formData.floodZone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
            >
              <option value="">Select flood zone</option>
              <option value="no">Not in flood zone</option>
              <option value="low">Low flood risk</option>
              <option value="moderate">Moderate flood risk</option>
              <option value="high">High flood risk</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Crime Rate in Area</label>
            <select
              name="crimeRate"
              value={formData.crimeRate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
            >
              <option value="">Select crime rate</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Distance to Fire Station</label>
            <select
              name="fireStation"
              value={formData.fireStation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
            >
              <option value="">Select distance</option>
              <option value="very-close">Less than 2 km</option>
              <option value="close">2-5 km</option>
              <option value="moderate">5-10 km</option>
              <option value="far">More than 10 km</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgricultureQuestions = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Farm & Crop Details</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Crop Type *</label>
            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${errors.cropType ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'}`}
            >
              <option value="">Select crop type</option>
              <option value="RICE">Rice</option>
              <option value="WHEAT">Wheat</option>
              <option value="COTTON">Cotton</option>
              <option value="SUGARCANE">Sugarcane</option>
              <option value="MAIZE">Maize</option>
              <option value="SOYBEAN">Soybean</option>
              <option value="GROUNDNUT">Groundnut</option>
              <option value="PULSES">Pulses</option>
            </select>
            {errors.cropType && <p className="text-red-500 text-sm animate-shake">{errors.cropType}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Farm Size (hectares) *</label>
            <input
              type="number"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleInputChange}
              min="0.1"
              step="0.1"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${errors.farmSize ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'}`}
              placeholder="Enter farm size"
            />
            {errors.farmSize && <p className="text-red-500 text-sm animate-shake">{errors.farmSize}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Irrigation Type *</label>
            <select
              name="irrigationType"
              value={formData.irrigationType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${errors.irrigationType ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'}`}
            >
              <option value="">Select irrigation type</option>
              <option value="drip">Drip irrigation</option>
              <option value="sprinkler">Sprinkler irrigation</option>
              <option value="flood">Flood irrigation</option>
              <option value="rainfed">Rain-fed</option>
              <option value="mixed">Mixed methods</option>
            </select>
            {errors.irrigationType && <p className="text-red-500 text-sm animate-shake">{errors.irrigationType}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Soil Type *</label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${errors.soilType ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'}`}
            >
              <option value="">Select soil type</option>
              <option value="clay">Clay</option>
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
              <option value="silt">Silt</option>
              <option value="mixed">Mixed</option>
            </select>
            {errors.soilType && <p className="text-red-500 text-sm animate-shake">{errors.soilType}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Farming Experience (years) *</label>
            <input
              type="number"
              name="farmingExperience"
              value={formData.farmingExperience}
              onChange={handleInputChange}
              min="0"
              max="50"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${errors.farmingExperience ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'}`}
              placeholder="Enter years of experience"
            />
            {errors.farmingExperience && <p className="text-red-500 text-sm animate-shake">{errors.farmingExperience}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cost of Cultivation A2+FL (₹/Hectare)</label>
            <input
              type="number"
              name="costCultivationA2FL"
              value={formData.costCultivationA2FL}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
              placeholder="Enter A2+FL cost"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cost of Cultivation C2 (₹/Hectare)</label>
            <input
              type="number"
              name="costCultivationC2"
              value={formData.costCultivationC2}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
              placeholder="Enter C2 cost"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cost of Production C2 (₹/Quintal)</label>
            <input
              type="number"
              name="costProductionC2"
              value={formData.costProductionC2}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
              placeholder="Enter production cost"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Previous Crop Loss Experience</label>
            <select
              name="previousCropLoss"
              value={formData.previousCropLoss}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select experience</option>
              <option value="never">Never experienced loss</option>
              <option value="minor">Minor losses (less than 25%)</option>
              <option value="moderate">Moderate losses (25-50%)</option>
              <option value="major">Major losses (more than 50%)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Weather Pattern Knowledge</label>
            <select
              name="weatherPatterns"
              value={formData.weatherPatterns}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select knowledge level</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Pest Control Methods</label>
            <select
              name="pestControl"
              value={formData.pestControl}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select method</option>
              <option value="organic">Organic methods</option>
              <option value="chemical">Chemical pesticides</option>
              <option value="integrated">Integrated pest management</option>
              <option value="biological">Biological control</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Storage Capacity</label>
            <select
              name="storageCapacity"
              value={formData.storageCapacity}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select capacity</option>
              <option value="excellent">Excellent (modern facilities)</option>
              <option value="good">Good (adequate storage)</option>
              <option value="average">Average (basic storage)</option>
              <option value="poor">Poor (limited storage)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Market Access</label>
            <select
              name="marketAccess"
              value={formData.marketAccess}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select access level</option>
              <option value="excellent">Excellent (direct market access)</option>
              <option value="good">Good (nearby markets)</option>
              <option value="average">Average (moderate distance)</option>
              <option value="poor">Poor (remote location)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full mb-4 animate-pulse shadow-lg`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {category.charAt(0).toUpperCase() + category.slice(1)} Insurance Details
        </h3>
        <p className="text-gray-600">Please provide specific information for accurate risk assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {category === 'medical' && renderMedicalQuestions()}
        {category === 'property' && renderPropertyQuestions()}
        {category === 'agriculture' && renderAgricultureQuestions()}

        <div className="flex justify-between pt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center px-8 py-3 bg-gradient-to-r from-${color}-600 to-${color}-700 text-white rounded-xl hover:from-${color}-700 hover:to-${color}-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Get Risk Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CategorySpecificQuestions;
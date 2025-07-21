// CommonQuestions.jsx

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, User, MapPin, Phone, Heart, Users, DollarSign } from 'lucide-react';
import { countries } from '../data/countries';
import { indianStates } from '../data/indianStates';

const CommonQuestions = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    maritalStatus: '',
    numberOfChildren: '',
    childrenAges: '',
    hasSiblings: '',
    numberOfSiblings: '',
    siblingsAges: '',
    monthlyIncome: '',
    yearlyIncome: '',
    phoneNumber: '',
    country: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
    height: '',
    weight: '',
    smokingStatus: '',
    drinkingStatus: '',
    hasHealthIssues: '',
    healthIssuesDetails: '',
    parentsAlive: '',
    parentsHealthCondition: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: ''
  });

  const [errors, setErrors] = useState({});
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const country = countries.find(c => c.name.toLowerCase() === formData.country.toLowerCase());
    setSelectedCountry(country);
  }, [formData.country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Handle state filtering for India
    if (name === 'state' && formData.country.toLowerCase() === 'india') {
      const filtered = indianStates.filter(state => 
        state.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStates(filtered);
      setShowStateDropdown(value.length > 0);
      
      // Reset district when state changes
      setFormData(prev => ({ ...prev, district: '' }));
      setFilteredDistricts([]);
    }

    // Handle district filtering
    if (name === 'district' && formData.state) {
      const selectedState = indianStates.find(state => 
        state.name.toLowerCase() === formData.state.toLowerCase()
      );
      if (selectedState) {
        const filtered = selectedState.districts.filter(district =>
          district.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDistricts(filtered);
        setShowDistrictDropdown(value.length > 0);
      }
    }
  };

  const handleStateSelect = (stateName) => {
    setFormData(prev => ({ ...prev, state: stateName, district: '' }));
    setShowStateDropdown(false);
    setFilteredDistricts([]);
  };

  const handleDistrictSelect = (districtName) => {
    setFormData(prev => ({ ...prev, district: districtName }));
    setShowDistrictDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
    if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
    if (!formData.yearlyIncome) newErrors.yearlyIncome = 'Yearly income is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.height) newErrors.height = 'Height is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    if (!formData.smokingStatus) newErrors.smokingStatus = 'Smoking status is required';
    if (!formData.drinkingStatus) newErrors.drinkingStatus = 'Drinking status is required';

    // Age validation
    const age = parseInt(formData.age);
    if (age < 18) {
      newErrors.age = 'You must be at least 18 years old to apply for insurance';
    }

    // Income validation
    const monthlyIncome = parseFloat(formData.monthlyIncome);
    const yearlyIncome = parseFloat(formData.yearlyIncome);
    if (monthlyIncome * 12 > yearlyIncome) {
      newErrors.yearlyIncome = 'Yearly income cannot be less than monthly income × 12';
    }

    // Conditional validations
    if (formData.maritalStatus === 'married') {
      if (!formData.numberOfChildren) newErrors.numberOfChildren = 'Number of children is required for married individuals';
      if (parseInt(formData.numberOfChildren) > 0 && !formData.childrenAges.trim()) {
        newErrors.childrenAges = 'Children ages are required';
      }
    }

    if (formData.hasSiblings === 'yes') {
      if (!formData.numberOfSiblings) newErrors.numberOfSiblings = 'Number of siblings is required';
      if (!formData.siblingsAges.trim()) newErrors.siblingsAges = 'Siblings ages are required';
    }

    if (formData.country.toLowerCase() === 'india') {
      if (!formData.state.trim()) newErrors.state = 'State is required for India';
      if (!formData.district.trim()) newErrors.district = 'District is required for India';
      if (!formData.city.trim()) newErrors.city = 'City is required for India';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required for India';
    }

    if (formData.hasHealthIssues === 'yes' && !formData.healthIssuesDetails.trim()) {
      newErrors.healthIssuesDetails = 'Please specify your health issues';
    }

    if (formData.parentsAlive === 'yes' && !formData.parentsHealthCondition.trim()) {
      newErrors.parentsHealthCondition = 'Parents health condition is required';
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

  const formatPhoneNumber = (phone) => {
    if (selectedCountry) {
      return `${selectedCountry.phoneCode} ${phone}`;
    }
    return phone;
  };

  const formatCurrency = (amount) => {
    if (selectedCountry) {
      return `${selectedCountry.currency} ${amount}`;
    }
    return amount;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4 animate-pulse">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-600">Please provide your personal details for accurate risk assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Basic Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-red-500 text-sm animate-shake">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm animate-shake">{errors.lastName}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="100"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500 text-sm animate-shake">{errors.age}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm animate-shake">{errors.gender}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Marital Status *</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.maritalStatus ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
              >
                <option value="">Select marital status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
              {errors.maritalStatus && <p className="text-red-500 text-sm animate-shake">{errors.maritalStatus}</p>}
            </div>

            {formData.maritalStatus === 'married' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Number of Children *</label>
                  <input
                    type="number"
                    name="numberOfChildren"
                    value={formData.numberOfChildren}
                    onChange={handleInputChange}
                    min="0"
                    max="10"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.numberOfChildren ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
                    placeholder="Enter number of children"
                  />
                  {errors.numberOfChildren && <p className="text-red-500 text-sm animate-shake">{errors.numberOfChildren}</p>}
                </div>

                {parseInt(formData.numberOfChildren) > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Children Ages *</label>
                    <input
                      type="text"
                      name="childrenAges"
                      value={formData.childrenAges}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.childrenAges ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
                      placeholder="e.g., 5, 8, 12"
                    />
                    {errors.childrenAges && <p className="text-red-500 text-sm animate-shake">{errors.childrenAges}</p>}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Family Information Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-600" />
            Family Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Do you have siblings? *</label>
              <select
                name="hasSiblings"
                value={formData.hasSiblings}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {formData.hasSiblings === 'yes' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Number of Siblings *</label>
                  <input
                    type="number"
                    name="numberOfSiblings"
                    value={formData.numberOfSiblings}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${errors.numberOfSiblings ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'}`}
                    placeholder="Enter number of siblings"
                  />
                  {errors.numberOfSiblings && <p className="text-red-500 text-sm animate-shake">{errors.numberOfSiblings}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Siblings Ages *</label>
                  <input
                    type="text"
                    name="siblingsAges"
                    value={formData.siblingsAges}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${errors.siblingsAges ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'}`}
                    placeholder="e.g., 25, 28, 32"
                  />
                  {errors.siblingsAges && <p className="text-red-500 text-sm animate-shake">{errors.siblingsAges}</p>}
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Are your parents alive? *</label>
              <select
                name="parentsAlive"
                value={formData.parentsAlive}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="partially">One parent</option>
              </select>
            </div>

            {formData.parentsAlive === 'yes' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Parents Health Condition *</label>
                <textarea
                  name="parentsHealthCondition"
                  value={formData.parentsHealthCondition}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${errors.parentsHealthCondition ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-400'}`}
                  placeholder="Describe your parents' health condition"
                />
                {errors.parentsHealthCondition && <p className="text-red-500 text-sm animate-shake">{errors.parentsHealthCondition}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Financial Information Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
            Financial Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Income * {selectedCountry && `(${selectedCountry.currency})`}</label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${errors.monthlyIncome ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-yellow-400'}`}
                placeholder="Enter monthly income"
              />
              {errors.monthlyIncome && <p className="text-red-500 text-sm animate-shake">{errors.monthlyIncome}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Yearly Income * {selectedCountry && `(${selectedCountry.currency})`}</label>
              <input
                type="number"
                name="yearlyIncome"
                value={formData.yearlyIncome}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${errors.yearlyIncome ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-yellow-400'}`}
                placeholder="Enter yearly income"
              />
              {errors.yearlyIncome && <p className="text-red-500 text-sm animate-shake">{errors.yearlyIncome}</p>}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-purple-600" />
            Contact Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.country ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400'}`}
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country.code} value={country.name}>{country.name}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm animate-shake">{errors.country}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number * {selectedCountry && `(${selectedCountry.phoneCode})`}</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400'}`}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm animate-shake">{errors.phoneNumber}</p>}
            </div>

            {formData.country.toLowerCase() === 'india' && (
              <>
                <div className="space-y-2 relative">
                  <label className="block text-sm font-medium text-gray-700">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400'}`}
                    placeholder="Type to search states..."
                  />
                  {showStateDropdown && filteredStates.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-60 overflow-y-auto shadow-lg">
                      {filteredStates.map(state => (
                        <div
                          key={state.name}
                          onClick={() => handleStateSelect(state.name)}
                          className="px-4 py-2 hover:bg-purple-50 cursor-pointer transition-colors duration-200"
                        >
                          {state.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.state && <p className="text-red-500 text-sm animate-shake">{errors.state}</p>}
                </div>

                <div className="space-y-2 relative">
                  <label className="block text-sm font-medium text-gray-700">District *</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.district ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400'}`}
                    placeholder="Type to search districts..."
                    disabled={!formData.state}
                  />
                  {showDistrictDropdown && filteredDistricts.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-60 overflow-y-auto shadow-lg">
                      {filteredDistricts.map(district => (
                        <div
                          key={district}
                          onClick={() => handleDistrictSelect(district)}
                          className="px-4 py-2 hover:bg-purple-50 cursor-pointer transition-colors duration-200"
                        >
                          {district}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.district && <p className="text-red-500 text-sm animate-shake">{errors.district}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400'}`}
                    placeholder="Enter city name"
                  />
                  {errors.city && <p className="text-red-500 text-sm animate-shake">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    pattern="[0-9]{6}"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.pincode ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400'}`}
                    placeholder="Enter 6-digit pincode"
                  />
                  {errors.pincode && <p className="text-red-500 text-sm animate-shake">{errors.pincode}</p>}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Health Information Section */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-600" />
            Health Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Height (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                min="100"
                max="250"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.height ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
                placeholder="Enter height in cm"
              />
              {errors.height && <p className="text-red-500 text-sm animate-shake">{errors.height}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Weight (kg) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                min="30"
                max="200"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.weight ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
                placeholder="Enter weight in kg"
              />
              {errors.weight && <p className="text-red-500 text-sm animate-shake">{errors.weight}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Smoking Status *</label>
              <select
                name="smokingStatus"
                value={formData.smokingStatus}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.smokingStatus ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
              >
                <option value="">Select smoking status</option>
                <option value="never">Never smoked</option>
                <option value="former">Former smoker</option>
                <option value="current">Current smoker</option>
              </select>
              {errors.smokingStatus && <p className="text-red-500 text-sm animate-shake">{errors.smokingStatus}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Drinking Status *</label>
              <select
                name="drinkingStatus"
                value={formData.drinkingStatus}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.drinkingStatus ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
              >
                <option value="">Select drinking status</option>
                <option value="never">Never drink</option>
                <option value="occasional">Occasional drinker</option>
                <option value="regular">Regular drinker</option>
                <option value="heavy">Heavy drinker</option>
              </select>
              {errors.drinkingStatus && <p className="text-red-500 text-sm animate-shake">{errors.drinkingStatus}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Do you have any health issues? *</label>
              <select
                name="hasHealthIssues"
                value={formData.hasHealthIssues}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {formData.hasHealthIssues === 'yes' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Health Issues Details *</label>
                <textarea
                  name="healthIssuesDetails"
                  value={formData.healthIssuesDetails}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.healthIssuesDetails ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
                  placeholder="Please describe your health issues"
                />
                {errors.healthIssuesDetails && <p className="text-red-500 text-sm animate-shake">{errors.healthIssuesDetails}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-indigo-600" />
            Emergency Contact
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400"
                placeholder="Enter contact name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400"
                placeholder="Enter contact phone"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Relationship</label>
              <select
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400"
              >
                <option value="">Select relationship</option>
                <option value="spouse">Spouse</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="child">Child</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <button
            type="submit"
            className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
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

export default CommonQuestions;
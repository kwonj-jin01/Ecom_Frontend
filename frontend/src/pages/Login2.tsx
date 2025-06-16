import React, { useState } from 'react';
import { Eye, EyeOff, ChevronLeft, ChevronRight, Zap, Target, Trophy, User, Mail, Phone, MapPin } from 'lucide-react';

const SportsRegisterInterface = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    sportType: '',
    agreeTerms: false,
    newsletter: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sportTypes = [
    'Running', 'Football', 'Basketball', 'Tennis', 'Gym/Fitness', 
    'Swimming', 'Cycling', 'Yoga', 'Boxing', 'Other'
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Register Form */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SPORTIFY</h1>
                <p className="text-green-500 text-xs font-medium">PERFORMANCE WEAR</p>
              </div>
            </div>
          </div>

          {/* Register Form */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Join the Team</h2>
            <p className="text-gray-400 mb-6">Create your account and start your athletic journey</p>
            
            <form className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Athlete"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="athlete@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sport Type */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Primary Sport
                </label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={formData.sportType}
                    onChange={(e) => handleInputChange('sportType', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select your sport</option>
                    {sportTypes.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Password Fields */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="w-4 h-4 text-green-500 bg-gray-900 border-gray-700 rounded focus:ring-green-500 mt-0.5" 
                  />
                  <span className="text-sm text-gray-400">
                    I agree to the{' '}
                    <button className="text-green-500 hover:text-green-400 transition-colors">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button className="text-green-500 hover:text-green-400 transition-colors">
                      Privacy Policy
                    </button>
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="w-4 h-4 text-green-500 bg-gray-900 border-gray-700 rounded focus:ring-green-500" 
                  />
                  <span className="text-sm text-gray-400">
                    Subscribe to our newsletter for exclusive offers
                  </span>
                </label>
              </div>

              {/* Register Button */}
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors transform hover:scale-105 mt-6">
                CREATE ACCOUNT
              </button>

              {/* Sign In Link */}
              <p className="text-center text-gray-400 text-sm mt-6">
                Already have an account?{' '}
                <button className="text-green-500 hover:text-green-400 transition-colors font-medium">
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-black items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-green-500/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-green-500/5 to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-32 right-32 w-24 h-24 border-2 border-green-500/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-green-500/20 transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 border border-white/20 transform -rotate-12"></div>
        
        {/* Sport Icons */}
        <div className="absolute top-20 left-20">
          <Trophy className="w-10 h-10 text-green-500/50" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Target className="w-10 h-10 text-green-500/50" />
        </div>

        {/* Main Content */}
        <div className="text-center z-10 max-w-lg px-8">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Start Your <span className="text-green-500">Athletic Journey</span> Today
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of athletes who trust SPORTIFY for their performance gear needs.
          </p>
          
          {/* Benefits */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300">Exclusive member discounts up to 30%</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300">Early access to new collections</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300">Personalized gear recommendations</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300">Free shipping on all orders</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
          <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-pulse"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>

      {/* Mobile Hero Content */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 text-center">
        <p className="text-white text-sm font-medium">
          Join the SPORTIFY Team
        </p>
        <p className="text-green-500 text-xs">
          EXCLUSIVE MEMBER BENEFITS
        </p>
      </div>
    </div>
  );
};

export default SportsRegisterInterface;
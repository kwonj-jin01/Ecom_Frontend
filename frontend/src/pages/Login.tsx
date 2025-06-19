import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ChevronLeft, ChevronRight, Zap, Target, Trophy, User, Mail, Phone, MapPin } from 'lucide-react';

// Mock auth hook - replace with your actual auth implementation
const useAuth = () => ({
  login: async (email, password) => {
    // Mock login implementation
    console.log('Login attempt:', { email, password });
    if (!email || !password) throw new Error('Email and password required');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
  
  register: async (firstName, lastName, email, password, phone, country, sportType) => {
    // Mock register implementation
    console.log('Register attempt:', { firstName, lastName, email, password, phone, country, sportType });
    if (!firstName || !lastName || !email || !password) throw new Error('All required fields must be filled');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
  isAuthenticated: false
});

// Mock navigate function - replace with your actual router
const navigate = (path) => {
  console.log('Navigate to:', path);
};

const sportTypes = [
  'Football',
  'Basketball',
  'Tennis',
  'Golf',
  'Swimming',
  'Running',
  'Cycling',
  'Soccer',
  'Baseball',
  'Volleyball',
  'Gymnastics',
  'Boxing'
];

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: '',
    country: '',
    sportType: '',
    agreeTerms: false,
    newsletter: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register, isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = isLogin ? 'Login - FITIX' : 'Register - FITIX';

    // If user is already authenticated, redirect to home
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isLogin, isAuthenticated]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate('/');
      } else {
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          throw new Error('First name and last name are required');
        }
        if (!formData.agreeTerms) {
          throw new Error('You must agree to the terms of service');
        }
        await register(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password,
          formData.phone,
          formData.country,
          formData.sportType
        );
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    // Reset form data when switching modes
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: '',
      country: '',
      sportType: '',
      agreeTerms: false,
      newsletter: false
    });
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FITIX</h1>
                <p className="text-green-500 text-xs font-medium">PERFORMANCE WEAR</p>
              </div>
            </div>
          </div>

          {/* Form Header */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-gray-400 mb-8">
              {isLogin
                ? 'Sign in to access your account'
                : 'Join FITIX to start your fitness journey'}
            </p>

            {/* Error Box */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {isLogin ? (
                /* ── Login Fields */
                <>
                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="athlete@fitix.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex justify-between items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-500 bg-gray-900 border-gray-700 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-400">Remember me</span>
                    </label>
                    <button type="button" className="text-green-500 text-sm hover:text-green-400 transition-colors">
                      Forgot Password?
                    </button>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
                  >
                    {loading ? 'SIGNING IN...' : 'SIGN IN'}
                  </button>
                </>
              ) : (
                /* ── Sign Up Fields */
                <>
                  <div className="space-y-4">
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
                            required
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
                            required
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
                          required
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

                    {/* Password Field */}
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
                          required
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
                          <button type="button" className="text-green-500 hover:text-green-400 transition-colors">
                            Terms of Service
                          </button>
                          {' '}and{' '}
                          <button type="button" className="text-green-500 hover:text-green-400 transition-colors">
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
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSubmit}
                      className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors transform hover:scale-105 mt-6"
                    >
                      {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="bg-gray-900 border border-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                <span className="text-sm">Google</span>
              </button>
              <button type="button" className="bg-gray-900 border border-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                <span className="text-sm">Facebook</span>
              </button>
            </div>

            {/* Toggle Mode Link */}
            <p className="text-center text-gray-400 text-sm mt-8">
              {isLogin ? 'New to FITIX?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-green-500 hover:text-green-400 transition-colors font-medium"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-black items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-green-500/5 to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-green-500/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-green-500/20 transform rotate-45"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-white/20 transform rotate-12"></div>

        {/* Sport Icons */}
        <div className="absolute top-16 left-16">
          <Target className="w-8 h-8 text-green-500/50" />
        </div>
        <div className="absolute bottom-16 right-32">
          <Trophy className="w-8 h-8 text-green-500/50" />
        </div>

        {/* Main Content */}
        <div className="text-center z-10 max-w-md px-8">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Elevate Your <span className="text-green-500">Performance</span> with Premium Sports Gear
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Discover the latest collection of high-performance athletic wear designed for champions.
          </p>

          {/* Features */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Premium Quality Materials</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Professional Athlete Approved</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Free Shipping Worldwide</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
          <button type="button" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Mobile Hero Content */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 text-center">
        <p className="text-white text-sm font-medium">
          Premium Sports Gear
        </p>
        <p className="text-green-500 text-xs">
          ELEVATE YOUR PERFORMANCE
        </p>
      </div>
    </div>
  );
};

export default Login
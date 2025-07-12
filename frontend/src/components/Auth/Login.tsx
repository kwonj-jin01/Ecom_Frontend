// Login.tsx
import React, { useState, useEffect } from 'react';
import { navigate } from '../../utils/navigation';
import { Logo } from '../ui/Logo';
import { LoginForm } from '../ui/LoginForm';
import { RegisterForm } from '../ui/RegisterForm';
import { SocialLogin } from '../ui/SocialLogin';
import { AuthToggle } from '../ui/AuthToggle';
import { HeroSection } from '../ui/HeroSection';
import type { RegisterFormData } from '../../types/auth';
import { AlertMessage } from '../ui/AlertMessage';
import { useAuth } from '../../context/AuthContext';
import { getErrorMessage } from '../../utils/getErrorMessage';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, register, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    document.title = isLogin ? 'Login - FITIX' : 'Register - FITIX';

    // If user is already authenticated, redirect to home
    if (isAuthenticated && !authLoading) {
      navigate('/');
    }
  }, [isLogin, isAuthenticated, authLoading]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!isLogin) {
      // Registration validation
      if (!formData.firstName.trim()) {
        throw new Error('First name is required');
      }
      if (!formData.lastName.trim()) {
        throw new Error('Last name is required');
      }
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }
      if (!formData.password) {
        throw new Error('Password is required');
      }
      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      if (!formData.agreeTerms) {
        throw new Error('You must agree to the terms of service');
      }
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
    } else {
      // Login validation
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }
      if (!formData.password) {
        throw new Error('Password is required');
      }
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Validate form before submission
      validateForm();

      if (isLogin) {
       // FIXED: Pass credentials as an object, not separate parameters
        const result = await login({
          email: formData.email,
          password: formData.password
        });

        // Handle the result properly
        if (result.success) {
          setSuccessMessage('Login successful!');
          setTimeout(() => navigate('/'), 1000);
        } else {
          // Display the error message from the login attempt
          setError(result.error || 'Login failed');
        }
      } else {
        // FIXED: Pass registration data that matches the expected interface
        const result = await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          setSuccessMessage('Account created successfully! You can now log in.');
          setTimeout(() => {
            setSuccessMessage('');
            setIsLogin(true);
            // Reset form data but keep email
            setFormData({
              email: formData.email,
              password: '',
              firstName: '',
              lastName: '',
              confirmPassword: '',
              agreeTerms: false,
              newsletter: false
            });
          }, 2000);
        } else {
          // Display the error message from the registration attempt
          setError(result.error || 'Registration failed');
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMessage('');
    // Reset form data when switching modes
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      agreeTerms: false,
      newsletter: false
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <Logo />
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

            {/* Error/Success Messages */}
            {error && <AlertMessage message={error} type="error" />}
            {successMessage && <AlertMessage message={successMessage} type="success" />}

            {/* Form */}
            {isLogin ? (
              <LoginForm
                formData={formData}
                showPassword={showPassword}
                loading={loading}
                onInputChange={handleInputChange}
                onTogglePassword={togglePassword}
                onSubmit={handleSubmit}
              />
            ) : (
              <RegisterForm
                formData={formData}
                showPassword={showPassword}
                loading={loading}
                onInputChange={handleInputChange}
                onTogglePassword={togglePassword}
                onSubmit={handleSubmit}
              />
            )}

            {/* Social Login */}
            <SocialLogin />

            {/* Toggle Mode Link */}
            <AuthToggle isLogin={isLogin} onToggle={toggleMode} />
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <HeroSection />
    </div>
  );
};

export default Login;
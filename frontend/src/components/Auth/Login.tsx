// Login.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hook/useAuth';
import { navigate } from '../../utils/navigation';
import { Logo } from '../ui/Logo';
import { LoginForm } from '../ui/LoginForm';
import { RegisterForm } from '../ui/RegisterForm';
import { SocialLogin } from '../ui/SocialLogin';
import { AuthToggle } from '../ui/AuthToggle';
import { HeroSection } from '../ui/HeroSection';
import type { RegisterFormData } from '../../types/auth';
import { AlertMessage } from '../ui/AlertMessage';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
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
  const [successMessage, setSuccessMessage] = useState('');

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
        setSuccessMessage('Connexion réussie !');
        setTimeout(() => navigate('/'), 1000); // Redirige après 1s
      } else {
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          throw new Error('First name and last name are required');
        }
        if (!formData.agreeTerms) {
          throw new Error('You must agree to the terms of service');
        }
        const success = await register(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password,
          formData.phone,
          formData.country,
          formData.sportType
        );

        if (success) {
          setSuccessMessage('Account created successfully. You can now log in.');
          setTimeout(() => {
            setSuccessMessage('');
            setIsLogin(true); // Bascule vers le mode login
          }, 2000);
        }
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

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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

            {/* Error Box */}
            <AlertMessage message={error} type="error" />
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
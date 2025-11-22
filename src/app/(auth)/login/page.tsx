/**
 * Login Page - User Authentication with Dynamic Background
 * 
 * Purpose:
 * - Authenticate users with Login ID and Password
 * - Validate credentials against user database
 * - Navigate to dashboard on successful login
 * - Interactive particle background effect
 * 
 * Features:
 * - Form validation
 * - Error handling
 * - Password visibility toggle
 * - Dynamic animated background
 * - Responsive design
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, Lock, User } from 'lucide-react';
import dummyData from '@/data/dummy.json';
import { useUIStore } from '@/store/useUIStore';
import Button from '@/components/ui/Button';
import DynamicBackground from '@/components/background/DynamicBackground';

export default function LoginPage() {
  const router = useRouter();
  const { addNotification } = useUIStore();
  
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.loginId.trim()) {
      newErrors.loginId = 'Login ID is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addNotification('error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const user = dummyData.users.find(
        u => u.email === formData.loginId || u.name === formData.loginId
      );

      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        addNotification('success', `Welcome back, ${user.name}!`);
        router.push('/dashboard');
      } else {
        setErrors({
          loginId: 'Invalid login credentials',
          password: 'Invalid login credentials'
        });
        addNotification('error', 'Invalid Login ID or Password');
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-background dark:bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Dynamic Animated Background */}
      <DynamicBackground />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* App Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent-dark rounded-2xl mb-4 shadow-large"
            >
              <span className="text-4xl font-bold text-white">SM</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-primary dark:text-primary mb-2"
            >
              StockMaster
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-text-secondary dark:text-text-secondary"
            >
              Inventory Management System
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-2xl p-8 border border-border dark:border-border backdrop-blur-xl shadow-large"
          >
            <h2 className="text-2xl font-bold text-primary dark:text-primary mb-6">
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Login ID Field */}
              <div>
                <label
                  htmlFor="loginId"
                  className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2"
                >
                  Login ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-text-tertiary" />
                  </div>
                  <input
                    id="loginId"
                    name="loginId"
                    type="text"
                    value={formData.loginId}
                    onChange={handleChange}
                    placeholder="Enter your login ID"
                    className={`
                      w-full pl-10 pr-4 py-3 rounded-lg
                      border ${errors.loginId ? 'border-error' : 'border-border dark:border-border'}
                      bg-surface dark:bg-surface
                      text-text-primary dark:text-text-primary
                      placeholder:text-text-tertiary
                      focus:outline-none focus:ring-2 focus:ring-accent/30
                      transition-all
                    `}
                  />
                </div>
                {errors.loginId && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-error"
                  >
                    {errors.loginId}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-text-tertiary" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`
                      w-full pl-10 pr-12 py-3 rounded-lg
                      border ${errors.password ? 'border-error' : 'border-border dark:border-border'}
                      bg-surface dark:bg-surface
                      text-text-primary dark:text-text-primary
                      placeholder:text-text-tertiary
                      focus:outline-none focus:ring-2 focus:ring-accent/30
                      transition-all
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-text-tertiary hover:text-text-secondary" />
                    ) : (
                      <Eye className="h-5 w-5 text-text-tertiary hover:text-text-secondary" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-error"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Button>

              {/* Footer Links */}
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="text-accent hover:text-accent-dark transition-colors font-medium"
                >
                  Forgot Password?
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/signup')}
                  className="text-accent hover:text-accent-dark transition-colors font-medium"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 rounded-lg bg-info/10 backdrop-blur-sm border border-info/20"
          >
            <p className="text-sm text-text-secondary dark:text-text-secondary mb-2 font-medium">
              Demo Credentials:
            </p>
            <div className="text-xs text-text-tertiary space-y-1">
              <p>👤 Admin: admin@stockmaster.com</p>
              <p>👤 Manager: manager@stockmaster.com</p>
              <p>👤 Staff: staff@stockmaster.com</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Signup Page - User Registration with Dynamic Background
 * 
 * Purpose:
 * - Create new user accounts
 * - Validate user input according to requirements
 * - Interactive particle background effect
 * - Navigate to login after successful registration
 * 
 * Features:
 * - Real-time validation
 * - Password strength indicator
 * - Password visibility toggle
 * - Dynamic animated background
 * - Responsive design
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus, Lock, Mail, User, Check, X } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import Button from '@/components/ui/Button';
import DynamicBackground from '@/components/background/DynamicBackground';

interface FormData {
  loginId: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  loginId?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { addNotification } = useUIStore();
  
  const [formData, setFormData] = useState<FormData>({
    loginId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ValidationErrors];
        return newErrors;
      });
    }
  };

  // Validation functions
  const validateLoginId = (loginId: string): string | undefined => {
    if (!loginId.trim()) return 'Login ID is required';
    if (loginId.length < 6 || loginId.length > 32) return 'Login ID must be 6-32 characters';
    if (!/^[a-zA-Z0-9]+$/.test(loginId)) return 'Login ID must be alphanumeric only';
    const existingUsers = ['admin', 'manager', 'staff'];
    if (existingUsers.includes(loginId.toLowerCase())) return 'Login ID already exists';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return undefined;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return undefined;
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    const loginIdError = validateLoginId(formData.loginId);
    if (loginIdError) newErrors.loginId = loginIdError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addNotification('error', 'Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addNotification('success', 'Account created successfully!');
      router.push('/login');
      setIsLoading(false);
    }, 1500);
  };

  // Password requirements checklist
  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'One number', met: /[0-9]/.test(formData.password) },
  ];

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
              Create Account
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-text-secondary dark:text-text-secondary"
            >
              Join StockMaster today
            </motion.p>
          </div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-2xl p-8 border border-border dark:border-border backdrop-blur-xl shadow-large"
          >
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Login ID Field */}
              <div>
                <label
                  htmlFor="loginId"
                  className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2"
                >
                  Login ID <span className="text-error">*</span>
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
                    placeholder="Choose a unique login ID"
                    className={`
                      w-full pl-10 pr-4 py-2.5 rounded-lg
                      border ${errors.loginId ? 'border-error' : 'border-border dark:border-border'}
                      bg-surface dark:bg-surface
                      text-text-primary dark:text-text-primary
                      placeholder:text-text-tertiary
                      focus:outline-none focus:ring-2 focus:ring-accent/30
                      transition-all
                    `}
                  />
                </div>
                {errors.loginId ? (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-error"
                  >
                    {errors.loginId}
                  </motion.p>
                ) : (
                  <p className="mt-1 text-xs text-text-tertiary">
                    6-32 alphanumeric characters
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2"
                >
                  Email <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-text-tertiary" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`
                      w-full pl-10 pr-4 py-2.5 rounded-lg
                      border ${errors.email ? 'border-error' : 'border-border dark:border-border'}
                      bg-surface dark:bg-surface
                      text-text-primary dark:text-text-primary
                      placeholder:text-text-tertiary
                      focus:outline-none focus:ring-2 focus:ring-accent/30
                      transition-all
                    `}
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-error"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2"
                >
                  Password <span className="text-error">*</span>
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
                    placeholder="Create a strong password"
                    className={`
                      w-full pl-10 pr-12 py-2.5 rounded-lg
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2"
                  >
                    <div className="flex gap-1 mb-2">
                      {[25, 50, 75, 100].map((threshold) => (
                        <div
                          key={threshold}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            passwordStrength >= threshold
                              ? threshold === 100
                                ? 'bg-success'
                                : threshold >= 75
                                ? 'bg-info'
                                : threshold >= 50
                                ? 'bg-warning'
                                : 'bg-error'
                              : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-2 text-xs"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            {req.met ? (
                              <Check className="w-3.5 h-3.5 text-success" />
                            ) : (
                              <X className="w-3.5 h-3.5 text-error" />
                            )}
                          </motion.div>
                          <span className={req.met ? 'text-success' : 'text-text-tertiary'}>
                            {req.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-error"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2"
                >
                  Re-enter Password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-text-tertiary" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`
                      w-full pl-10 pr-12 py-2.5 rounded-lg
                      border ${errors.confirmPassword ? 'border-error' : 'border-border dark:border-border'}
                      bg-surface dark:bg-surface
                      text-text-primary dark:text-text-primary
                      placeholder:text-text-tertiary
                      focus:outline-none focus:ring-2 focus:ring-accent/30
                      transition-all
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-text-tertiary hover:text-text-secondary" />
                    ) : (
                      <Eye className="h-5 w-5 text-text-tertiary hover:text-text-secondary" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-error"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent"
              >
                <UserPlus className="w-5 h-5" />
                Create Account
              </Button>

              {/* Footer Link */}
              <div className="text-center text-sm pt-4">
                <span className="text-text-secondary dark:text-text-secondary">
                  Already have an account?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-accent hover:text-accent-dark transition-colors font-medium"
                >
                  Sign In
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

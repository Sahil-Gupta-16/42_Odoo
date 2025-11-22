/**
 * Profile Page - User Account Management
 * 
 * Purpose:
 * - View and edit user information
 * - Update profile settings
 * - Change password
 * - Manage preferences
 * 
 * Features:
 * - Profile information card
 * - Avatar upload
 * - Form validation
 * - Activity history
 * - Account statistics
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  Lock,
  Camera,
  Shield,
  Bell,
  Activity,
  Package,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ProfilePage() {
  const { addNotification } = useUIStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          role: userData.role || '',
          department: userData.department || '',
          location: userData.location || '',
        });
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updatedUser = { ...currentUser, ...formData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setIsEditing(false);
      setIsSaving(false);
      addNotification('success', 'Profile updated successfully!');
    }, 1000);
  };

  const handleCancel = () => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        role: currentUser.role || '',
        department: currentUser.department || '',
        location: currentUser.location || '',
      });
    }
    setIsEditing(false);
  };

  const stats = [
    { icon: Package, label: 'Products Added', value: '48', color: 'text-accent' },
    { icon: TrendingUp, label: 'Stock Updates', value: '127', color: 'text-success' },
    { icon: Activity, label: 'Actions Today', value: '12', color: 'text-info' },
    { icon: Clock, label: 'Active Days', value: '45', color: 'text-warning' },
  ];

  const recentActivity = [
    { action: 'Updated stock for Wireless Mouse', time: '2 hours ago', type: 'update' },
    { action: 'Added new product: Office Chair', time: '5 hours ago', type: 'create' },
    { action: 'Deleted product: Old Keyboard', time: '1 day ago', type: 'delete' },
    { action: 'Updated warehouse location', time: '2 days ago', type: 'update' },
  ];

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary mb-2">
            My Profile
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Manage your account information and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={isSaving}>
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-xl p-6 border border-border dark:border-border"
          >
            <div className="text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-white text-3xl font-bold">
                  {formData.name?.charAt(0) || 'U'}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Name and Role */}
              <h2 className="text-xl font-bold text-primary dark:text-primary mb-1">
                {formData.name || 'User'}
              </h2>
              <Badge variant="default" className="mb-4">
                {formData.role || 'User'}
              </Badge>

              {/* Quick Info */}
              <div className="space-y-2 text-sm text-text-secondary dark:text-text-secondary">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{formData.email || 'user@example.com'}</span>
                </div>
                {formData.phone && (
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{formData.phone}</span>
                  </div>
                )}
                {formData.location && (
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{formData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl p-6 border border-border dark:border-border"
          >
            <h3 className="text-lg font-bold text-primary dark:text-primary mb-4">Activity Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-background-secondary dark:bg-background-secondary hover:bg-sidebar-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <span className="text-sm text-text-secondary dark:text-text-secondary">
                      {stat.label}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary dark:text-primary">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Details and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-effect rounded-xl p-6 border border-border dark:border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-accent/10">
                <User className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-primary dark:text-primary">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-text-primary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-border bg-surface dark:bg-surface text-text-primary dark:text-text-primary disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-effect rounded-xl p-6 border border-border dark:border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-error/10">
                <Shield className="w-6 h-6 text-error" />
              </div>
              <h2 className="text-xl font-bold text-primary dark:text-primary">
                Security Settings
              </h2>
            </div>

            <div className="space-y-4">
              <Button variant="ghost" className="w-full justify-start">
                <Lock className="w-4 h-4" />
                Change Password
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="w-4 h-4" />
                Notification Preferences
              </Button>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-xl p-6 border border-border dark:border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-info/10">
                <Activity className="w-6 h-6 text-info" />
              </div>
              <h2 className="text-xl font-bold text-primary dark:text-primary">
                Recent Activity
              </h2>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className="flex items-start justify-between p-3 rounded-lg bg-background-secondary dark:bg-background-secondary hover:bg-sidebar-hover transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg mt-0.5 ${
                      activity.type === 'create' ? 'bg-success/10' :
                      activity.type === 'delete' ? 'bg-error/10' : 'bg-info/10'
                    }`}>
                      {activity.type === 'create' ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : activity.type === 'delete' ? (
                        <TrendingUp className="w-4 h-4 text-error rotate-180" />
                      ) : (
                        <Edit className="w-4 h-4 text-info" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary dark:text-primary">
                        {activity.action}
                      </p>
                      <p className="text-xs text-text-tertiary dark:text-text-tertiary mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

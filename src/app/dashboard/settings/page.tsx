/**
 * Settings Page - Application Configuration
 * 
 * Purpose:
 * - Manage user preferences
 * - Configure app appearance
 * - Control notifications
 * - Security settings
 * - System preferences
 * 
 * Features:
 * - Dark/Light mode toggle
 * - Animation controls
 * - Sound preferences
 * - Account settings
 * - Data management
 * - Export/Import options
 */

'use client';

import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  User,
  Download,
  Upload,
  Trash2,
  Save,
  Monitor,
  Volume2,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';

export default function SettingsPage() {
  const { theme, toggleTheme, preferences, setPreference, rollingTextSpeed, setRollingTextSpeed } = useUIStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const tabs = [
    {
      label: 'Appearance',
      icon: <Monitor className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Theme Setting */}
          <div className="glass-effect rounded-lg p-6 border border-border dark:border-border">
            <div className="flex items-center gap-3 mb-4">
              {theme === 'light' ? (
                <Sun className="w-6 h-6 text-accent" />
              ) : (
                <Moon className="w-6 h-6 text-accent" />
              )}
              <h3 className="text-lg font-semibold text-primary dark:text-primary">Theme</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary dark:text-primary">Color Mode</p>
                  <p className="text-sm text-text-secondary dark:text-text-secondary">
                    Choose your preferred color scheme
                  </p>
                </div>
                <Button onClick={toggleTheme}>
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4" />
                      Switch to Dark
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4" />
                      Switch to Light
                    </>
                  )}
                </Button>
              </div>

              <div className="pt-4 border-t border-border dark:border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary dark:text-primary">Animations</p>
                    <p className="text-sm text-text-secondary dark:text-text-secondary">
                      Enable smooth transitions and effects
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.animationsEnabled}
                      onChange={(e) => setPreference('animationsEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-border dark:border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary dark:text-primary">Compact Mode</p>
                    <p className="text-sm text-text-secondary dark:text-text-secondary">
                      Reduce spacing for more content
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.compactMode}
                      onChange={(e) => setPreference('compactMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-border dark:border-border">
                <div>
                  <p className="font-medium text-primary dark:text-primary mb-2">Rolling Text Speed</p>
                  <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
                    Adjust the speed of scrolling notifications
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={rollingTextSpeed}
                      onChange={(e) => setRollingTextSpeed(Number(e.target.value))}
                      className="flex-1"
                    />
                    <Badge>{rollingTextSpeed}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      content: (
        <div className="glass-effect rounded-lg p-6 border border-border dark:border-border">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-semibold text-primary dark:text-primary">Notification Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-primary dark:text-primary">Sound Effects</p>
                <p className="text-sm text-text-secondary dark:text-text-secondary">
                  Play sounds for notifications and alerts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.soundEnabled}
                  onChange={(e) => setPreference('soundEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-border dark:border-border">
              <p className="font-medium text-primary dark:text-primary mb-4">Email Notifications</p>
              <div className="space-y-3">
                {['Low stock alerts', 'New deliveries', 'System updates', 'Weekly reports'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-border dark:border-border text-accent focus:ring-accent/30"
                    />
                    <span className="text-sm text-text-primary dark:text-text-primary">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Security',
      icon: <Lock className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="glass-effect rounded-lg p-6 border border-border dark:border-border">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-accent" />
              <h3 className="text-lg font-semibold text-primary dark:text-primary">Security Settings</h3>
            </div>

            <div className="space-y-4">
              <Button variant="ghost" className="w-full justify-start">
                <Lock className="w-4 h-4" />
                Change Password
              </Button>
              
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-4 h-4" />
                Update Profile
              </Button>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-6 border border-error/20 dark:border-error/10 bg-error/5 dark:bg-error/5">
            <h4 className="font-semibold text-error mb-2">Danger Zone</h4>
            <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
              Irreversible actions that affect your account
            </p>
            <Button variant="danger">
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: 'Data',
      icon: <Download className="w-4 h-4" />,
      content: (
        <div className="glass-effect rounded-lg p-6 border border-border dark:border-border">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-semibold text-primary dark:text-primary">Data Management</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium text-primary dark:text-primary mb-2">Export Data</p>
              <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
                Download your inventory data in various formats
              </p>
              <div className="flex gap-2">
                <Button variant="ghost">
                  <Download className="w-4 h-4" />
                  Export as CSV
                </Button>
                <Button variant="ghost">
                  <Download className="w-4 h-4" />
                  Export as JSON
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-border dark:border-border">
              <p className="font-medium text-primary dark:text-primary mb-2">Import Data</p>
              <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
                Import inventory data from external sources
              </p>
              <Button variant="ghost">
                <Upload className="w-4 h-4" />
                Import CSV/JSON
              </Button>
            </div>

            <div className="pt-4 border-t border-border dark:border-border">
              <p className="font-medium text-primary dark:text-primary mb-2">Clear Cache</p>
              <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
                Clear local storage and cached data
              </p>
              <Button variant="ghost">
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </Button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary mb-2">
            Settings
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary">
            Manage your application preferences and account settings
          </p>
        </div>
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-5 h-5" />
          Save Changes
        </Button>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs tabs={tabs} />
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  Warehouse,
  MapPin,
  Plus,
  Edit,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dummyData from "@/data/dummy.json";

export default function SettingsPage() {
  const router = useRouter();
  const {
    theme,
    toggleTheme,
    preferences,
    setPreference,
    rollingTextSpeed,
    setRollingTextSpeed,
    addNotification,
  } = useUIStore();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("Appearance");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addNotification("success", "Settings saved successfully!");
    }, 1000);
  };

  const tabs = [
    {
      label: "Appearance",
      icon: <Monitor className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="glass-effect rounded-lg p-6 border border-border dark:border-border">
            <div className="flex items-center gap-3 mb-4">
              {theme === "light" ? (
                <Sun className="w-6 h-6 text-accent" />
              ) : (
                <Moon className="w-6 h-6 text-accent" />
              )}
              <h3 className="text-lg font-semibold text-primary dark:text-primary">
                Theme
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary dark:text-primary">
                    Color Mode
                  </p>
                  <p className="text-sm text-text-secondary dark:text-text-secondary">
                    Choose your preferred color scheme
                  </p>
                </div>
                <Button onClick={toggleTheme}>
                  {theme === "light" ? (
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
                    <p className="font-medium text-primary dark:text-primary">
                      Animations
                    </p>
                    <p className="text-sm text-text-secondary dark:text-text-secondary">
                      Enable smooth transitions and effects
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.animationsEnabled}
                      onChange={(e) =>
                        setPreference("animationsEnabled", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-border dark:border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary dark:text-primary">
                      Compact Mode
                    </p>
                    <p className="text-sm text-text-secondary dark:text-text-secondary">
                      Reduce spacing for more content
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.compactMode}
                      onChange={(e) =>
                        setPreference("compactMode", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-border dark:border-border">
                <div>
                  <p className="font-medium text-primary dark:text-primary mb-2">
                    Rolling Text Speed
                  </p>
                  <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
                    Adjust the speed of scrolling notifications
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={rollingTextSpeed}
                      onChange={(e) =>
                        setRollingTextSpeed(Number(e.target.value))
                      }
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
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
      content: (
        <div className="glass-effect rounded-lg p-6 border border-border dark:border-border">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-semibold text-primary dark:text-primary">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-primary dark:text-primary">
                  Sound Effects
                </p>
                <p className="text-sm text-text-secondary dark:text-text-secondary">
                  Play sounds for notifications and alerts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.soundEnabled}
                  onChange={(e) =>
                    setPreference("soundEnabled", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-border dark:border-border">
              <p className="font-medium text-primary dark:text-primary mb-4">
                Email Notifications
              </p>
              <div className="space-y-3">
                {[
                  "Low stock alerts",
                  "New deliveries",
                  "System updates",
                  "Weekly reports",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-border dark:border-border text-accent focus:ring-accent/30"
                    />
                    <span className="text-sm text-text-primary dark:text-text-primary">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Warehouses",
      icon: <Warehouse className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-primary dark:text-primary">
                Warehouse Management
              </h3>
              <p className="text-sm text-text-secondary dark:text-text-secondary">
                Quick overview of your warehouses • Click to manage
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard/warehouses")}
              >
                <ExternalLink className="w-4 h-4" />
                View All
              </Button>
              <Button onClick={() => router.push("/dashboard/warehouses/new")}>
                <Plus className="w-4 h-4" />
                Add Warehouse
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {dummyData.warehouses?.map((warehouse: any) => (
              <div
                key={warehouse.id}
                onClick={() =>
                  router.push(`/dashboard/warehouses/${warehouse.id}`)
                }
                className="glass-effect rounded-lg p-5 border border-border dark:border-border hover:border-accent dark:hover:border-accent transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Warehouse className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-primary dark:text-primary group-hover:text-accent transition-colors">
                          {warehouse.name}
                        </h4>
                        <ArrowRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{warehouse.location}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge
                          variant={
                            warehouse.status === "active"
                              ? "success"
                              : "default"
                          }
                        >
                          {warehouse.status}
                        </Badge>
                        <span className="text-text-tertiary dark:text-text-tertiary">
                          {warehouse.capacity || "N/A"} capacity
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/dashboard/warehouses/${warehouse.id}/edit`
                        );
                      }}
                      className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-accent" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {dummyData.warehouses && dummyData.warehouses.length > 0 && (
            <div className="glass-effect rounded-lg p-4 border border-border dark:border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-accent">
                    {dummyData.warehouses.length}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary">
                    Total Warehouses
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">
                    {
                      dummyData.warehouses.filter(
                        (w: any) => w.status === "active"
                      ).length
                    }
                  </p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary">
                    Active
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary dark:text-text-primary">
                    {dummyData.warehouses.reduce(
                      (sum: number, w: any) =>
                        sum + (parseInt(w.capacity) || 0),
                      0
                    )}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary">
                    Total Capacity
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Security",
      icon: <Lock className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="glass-effect rounded-lg p-6 border border-border dark:border-border">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-accent" />
              <h3 className="text-lg font-semibold text-primary dark:text-primary">
                Security Settings
              </h3>
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
            <Button variant="destructive">
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: "Data",
      icon: <Download className="w-4 h-4" />,
      content: (
        <div className="glass-effect rounded-lg p-6 border border-border dark:border-border">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-semibold text-primary dark:text-primary">
              Data Management
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium text-primary dark:text-primary mb-2">
                Export Data
              </p>
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
              <p className="font-medium text-primary dark:text-primary mb-2">
                Import Data
              </p>
              <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
                Import inventory data from external sources
              </p>
              <Button variant="ghost">
                <Upload className="w-4 h-4" />
                Import CSV/JSON
              </Button>
            </div>

            <div className="pt-4 border-t border-border dark:border-border">
              <p className="font-medium text-primary dark:text-primary mb-2">
                Clear Cache
              </p>
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

  // Find current content by activeTab label
  const currentTab = tabs.find((tab) => tab.label === activeTab);

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
      </div>

      {/* Tabs navigation */}
      <nav className="flex gap-4 border-b border-border dark:border-border">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${activeTab === tab.label
              ? "border-accent text-accent font-semibold"
              : "border-transparent text-text-secondary hover:text-accent"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Animate tab content */}
      <div className="pt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="min-h-[200px]"
          >
            {currentTab?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

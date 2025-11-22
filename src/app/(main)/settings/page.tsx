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
  Eye,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useInventoryStore } from "@/store/useInventoryStore";
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
  const { warehouses, deleteWarehouse } = useInventoryStore();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("Notifications");
  const [warehouseSearch, setWarehouseSearch] = useState("");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addNotification("success", "Settings saved successfully!");
    }, 1000);
  };

  const tabs = [
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
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-primary dark:text-primary">
                Warehouse Management
              </h3>
              <p className="text-sm text-text-secondary dark:text-text-secondary">
                Manage your warehouse locations
              </p>
            </div>
            <Button onClick={() => router.push("/warehouse/new")}>
              <Plus className="w-4 h-4" />
              Add Warehouse
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search warehouses..."
              value={warehouseSearch}
              onChange={(e) => setWarehouseSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all outline-none"
            />
          </div>

          {/* Warehouses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warehouses
              .filter(warehouse =>
                warehouse.name.toLowerCase().includes(warehouseSearch.toLowerCase()) ||
                warehouse.location.toLowerCase().includes(warehouseSearch.toLowerCase())
              )
              .map((warehouse) => (
                <div key={warehouse.id} className="glass-effect rounded-xl border border-border p-6 hover:border-accent/50 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                        <Warehouse className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">{warehouse.name}</h3>
                        <p className="text-xs text-text-tertiary capitalize">{warehouse.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="text-text-secondary">Location:</span>
                      <span className="ml-2 text-primary">{warehouse.location}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-text-secondary">Capacity:</span>
                      <span className="ml-2 text-primary">{warehouse.capacity} units</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-text-secondary">Current Stock:</span>
                      <span className="ml-2 text-primary">{warehouse.currentStock} units</span>
                    </div>
                  </div>

                  {/* Utilization Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                      <span>Utilization</span>
                      <span className="font-medium text-primary">{warehouse.utilizationPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-background-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${warehouse.utilizationPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                    <button
                      onClick={() => router.push(`/warehouse/${warehouse.id}`)}
                      className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => router.push(`/warehouse/${warehouse.id}/edit`)}
                      className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${warehouse.name}"?`)) {
                          deleteWarehouse(warehouse.id);
                          addNotification('success', `Warehouse "${warehouse.name}" deleted successfully`);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-error/10 text-text-secondary hover:text-error transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Stats Summary */}
          {warehouses && warehouses.length > 0 && (
            <div className="glass-effect rounded-lg p-4 border border-border dark:border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-accent">
                    {warehouses.length}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary">
                    Total Warehouses
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">
                    {
                      warehouses.filter(
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
                    {warehouses.reduce(
                      (sum: number, w: any) =>
                        sum + (parseInt(w.capacity as any) || 0),
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

          {/* Empty State */}
          {warehouses.filter(warehouse =>
            warehouse.name.toLowerCase().includes(warehouseSearch.toLowerCase()) ||
            warehouse.location.toLowerCase().includes(warehouseSearch.toLowerCase())
          ).length === 0 && (
              <div className="glass-effect rounded-xl border border-border p-12 text-center">
                <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-text-tertiary" />
                </div>
                <h3 className="text-lg font-medium text-primary mb-1">No warehouses found</h3>
                <p className="text-text-secondary">
                  Try adjusting your search or add a new warehouse.
                </p>
              </div>
            )}
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Download,
  Upload,
  Shield,
  Database,
  RefreshCw,
  AlertTriangle,
  Check,
  X,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react';

const QuickSettingsModal = ({ isOpen, onClose, onSettingsChange }) => {
  const [quickSettings, setQuickSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    twoFactorRequired: true,
    autoBackup: true
  });

  const [loading, setLoading] = useState(false);

  const handleQuickToggle = async (setting) => {
    setLoading(true);
    try {
      const newValue = !quickSettings[setting];
      setQuickSettings(prev => ({
        ...prev,
        [setting]: newValue
      }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (onSettingsChange) {
        onSettingsChange(setting, newValue);
      }
    } catch (error) {
      console.error('Failed to update setting:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quick Settings</h3>
                  <p className="text-sm text-gray-600">Toggle common system settings</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Maintenance Mode */}
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium text-yellow-900">Maintenance Mode</h4>
                  <p className="text-sm text-yellow-700">Temporarily disable public access</p>
                </div>
              </div>
              <button
                onClick={() => handleQuickToggle('maintenanceMode')}
                disabled={loading}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 ${
                  quickSettings.maintenanceMode ? 'bg-yellow-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  quickSettings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Debug Mode */}
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-red-600" />
                <div>
                  <h4 className="font-medium text-red-900">Debug Mode</h4>
                  <p className="text-sm text-red-700">Enable detailed error logging</p>
                </div>
              </div>
              <button
                onClick={() => handleQuickToggle('debugMode')}
                disabled={loading}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 ${
                  quickSettings.debugMode ? 'bg-red-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  quickSettings.debugMode ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Cache System */}
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Cache System</h4>
                  <p className="text-sm text-green-700">Enable performance caching</p>
                </div>
              </div>
              <button
                onClick={() => handleQuickToggle('cacheEnabled')}
                disabled={loading}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 ${
                  quickSettings.cacheEnabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  quickSettings.cacheEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Two-Factor Auth */}
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">Two-Factor Auth</h4>
                  <p className="text-sm text-blue-700">Require 2FA for all users</p>
                </div>
              </div>
              <button
                onClick={() => handleQuickToggle('twoFactorRequired')}
                disabled={loading}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${
                  quickSettings.twoFactorRequired ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  quickSettings.twoFactorRequired ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Auto Backup */}
            <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="font-medium text-purple-900">Auto Backup</h4>
                  <p className="text-sm text-purple-700">Enable automatic data backups</p>
                </div>
              </div>
              <button
                onClick={() => handleQuickToggle('autoBackup')}
                disabled={loading}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 ${
                  quickSettings.autoBackup ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  quickSettings.autoBackup ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Changes are applied immediately</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickSettingsModal;
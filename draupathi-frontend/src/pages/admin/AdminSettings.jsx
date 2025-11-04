import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Shield,
  Bell,
  Database,
  Globe,
  Palette,
  Mail,
  Key,
  Upload,
  Download,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Info,
  Lock,
  Unlock,
  Server,
  Cloud,
  Monitor,
  Smartphone
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Draupathi Enterprise',
      siteDescription: 'Your trusted business partner',
      siteUrl: 'https://draupathi.com',
      adminEmail: 'admin@draupathi.com',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      language: 'en'
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      passwordRequireSpecialChars: true,
      passwordRequireNumbers: true,
      passwordRequireUppercase: true,
      loginAttempts: 5,
      lockoutDuration: 15
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      newUserRegistration: true,
      newOrders: true,
      systemAlerts: true,
      maintenanceMode: false,
      marketingEmails: false
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      logoUrl: '/logo.png',
      faviconUrl: '/favicon.ico',
      customCSS: '',
      enableAnimations: true,
      compactMode: false
    },
    integrations: {
      googleAnalytics: '',
      facebookPixel: '',
      googleMaps: '',
      recaptchaSiteKey: '',
      recaptchaSecretKey: '',
      cloudinaryCloudName: '',
      cloudinaryApiKey: '',
      cloudinaryApiSecret: ''
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30,
      backupLocation: 'cloud',
      includeUploads: true,
      includeDatabase: true
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', settings);
      // Show success notification
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
            <input
              type="text"
              value={settings.general.siteName}
              onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
            <input
              type="email"
              value={settings.general.adminEmail}
              onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
            <textarea
              value={settings.general.siteDescription}
              onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
            <input
              type="url"
              value={settings.general.siteUrl}
              onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.general.timezone}
              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select
              value={settings.general.dateFormat}
              onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={settings.general.language}
              onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication & Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                settings.security.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
              <input
                type="number"
                value={settings.security.passwordMinLength}
                onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
              <input
                type="number"
                value={settings.security.loginAttempts}
                onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Duration (minutes)</label>
              <input
                type="number"
                value={settings.security.lockoutDuration}
                onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Password Requirements</h4>
            <div className="space-y-2">
              {[
                { key: 'passwordRequireSpecialChars', label: 'Require special characters' },
                { key: 'passwordRequireNumbers', label: 'Require numbers' },
                { key: 'passwordRequireUppercase', label: 'Require uppercase letters' }
              ].map(req => (
                <label key={req.key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.security[req.key]}
                    onChange={(e) => handleSettingChange('security', req.key, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{req.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications', icon: Bell },
            { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS', icon: Smartphone }
          ].map(notif => (
            <div key={notif.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <notif.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{notif.label}</h4>
                  <p className="text-sm text-gray-600">{notif.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', notif.key, !settings.notifications[notif.key])}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.notifications[notif.key] ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.notifications[notif.key] ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Notifications</h3>
        <div className="space-y-2">
          {[
            { key: 'newUserRegistration', label: 'New user registrations' },
            { key: 'newOrders', label: 'New orders' },
            { key: 'systemAlerts', label: 'System alerts and errors' },
            { key: 'maintenanceMode', label: 'Maintenance mode alerts' },
            { key: 'marketingEmails', label: 'Marketing and promotional emails' }
          ].map(event => (
            <label key={event.key} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={settings.notifications[event.key]}
                onChange={(e) => handleSettingChange('notifications', event.key, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{event.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const AppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme & Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {['light', 'dark'].map(theme => (
                <button
                  key={theme}
                  onClick={() => handleSettingChange('appearance', 'theme', theme)}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    settings.appearance.theme === theme
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-8 rounded mb-2 ${theme === 'light' ? 'bg-white border' : 'bg-gray-800'}`} />
                  <span className="text-sm font-medium capitalize">{theme}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <div className="flex space-x-3">
              <input
                type="color"
                value={settings.appearance.primaryColor}
                onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
                className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.appearance.primaryColor}
                onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
            <div className="flex space-x-3">
              <input
                type="color"
                value={settings.appearance.secondaryColor}
                onChange={(e) => handleSettingChange('appearance', 'secondaryColor', e.target.value)}
                className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.appearance.secondaryColor}
                onChange={(e) => handleSettingChange('appearance', 'secondaryColor', e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
            <input
              type="url"
              value={settings.appearance.logoUrl}
              onChange={(e) => handleSettingChange('appearance', 'logoUrl', e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
            <input
              type="url"
              value={settings.appearance.faviconUrl}
              onChange={(e) => handleSettingChange('appearance', 'faviconUrl', e.target.value)}
              placeholder="https://example.com/favicon.ico"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interface Options</h3>
        <div className="space-y-2">
          {[
            { key: 'enableAnimations', label: 'Enable animations and transitions' },
            { key: 'compactMode', label: 'Compact mode (reduced spacing)' }
          ].map(option => (
            <label key={option.key} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={settings.appearance[option.key]}
                onChange={(e) => handleSettingChange('appearance', option.key, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
        <textarea
          value={settings.appearance.customCSS}
          onChange={(e) => handleSettingChange('appearance', 'customCSS', e.target.value)}
          placeholder="/* Your custom CSS here */"
          rows="6"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        />
      </div>
    </div>
  );

  const IntegrationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Third-Party Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics Tracking ID</label>
            <input
              type="text"
              value={settings.integrations.googleAnalytics}
              onChange={(e) => handleSettingChange('integrations', 'googleAnalytics', e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
            <input
              type="text"
              value={settings.integrations.facebookPixel}
              onChange={(e) => handleSettingChange('integrations', 'facebookPixel', e.target.value)}
              placeholder="123456789012345"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps API Key</label>
            <input
              type="text"
              value={settings.integrations.googleMaps}
              onChange={(e) => handleSettingChange('integrations', 'googleMaps', e.target.value)}
              placeholder="AIza..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">reCAPTCHA Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Key</label>
            <input
              type="text"
              value={settings.integrations.recaptchaSiteKey}
              onChange={(e) => handleSettingChange('integrations', 'recaptchaSiteKey', e.target.value)}
              placeholder="6Le..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.integrations.recaptchaSecretKey}
                onChange={(e) => handleSettingChange('integrations', 'recaptchaSecretKey', e.target.value)}
                placeholder="6Le..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cloudinary Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cloud Name</label>
            <input
              type="text"
              value={settings.integrations.cloudinaryCloudName}
              onChange={(e) => handleSettingChange('integrations', 'cloudinaryCloudName', e.target.value)}
              placeholder="your-cloud-name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <input
              type="text"
              value={settings.integrations.cloudinaryApiKey}
              onChange={(e) => handleSettingChange('integrations', 'cloudinaryApiKey', e.target.value)}
              placeholder="123456789012345"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Secret</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.integrations.cloudinaryApiSecret}
                onChange={(e) => handleSettingChange('integrations', 'cloudinaryApiSecret', e.target.value)}
                placeholder="your-api-secret"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BackupSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automatic Backup</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Enable Automatic Backup</h4>
                <p className="text-sm text-gray-600">Automatically backup your data on a regular schedule</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('backup', 'autoBackup', !settings.backup.autoBackup)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.backup.autoBackup ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                settings.backup.autoBackup ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
              <select
                value={settings.backup.backupFrequency}
                onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Retention Days</label>
              <input
                type="number"
                value={settings.backup.retentionDays}
                onChange={(e) => handleSettingChange('backup', 'retentionDays', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Location</label>
              <select
                value={settings.backup.backupLocation}
                onChange={(e) => handleSettingChange('backup', 'backupLocation', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="local">Local Storage</option>
                <option value="cloud">Cloud Storage</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Backup Content</h4>
            <div className="space-y-2">
              {[
                { key: 'includeDatabase', label: 'Include database', icon: Database },
                { key: 'includeUploads', label: 'Include uploaded files', icon: Upload }
              ].map(item => (
                <label key={item.key} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.backup[item.key]}
                    onChange={(e) => handleSettingChange('backup', item.key, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            <span>Create Backup</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5" />
            <span>Restore Backup</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="w-5 h-5" />
            <span>View Backups</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'security': return <SecuritySettings />;
      case 'notifications': return <NotificationSettings />;
      case 'appearance': return <AppearanceSettings />;
      case 'integrations': return <IntegrationsSettings />;
      case 'backup': return <BackupSettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your system preferences and configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import AnimatedSection from '../common/AnimatedSection';

const ThemeDemo = () => {
  const { isDark, theme, systemPreference } = useTheme();

  const demoCards = [
    {
      title: 'Light Mode Features',
      description: 'Clean, bright interface with excellent readability during daytime usage.',
      features: [
        'High contrast text',
        'Bright backgrounds',
        'Vibrant colors',
        'Professional appearance'
      ],
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-200'
    },
    {
      title: 'Dark Mode Features',
      description: 'Easy on the eyes with reduced blue light for comfortable nighttime browsing.',
      features: [
        'Reduced eye strain',
        'Better for low light',
        'Saves battery on OLED',
        'Modern aesthetic'
      ],
      bgColor: 'bg-gray-800 dark:bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-gray-600 dark:border-gray-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Theme System Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Experience seamless switching between light and dark modes. 
            Our theme system adapts to your preferences and system settings.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <ThemeToggle size="lg" showLabel={true} />
            
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>Current Theme: <span className="font-semibold capitalize text-gray-700 dark:text-gray-300">{theme}</span></p>
              <p>System Preference: <span className="font-semibold capitalize text-gray-700 dark:text-gray-300">{systemPreference}</span></p>
            </div>
          </div>
        </AnimatedSection>

        {/* Theme Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {demoCards.map((card, index) => (
            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
              <motion.div
                className={`p-8 rounded-2xl shadow-lg border ${card.bgColor} ${card.borderColor} transition-all duration-300`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-2xl font-bold ${card.textColor} mb-4`}>
                  {card.title}
                </h3>
                <p className={`${card.textColor} mb-6 leading-relaxed opacity-80`}>
                  {card.description}
                </p>
                
                <ul className="space-y-3">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
                      <span className={`${card.textColor} opacity-80`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Color Palette Showcase */}
        <AnimatedSection animation="fadeInUp" className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Adaptive Color Palette
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Primary', light: 'bg-blue-600', dark: 'dark:bg-blue-500' },
                { name: 'Secondary', light: 'bg-green-600', dark: 'dark:bg-green-500' },
                { name: 'Accent', light: 'bg-purple-600', dark: 'dark:bg-purple-500' },
                { name: 'Success', light: 'bg-emerald-600', dark: 'dark:bg-emerald-500' },
                { name: 'Warning', light: 'bg-yellow-600', dark: 'dark:bg-yellow-500' },
                { name: 'Error', light: 'bg-red-600', dark: 'dark:bg-red-500' },
              ].map((color, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-full h-20 rounded-lg ${color.light} ${color.dark} mb-3 shadow-md`} />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{color.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Component Showcase */}
        <AnimatedSection animation="fadeInUp">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Component Adaptability
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Button Showcase */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Buttons</h4>
                <div className="space-y-3">
                  <motion.button
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Primary Button
                  </motion.button>
                  <motion.button
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Secondary Button
                  </motion.button>
                </div>
              </div>

              {/* Input Showcase */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Form Elements</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Sample input"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Option</option>
                    <option>Light Mode</option>
                    <option>Dark Mode</option>
                  </select>
                </div>
              </div>

              {/* Card Showcase */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Cards</h4>
                <motion.div
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Sample Card</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This card adapts its colors based on the selected theme.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Technical Features */}
        <AnimatedSection animation="fadeInUp" className="mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Technical Features
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '💾',
                  title: 'Persistent Storage',
                  description: 'Theme preference is saved locally'
                },
                {
                  icon: '🔄',
                  title: 'System Sync',
                  description: 'Automatically detects system theme'
                },
                {
                  icon: '⚡',
                  title: 'Smooth Transitions',
                  description: 'Seamless theme switching animations'
                },
                {
                  icon: '🎨',
                  title: 'Complete Coverage',
                  description: 'All components support both themes'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ThemeDemo;
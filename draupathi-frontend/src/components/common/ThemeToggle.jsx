import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Icons
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
    />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
    />
  </svg>
);

const ThemeToggle = ({ className = "", showLabel = false, size = "md" }) => {
  const { isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-2.5"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Theme
        </span>
      )}
      
      <motion.button
        onClick={toggleTheme}
        className={`
          ${sizeClasses[size]}
          relative rounded-xl 
          bg-gray-100 dark:bg-gray-800 
          text-gray-700 dark:text-gray-300
          hover:bg-gray-200 dark:hover:bg-gray-700
          border border-gray-200 dark:border-gray-600
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          shadow-sm hover:shadow-md
          group
        `}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {/* Background gradient overlay */}
        <div className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ${isDark 
            ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
            : 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20'
          }
        `} />
        
        {/* Icon container with rotation animation */}
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`relative z-10 ${iconSizes[size]}`}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 ${isDark ? 'bg-blue-400' : 'bg-yellow-400'} rounded-full`}
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: '100%', 
                opacity: 0,
                scale: 0 
              }}
              animate={{ 
                y: '-20%', 
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 3 
              }}
            />
          ))}
        </div>
      </motion.button>

      {showLabel && (
        <motion.span 
          key={isDark ? 'dark-label' : 'light-label'}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-gray-500 dark:text-gray-400 capitalize"
        >
          {isDark ? 'Dark' : 'Light'}
        </motion.span>
      )}
    </div>
  );
};

export default ThemeToggle;
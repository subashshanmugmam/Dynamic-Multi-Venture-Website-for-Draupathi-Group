import React from 'react';

const VentureIcon = ({ icon, className = "w-5 h-5" }) => {
  const getIconPath = (iconName) => {
    switch (iconName) {
      case '💻':
      case 'it-solutions':
        return "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-2 2V5H5v14h2v2H4a1 1 0 01-1-1V4z M9 7h6v2H9V7z M9 11h6v2H9v-2z M16.414 9L15 10.414 18.586 14H15v2h6v-6h-2v3.586L16.414 9z";
      
      case '🌱':
      case 'irrigations':
        return "M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z M7 14l1.5 3.5L12 16L10.5 12.5L7 14Z";
      
      case '🍯':
      case 'd-foods':
        return "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z";
      
      default:
        // Return a default generic icon
        return "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z";
    }
  };

  // If it's an emoji, just render it as text
  if (typeof icon === 'string' && /\p{Emoji}/u.test(icon)) {
    return <span className={`${className} flex items-center justify-center`}>{icon}</span>;
  }

  // Otherwise render as SVG
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d={getIconPath(icon)} />
    </svg>
  );
};

export default VentureIcon;
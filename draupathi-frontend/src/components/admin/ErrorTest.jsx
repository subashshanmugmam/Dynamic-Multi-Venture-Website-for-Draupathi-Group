import React from 'react';

// Simple test component that intentionally throws an error for testing ErrorBoundary
const ErrorTest = ({ shouldError = false }) => {
  if (shouldError) {
    // This will throw an error and be caught by ErrorBoundary
    throw new Error('Test error for ErrorBoundary');
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-green-800 font-medium">Error Test Component</h3>
      <p className="text-green-700 text-sm">This component is working normally.</p>
    </div>
  );
};

export default ErrorTest;
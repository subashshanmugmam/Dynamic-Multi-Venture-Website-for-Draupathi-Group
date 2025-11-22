// Frontend is running independently - no backend connection required
// All data is managed locally via constants and state management

// Mock API service for future backend integration
export const apiService = {
  // Note: This is a placeholder for when backend integration is needed
  // Currently, the frontend runs completely independently
  
  contact: {
    // Contact form uses EmailJS directly - see Contact.jsx
    submit: () => Promise.resolve({ success: true, message: 'Using EmailJS for contact submissions' }),
  },
};

export default apiService;
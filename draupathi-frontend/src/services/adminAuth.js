// Admin authentication API service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const adminAuthAPI = {
  // Admin login
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });

    return handleResponse(response);
  },

  // Get current admin user
  getMe: async () => {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}/api/admin/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      credentials: 'include'
    });

    return handleResponse(response);
  },

  // Admin logout
  logout: async () => {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}/api/admin/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      credentials: 'include'
    });

    return handleResponse(response);
  }
};

// Helper function to handle API responses
async function handleResponse(response) {
  let data;
  
  try {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { 
        success: false, 
        error: text || `HTTP ${response.status}` 
      };
    }
  } catch (parseError) {
    console.error('Failed to parse response:', parseError);
    data = { 
      success: false, 
      error: `Failed to parse server response: ${parseError.message}` 
    };
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `HTTP ${response.status}`);
  }

  return data;
}

export default adminAuthAPI;
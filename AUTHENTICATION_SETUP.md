# Development Setup Instructions

## Authentication 401 Errors - This is Normal!

If you see 401 (Unauthorized) errors in the browser console like:
```
AuthContext.jsx:45 GET http://localhost:5000/api/auth/me 401 (Unauthorized)
```

**This is completely normal and expected behavior!** Here's why:

### What's Happening:
1. When the app loads, it automatically checks if there's an authenticated user
2. Since no user is logged in initially, the backend correctly returns 401 (Unauthorized)
3. The frontend handles this gracefully and shows the login form
4. The AuthContext has been updated to handle these errors silently

### To Fix Backend Connection Issues:

1. **Start the Backend Server:**
   ```bash
   cd draupathi-backend
   npm install
   npm start
   ```

2. **Start the Frontend Server:**
   ```bash
   cd draupathi-frontend  
   npm install
   npm run dev
   ```

3. **Check Backend Health:**
   Visit: http://localhost:5000/health
   Should show: `{"status":"OK","message":"Draupathi Group API is running"}`

### Admin Login:
To test the admin functionality:
1. Make sure backend is running
2. Go to: http://localhost:5173/admin/login
3. Use test credentials or register a new admin user

### Normal Console Messages:
✅ These are **NORMAL** and can be ignored:
- `Authentication required` (when not logged in)
- `Backend server not available` (when backend is not running)
- `401 (Unauthorized)` errors on initial load

❌ These need attention:
- Network errors when backend should be running
- CORS errors
- 500 server errors

The authentication system is working correctly - the 401 errors just mean "no user is currently logged in" which is the expected initial state!
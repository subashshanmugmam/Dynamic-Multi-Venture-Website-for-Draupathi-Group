# 🔧 Admin Login 500 Error - Complete Fix Guide

## ❌ Problem
Getting a 500 Internal Server Error when trying to login at `/admin/login` with admin credentials.

## ✅ Complete Solution

### Step 1: Setup Admin System
Run this command in the backend directory to properly setup the admin user and test the system:

```bash
cd draupathi-backend
npm run setup-admin
```

This script will:
- ✅ Connect to MongoDB
- 🧹 Clean up any existing admin users
- 👤 Create a fresh admin user with correct permissions
- 🧪 Test authentication methods
- 🔑 Test JWT token generation
- 📋 Display login credentials

### Step 2: Start Backend Server
Start the backend server with detailed logging:

```bash
cd draupathi-backend
npm start
```

Look for these success indicators:
- ✅ MongoDB Connected
- 🚀 Server running on port 5000
- No error messages in the logs

### Step 3: Test Admin Login
Navigate to: `http://localhost:5173/admin/login`

Use these credentials:
- **Email**: `admin@draupathi.com`
- **Password**: `Admin@123`

## 🔍 What Was Fixed

### 1. **Environment Variables**
Added missing JWT configuration:
```env
JWT_ACCESS_SECRET=draupathi-jwt-secret-change-in-production-2024
JWT_REFRESH_SECRET=draupathi-refresh-secret-change-in-production-2024
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
```

### 2. **Validation Middleware**
Added proper validation handling to admin login route:
```javascript
router.post('/auth/login', loginValidation, validationMiddleware, adminAuthController.login);
```

### 3. **Error Handling**
Enhanced admin auth controller with:
- ✅ Detailed error logging
- ✅ Proper error response formats
- ✅ Validation error handling
- ✅ Authentication error handling

### 4. **Admin User Setup**
Created proper admin user with:
- ✅ Correct password hashing
- ✅ Required permissions
- ✅ Active status
- ✅ No account locks

## 🧪 Testing Scripts Available

### Debug Scripts:
```bash
npm run debug-admin    # Test admin user creation and auth methods
npm run test-admin     # Test the complete login flow
npm run setup-admin    # Complete admin system setup
```

## 📋 Verification Checklist

After running the setup, verify these work:

- [ ] Backend server starts without errors
- [ ] MongoDB connection successful
- [ ] Admin user exists in database
- [ ] JWT tokens generate correctly
- [ ] Admin login page loads (`/admin/login`)
- [ ] Login with `admin@draupathi.com` / `Admin@123` works
- [ ] Redirects to admin dashboard after login
- [ ] No 500 errors in browser console

## 🚨 If Still Getting Errors

### Check Backend Logs
Look for these specific error patterns:
```bash
# In the backend console, check for:
❌ Admin login error: [specific error message]
❌ MongoDB connection error
❌ JWT generation error
❌ Validation error
```

### Manual Verification
1. **Test MongoDB Connection**:
   ```bash
   cd draupathi-backend
   node scripts/debugAdmin.js
   ```

2. **Check Environment Variables**:
   ```bash
   # Verify .env file has:
   MONGODB_URI=mongodb://localhost:27017/DIT
   JWT_ACCESS_SECRET=[some value]
   JWT_REFRESH_SECRET=[some value]
   ```

3. **Test API Endpoint Directly**:
   ```bash
   curl -X POST http://localhost:5000/api/admin/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@draupathi.com","password":"Admin@123"}'
   ```

## 🎯 Expected Success Response

When login works correctly, you should see:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "Super Admin",
      "email": "admin@draupathi.com",
      "role": "super_admin"
    },
    "tokens": {
      "accessToken": "eyJ..."
    }
  }
}
```

## 🔐 Security Notes

- ⚠️ **Change the default password** after first successful login
- 🔒 Admin accounts use separate authentication from public users
- 🚪 Admin login URL is `/admin/login`, not `/login`
- 🛡️ Account locks after multiple failed attempts

---

Run `npm run setup-admin` and the admin login should work perfectly! 🚀
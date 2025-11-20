# Draupathi Group - Full Stack Setup Guide

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
3. **Git** - [Download](https://git-scm.com/)

### Installation Steps

#### 1. Install Dependencies

**Backend:**
```powershell
cd draupathi-backend
npm install
```

**Frontend:**
```powershell
cd draupathi-frontend
npm install
```

#### 2. Configure Environment

The backend `.env` file is already configured with default development settings:
- MongoDB: `mongodb://localhost:27017/DIT`
- Backend Port: `5000`
- Frontend URL: `http://localhost:5173`

**Important:** Update Cloudinary credentials in `.env` if you need image upload functionality.

#### 3. Start MongoDB

**Windows Service:**
```powershell
net start MongoDB
```

**Or Manual Start:**
```powershell
mongod --dbpath "C:\data\db"
```

#### 4. Create Admin User (First Time Only)

```powershell
cd draupathi-backend
npm run seed-admin
```

**Default Admin Credentials:**
- Email: `admin@draupathi.com`
- Password: `Admin@123`

**⚠️ Change these credentials after first login!**

### 🎯 Running the Application

#### Option 1: Automated Start (Recommended)
```powershell
.\start-all.ps1
```
This will start both frontend and backend in separate terminals.

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```powershell
cd draupathi-backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd draupathi-frontend
npm run dev
```

### 📍 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main website |
| **Backend API** | http://localhost:5000 | REST API |
| **Health Check** | http://localhost:5000/health | Server status |
| **Admin Panel** | http://localhost:5173/admin | Admin dashboard |

### 🔑 Admin Panel Access

1. Navigate to: http://localhost:5173/admin/login
2. Login with default credentials (or your custom ones)
3. Access admin features:
   - Dashboard with analytics
   - Content management (banners, announcements, products)
   - User management
   - Settings & configurations

### 🛠️ Available Features

#### Public Features
- ✅ Multi-venture showcase (IT Solutions, Foods, Irrigation)
- ✅ Dynamic home page with banners
- ✅ About page with company info
- ✅ Contact form
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Animated sections

#### Admin Features
- ✅ Secure authentication with JWT
- ✅ Dashboard with statistics
- ✅ Content Management:
  - Banners (homepage carousel)
  - Announcements
  - Products
  - Ventures
- ✅ User management
- ✅ Settings panel (8 categories)
- ✅ Contact form submissions view

### 📂 Project Structure

```
DIT/
├── draupathi-backend/          # Node.js/Express backend
│   ├── src/
│   │   ├── server.js          # Entry point
│   │   ├── config/            # Database, Cloudinary config
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   └── utils/             # JWT utilities
│   ├── scripts/               # Setup scripts
│   ├── .env                   # Environment variables
│   └── package.json
│
├── draupathi-frontend/         # React/Vite frontend
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context (Auth, Theme)
│   │   ├── services/          # API service layer
│   │   └── utils/             # Helpers, constants
│   ├── public/                # Static assets
│   ├── vite.config.js         # Vite configuration
│   └── package.json
│
└── start-all.ps1              # Automated startup script
```

### 🔧 Backend API Endpoints

#### Public Endpoints
- `GET /health` - Health check
- `GET /api/content/banners` - Get banners
- `GET /api/content/announcements` - Get announcements
- `GET /api/content/products` - Get products
- `POST /api/contact` - Submit contact form
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Admin Endpoints (Requires Authentication)
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List users
- `POST /api/admin/content/banner` - Create banner
- `PUT /api/admin/content/banner/:id` - Update banner
- `DELETE /api/admin/content/banner/:id` - Delete banner
- Similar CRUD for announcements, products, ventures

### 🐛 Troubleshooting

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service
```powershell
net start MongoDB
```

#### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Kill the process or change port in `.env`
```powershell
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### CORS Errors
**Solution:** Already configured! The backend allows:
- localhost:5173 (Vite default)
- localhost:5174 (alternative)
- Proxy requests from Vite

#### Admin Login Not Working
**Solution:** Re-create admin user
```powershell
cd draupathi-backend
npm run seed-admin
```

#### Frontend Not Loading Data
1. Check if backend is running on port 5000
2. Open browser console (F12) for errors
3. Verify API proxy in `vite.config.js`

### 📊 Technology Stack

#### Backend
- **Framework:** Express.js 5
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (Access + Refresh tokens)
- **Security:** Helmet, CORS, Rate Limiting
- **File Upload:** Cloudinary
- **Validation:** Express Validator

#### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP
- **Routing:** React Router v7
- **State Management:** Context API
- **HTTP Client:** Axios
- **Forms:** React Hook Form + Zod
- **UI Components:** Headless UI, Lucide Icons

### 🔒 Security Features

- ✅ JWT-based authentication
- ✅ HTTP-only cookies for refresh tokens
- ✅ Password hashing with bcrypt
- ✅ Rate limiting on API endpoints
- ✅ Input sanitization
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ MongoDB query injection prevention

### 📝 Development Workflow

1. **Make Changes:** Edit files in `src/` directories
2. **Auto Reload:** Both servers auto-reload on file changes
3. **Test:** Test in browser at http://localhost:5173
4. **Commit:** Use git for version control
5. **Deploy:** Build for production when ready

### 🚀 Production Build

**Frontend:**
```powershell
cd draupathi-frontend
npm run build
```
Output will be in `dist/` folder.

**Backend:**
```powershell
cd draupathi-backend
npm start
```
Runs production server (without nodemon).

### 📞 Support

For issues or questions:
1. Check this README
2. Review error logs in terminals
3. Check browser console (F12)
4. Verify MongoDB is running
5. Ensure all dependencies are installed

---

**Happy Coding! 🎉**

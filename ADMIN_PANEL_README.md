# Draupathi Group Admin Panel

A comprehensive admin panel for managing the Draupathi Group website with authentication, user management, content management, and more.

## Features Implemented

### ✅ Core Infrastructure
- **Authentication System**: JWT-based authentication with access/refresh tokens
- **User Management**: Complete CRUD operations for admin users
- **Role-Based Permissions**: Granular permission system (superadmin, admin, editor, viewer)
- **Activity Logging**: Comprehensive audit trail for all admin actions
- **Dashboard Analytics**: Real-time statistics and insights

### ✅ Backend Components
- **Admin User Model**: Secure user model with password hashing and validation
- **Authentication Middleware**: JWT verification and permission checking
- **API Controllers**: RESTful endpoints for all admin operations
- **Database Models**: Mongoose schemas for all entities
- **Security Features**: Rate limiting, input validation, CORS configuration

### ✅ Frontend Components
- **Admin Login**: Secure login interface with form validation
- **Admin Dashboard**: Comprehensive overview with statistics and recent activity
- **User Management**: Complete interface for managing admin users
- **Content Management**: CMS interface for pages, blogs, and SEO
- **Responsive Design**: Mobile-first design with smooth animations

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd draupathi-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/draupathi-group
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-refresh-token-secret
   JWT_ACCESS_EXPIRY=15m
   JWT_REFRESH_EXPIRY=7d
   BCRYPT_ROUNDS=12
   
   # Optional: Custom admin credentials
   DEFAULT_ADMIN_EMAIL=admin@draupathi.com
   DEFAULT_ADMIN_NAME=Super Admin
   DEFAULT_ADMIN_PASSWORD=Admin@123
   ```

4. **Create default admin user:**
   ```bash
   npm run seed-admin
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd draupathi-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file with:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Access the Admin Panel

1. **Open your browser and navigate to:**
   - Frontend: `http://localhost:5173`
   - Admin Panel: `http://localhost:5173/admin/login`

2. **Default admin credentials:**
   - **Email**: `admin@draupathi.com`
   - **Password**: `Admin@123`
   
   ⚠️ **Important**: Change the default password after first login!

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `POST /api/admin/auth/refresh` - Refresh access token
- `GET /api/admin/auth/me` - Get current user info

### User Management
- `GET /api/admin/users` - List all users (with pagination)
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/toggle-status` - Toggle user status

### Dashboard
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/dashboard/activity` - Get recent activity
- `GET /api/admin/dashboard/analytics` - Get analytics data

## User Roles & Permissions

### Roles
- **Super Admin**: Full access to all features including system settings
- **Admin**: Full access except system-critical settings
- **Editor**: Can create, read, and update content
- **Viewer**: Read-only access to most content

### Permission System
Granular permissions for different resources:
- `users.*` - User management permissions
- `content.*` - Content management permissions
- `ventures.*` - Venture management permissions
- `products.*` - Product management permissions
- `banners.*` - Banner management permissions
- `announcements.*` - Announcement permissions
- `contacts.*` - Contact form permissions
- `media.*` - Media library permissions
- `settings.*` - System settings permissions

## Security Features

- **Password Hashing**: bcrypt with configurable rounds
- **JWT Tokens**: Separate access and refresh tokens
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive data validation
- **Activity Logging**: Full audit trail of admin actions
- **CORS Configuration**: Secure cross-origin requests
- **Session Management**: Proper token lifecycle management

## Upcoming Features

### 🚧 In Development
- **Content Management**: Full CMS with rich text editor
- **Venture Management**: Complete venture portfolio management
- **Product Management**: Product catalog and inventory
- **Banner Management**: Homepage banner and slider management
- **Announcement System**: Site-wide announcements
- **Contact Form Management**: Inquiry and contact handling
- **Media Library**: File upload and management system
- **SEO Management**: Meta tags and structured data
- **Analytics Integration**: Google Analytics and reporting
- **Email Templates**: Customizable email notifications
- **Backup System**: Automated database backups
- **Multi-language Support**: Internationalization

### 🎯 Planned Features
- **Advanced Analytics**: Custom reporting and insights
- **Workflow Management**: Content approval workflows
- **API Documentation**: Interactive API docs
- **Export/Import**: Data migration tools
- **Performance Monitoring**: System health dashboard
- **Security Scanning**: Vulnerability assessments

## Project Structure

```
draupathi-backend/
├── src/
│   ├── controllers/          # API controllers
│   ├── middleware/           # Express middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── server.js            # Entry point
├── scripts/                 # Database scripts
└── package.json

draupathi-frontend/
├── src/
│   ├── components/          # Reusable components
│   ├── layouts/             # Layout components
│   ├── pages/               # Page components
│   │   └── admin/           # Admin pages
│   ├── services/            # API services
│   └── App.jsx              # Main app component
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## Support

For issues and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ for Draupathi Group**
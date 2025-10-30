# Dynamic Multi-Venture Website for Draupathi Group

A modern, responsive multi-venture website built with React and Express.js for Draupathi Group, showcasing their diverse business portfolio including IT Solutions, Irrigation Systems, and Food Products.

## 🌟 Features

### Frontend (React)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Dynamic theme switching with system preference detection
- **Animated UI**: Smooth animations using Framer Motion and GSAP
- **Modern Navigation**: Responsive navbar with dropdown menus
- **Multi-venture Portfolio**: Dedicated pages for each business venture
- **Contact Forms**: Interactive contact and inquiry forms
- **Performance Optimized**: Code splitting and lazy loading

### Backend (Express.js)
- **RESTful API**: Clean API architecture with proper error handling
- **JWT Authentication**: Secure user authentication and authorization
- **Rate Limiting**: API protection against abuse
- **File Upload**: Cloudinary integration for image management
- **Data Validation**: Comprehensive input validation and sanitization
- **MongoDB Integration**: Robust database operations
- **Security Features**: Helmet, CORS, and security middleware

## 🚀 Tech Stack

### Frontend
- **React 18** with Hooks and Context API
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **GSAP** for complex animations
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Cloudinary** for file storage
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests

## 📁 Project Structure

```
├── draupathi-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/         # Shared components
│   │   │   ├── layout/         # Layout components
│   │   │   └── admin/          # Admin-specific components
│   │   ├── pages/              # Page components
│   │   ├── context/            # React Context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service functions
│   │   ├── utils/              # Utility functions
│   │   └── styles/             # Global styles
│   ├── public/                 # Static assets
│   └── package.json
│
└── draupathi-backend/          # Express.js backend API
    ├── src/
    │   ├── controllers/        # Route controllers
    │   ├── middleware/         # Custom middleware
    │   ├── models/             # Database models
    │   ├── routes/             # API routes
    │   ├── utils/              # Utility functions
    │   └── config/             # Configuration files
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd draupathi-backend
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/DIT
   JWT_SECRET=your-jwt-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   CORS_ORIGIN=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd draupathi-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file (optional):
   ```bash
   # Create .env.local for custom API URL
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Content Management
- `GET /api/content/banners` - Get homepage banners
- `GET /api/content/ventures` - Get venture information
- `POST /api/content/ventures` - Create venture (Admin)
- `PUT /api/content/ventures/:id` - Update venture (Admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (Admin)

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/users` - Manage users (Super Admin)

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (#0ea5e9 to #0c4a6e)
- **Secondary**: Green shades (#22c55e to #14532d)
- **Accent**: Yellow/Orange shades (#fba916 to #7c4f12)

### Typography
- **Font Family**: Inter (system fallbacks included)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with optimized line heights

### Components
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Cards**: Consistent shadow and border radius
- **Forms**: Styled inputs with validation states
- **Navigation**: Responsive with smooth animations

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet for security headers
- MongoDB injection protection

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid systems
- Touch-friendly interactions
- Optimized images and assets

## 🌙 Theme System

- System preference detection
- Manual theme switching
- localStorage persistence
- Smooth transitions
- Dark/light mode for all components

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy with start command: npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Subash Shanmugam
- **Organization**: Draupathi Group

## 📞 Support

For support, please contact [support@draupathigroup.com](mailto:support@draupathigroup.com)

---

**Built with ❤️ for Draupathi Group**
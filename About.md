# Master Prompt for GitHub Copilot: Draupathi Group Dynamic Website

## Project Overview
Build a professional, production-ready full-stack dynamic website for Draupathi Group with three ventures: Draupathi IT Solutions, Draupathi Irrigations, and D Foods. The website must feature stunning animations, smooth transitions, and complete admin control.

---

## Tech Stack Requirements

### Frontend
- **Framework**: React.js 18+ with Vite
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router DOM v6
- **State Management**: Context API + React Query
- **Animation Libraries**: 
  - Framer Motion (page transitions, scroll animations)
  - GSAP (complex animations)
  - React Intersection Observer (scroll triggers)
- **UI Components**: Headless UI or shadcn/ui
- **Charts**: Recharts for admin analytics
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **Image Optimization**: React Lazy Load Image Component
- **Icons**: Lucide React
- **Toast Notifications**: React Hot Toast or Sonner

### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (Access + Refresh tokens)
- **Security**: Helmet, CORS, express-rate-limit, express-mongo-sanitize
- **File Upload**: Multer + Cloudinary/AWS S3
- **Validation**: Joi or Express Validator
- **Environment**: dotenv
- **Image Processing**: Sharp

### DevOps
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Render or Railway
- **Version Control**: Git with proper .gitignore
- **Environment Variables**: Separate .env files for dev/prod

---

## Design & Animation Requirements

### Visual Design Principles
- Modern, professional corporate design
- Clean and minimalist interface
- High contrast for readability
- Consistent color scheme:
  - Primary: Deep blue/teal for IT solutions
  - Secondary: Green for irrigations
  - Accent: Warm colors for D Foods
- Gradient backgrounds and glassmorphism effects
- Neumorphic cards where appropriate

### Animation & Transition Requirements

#### Page Transitions
- Smooth fade-in/slide transitions between routes (300-500ms)
- Staggered animations for page elements
- Loading skeleton screens during data fetch

#### Scroll Animations
- Parallax effects on hero sections
- Fade-in + slide-up on scroll for content sections
- Scale and rotate effects for feature cards
- Progress indicators for long pages

#### Micro-interactions
- Hover effects on buttons (scale, glow, color shift)
- Smooth navbar transition on scroll (transparent → solid)
- Ripple effects on clickable elements
- Animated icons (rotate, bounce, pulse)
- Form input focus animations
- Loading spinners with brand colors

#### Hero Section Animations
- Typewriter effect or animated text reveal
- Floating/pulsing call-to-action buttons
- Animated background gradients or particles
- 3D card effects on venture cards

#### Component-Specific Animations
- **Navbar**: Smooth dropdown menus, mobile slide-in menu
- **Cards**: Hover lift effect, flip animations for features
- **Images**: Ken Burns effect, hover zoom
- **Counters**: Animated number counting on scroll
- **Timeline**: Animated progress line for company journey
- **Product Cards**: Stagger animation on load
- **Modal/Popup**: Scale in with backdrop blur

---

## Core Modules & Features

### 1. Home Page
**Components Needed:**
- Dynamic hero section with animated background
- Ventures overview with interactive cards
- Rotating banners/carousel with auto-play
- Company highlights with counter animations
- Latest announcements ticker/section
- Statistics section (projects completed, clients, etc.)
- Call-to-action sections
- Testimonials slider

**API Endpoints:**
```
GET /api/home/content - Fetch all home page dynamic content
GET /api/home/banners - Fetch active banners
GET /api/home/stats - Fetch company statistics
GET /api/announcements/latest - Latest announcements
```

### 2. About Page
**Components Needed:**
- Company overview section
- Animated timeline for company journey
- Mission, Vision, Values cards
- Leadership team grid
- Editable content sections

**API Endpoints:**
```
GET /api/about/content - Fetch about page content
GET /api/about/timeline - Company journey timeline
GET /api/about/team - Leadership team data
```

### 3. Ventures Module

#### a) Draupathi IT Solutions
- Services grid with detailed cards
- Portfolio/Projects showcase with filters
- Technology stack display
- Client logos carousel
- Case studies

#### b) Draupathi Irrigations
- Product catalog with categories
- Product detail pages
- Technical specifications
- Download brochures/catalogs
- Inquiry form

#### c) D Foods
- Product launches section
- Product categories (Navathanya specific)
- Nutritional information
- Recipe suggestions
- Store locator/Purchase links

**API Endpoints:**
```
GET /api/ventures/:ventureId - Venture details
GET /api/ventures/:ventureId/services - Services/Products
GET /api/ventures/:ventureId/projects - Projects portfolio
GET /api/products/:ventureId - Product listings
GET /api/products/:productId - Single product details
```

### 4. Contact Page
**Components Needed:**
- Interactive contact form with validation
- Office locations with Google Maps integration
- Contact cards for each venture
- Social media links
- Animated form submission feedback

**API Endpoints:**
```
POST /api/contact/submit - Submit contact form
GET /api/contact/info - Fetch contact information
```

### 5. Admin Dashboard

#### Dashboard Overview
- Analytics cards with animated charts
- Recent activity feed
- Quick action buttons
- Statistics overview

#### CRUD Features Required:
- **Content Management**: Home, About, Ventures content
- **Banner Management**: Upload, edit, delete, reorder banners
- **Venture Management**: Add/Edit services, products, projects
- **Product Management**: Full CRUD for D Foods products
- **Announcement Management**: Create, schedule, publish announcements
- **Team Management**: Add/remove team members
- **Contact Form**: View submissions, mark as read
- **Media Library**: Upload, organize, delete images
- **SEO Management**: Meta tags, descriptions per page
- **User Management**: Admin roles (if multi-admin)

**API Endpoints:**
```
POST /api/admin/login - Admin authentication
POST /api/admin/refresh - Refresh JWT token

# Content Management
PUT /api/admin/content/:section - Update content
POST /api/admin/banners - Create banner
PUT /api/admin/banners/:id - Update banner
DELETE /api/admin/banners/:id - Delete banner

# Venture Management
POST /api/admin/ventures/:ventureId/services - Add service
PUT /api/admin/ventures/:ventureId/services/:id - Update
DELETE /api/admin/ventures/:ventureId/services/:id - Delete

# Product Management
POST /api/admin/products - Create product
PUT /api/admin/products/:id - Update product
DELETE /api/admin/products/:id - Delete product
POST /api/admin/products/:id/images - Upload images

# Announcements
POST /api/admin/announcements - Create announcement
PUT /api/admin/announcements/:id - Update
DELETE /api/admin/announcements/:id - Delete

# Analytics
GET /api/admin/analytics - Dashboard statistics
GET /api/admin/contact-submissions - View form submissions
```

---

## Essential Features Checklist

### Frontend Must-Haves
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] Dark mode toggle (optional but impressive)
- [ ] Loading states for all async operations
- [ ] Error boundaries for graceful error handling
- [ ] 404 and error pages with animations
- [ ] SEO meta tags on all pages
- [ ] Open Graph tags for social sharing
- [ ] Lazy loading for images and routes
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Smooth scroll behavior
- [ ] Back to top button with animation
- [ ] Breadcrumb navigation
- [ ] Search functionality (optional)

### Backend Must-Haves
- [ ] Input validation on all endpoints
- [ ] Error handling middleware
- [ ] Request logging
- [ ] Rate limiting (prevent abuse)
- [ ] CORS configuration
- [ ] Helmet security headers
- [ ] MongoDB connection pooling
- [ ] Proper HTTP status codes
- [ ] API documentation (Swagger/Postman)
- [ ] Database indexing for performance
- [ ] Pagination for list endpoints
- [ ] File upload size limits
- [ ] Image optimization before storage

### Authentication & Security
- [ ] JWT with httpOnly cookies
- [ ] Refresh token rotation
- [ ] Password hashing (bcrypt)
- [ ] Protected admin routes
- [ ] CSRF protection
- [ ] XSS prevention (sanitize inputs)
- [ ] SQL injection prevention (use ORM)

---

## Folder Structure

### Frontend Structure
```
draupathi-frontend/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── AnimatedSection.jsx
│   │   ├── home/
│   │   ├── about/
│   │   ├── ventures/
│   │   └── admin/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── ventures/
│   │   └── admin/
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useIntersection.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── assets/
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### Backend Structure
```
draupathi-backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── env.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Content.js
│   │   ├── Banner.js
│   │   ├── Venture.js
│   │   ├── Product.js
│   │   └── Contact.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contentController.js
│   │   ├── adminController.js
│   │   └── contactController.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── content.routes.js
│   │   ├── admin.routes.js
│   │   └── contact.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validation.middleware.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── email.js
│   │   └── helpers.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

---

## Database Schema Design

### Content Collection
```javascript
{
  section: String, // 'home', 'about', 'footer', etc.
  key: String, // unique identifier
  value: Mixed, // content (text, object, array)
  type: String, // 'text', 'html', 'json'
  updatedAt: Date
}
```

### Banners Collection
```javascript
{
  title: String,
  subtitle: String,
  image: String, // URL
  link: String,
  order: Number,
  isActive: Boolean,
  createdAt: Date
}
```

### Ventures Collection
```javascript
{
  name: String, // 'IT Solutions', 'Irrigations', 'D Foods'
  slug: String,
  description: String,
  logo: String,
  services: [{
    title: String,
    description: String,
    icon: String,
    features: [String]
  }],
  projects: [{
    title: String,
    description: String,
    image: String,
    technologies: [String],
    link: String
  }]
}
```

### Products Collection
```javascript
{
  ventureId: ObjectId,
  name: String,
  slug: String,
  category: String,
  description: String,
  images: [String],
  specifications: Mixed,
  price: Number, // optional
  isLaunched: Boolean,
  launchDate: Date,
  createdAt: Date
}
```

### Announcements Collection
```javascript
{
  title: String,
  content: String,
  type: String, // 'info', 'product-launch', 'event'
  isActive: Boolean,
  publishDate: Date,
  expiryDate: Date
}
```

### Contact Submissions Collection
```javascript
{
  name: String,
  email: String,
  phone: String,
  venture: String,
  message: String,
  isRead: Boolean,
  submittedAt: Date
}
```

---

## Implementation Instructions for GitHub Copilot

### Step 1: Initialize Projects

**Frontend:**
```bash
npm create vite@latest draupathi-frontend -- --template react
cd draupathi-frontend
npm install react-router-dom axios react-hook-form zod framer-motion gsap react-intersection-observer tailwindcss postcss autoprefixer lucide-react react-hot-toast recharts react-lazy-load-image-component
npx tailwindcss init -p
```

**Backend:**
```bash
mkdir draupathi-backend && cd draupathi-backend
npm init -y
npm install express mongoose dotenv cors helmet express-rate-limit bcryptjs jsonwebtoken joi multer cloudinary sharp express-mongo-sanitize cookie-parser
npm install -D nodemon
```

### Step 2: Configure Tailwind CSS
Add animations and custom utilities to `tailwind.config.js`:
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

### Step 3: Development Guidelines

**For Every Component:**
- Use Framer Motion for page transitions
- Add intersection observer for scroll animations
- Implement loading and error states
- Ensure mobile responsiveness
- Add hover effects and micro-interactions
- Use semantic HTML
- Add proper ARIA labels

**Animation Implementation Pattern:**
```jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedComponent = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
    </motion.div>
  );
};
```

**API Call Pattern:**
```javascript
// With error handling and loading states
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/endpoint');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Step 4: Priority Order

**Week 1 (Days 1-7):**
1. Setup projects and folder structure
2. Database models and connection
3. Authentication system (JWT)
4. Basic frontend routing
5. Navbar with animations
6. Home page with hero section
7. Admin dashboard layout
8. Content CRUD APIs

**Week 2 (Days 8-15):**
1. About page with timeline
2. All three ventures pages
3. Product management system
4. Contact form with backend
5. Banner management
6. Announcement system
7. Admin analytics
8. Final testing and deployment

---

## Performance Optimization

- [ ] Code splitting for routes
- [ ] Image lazy loading
- [ ] Debounce search inputs
- [ ] Memoize expensive computations
- [ ] Compress images before upload
- [ ] Use CDN for static assets
- [ ] Enable gzip compression
- [ ] Database query optimization
- [ ] Implement caching (Redis optional)
- [ ] Minimize bundle size

---

## Testing & Quality Assurance

- Test all forms with validation
- Check responsive design on multiple devices
- Test all API endpoints with Postman
- Verify authentication flow
- Test file uploads
- Cross-browser testing
- Performance testing (Lighthouse)
- Accessibility audit

---

## Deployment Checklist

**Frontend (Vercel):**
- [ ] Build production bundle
- [ ] Set environment variables
- [ ] Configure redirects/rewrites
- [ ] Connect Git repository
- [ ] Enable automatic deployments

**Backend (Render/Railway):**
- [ ] Set all environment variables
- [ ] Configure MongoDB Atlas connection
- [ ] Set up Cloudinary/S3
- [ ] Enable CORS for production domain
- [ ] Set up health check endpoint
- [ ] Configure auto-deploy from Git

---

## Environment Variables

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_BASE_URL_PROD=https://your-backend.onrender.com/api
```

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

---

## Documentation Requirements

Create a comprehensive README.md with:
- Project description
- Features list
- Tech stack
- Installation instructions
- Environment variables guide
- API documentation
- Deployment guide
- Screenshots
- Contact information

---

## Success Criteria

✅ **Functionality (40%)**: All CRUD operations work, smooth data flow
✅ **UI/UX (25%)**: Beautiful animations, responsive, professional design
✅ **Code Quality (20%)**: Clean, organized, well-commented code
✅ **Timely Delivery (15%)**: Completed within 15 days

---

## Final Notes for GitHub Copilot

- Prioritize code quality and readability
- Add comments for complex logic
- Use consistent naming conventions
- Follow React and Node.js best practices
- Implement proper error handling everywhere
- Make animations smooth but not distracting (300-600ms duration)
- Ensure the website feels premium and professional
- Test thoroughly before marking complete

**Start by creating the project structure, then build module by module following the priority order. Focus on making each component production-ready with animations before moving to the next.**


Key Highlights:
🎨 Stunning Animations & Transitions

Framer Motion for smooth page transitions
GSAP for complex animations
Scroll-triggered animations with Intersection Observer
Micro-interactions on every element
Parallax effects, typewriter text, floating CTAs
Custom Tailwind animations

🏗️ Complete Architecture

Detailed folder structures for both frontend & backend
Complete API endpoint specifications
Database schemas for all collections
Authentication flow with JWT

✨ Production-Ready Features

Full CRUD operations for admin dashboard
Image upload with Cloudinary integration
Analytics with animated charts
SEO optimization
Responsive design
Security best practices

📋 Implementation Roadmap

Step-by-step 15-day development plan
Priority order for building modules
Code patterns for consistency
Testing checklist
Deployment guide

🎯 Evaluation Aligned
The prompt ensures all evaluation criteria are met:

Functionality & Stability (40%)
UI/UX & Responsiveness (25%) - with amazing animations
Code Quality & Optimization (20%)
Timely Submission (15%)
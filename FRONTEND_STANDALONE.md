# 🚀 Frontend Standalone Setup

## ✅ Frontend is Now Independent

The Draupathi Group website frontend now runs **completely independently** without requiring the backend server.

## 📋 What Changed

### 1. **Removed Backend Dependencies**
- ❌ Removed `axios` dependency
- ✅ Simplified `api.js` to a placeholder
- ✅ Contact form uses EmailJS directly (no backend needed)

### 2. **Static Content Management**
All content is managed through local files:
- **Ventures**: `src/utils/constants.js`
- **Pages**: Individual page components
- **Styling**: Tailwind CSS + custom styles

### 3. **Contact Form**
Uses **EmailJS** for email submissions:
- No backend database required
- Direct email delivery
- Configuration in `.env` file

## 🏃 How to Run

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend directory**:
   ```bash
   cd draupathi-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure EmailJS** (Optional - for contact form):
   Create/update `.env` file:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Access the website**:
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎯 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm test         # Run tests
```

## 📁 Project Structure

```
draupathi-frontend/
├── public/              # Static assets
│   ├── dgroups.png     # Logo
│   └── ...
├── src/
│   ├── assets/         # React assets
│   ├── components/     # Reusable components
│   │   ├── common/    # Common UI components
│   │   └── ...
│   ├── config/        # Configuration files
│   │   └── emailjs.config.js
│   ├── context/       # React context
│   │   └── ThemeContext.jsx
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── ventures/
│   ├── services/      # API service (placeholder)
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions & constants
│       └── constants.js   # Ventures data
├── .env               # Environment variables
└── package.json       # Dependencies
```

## 🔧 Content Management

### Update Ventures
Edit `src/utils/constants.js`:

```javascript
export const VENTURES = [
  {
    id: 'it-solutions',
    name: 'Draupathi IT Solutions',
    slug: 'it-solutions',
    description: 'Your description here',
    color: '#0ea5e9',
    icon: '💻',
  },
  // Add more ventures...
];
```

### Update Pages
Edit individual page components in `src/pages/`:
- **Home**: `Home.jsx`
- **About**: `About.jsx`
- **Contact**: `Contact.jsx`
- **Ventures**: `ventures/Ventures.jsx`, `ventures/ITSolutions.jsx`, `ventures/DFoods.jsx`

### Update Styles
- **Global styles**: `src/index.css`
- **Component styles**: Tailwind classes in JSX
- **Theme**: `src/context/ThemeContext.jsx`

## 📧 EmailJS Setup (Contact Form)

1. **Create EmailJS account**: [https://www.emailjs.com](https://www.emailjs.com)

2. **Get credentials**:
   - Service ID
   - Template ID
   - Public Key

3. **Update `.env`**:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Template variables** (use in EmailJS template):
   - `{{from_name}}` - Sender name
   - `{{from_email}}` - Sender email
   - `{{phone}}` - Phone number
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content

## 🌐 Production Build

### Build the application:
```bash
npm run build
```

Output will be in `dist/` folder.

### Deploy to:
- **Netlify**: Drag & drop `dist` folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Use `gh-pages` package
- **Any static host**: Upload `dist` folder

### Environment Variables (Production)
Set these in your hosting platform:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## 🎨 Customization

### Colors & Branding
Update in `tailwind.config.js` and component files

### Logo
Replace `/public/dgroups.png` with your logo

### Fonts
Edit `src/index.css` to change font family

### Dark Mode
Already configured - toggle available in navbar

## 📝 Features

✅ **Fully Responsive** - Mobile, tablet, desktop
✅ **Dark Mode** - Toggle theme
✅ **Animations** - Framer Motion & GSAP
✅ **SEO Ready** - Meta tags configured
✅ **Fast Loading** - Optimized builds
✅ **Contact Form** - EmailJS integration
✅ **No Backend Required** - 100% static

## 🚫 What's NOT Included

Since frontend is standalone:
- ❌ No database
- ❌ No user authentication (admin panel disabled)
- ❌ No dynamic content management
- ❌ No file uploads

**Note**: All content changes require editing source files and redeploying.

## 🔮 Future Backend Integration

If you need backend features later:

1. **Keep the backend separate** - Run on different port
2. **Update `src/services/api.js`** - Restore API calls
3. **Add environment variable**: `VITE_API_BASE_URL=http://your-backend-url`
4. **Reinstall axios**: `npm install axios`

## 📞 Support

For issues or questions:
- Check component files for inline documentation
- Review console for errors
- Ensure EmailJS is configured for contact form

---

**The frontend is now completely independent and ready to deploy! 🎉**

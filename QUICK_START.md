# 🚀 Quick Start Guide - Draupathi Group Website

## Frontend Only (Recommended)

The website frontend runs **completely independently** - no backend required!

### Start in 3 Steps:

```bash
# 1. Navigate to frontend
cd draupathi-frontend

# 2. Install dependencies (if not done already)
npm install

# 3. Start the development server
npm run dev
```

**That's it!** Open [http://localhost:5173](http://localhost:5173) 🎉

---

## What Works Without Backend

✅ **All Pages**
- Home page with hero section
- About page with team info
- Ventures overview
- IT Solutions page
- D Foods page
- Contact form (via EmailJS)
- Privacy Policy & Terms of Service

✅ **Features**
- Dark mode toggle
- Responsive design
- Smooth animations
- Navigation menu
- Contact form submissions (EmailJS)

✅ **Content Management**
- Edit content in source files
- Update ventures in `src/utils/constants.js`
- Modify pages in `src/pages/`

---

## Optional: EmailJS Setup for Contact Form

The contact form uses EmailJS to send emails directly (no backend needed).

### Quick Setup:

1. **Get EmailJS credentials** from [emailjs.com](https://www.emailjs.com)

2. **Create `.env` file** in `draupathi-frontend/`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

3. **Restart dev server**

**Contact form will work immediately!**

---

## Production Build

### Build for deployment:

```bash
cd draupathi-frontend
npm run build
```

Upload the `dist/` folder to any static hosting:
- **Netlify** (drag & drop)
- **Vercel** (GitHub integration)
- **GitHub Pages**
- **Any web server**

---

## Backend (Optional - NOT Required)

The backend exists but is **not needed** for the website to function.

### Only run backend if you need:
- Admin panel for content management
- Database storage
- User authentication
- API endpoints

### To run backend (optional):

```bash
cd draupathi-backend
npm install
npm start
```

**Note**: Frontend works perfectly without this! ✨

---

## Folder Structure

```
DIT/
├── draupathi-frontend/     ⭐ THE MAIN WEBSITE
│   ├── src/
│   ├── public/
│   ├── .env               (EmailJS config)
│   └── package.json
│
├── draupathi-backend/      (Optional - not needed)
│   └── ...
│
└── FRONTEND_STANDALONE.md  (Detailed docs)
```

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for deployment
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check code
npm test            # Run tests
```

---

## Need Help?

📖 **Detailed Documentation**: See `FRONTEND_STANDALONE.md`

🔧 **Content Updates**: Edit files in `src/pages/` and `src/utils/constants.js`

🎨 **Styling**: Modify Tailwind classes in components

🌐 **Deployment**: Build with `npm run build` and upload `dist/` folder

---

**Your website is ready to go! Just run `npm run dev` in the frontend folder! 🚀**

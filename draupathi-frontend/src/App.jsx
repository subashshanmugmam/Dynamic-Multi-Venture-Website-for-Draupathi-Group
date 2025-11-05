import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Ventures from './pages/ventures/Ventures';
import ITSolutions from './pages/ventures/ITSolutions';
import Irrigations from './pages/ventures/Irrigations';
import DFoods from './pages/ventures/DFoods';
import ThemeDemo from './components/theme/ThemeDemo';
import ThemeTest from './pages/ThemeTest';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ContentManagement from './pages/admin/ContentManagement';
import ContentEditor from './pages/admin/ContentEditor';
import VentureManagement from './pages/admin/VentureManagement';
import ProductManagement from './pages/admin/ProductManagement';
import MediaLibrary from './pages/admin/MediaLibrary';
import BannerManagement from './pages/admin/BannerManagement';
import AnnouncementManagement from './pages/admin/AnnouncementManagement';
import ContactFormManagement from './pages/admin/ContactFormManagement';
import AdminSettings from './pages/admin/AdminSettings';
import DevelopmentNotice from './components/common/DevelopmentNotice';
import ErrorBoundary from './components/common/ErrorBoundary';
import PublicLogin from './pages/PublicLogin';
import './App.css';

const VentureDetail = () => (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Venture Detail Page Coming Soon
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Detailed information about our ventures will be available here soon.
      </p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DevelopmentNotice />
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="ventures" element={<Ventures />} />
                <Route path="ventures/it-solutions" element={<ITSolutions />} />
                <Route path="ventures/irrigations" element={<Irrigations />} />
                <Route path="ventures/d-foods" element={<DFoods />} />
                <Route path="contact" element={<Contact />} />
                <Route path="theme-demo" element={<ThemeDemo />} />
                <Route path="theme-test" element={<ThemeTest />} />
                <Route path="ventures/:slug" element={<VentureDetail />} />
                <Route path="login" element={<PublicLogin />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={
                  <ErrorBoundary fallbackMessage="Dashboard failed to load. The admin system might be starting up.">
                    <AdminDashboard />
                  </ErrorBoundary>
                } />
                <Route path="dashboard" element={
                  <ErrorBoundary fallbackMessage="Dashboard failed to load. The admin system might be starting up.">
                    <AdminDashboard />
                  </ErrorBoundary>
                } />
                <Route path="users" element={<UserManagement />} />
                <Route path="content" element={<ContentManagement />} />
                <Route path="content/create" element={<ContentEditor mode="create" />} />
                <Route path="content/edit/:id" element={<ContentEditor mode="edit" />} />
                <Route path="ventures/*" element={<VentureManagement />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="banners" element={<BannerManagement />} />
                <Route path="announcements" element={<AnnouncementManagement />} />
                <Route path="contacts" element={<ContactFormManagement />} />
                <Route path="settings/*" element={<AdminSettings />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

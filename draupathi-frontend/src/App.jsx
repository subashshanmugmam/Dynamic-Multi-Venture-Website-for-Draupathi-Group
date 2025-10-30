import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Ventures from './pages/ventures/Ventures';
import ITSolutions from './pages/ventures/ITSolutions';
import Irrigations from './pages/ventures/Irrigations';
import DFoods from './pages/ventures/DFoods';
import ThemeDemo from './components/theme/ThemeDemo';
import ThemeTest from './pages/ThemeTest';
import './App.css';

// Placeholder components for routes


const Login = () => (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Login Page Coming Soon
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Authentication system is being developed for a secure login experience.
      </p>
    </div>
  </div>
);

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

const Admin = () => (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Admin Dashboard Coming Soon
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Administrative interface is under development for managing content and settings.
      </p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
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
                <Route path="login" element={<Login />} />
                <Route path="admin" element={<Admin />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

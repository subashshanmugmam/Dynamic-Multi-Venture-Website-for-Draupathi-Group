import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, VENTURES } from '../../utils/constants';
import SocialIcon from './SocialIcon';
import VentureIcon from './VentureIcon';
import AnimatedSection from './AnimatedSection';

// Icons
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="space-y-4">
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-2xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>
                <span>Draupathi Group</span>
              </Link>
              <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
                Empowering businesses through innovative technology solutions, 
                sustainable irrigation systems, and quality food products.
              </p>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialIcon icon={social.icon} className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Our Ventures */}
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white dark:text-gray-100">Our Ventures</h3>
              <ul className="space-y-2">
                {VENTURES.map((venture, index) => (
                  <li key={index}>
                    <Link
                      to={`/ventures/${venture.slug}`}
                      className="flex items-center space-x-2 text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors group"
                    >
                      <div 
                        className="w-5 h-5 rounded flex items-center justify-center text-xs text-white group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: venture.color }}
                      >
                        <VentureIcon icon={venture.icon} className="w-3 h-3" />
                      </div>
                      <span>{venture.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white dark:text-gray-100">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Privacy Policy', path: '/privacy' },
                  { name: 'Terms of Service', path: '/terms' },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white dark:text-gray-100">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <LocationIcon />
                  <div>
                    <p className="text-gray-300 dark:text-gray-400 text-sm">
                      123 Business Park<br />
                      Technology City<br />
                      Chennai, Tamil Nadu 600001
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon />
                  <a 
                    href="tel:+911234567890"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    +91 12345 67890
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MailIcon />
                  <a 
                    href="mailto:info@draupathi.com"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    info@draupathi.com
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Newsletter Section */}
      <AnimatedSection animation="fadeInUp" delay={0.5}>
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold text-white dark:text-gray-100 mb-2">
                  Stay Updated
                </h3>
                <p className="text-gray-300 dark:text-gray-400 text-sm">
                  Subscribe to our newsletter for the latest updates and news.
                </p>
              </div>
              <div className="flex w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-100 rounded-l-lg border border-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center sm:text-left">
              © {currentYear} Draupathi Group. All rights reserved.
            </p>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-100 transition-colors text-sm"
            >
              <ArrowUpIcon />
              <span>Back to Top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
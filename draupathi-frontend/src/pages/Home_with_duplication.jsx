import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedCounter from '../components/common/AnimatedCounter';
import VentureIcon from '../components/common/VentureIcon';
import { useIntersection } from '../hooks/useIntersection';
import { VENTURES } from '../utils/constants';

// Icons
const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [counterRef, counterInView] = useIntersection({ threshold: 0.5 });

  // Premium banner data
  const banners = [
    {
      id: 1,
      title: "Innovating for a",
      subtitle: "Sustainable Future",
      description: "Leading the way in technology, agriculture, and food innovation with sustainable solutions that drive progress across multiple industries.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore Our Ventures",
      link: "/ventures",
      stats: [
        { label: "Years of Excellence", value: "15+", icon: "🏆" },
        { label: "Successful Projects", value: "200+", icon: "📈" },
        { label: "Satisfied Clients", value: "1000+", icon: "👥" }
      ]
    },
    {
      id: 2,
      title: "Advanced IT Solutions",
      subtitle: "Digital Transformation",
      description: "Comprehensive technology solutions including custom software development, cloud infrastructure, and cybersecurity services.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "IT Solutions",
      link: "/ventures/it-solutions"
    },
    {
      id: 3,
      title: "Smart Agriculture",
      subtitle: "Irrigation Innovation",
      description: "Revolutionary irrigation systems that optimize water usage and maximize agricultural productivity through smart technology.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Discover Irrigation",
      link: "/ventures/irrigations"
    },
    {
      id: 3,
      title: "Premium Food Products",
      subtitle: "Quality Nutrition from Farm to Table",
      description: "Delivering fresh, healthy, and sustainably sourced food products to communities worldwide.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      cta: "Taste Quality",
      link: "/ventures/d-foods"
    }
  ];

  const statistics = [
    { label: "Happy Clients", value: 500, suffix: "+" },
    { label: "Projects Completed", value: 1200, suffix: "+" },
    { label: "Years Experience", value: 15, suffix: "+" },
    { label: "Team Members", value: 100, suffix: "+" }
  ];

  const features = [
    "Industry-Leading Innovation",
    "24/7 Customer Support",
    "Sustainable Solutions",
    "Quality Assurance",
    "Global Reach",
    "Expert Team"
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "CEO, TechCorp India",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Draupathi Group transformed our business operations with their innovative IT solutions. Outstanding service and support!",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Farm Owner, Green Valley Farms",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Their smart irrigation system increased our crop yield by 40% while reducing water consumption. Incredible technology!",
      rating: 5
    },
    {
      id: 3,
      name: "Amit Patel",
      position: "Restaurant Chain Owner",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "D Foods consistently delivers fresh, quality products. Their supply chain management is exceptional and reliable.",
      rating: 5
    }
  ];

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Hero animations
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Images */}
        {banners.map((banner, index) => (
          <motion.div
            key={banner.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: currentBanner === index ? 1 : 0,
              scale: currentBanner === index ? 1 : 1.1
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-purple-900/20" />
          </motion.div>
        ))}

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/6 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Enhanced Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              key={currentBanner}
              variants={heroItemVariants}
              className="space-y-10"
            >
              {/* Enhanced Badge */}
              <motion.div
                variants={heroItemVariants}
                className="inline-flex items-center"
              >
                <span className="group px-8 py-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white text-sm font-semibold tracking-wider uppercase shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/30 transition-all duration-500 cursor-pointer">
                  <span className="inline-block mr-2 group-hover:animate-spin">✨</span>
                  Pioneering Innovation Since 2009
                  <span className="inline-block ml-2 group-hover:animate-pulse">🚀</span>
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight"
                variants={heroItemVariants}
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 animate-gradient-x mb-4">
                  {banners[currentBanner].title}
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 animate-gradient-x">
                  {banners[currentBanner].subtitle}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed font-light"
                variants={heroItemVariants}
              >
                {banners[currentBanner].description}
              </motion.p>
              
              <motion.p 
                className="body-text text-white/80 max-w-2xl mx-auto leading-relaxed"
                variants={heroItemVariants}
              >
                {banners[currentBanner].description}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8"
                variants={heroItemVariants}
              >
                <Link
                  to={banners[currentBanner].link}
                  className="group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-700 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/40 overflow-hidden min-w-[200px]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer-slow"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100"></span>
                  <span className="relative z-10 flex items-center gap-4 group-hover:gap-6 transition-all duration-500">
                    <span className="group-hover:scale-110 transition-transform duration-300">{banners[currentBanner].cta}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300"><ArrowRightIcon /></span>
                  </span>
                </Link>
                
                <Link
                  to="/about"
                  className="group relative inline-flex items-center justify-center px-12 py-5 border-2 border-white/40 bg-white/10 backdrop-blur-xl text-white font-bold text-lg rounded-2xl hover:bg-white/20 hover:border-white/60 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/20 min-w-[200px]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></span>
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-300 flex items-center gap-3">
                    <span>Discover More</span>
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </span>
                </Link>
              </motion.div>
              
              {/* Statistics Display for first banner */}
              {currentBanner === 0 && banners[currentBanner].stats && (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto"
                  variants={heroItemVariants}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  {banners[currentBanner].stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-4xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                      <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-300">{stat.value}</div>
                      <div className="text-blue-200/80 font-medium group-hover:text-white transition-colors duration-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Banner Navigation */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`relative w-4 h-4 rounded-full transition-all duration-500 group ${
                  currentBanner === index 
                    ? 'bg-white shadow-lg shadow-white/30' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              >
                {currentBanner === index && (
                  <motion.div
                    layoutId="activeSlide"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                <span className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Floating Animation Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-500 bg-opacity-20 rounded-full"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-16 h-16 bg-purple-500 bg-opacity-20 rounded-full"
          animate={{
            y: [10, -10, 10],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>

      {/* Enhanced Business Ventures Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center mb-6 px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold uppercase tracking-wider"
            >
              <span className="mr-2">🏢</span>
              Our Business Portfolio
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Diversified Excellence Across
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Multiple Industries
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Pioneering innovation in technology, agriculture, and food sectors to create sustainable value and drive positive impact across communities.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {VENTURES.map((venture, index) => (
              <AnimatedSection
                key={`venture-${venture.id}-${index}`}
                animation="fadeInUp"
                delay={index * 0.2}
              >
                <motion.div
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Gradient Background Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, ${venture.color}15, ${venture.color}25, ${venture.color}10)` 
                    }}
                  />
                  
                  {/* Top Accent Bar */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 group-hover:h-2 transition-all duration-300"
                    style={{ backgroundColor: venture.color }}
                  />
                  
                  <div className="relative p-10 text-center">
                    {/* Icon Container */}
                    <motion.div 
                      className="relative w-20 h-20 mx-auto mb-8"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className="w-full h-full rounded-3xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        style={{ backgroundColor: venture.color }}
                      >
                        <VentureIcon icon={venture.icon} className="w-10 h-10" />
                      </div>
                      {/* Glow Effect */}
                      <div 
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg"
                        style={{ backgroundColor: venture.color }}
                      />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                      {venture.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                      {venture.description}
                    </p>

                    {/* CTA Button */}
                    <Link
                      to={`/ventures/${venture.slug}`}
                      className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-2xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                      style={{
                        '--hover-color': venture.color
                      }}
                    >
                      <span className="group-hover/btn:scale-105 transition-transform duration-200">Explore More</span>
                      <motion.span 
                        className="group-hover/btn:translate-x-1 transition-transform duration-200"
                        whileHover={{ scale: 1.2 }}
                      >
                        <ArrowRightIcon />
                      </motion.span>
                    </Link>
                  </div>
                  
                  {/* Bottom Decorative Line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-200 dark:bg-gray-600 group-hover:w-32 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-current group-hover:to-transparent transition-all duration-500" style={{ color: venture.color }} />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link
              to="/ventures"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30"
            >
              <span className="group-hover:scale-105 transition-transform duration-200">View All Ventures</span>
              <motion.span 
                className="group-hover:translate-x-2 transition-transform duration-200"
                whileHover={{ scale: 1.2 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`
          }} />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-semibold uppercase tracking-wider"
            >
              <span className="mr-2">📊</span>
              Our Impact in Numbers
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
              Driving Excellence Across Industries
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
              Measurable results that reflect our commitment to innovation, quality, and sustainable growth across all our ventures.
            </p>
          </AnimatedSection>

          <div ref={counterRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <AnimatedSection
                key={`stats-${index}`}
                animation="scaleIn"
                delay={index * 0.2}
                className="text-center group"
              >
                <motion.div 
                  className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative top border */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  
                  <div className="space-y-4">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      startAnimation={counterInView}
                      className="block text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-300 via-white to-purple-300 group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-500"
                    />
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full group-hover:w-16 transition-all duration-500" />
                    <p className="text-lg sm:text-xl text-blue-100/90 font-semibold group-hover:text-white transition-colors duration-300 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Additional Achievement Badges */}
          <motion.div 
            className="mt-16 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { icon: "🏆", text: "Industry Leader" },
              { icon: "⭐", text: "5-Star Rated" },
              { icon: "🌱", text: "Eco-Friendly" },
              { icon: "🚀", text: "Innovation Driven" },
              { icon: "🎯", text: "Customer Focused" },
              { icon: "🔒", text: "Trusted & Secure" }
            ].map((badge, index) => (
              <motion.div
                key={`badge-${index}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg">{badge.icon}</span>
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeInLeft">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  Why Choose Draupathi Group?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We combine innovation, expertise, and commitment to deliver exceptional results across all our business ventures.
                </p>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <AnimatedSection
                      key={index}
                      animation="fadeInLeft"
                      delay={index * 0.1}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                          {feature}
                        </span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                <AnimatedSection animation="fadeInLeft" delay={0.8}>
                  <Link
                    to="/about"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <span>Learn More About Us</span>
                    <ArrowRightIcon />
                  </Link>
                </AnimatedSection>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight">
              <div className="relative">
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                    alt="Team collaboration"
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500 bg-opacity-20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500 bg-opacity-20 rounded-full"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="relative py-24 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center mb-6 px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold uppercase tracking-wider"
            >
              <span className="mr-2">💬</span>
              Client Testimonials
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Trusted by Industry
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Leaders Worldwide
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover how our innovative solutions have transformed businesses across multiple industries, creating lasting partnerships and exceptional results.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={`testimonial-${testimonial.id}-${index}`}
                animation="fadeInUp"
                delay={index * 0.2}
              >
                <motion.div
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>

                  {/* Top Border Accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Stars with Animation */}
                  <div className="flex space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={`testimonial-${index}-star-${i}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 0.5, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className="text-yellow-400 hover:text-yellow-500 cursor-pointer"
                      >
                        <StarIcon />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed font-medium italic relative z-10">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author Section */}
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow-lg ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-blue-300 dark:group-hover:ring-blue-500 transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-tight">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>

                  {/* Background Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-purple-50/50 dark:from-blue-900/0 dark:via-blue-900/0 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-py bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have experienced the Draupathi Group difference. Let's build something amazing together.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Get Started Today
              </Link>
              
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
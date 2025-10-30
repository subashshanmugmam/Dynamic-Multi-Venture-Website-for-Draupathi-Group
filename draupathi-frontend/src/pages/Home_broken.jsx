import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedCounter from '../components/common/AnimatedCounter';
import VentureIcon from '../components/common/VentureIcon';
import { useIntersection } from '../hooks/useIntersection';
import { VENTURES } from '../utils/constants';

// Premium Icons
const ArrowRightIcon = () => (
  <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-blue-500/20 absolute top-6 right-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
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
      id: 4,
      title: "Premium Foods",
      subtitle: "Quality Excellence",
      description: "Delivering exceptional food products with a commitment to quality, sustainability, and customer satisfaction.",
      image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Our Products",
      link: "/ventures/d-foods"
    }
  ];

  // Company highlights
  const highlights = [
    {
      title: "Company Highlights",
      stats: [
        { label: "Years of Experience", value: "15+", description: "Delivering excellence since 2009" },
        { label: "Successful Projects", value: "200+", description: "Across multiple industries" },
        { label: "Satisfied Clients", value: "1000+", description: "Building lasting relationships" }
      ]
    }
  ];

  // Our diverse ventures
  const ventures = [
    {
      id: 1,
      name: "Draupathi IT Solutions",
      description: "Advanced IT solutions and services",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      icon: "💻",
      services: ["Custom Software", "Cloud Solutions", "Cybersecurity", "Data Analytics"]
    },
    {
      id: 2,
      name: "Draupathi Irrigations",
      description: "Smart irrigation and water management",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      icon: "🌱",
      services: ["Smart Irrigation", "Water Management", "Agricultural Tech", "Sustainability"]
    },
    {
      id: 3,
      name: "D Foods",
      description: "Quality food products and services",
      image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      icon: "🍽️",
      services: ["Premium Products", "Quality Assurance", "Food Safety", "Distribution"]
    }
  ];

  // Mission & Vision
  const missionVision = {
    mission: "To provide innovative solutions across technology, agriculture, and food sectors that create sustainable value for our clients and communities while maintaining the highest standards of quality and integrity.",
    vision: "To be a globally recognized leader in delivering innovative, sustainable solutions that transform industries and improve lives across multiple sectors."
  };

  // Company journey timeline
  const timeline = [
    { year: "2009", event: "Foundation", description: "Draupathi Group established with vision for innovation" },
    { year: "2015", event: "First Major Project", description: "Successfully delivered landmark IT infrastructure project" },
    { year: "2021", event: "Expansion", description: "Expanded into new markets and service offerings" },
    { year: "2024", event: "Celebrating", description: "15 years of excellence and innovation" }
  ];

  // Statistics
  const statistics = [
    { label: "Happy Clients", value: 500, suffix: "+", icon: "👥" },
    { label: "Projects Completed", value: 200, suffix: "+", icon: "🚀" },
    { label: "Years Experience", value: 15, suffix: "+", icon: "⭐" },
    { label: "Team Members", value: 100, suffix: "+", icon: "💼" }
  ];

  const features = [
    "Industry-Leading Innovation",
    "24/7 Customer Support",
    "Sustainable Solutions",
    "Quality Assurance",
    "Global Reach",
    "Expert Team"
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "CEO, TechCorp India",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Exceptional service and innovative solutions. Draupathi Group exceeded our expectations in every aspect of the project.",
      rating: 5,
      company: "TechCorp India"
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Operations Manager",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Their smart irrigation system transformed our agricultural operations with remarkable efficiency and sustainability.",
      rating: 5,
      company: "Green Valley Farms"
    }
  ];

  // Announcements
  const announcements = [
    {
      id: 1,
      title: "New Partnership Announced",
      date: "2024-10-25",
      excerpt: "Strategic alliance with leading technology partners to enhance our service offerings.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Partnership"
    },
    {
      id: 2,
      title: "Innovation Award Recognition",
      date: "2024-10-20",
      excerpt: "Recognized for outstanding innovation in sustainable technology solutions.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Award"
    }
  ];

  // Auto-rotate banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const slideIn = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-transparent z-10"
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${banners[currentBanner].image})`
            }}
          />
        </AnimatePresence>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            
            {/* Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-white"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 text-blue-200 text-sm font-medium mb-6">
                  ✨ Welcome to Draupathi Group
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="block text-white">
                  {banners[currentBanner].title}
                </span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {banners[currentBanner].subtitle}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl"
              >
                {banners[currentBanner].description}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link
                  to={banners[currentBanner].link}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  {banners[currentBanner].cta}
                  <ArrowRightIcon />
                </Link>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300">
                  <PlayIcon />
                  <span className="ml-3">Watch Video</span>
                </button>
              </motion.div>

              {/* Stats */}
              {banners[currentBanner].stats && (
                <motion.div
                  variants={fadeInUp}
                  className="grid grid-cols-3 gap-6"
                >
                  {banners[currentBanner].stats.map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-1">
                        {stat.icon} {stat.value}
                      </div>
                      <div className="text-sm text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Right side - Company Highlights Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:flex hidden"
            >
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Company Highlights</h3>
                
                <div className="space-y-6">
                  {highlights[0].stats.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                        {stat.value}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{stat.label}</div>
                        <div className="text-sm text-gray-600">{stat.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Announcements</h4>
                  <div className="space-y-3">
                    {announcements.slice(0, 2).map((announcement) => (
                      <div key={announcement.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={announcement.image}
                            alt={announcement.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate">
                            {announcement.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(announcement.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
              
              <motion.h1 
                className="title-large text-white leading-tight tracking-tight"
                variants={heroItemVariants}
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white animate-gradient">
                  {banners[currentBanner].title}
                </span>
              </motion.h1>
              
              <motion.p 
                className="subtitle text-blue-100 max-w-3xl mx-auto"
                variants={heroItemVariants}
              >
                {banners[currentBanner].subtitle}
              </motion.p>
              
              <motion.p 
                className="body-text text-white/80 max-w-2xl mx-auto leading-relaxed"
                variants={heroItemVariants}
              >
                {banners[currentBanner].description}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
                variants={heroItemVariants}
              >
                <Link
                  to={banners[currentBanner].link}
                  className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 flex items-center gap-3">
                    {banners[currentBanner].cta}
                    <ArrowRightIcon />
                  </span>
                </Link>
                
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center px-10 py-4 border-2 border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="group-hover:scale-105 transition-transform duration-300">Learn More</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBanner
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Ventures Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Business Ventures
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Exploring diverse sectors to create innovative solutions and sustainable value for our stakeholders.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VENTURES.map((venture, index) => (
              <AnimatedSection
                key={venture.id}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <motion.div
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity"
                       style={{ background: `linear-gradient(135deg, ${venture.color}22, ${venture.color}44)` }}>
                  </div>
                  
                  <div className="relative p-8 text-center">
                    <div 
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white text-2xl mb-6 transform group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: venture.color }}
                    >
                      <VentureIcon icon={venture.icon} className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {venture.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {venture.description}
                    </p>

                    <Link
                      to={`/ventures/${venture.slug}`}
                      className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Measurable results that reflect our commitment to excellence and innovation.
            </p>
          </AnimatedSection>

          <div ref={counterRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <AnimatedSection
                key={index}
                animation="scaleIn"
                delay={index * 0.1}
                className="text-center"
              >
                <div className="space-y-2">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    startAnimation={counterInView}
                    className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
                  />
                  <p className="text-lg sm:text-xl text-blue-100 font-medium">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real testimonials from satisfied clients across our diverse business ventures.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={testimonial.id}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={`${index}-star-${i}`} />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
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
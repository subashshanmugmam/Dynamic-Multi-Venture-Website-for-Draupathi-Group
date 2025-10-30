import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/common/AnimatedSection';
import AnimatedCounter from '../../components/common/AnimatedCounter';
import { useIntersection } from '../../hooks/useIntersection';

// Icons
const DropletIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h16.5m0 0L15 12m4.5 4.5L15 21" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const SproutIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Irrigations = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [counterRef, counterInView] = useIntersection({ threshold: 0.5 });

  const stats = [
    { label: 'Farms Equipped', value: 500, suffix: '+' },
    { label: 'Water Saved', value: 60, suffix: '%' },
    { label: 'Yield Increase', value: 40, suffix: '%' },
    { label: 'Happy Farmers', value: 300, suffix: '+' }
  ];

  const irrigationSystems = [
    {
      title: 'Drip Irrigation Systems',
      description: 'Precision water delivery directly to plant roots, maximizing efficiency and minimizing waste.',
      icon: <DropletIcon />,
      features: [
        'Water efficiency up to 95%',
        'Automated scheduling',
        'Fertilizer integration',
        'Pressure compensation',
        'Clog-resistant emitters',
        'Easy maintenance'
      ],
      benefits: ['60% water savings', '30% increased yield', 'Reduced labor costs', 'Uniform plant growth'],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'Starting from ₹25,000'
    },
    {
      title: 'Smart Sprinkler Systems',
      description: 'Intelligent sprinkler systems with weather integration and remote monitoring capabilities.',
      icon: <SproutIcon />,
      features: [
        'Weather-based scheduling',
        'Mobile app control',
        'Multiple zone management',
        'Rain sensor integration',
        'Soil moisture monitoring',
        'Energy efficient pumps'
      ],
      benefits: ['40% water savings', '25% reduced energy costs', 'Remote monitoring', 'Automated operation'],
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'Starting from ₹15,000'
    },
    {
      title: 'Solar-Powered Pumping',
      description: 'Eco-friendly solar-powered water pumping solutions for sustainable agriculture.',
      icon: <SunIcon />,
      features: [
        'Zero electricity costs',
        'Environmentally friendly',
        'Low maintenance',
        'Grid-independent operation',
        'Battery backup options',
        'Remote monitoring'
      ],
      benefits: ['100% renewable energy', 'No operating costs', 'Reliable operation', 'Government subsidies'],
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'Starting from ₹1,50,000'
    },
    {
      title: 'Greenhouse Automation',
      description: 'Complete greenhouse environment control systems for optimal crop production.',
      icon: <SettingsIcon />,
      features: [
        'Climate control',
        'Automated ventilation',
        'Humidity management',
        'CO2 monitoring',
        'Nutrient delivery',
        'Data analytics'
      ],
      benefits: ['Year-round production', '3x higher yield', 'Quality control', 'Disease prevention'],
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'Custom pricing'
    }
  ];

  const cropTypes = [
    { name: 'Vegetables', suitability: 95, systems: ['Drip', 'Greenhouse'] },
    { name: 'Fruits', suitability: 90, systems: ['Drip', 'Sprinkler'] },
    { name: 'Cereals', suitability: 85, systems: ['Sprinkler', 'Flood'] },
    { name: 'Cash Crops', suitability: 92, systems: ['Drip', 'Greenhouse'] },
    { name: 'Ornamentals', suitability: 88, systems: ['Drip', 'Sprinkler'] },
    { name: 'Herbs & Spices', suitability: 93, systems: ['Drip', 'Greenhouse'] }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Site Assessment',
      description: 'Our experts analyze your land, soil type, water source, and crop requirements for optimal system design.'
    },
    {
      step: '02',
      title: 'Custom Design',
      description: 'We create a tailored irrigation solution based on your specific needs, budget, and farming goals.'
    },
    {
      step: '03',
      title: 'Professional Installation',
      description: 'Our skilled technicians install the system with precision, ensuring optimal performance and longevity.'
    },
    {
      step: '04',
      title: 'Training & Support',
      description: 'Comprehensive training for farmers and ongoing technical support to maximize system benefits.'
    }
  ];

  const testimonials = [
    {
      name: 'Murugan Raman',
      location: 'Coimbatore District',
      crop: 'Tomato Farming',
      content: 'After installing Draupathi\'s drip irrigation system, my water usage reduced by 50% and tomato yield increased by 35%. The investment paid for itself in just one season.',
      yield: '+35%',
      savings: '50%',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Lakshmi Devi',
      location: 'Salem District',
      crop: 'Rose Cultivation',
      content: 'The greenhouse automation system transformed my rose cultivation. Now I can control everything from my phone and the quality has improved significantly.',
      yield: '+60%',
      savings: '40%',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <section className="bg-gray-50 dark:bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link 
              to="/ventures" 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Ventures
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-green-600 dark:text-green-400 font-medium">Irrigations</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-green-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeInLeft">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <span className="text-green-200 font-medium">Irrigation Solutions Division</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Draupathi Irrigations
                </h1>
                
                <p className="text-xl sm:text-2xl text-green-100 leading-relaxed">
                  Revolutionary smart irrigation systems that maximize crop yield 
                  while conserving precious water resources for sustainable farming.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-green-600 hover:bg-green-50 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg"
                  >
                    <span>Get Quote</span>
                    <ArrowRightIcon />
                  </Link>
                  
                  <button className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1">
                    <span>View Projects</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Smart Irrigation"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-600/30 to-transparent rounded-2xl" />
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <DropletIcon />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <SproutIcon />
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={counterRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection
                key={index}
                animation="scaleIn"
                delay={index * 0.1}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    startAnimation={counterInView}
                    className="block text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
                  />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Irrigation Systems */}
      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Irrigation Solutions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced irrigation technologies designed to optimize water usage and maximize agricultural productivity.
            </p>
          </AnimatedSection>

          <div className="space-y-16">
            {irrigationSystems.map((system, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                <motion.div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                          {system.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {system.title}
                          </h3>
                          <p className="text-green-600 dark:text-green-400 font-semibold">
                            {system.price}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {system.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features:</h4>
                          <div className="space-y-2">
                            {system.features.map((feature, idx) => (
                              <div key={`${index}-feature-${idx}`} className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <CheckIcon className="text-white w-2.5 h-2.5" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Benefits:</h4>
                          <div className="space-y-2">
                            {system.benefits.map((benefit, idx) => (
                              <div key={`${index}-benefit-${idx}`} className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <CheckIcon className="text-white w-2.5 h-2.5" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        className="inline-flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                      >
                        <span>Get Quote</span>
                        <ArrowRightIcon />
                      </Link>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <motion.img
                      src={system.image}
                      alt={system.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Crop Suitability */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Crop Suitability Analysis
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our irrigation systems are optimized for various crop types to ensure maximum productivity.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cropTypes.map((crop, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.05}>
                <motion.div
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {crop.name}
                    </h3>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {crop.suitability}% suitable
                    </span>
                  </div>
                  
                  <div className="relative mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-green-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${crop.suitability}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Recommended Systems:</p>
                    <div className="flex flex-wrap gap-2">
                      {crop.systems.map((system, idx) => (
                        <span 
                          key={`${index}-system-${idx}`}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-medium"
                        >
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-py bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Implementation Process
            </h2>
            <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto">
              From assessment to installation, we ensure your irrigation system delivers optimal results.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-green-100 leading-relaxed">{step.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Farmer Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real results from farmers who have transformed their agriculture with our irrigation solutions.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                <motion.div
                  className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                      <p className="text-green-600 dark:text-green-400 font-medium">{testimonial.crop}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {testimonial.yield}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Yield Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {testimonial.savings}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Water Savings</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-py bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful farmers who have increased their yield and reduced water consumption 
              with our smart irrigation solutions.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-green-600 hover:bg-gray-100 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <span>Get Free Consultation</span>
                <ArrowRightIcon />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-green-600 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
              >
                <span>Learn More</span>
                <ArrowRightIcon />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Irrigations;
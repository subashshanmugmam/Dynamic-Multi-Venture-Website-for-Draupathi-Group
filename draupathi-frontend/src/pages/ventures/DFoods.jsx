import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/common/AnimatedSection';
import AnimatedCounter from '../../components/common/AnimatedCounter';
import { useIntersection } from '../../hooks/useIntersection';

// Icons
const LeafIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const DFoods = () => {
  const [_activeProduct, _setActiveProduct] = useState(0);
  const [counterRef, counterInView] = useIntersection({ threshold: 0.5 });

  const stats = [
    { label: 'Premium Products', value: 50, suffix: '+' },
    { label: 'Organic Farms', value: 25, suffix: '+' },
    { label: 'Happy Customers', value: 1000, suffix: '+' },
    { label: 'Years of Trust', value: 2, suffix: '+' }
  ];

  const productCategories = [
    {
      title: 'Organic Grains & Cereals',
      description: 'Premium quality organic rice, wheat, millets and traditional grains cultivated without chemicals.',
      icon: '🌾',
      products: [
        { name: 'Organic Basmati Rice', price: '₹180/kg', features: ['Aromatic', 'Aged 2 years', 'Premium quality'] },
        { name: 'Red Rice', price: '₹160/kg', features: ['High fiber', 'Antioxidants', 'Traditional variety'] },
        { name: 'Foxtail Millet', price: '₹120/kg', features: ['Gluten-free', 'High protein', 'Diabetic friendly'] },
        { name: 'Finger Millet (Ragi)', price: '₹140/kg', features: ['Calcium rich', 'Iron rich', 'Energy booster'] }
      ],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['100% Organic', 'Chemical-free', 'High nutritional value', 'Traditional processing']
    },
    {
      title: 'Cold-Pressed Oils',
      description: 'Traditional cold-pressed oils extracted using wooden presses to retain natural nutrients and flavor.',
      icon: '🛢️',
      products: [
        { name: 'Groundnut Oil', price: '₹280/liter', features: ['Single press', 'Unrefined', 'High smoke point'] },
        { name: 'Coconut Oil', price: '₹320/liter', features: ['Virgin quality', 'No heat', 'Natural aroma'] },
        { name: 'Sesame Oil', price: '₹350/liter', features: ['Traditional method', 'Rich flavor', 'Medicinal properties'] },
        { name: 'Sunflower Oil', price: '₹240/liter', features: ['Light texture', 'Vitamin E rich', 'Heart healthy'] }
      ],
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Zero chemicals', 'Nutrient retention', 'Traditional methods', 'Pure & natural']
    },
    {
      title: 'Spices & Masalas',
      description: 'Authentic Indian spices and masala blends prepared from organically grown ingredients.',
      icon: '🌶️',
      products: [
        { name: 'Turmeric Powder', price: '₹180/kg', features: ['High curcumin', 'Pesticide-free', 'Sun-dried'] },
        { name: 'Red Chilli Powder', price: '₹220/kg', features: ['Medium spice', 'Natural color', 'Pure variety'] },
        { name: 'Coriander Powder', price: '₹160/kg', features: ['Fresh ground', 'Aromatic', 'Premium seeds'] },
        { name: 'Garam Masala', price: '₹280/kg', features: ['Authentic blend', 'House recipe', 'Rich aroma'] }
      ],
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Organic sourcing', 'Traditional grinding', 'No artificial colors', 'Fresh & aromatic']
    },
    {
      title: 'Natural Sweeteners',
      description: 'Healthy alternatives to refined sugar including jaggery, palm sugar and natural honey.',
      icon: '🍯',
      products: [
        { name: 'Organic Jaggery', price: '₹120/kg', features: ['Unrefined', 'Mineral rich', 'No chemicals'] },
        { name: 'Palm Sugar', price: '₹180/kg', features: ['Low GI', 'Natural', 'Diabetic friendly'] },
        { name: 'Wild Honey', price: '₹480/kg', features: ['Raw honey', 'Multifloral', 'Unprocessed'] },
        { name: 'Coconut Sugar', price: '₹220/kg', features: ['Sustainable', 'Nutrient rich', 'Caramel flavor'] }
      ],
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Natural sweetness', 'Health benefits', 'Unprocessed', 'Mineral content']
    }
  ];

  const certifications = [
    {
      name: 'Organic India Certification',
      description: 'NPOP certified organic products',
      icon: <LeafIcon />,
      color: 'green'
    },
    {
      name: 'FSSAI Licensed',
      description: 'Food safety standards compliant',
      icon: <ShieldIcon />,
      color: 'blue'
    },
    {
      name: 'ISO 22000',
      description: 'Food safety management system',
      icon: <HeartIcon />,
      color: 'red'
    },
    {
      name: 'HACCP Certified',
      description: 'Hazard analysis critical control points',
      icon: <CheckIcon />,
      color: 'purple'
    }
  ];

  const qualityProcesses = [
    {
      step: '01',
      title: 'Farm Selection',
      description: 'We carefully select organic farms that follow sustainable and chemical-free farming practices.'
    },
    {
      step: '02',
      title: 'Quality Testing',
      description: 'Every batch undergoes rigorous quality testing for purity, nutritional content, and safety standards.'
    },
    {
      step: '03',
      title: 'Traditional Processing',
      description: 'Using time-tested methods like cold-pressing and sun-drying to preserve natural nutrients.'
    },
    {
      step: '04',
      title: 'Packaging & Distribution',
      description: 'Eco-friendly packaging and efficient cold-chain distribution to maintain product freshness.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Chennai',
      rating: 5,
      content: 'The quality of Navathanya products is exceptional. The cold-pressed oils have such authentic taste and the organic rice is perfectly aromatic. My family loves these products.',
      product: 'Organic Basmati Rice & Groundnut Oil',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Coimbatore',
      rating: 5,
      content: 'As someone with diabetes, I appreciate the natural sweeteners and millets. The palm sugar is a great alternative to refined sugar and tastes amazing.',
      product: 'Millets & Palm Sugar',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Meena Devi',
      location: 'Madurai',
      rating: 5,
      content: 'The spice powders are so fresh and aromatic. You can taste the difference in quality. The turmeric powder has such a vibrant color and wonderful aroma.',
      product: 'Spice Collection',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
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
            <span className="text-orange-600 dark:text-orange-400 font-medium">D Foods</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-400/10 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeInLeft">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <span className="text-orange-200 font-medium">Premium Food Products Division</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  D Foods
                  <span className="block text-3xl sm:text-4xl lg:text-5xl text-orange-200">
                    (Navathanya Products)
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-orange-100 leading-relaxed">
                  Premium organic food products that bring the authentic taste of traditional 
                  Indian cuisine to your table with guaranteed purity and nutrition.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-orange-600 hover:bg-orange-50 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg"
                  >
                    <span>Order Now</span>
                    <ArrowRightIcon />
                  </Link>
                  
                  <button className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1">
                    <span>View Catalog</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight">
              <div className="relative">
                <img
                  src="/DCarts.jpg"
                  alt="Organic Food Products"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 to-transparent rounded-2xl" />
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  🌾
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  🍯
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
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-2xl">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    startAnimation={counterInView}
                    className="block text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2"
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

      {/* Product Categories */}
      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Premium Product Range
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Carefully curated selection of organic and natural food products that nourish your family with traditional goodness.
            </p>
          </AnimatedSection>

          <div className="space-y-16">
            {productCategories.map((category, index) => (
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
                        <div className="text-4xl">{category.icon}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {category.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {category.products.map((product, idx) => (
                          <div key={`${index}-product-${idx}`} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                {product.name}
                              </h4>
                              <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                                {product.price}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {product.features.map((feature, featureIdx) => (
                                <span 
                                  key={`${index}-${idx}-feature-${featureIdx}`}
                                  className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded text-xs"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Benefits:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {category.benefits.map((benefit, idx) => (
                            <div key={`${index}-benefit-${idx}`} className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckIcon className="text-white w-2.5 h-2.5" />
                              </div>
                              <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        className="inline-flex items-center space-x-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors"
                      >
                        <span>Order Now</span>
                        <ArrowRightIcon />
                      </Link>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <motion.img
                      src={category.image}
                      alt={category.title}
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

      {/* Certifications */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Quality Certifications
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our commitment to quality is validated by prestigious certifications and rigorous testing standards.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.05}>
                <motion.div
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-16 h-16 bg-${cert.color}-100 dark:bg-${cert.color}-900/30 rounded-2xl flex items-center justify-center text-${cert.color}-600 dark:text-${cert.color}-400 mx-auto mb-4`}>
                    {cert.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="section-py bg-gradient-to-br from-orange-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Quality Process
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto">
              From farm to table, every step is carefully monitored to ensure the highest quality standards.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityProcesses.map((process, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                  <p className="text-orange-100 leading-relaxed">{process.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Customer Stories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear what our customers say about the quality and taste of our products.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                <motion.div
                  className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <StarIcon key={`${index}-star-${idx}`} className="text-yellow-500" />
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  <div className="text-sm">
                    <span className="text-orange-600 dark:text-orange-400 font-medium">
                      Products: {testimonial.product}
                    </span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-py bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Experience Pure Nutrition
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of families who trust Navathanya products for their daily nutrition needs. 
              Order today and taste the difference of authentic, organic food.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-orange-600 hover:bg-gray-100 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <span>Order Now</span>
                <ArrowRightIcon />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-orange-600 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
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

export default DFoods;
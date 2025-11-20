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
      description: "Leading the way in technology and innovation with sustainable solutions that drive progress across multiple industries.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore Our Ventures",
      link: "/ventures",
      stats: [
        { label: "Years of Excellence", value: "2+", icon: "🏆" },
        { label: "Successful Projects", value: "200+", icon: "📈" },
        { label: "Satisfied Clients", value: "150+", icon: "👥" }
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
    }
  ];

  const statistics = [
    { label: "Happy Clients", value: 200, suffix: "+" },
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Team Members", value: 50, suffix: "+" }
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
      name: "Client from Chennai, India",
      position: "Technology Client",
      text: "Draupathi IT Solutions transformed our business digitally with their reliable tech support and innovative ideas.",
      rating: 5
    },
    {
      id: 2,
      name: "Retail Partner, Tamil Nadu",
      position: "Business Partner",
      text: "The products from D Foods are authentic and top-quality. We're proud to be long-term partners.",
      rating: 5
    },
    {
      id: 3,
      name: "Agriculture Client, Namakkal",
      position: "Agriculture Sector",
      text: "Professional service and great customer experience — D Groups truly stands out.",
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
            key={`banner-${banner.id}`}
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
                      key={`hero-stat-${index}`}
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
                key={`nav-dot-${index}`}
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
      </section>

      {/* Enhanced Business Ventures Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Diversified Excellence Across
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Multiple Industries
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Pioneering innovation in technology, agriculture, and food sectors to create sustainable value.
            </p>
          </AnimatedSection>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
              {VENTURES.map((venture, index) => (
              <AnimatedSection
                key={`venture-${venture.id}`}
                animation="fadeInUp"
                delay={index * 0.2}
              >
                <motion.div
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, ${venture.color}15, ${venture.color}25, ${venture.color}10)` 
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 group-hover:h-2 transition-all duration-300"
                    style={{ backgroundColor: venture.color }}
                  />
                  
                  <div className="relative p-10 text-center">
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

                    <Link
                      to={venture.path}
                      className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 transform group-hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span className="mr-2">Explore</span>
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={counterRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <AnimatedSection
                key={`stat-${index}`}
                animation="fadeInUp"
                delay={index * 0.1}
                className="text-center"
              >
                <div className="text-4xl lg:text-6xl font-bold mb-2">
                  {counterInView && <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="text-lg lg:text-xl text-blue-100">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Draupathi Group?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We deliver excellence through innovation, quality, and commitment to sustainable solutions.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection
                key={`feature-${index}`}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <div className="flex items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <CheckIcon />
                  <span className="ml-4 text-lg font-medium text-gray-900 dark:text-white">{feature}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from our satisfied clients about their experience with our services.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={`testimonial-${testimonial.id}`}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={`star-${testimonial.id}-${i}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 0.5, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className="text-yellow-400"
                      >
                        <StarIcon />
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.position}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Join hundreds of satisfied clients who have experienced the Draupathi Group difference. 
              Let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
              >
                Get Started Today
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
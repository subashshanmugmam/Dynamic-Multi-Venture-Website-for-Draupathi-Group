import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/common/AnimatedSection';
import VentureIcon from '../../components/common/VentureIcon';
import { VENTURES } from '../../utils/constants';

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

const ExternalLinkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Ventures = () => {
  const [selectedVenture, setSelectedVenture] = useState(null);

  // Detailed venture information
  const ventureDetails = {
    'it-solutions': {
      ...VENTURES[0],
      longDescription: 'Draupathi IT Solutions is your trusted partner for comprehensive technology solutions. We specialize in custom software development, web applications, mobile app development, cloud migration, cybersecurity, and digital transformation services.',
      services: [
        'Custom Software Development',
        'Web Application Development',
        'Mobile App Development',
        'Cloud Migration & Management',
        'Cybersecurity Solutions',
        'Digital Transformation Consulting',
        'Database Design & Management',
        'System Integration Services'
      ],
      technologies: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Kubernetes'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      achievements: [
        'Successfully delivered 200+ projects',
        '99.9% client satisfaction rate',
        '24/7 support and maintenance',
        'ISO 27001 certified processes'
      ]
    },
    'irrigations': {
      ...VENTURES[1],
      longDescription: 'Draupathi Irrigations revolutionizes agriculture through smart irrigation systems. We provide sustainable water management solutions that optimize crop yield while conserving precious water resources.',
      services: [
        'Drip Irrigation Systems',
        'Sprinkler Irrigation',
        'Smart Water Management',
        'Greenhouse Automation',
        'Fertigation Systems',
        'Solar-Powered Pumping',
        'Irrigation Consulting',
        'Maintenance & Support'
      ],
      technologies: ['IoT Sensors', 'Solar Technology', 'Automation Systems', 'Mobile Monitoring', 'Weather Integration'],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      achievements: [
        '40% increase in crop yield',
        '60% water conservation',
        '500+ farms equipped',
        'Award-winning innovations'
      ]
    },
    'd-foods': {
      ...VENTURES[2],
      longDescription: 'D Foods, under our Navathanya brand, delivers premium quality food products from farm to table. We focus on organic, sustainable, and healthy food options for modern families.',
      services: [
        'Organic Rice Products',
        'Traditional Grains',
        'Natural Honey',
        'Organic Spices',
        'Healthy Snacks',
        'Nutritional Supplements',
        'Custom Food Solutions',
        'Quality Assurance'
      ],
      technologies: ['Food Safety Systems', 'Quality Control', 'Packaging Innovation', 'Cold Chain Management'],
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
      achievements: [
        'FSSAI certified products',
        '100% organic certification',
        '50,000+ satisfied customers',
        'Zero-chemical guarantee'
      ]
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedSection animation="fadeInUp">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Our Business Ventures
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Discover our diverse portfolio of innovative solutions across technology, 
                agriculture, and food industries, each designed to create lasting value.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Ventures Overview */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Three Pillars of Excellence
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Each venture represents our commitment to innovation, quality, and sustainable growth 
              in their respective industries.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {VENTURES.map((venture, index) => (
              <AnimatedSection
                key={venture.id}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <Link to={`/ventures/${venture.slug}`}>
                  <motion.div
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity"
                       style={{ background: `linear-gradient(135deg, ${venture.color}22, ${venture.color}44)` }}>
                  </div>
                  
                  <div className="relative p-8">
                    <div 
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white text-2xl mb-6 transform group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: venture.color }}
                    >
                      <VentureIcon icon={venture.icon} className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                      {venture.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center">
                      {venture.description}
                    </p>

                    <div className="text-center">
                      <span className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                        <span>Learn More</span>
                        <ArrowRightIcon />
                      </span>
                    </div>
                  </div>
                </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Venture Modal/Section */}
      <AnimatePresence>
        {selectedVenture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVenture(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Header */}
                <div 
                  className="p-8 text-white relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${ventureDetails[selectedVenture].color}, ${ventureDetails[selectedVenture].color}dd)` }}
                >
                  <button
                    onClick={() => setSelectedVenture(null)}
                    className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                      <VentureIcon icon={ventureDetails[selectedVenture].icon} className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{ventureDetails[selectedVenture].name}</h3>
                      <p className="text-white/80">{ventureDetails[selectedVenture].shortName}</p>
                    </div>
                  </div>
                  <p className="text-lg text-white/90">{ventureDetails[selectedVenture].longDescription}</p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Services */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ventureDetails[selectedVenture].services.map((service, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckIcon className="text-white w-3 h-3" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technologies & Tools</h4>
                    <div className="flex flex-wrap gap-3">
                      {ventureDetails[selectedVenture].technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Achievements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ventureDetails[selectedVenture].achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckIcon className="text-white w-3 h-3" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="/contact"
                      className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                    >
                      <span>Get Started</span>
                      <ArrowRightIcon />
                    </Link>
                    <button className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-semibold transition-colors">
                      <span>Learn More</span>
                      <ExternalLinkIcon />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Why Choose Our Ventures */}
      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Draupathi Group?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our integrated approach across multiple industries gives us unique insights and advantages.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Integrated Solutions',
                description: 'Benefit from our cross-industry expertise and integrated approach to problem-solving.',
                icon: '🔄'
              },
              {
                title: 'Proven Track Record',
                description: '15+ years of successful project delivery across diverse industries and markets.',
                icon: '📈'
              },
              {
                title: 'Innovation Focus',
                description: 'Cutting-edge technologies and innovative approaches in everything we do.',
                icon: '💡'
              },
              {
                title: 'Sustainable Practices',
                description: 'Committed to environmental responsibility and sustainable business practices.',
                icon: '🌱'
              },
              {
                title: 'Customer-Centric',
                description: 'Your success is our priority. We build long-term partnerships, not just transactions.',
                icon: '🤝'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock support and maintenance across all our venture offerings.',
                icon: '⏰'
              }
            ].map((feature, index) => (
              <AnimatedSection
                key={index}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <motion.div
                  className="text-center p-6 bg-white dark:bg-gray-700 rounded-2xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-py bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Choose the venture that aligns with your needs, or explore how our integrated 
              approach can benefit your organization.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <span>Start Your Project</span>
                <ArrowRightIcon />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
              >
                <span>Learn About Us</span>
                <ArrowRightIcon />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Ventures;

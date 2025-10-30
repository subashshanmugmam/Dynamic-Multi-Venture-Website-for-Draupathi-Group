import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedCounter from '../components/common/AnimatedCounter';
import VentureIcon from '../components/common/VentureIcon';
import { useIntersection } from '../hooks/useIntersection';
import { VENTURES } from '../utils/constants';

// Icons
const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

const About = () => {
  const [counterRef, counterInView] = useIntersection({ threshold: 0.5 });

  const stats = [
    { label: 'Years of Excellence', value: 15, suffix: '+' },
    { label: 'Successful Projects', value: 500, suffix: '+' },
    { label: 'Happy Clients', value: 1000, suffix: '+' },
    { label: 'Team Members', value: 50, suffix: '+' }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and innovative approaches to solve complex challenges.',
      icon: '💡'
    },
    {
      title: 'Quality',
      description: 'Excellence is our standard. We deliver high-quality solutions that exceed expectations.',
      icon: '⭐'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to sustainable practices that benefit both business and environment.',
      icon: '🌱'
    },
    {
      title: 'Customer Focus',
      description: 'Our clients are at the heart of everything we do. Their success is our success.',
      icon: '🤝'
    }
  ];

  const milestones = [
    {
      year: '2008',
      title: 'Company Founded',
      description: 'Draupathi Group was established with a vision to transform businesses through technology.'
    },
    {
      year: '2012',
      title: 'Irrigation Expansion',
      description: 'Launched Draupathi Irrigations to provide sustainable agricultural solutions.'
    },
    {
      year: '2015',
      title: 'Food Division Launch',
      description: 'Introduced D Foods (Navathanya Products) to deliver premium quality food products.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Accelerated digital solutions and cloud-based services during global changes.'
    },
    {
      year: '2025',
      title: 'Continued Growth',
      description: 'Expanding our reach and impact across multiple industries and regions.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      position: 'Chief Executive Officer',
      description: 'Visionary leader with 20+ years of experience in technology and business development.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Priya Sharma',
      position: 'Chief Technology Officer',
      description: 'Technology expert driving innovation across all our digital initiatives.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Amit Patel',
      position: 'Head of Operations',
      description: 'Operations specialist ensuring seamless delivery across all business verticals.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

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
                About Draupathi Group
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Transforming businesses and communities through innovative technology solutions, 
                sustainable agriculture, and premium food products since 2008.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="fadeInLeft">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Founded in 2008 with a vision to bridge the gap between technology and traditional industries, 
                  Draupathi Group has evolved into a multi-faceted organization serving diverse sectors across 
                  Tamil Nadu and beyond.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  From our humble beginnings as an IT solutions provider, we have expanded into irrigation 
                  systems and premium food products, always maintaining our core commitment to quality, 
                  innovation, and customer satisfaction.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Today, we stand as a testament to the power of diversification and the importance of 
                  understanding market needs across different industries.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Our team collaboration"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-2xl" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These numbers represent the trust our clients place in us and the impact we've made over the years.
            </p>
          </AnimatedSection>

          <div ref={counterRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection
                key={index}
                animation="scaleIn"
                delay={index * 0.1}
                className="text-center"
              >
                <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    startAnimation={counterInView}
                    className="block text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
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

      {/* Our Values Section */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These principles guide every decision we make and every solution we deliver.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection
                key={index}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <motion.div
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key milestones that have shaped our growth and evolution over the years.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200 dark:bg-blue-800" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection
                  key={index}
                  animation="fadeInUp"
                  delay={index * 0.1}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1 px-6">
                    <div className={`bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800" />
                  </div>
                  
                  <div className="flex-1" />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Leadership Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the visionaries behind our success, driving innovation and excellence across all ventures.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <AnimatedSection
                key={index}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <motion.div
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                    {member.position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {member.description}
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
              Ready to Work With Us?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have experienced the Draupathi Group difference. 
              Let's build something amazing together.
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
                <span>Get In Touch</span>
                <ArrowRightIcon />
              </Link>
              
              <Link
                to="/#ventures"
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
              >
                <span>Explore Our Ventures</span>
                <ArrowRightIcon />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;

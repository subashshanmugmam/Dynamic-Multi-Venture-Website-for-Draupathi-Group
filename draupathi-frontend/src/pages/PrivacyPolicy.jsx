import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/common/AnimatedSection';

const PrivacyPolicy = () => {
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
                Privacy Policy
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Your privacy matters to us. Learn how we protect and handle your information.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="section-py bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 lg:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Our Privacy Commitment
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      We respect your privacy. All client and user data shared with D Groups is kept confidential 
                      and used only for business or communication purposes as per our data protection standards.
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                      Data Protection Standards
                    </h3>
                    <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                        <span>Confidential handling of all client information</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                        <span>Data used only for legitimate business purposes</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                        <span>Secure communication channels maintained</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                        <span>Compliance with industry data protection standards</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center pt-8">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection animation="fadeInUp" delay={0.2} className="mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h3>
              <p className="text-blue-100 mb-6">
                If you have any questions or concerns about how we handle your privacy, 
                please don't hesitate to contact us.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Us</span>
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
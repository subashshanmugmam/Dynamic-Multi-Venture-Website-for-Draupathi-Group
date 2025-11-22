/**
 * EmailJS Configuration
 * 
 * Setup Instructions:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add an Email Service (Gmail is recommended)
 *    - Navigate to Email Services
 *    - Click "Add New Service"
 *    - Select Gmail (or your preferred email provider)
 *    - Connect your email account
 *    - Copy the Service ID
 * 
 * 3. Create an Email Template
 *    - Navigate to Email Templates
 *    - Click "Create New Template"
 *    - Use the template variables listed below
 *    - Copy the Template ID
 * 
 * 4. Get your Public Key
 *    - Navigate to Account > API Keys
 *    - Copy your Public Key
 * 
 * 5. Add these values to your .env file:
 *    - VITE_EMAILJS_SERVICE_ID=your_service_id
 *    - VITE_EMAILJS_TEMPLATE_ID=your_template_id
 *    - VITE_EMAILJS_PUBLIC_KEY=your_public_key
 */

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

/**
 * Email Template Variables (use these in your EmailJS template):
 * 
 * {{ from_name }}           - Sender's full name
 * {{ from_email }}          - Sender's email address
 * {{ from_phone }}          - Sender's phone number
 * {{ from_company }}        - Sender's company name
 * {{ venture_interest }}    - Selected venture of interest
 * {{ subject }}             - Email subject
 * {{ message }}             - Email message content
 * {{ preferred_contact }}   - Preferred contact method (email/phone)
 * {{ to_name }}             - Your company name (Draupathi Group)
 * 
 * Suggested Email Template Structure:
 * 
 * Subject: New Contact Form Submission - {{ subject }}
 * 
 * Body:
 * New contact form submission from Draupathi Group website:
 * 
 * From: {{ from_name }}
 * Email: {{ from_email }}
 * Phone: {{ from_phone }}
 * Company: {{ from_company }}
 * 
 * Interested Venture: {{ venture_interest }}
 * Preferred Contact: {{ preferred_contact }}
 * 
 * Subject: {{ subject }}
 * 
 * Message:
 * {{ message }}
 * 
 * ---
 * This email was sent from the Draupathi Group contact form.
 */

// Validation function to check if EmailJS is properly configured
export const isEmailJSConfigured = () => {
  return !!(
    emailjsConfig.serviceId &&
    emailjsConfig.templateId &&
    emailjsConfig.publicKey
  );
};

// Helper function to get configuration status
export const getConfigStatus = () => {
  const status = {
    serviceId: !!emailjsConfig.serviceId,
    templateId: !!emailjsConfig.templateId,
    publicKey: !!emailjsConfig.publicKey,
    isConfigured: isEmailJSConfigured(),
  };

  return status;
};

export default emailjsConfig;

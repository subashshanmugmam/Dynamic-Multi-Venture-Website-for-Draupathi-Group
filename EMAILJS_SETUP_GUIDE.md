# EmailJS Setup Guide for Draupathi Group Website

This guide will help you configure EmailJS to enable the contact form functionality on your website.

## Overview

EmailJS allows you to send emails directly from your frontend application without needing a backend server. The contact form on your website will use EmailJS to send messages to your email inbox.

## Step-by-Step Setup

### 1. Create EmailJS Account

1. Visit [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (it's completely free - no credit card required)
3. Create your account using email or Google Sign-In
4. Verify your email address

### 2. Add an Email Service

1. After logging in, go to **Email Services** in the left sidebar
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (Recommended for most users)
   - Outlook
   - Yahoo
   - Or any other SMTP service
4. Click **Connect Account** and follow the authentication process
5. **Important:** Copy your **Service ID** (e.g., `service_abc123`)
6. Click **Create Service**

> **Note:** For Gmail, you may need to enable "Less secure app access" or use an App Password if you have 2FA enabled.

### 3. Create an Email Template

1. Go to **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Set up your template with the following structure:

#### Template Settings:
- **Template Name:** `Draupathi Contact Form`

#### Email Subject:
```
New Contact Form Submission - {{subject}}
```

#### Email Body (Content):
```
New contact form submission from Draupathi Group website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Company: {{from_company}}

Interested Venture: {{venture_interest}}
Preferred Contact Method: {{preferred_contact}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUBJECT:
{{subject}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was automatically sent from the Draupathi Group contact form.
Website: https://yourwebsite.com
```

#### Template Settings:
- **From Name:** `Draupathi Group Website`
- **From Email:** Use your connected email address
- **To Email:** Your business email (e.g., `draupathiitsolutions@gmail.com`)
- **Reply To:** `{{from_email}}` (This allows you to reply directly to the sender)

4. Click **Save**
5. **Important:** Copy your **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key

1. Go to **Account** in the left sidebar
2. Click on **General** or **API Keys**
3. You'll see your **Public Key** (e.g., `xYz123AbC456DeF789`)
4. **Important:** Copy this key

### 5. Configure Your Environment Variables

1. Open the file: `draupathi-frontend/.env`
2. Replace the placeholder values with your actual credentials:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=xYz123AbC456DeF789
```

### 6. Test the Configuration

1. **Restart your development server:**
   ```powershell
   cd draupathi-frontend
   npm run dev
   ```

2. Navigate to the Contact page on your website

3. Fill out the contact form with test data

4. Submit the form

5. Check your email inbox - you should receive the test message

## Template Variables Reference

The following variables are available in your EmailJS template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Sender's full name | "John Doe" |
| `{{from_email}}` | Sender's email | "john@example.com" |
| `{{from_phone}}` | Sender's phone | "+91 12345 67890" |
| `{{from_company}}` | Sender's company | "ABC Corp" |
| `{{venture_interest}}` | Selected venture | "IT Solutions" |
| `{{subject}}` | Email subject | "Partnership Inquiry" |
| `{{message}}` | Message content | Full message text |
| `{{preferred_contact}}` | Contact preference | "email" or "phone" |
| `{{to_name}}` | Your company name | "Draupathi Group" |

## Troubleshooting

### Email Not Sending

1. **Check Browser Console:** Look for error messages
2. **Verify Credentials:** Ensure Service ID, Template ID, and Public Key are correct
3. **Check Email Service:** Make sure your email service is properly connected
4. **EmailJS Dashboard:** Check the EmailJS dashboard for failed sends

### Error: "Email service is not configured"

This means the environment variables are not set correctly:
- Make sure you've added the values to `.env` file
- Restart your development server after updating `.env`
- Verify there are no extra spaces or quotes in the values

### Gmail Issues

If using Gmail:
- Enable "Less secure app access" (if not using 2FA)
- Create an App Password (if using 2FA)
- Check your Google Account security settings

### Rate Limiting

EmailJS free tier includes:
- 200 emails/month
- 10 emails/hour rate limit

If you exceed these limits, consider upgrading to a paid plan.

## Security Notes

1. **Never commit `.env` file to Git** - It's already in `.gitignore`
2. **Use `.env.example` as a template** - Safe to commit without real values
3. **Public Key is safe to expose** - It's designed to be used in frontend code
4. **Service ID and Template ID are also safe** - They're public identifiers

## EmailJS Dashboard Features

### Email Logs
- View all sent emails
- Check delivery status
- Debug failed sends

### Auto-Reply
- Set up automatic replies to form submissions
- Customize reply templates

### Custom Headers
- Add custom email headers if needed
- Configure BCC/CC addresses

## Additional Configuration Options

### Custom Email Templates

You can create multiple templates for different purposes:
- General inquiries
- Partnership requests
- Support tickets
- Venture-specific inquiries

### Email Notifications

Configure notifications for:
- Successful submissions
- Failed sends
- Monthly usage reports

## Support

If you encounter issues:

1. **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. **EmailJS Support:** Contact through their dashboard
3. **Developer Console:** Check for error messages in browser console

## Next Steps

After successful setup:

1. ✅ Test the contact form thoroughly
2. ✅ Set up email filters/labels in your inbox
3. ✅ Configure auto-reply templates (optional)
4. ✅ Monitor usage in EmailJS dashboard
5. ✅ Set up backup email addresses

## Contact Form Features

Your contact form now includes:

- ✅ **Real-time email sending** via EmailJS
- ✅ **Form validation** - Required fields marked
- ✅ **Success/Error messages** - User feedback
- ✅ **Loading states** - Visual feedback during submission
- ✅ **Form reset** - Clears after successful submission
- ✅ **Venture selection** - Route inquiries appropriately
- ✅ **Contact preference** - Email or phone
- ✅ **Professional templates** - Well-formatted emails

---

**Need Help?** Contact your development team or refer to the EmailJS documentation for advanced features and troubleshooting.

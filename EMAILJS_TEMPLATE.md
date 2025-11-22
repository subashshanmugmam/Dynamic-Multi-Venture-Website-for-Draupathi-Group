# EmailJS Template for Draupathi Group Contact Form

## Template Configuration

### Basic Settings
- **Template Name:** `Draupathi Contact Form Submission`
- **Template Type:** Email Template

---

## EMAIL TEMPLATE SETUP

### 1. Subject Line
```
New Contact: {{subject}} - {{venture_interest}}
```

**Alternative subject lines:**
- `Contact Form: {{from_name}} - {{subject}}`
- `New Inquiry from {{from_company}} - {{venture_interest}}`
- `Website Contact: {{subject}}`

---

### 2. Email Content (Body)

Copy and paste this into your EmailJS template editor:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background: #f9fafb;
            padding: 30px;
            border-left: 4px solid #3B82F6;
            border-right: 4px solid #3B82F6;
        }
        .section {
            margin-bottom: 25px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .section-title {
            color: #3B82F6;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 2px solid #3B82F6;
            padding-bottom: 8px;
        }
        .info-row {
            display: flex;
            margin-bottom: 10px;
            padding: 8px 0;
        }
        .info-label {
            font-weight: bold;
            color: #666;
            width: 180px;
            flex-shrink: 0;
        }
        .info-value {
            color: #333;
            flex-grow: 1;
        }
        .message-box {
            background: #fff;
            border-left: 4px solid #8B5CF6;
            padding: 20px;
            border-radius: 8px;
            margin-top: 15px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            background: #1f2937;
            color: #9ca3af;
            padding: 20px 30px;
            border-radius: 0 0 10px 10px;
            text-align: center;
            font-size: 12px;
        }
        .footer a {
            color: #60a5fa;
            text-decoration: none;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            background: #3B82F6;
            color: white;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 10px;
        }
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e5e7eb, transparent);
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔔 New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px;">Draupathi Group Website</p>
    </div>
    
    <div class="content">
        <!-- Contact Information Section -->
        <div class="section">
            <div class="section-title">👤 Contact Information</div>
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value"><strong>{{from_name}}</strong></span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value"><a href="mailto:{{from_email}}" style="color: #3B82F6;">{{from_email}}</a></span>
            </div>
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">{{from_phone}}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Company:</span>
                <span class="info-value">{{from_company}}</span>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Inquiry Details Section -->
        <div class="section">
            <div class="section-title">📋 Inquiry Details</div>
            <div class="info-row">
                <span class="info-label">Interested Venture:</span>
                <span class="info-value"><strong>{{venture_interest}}</strong><span class="badge">VENTURE</span></span>
            </div>
            <div class="info-row">
                <span class="info-label">Subject:</span>
                <span class="info-value"><strong>{{subject}}</strong></span>
            </div>
            <div class="info-row">
                <span class="info-label">Preferred Contact:</span>
                <span class="info-value">{{preferred_contact}}</span>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Message Section -->
        <div class="section">
            <div class="section-title">💬 Message</div>
            <div class="message-box">{{message}}</div>
        </div>
    </div>
    
    <div class="footer">
        <p><strong>Draupathi Group of Companies</strong></p>
        <p>Namakkal, Tamil Nadu, India</p>
        <p>📧 <a href="mailto:draupathiitsolutions@gmail.com">draupathiitsolutions@gmail.com</a> | 📞 +91 7603925412</p>
        <p style="margin-top: 15px; color: #6b7280;">
            This email was automatically generated from your website contact form.<br>
            Sent on {{submission_date}} at {{submission_time}}
        </p>
    </div>
</body>
</html>
```

---

### 3. Plain Text Version (Fallback)

For email clients that don't support HTML:

```
═══════════════════════════════════════════════════════════════
NEW CONTACT FORM SUBMISSION - DRAUPATHI GROUP
═══════════════════════════════════════════════════════════════

👤 CONTACT INFORMATION
───────────────────────────────────────────────────────────────
Name:              {{from_name}}
Email:             {{from_email}}
Phone:             {{from_phone}}
Company:           {{from_company}}

📋 INQUIRY DETAILS
───────────────────────────────────────────────────────────────
Interested Venture: {{venture_interest}}
Subject:            {{subject}}
Preferred Contact:  {{preferred_contact}}

💬 MESSAGE
───────────────────────────────────────────────────────────────
{{message}}

═══════════════════════════════════════════════════════════════
Draupathi Group of Companies
Namakkal, Tamil Nadu, India
Email: draupathiitsolutions@gmail.com
Phone: +91 7603925412

This email was automatically sent from the Draupathi Group website.
═══════════════════════════════════════════════════════════════
```

---

## EMAILJS CONFIGURATION STEPS

### Step 1: Login to EmailJS Dashboard
1. Go to https://dashboard.emailjs.com/
2. Navigate to **Email Templates**
3. Click **Create New Template**

### Step 2: Configure Template Settings

#### From Section:
```
From Name: Draupathi Website Contact Form
From Email: {{from_email}}
Reply To: {{from_email}}
```

#### To Section:
```
To Email: draupathiitsolutions@gmail.com
To Name: {{to_name}}
```

#### Subject:
```
New Contact: {{subject}} - {{venture_interest}}
```

#### Content:
- Switch to **HTML** mode
- Paste the HTML template from above

### Step 3: Test Template Variables

Click **Test It** button and fill in sample data:

```json
{
  "from_name": "John Doe",
  "from_email": "john.doe@example.com",
  "from_phone": "+91 98765 43210",
  "from_company": "Tech Solutions Pvt Ltd",
  "venture_interest": "IT Solutions",
  "subject": "Partnership Inquiry",
  "message": "I am interested in discussing a potential partnership with your IT Solutions venture. Please contact me at your earliest convenience.",
  "preferred_contact": "email",
  "to_name": "Draupathi Group",
  "submission_date": "November 21, 2025",
  "submission_time": "10:30 AM IST"
}
```

### Step 4: Save Template
1. Click **Save**
2. Copy the **Template ID** (e.g., `template_abc123xyz`)

---

## TEMPLATE VARIABLES REFERENCE

| Variable Name | Description | Example Value |
|--------------|-------------|---------------|
| `{{from_name}}` | Sender's full name | "Rajesh Kumar" |
| `{{from_email}}` | Sender's email address | "rajesh@company.com" |
| `{{from_phone}}` | Sender's phone number | "+91 98765 43210" |
| `{{from_company}}` | Sender's company name | "ABC Technologies" |
| `{{venture_interest}}` | Selected venture/service | "IT Solutions" |
| `{{subject}}` | Email subject line | "Partnership Inquiry" |
| `{{message}}` | Full message content | The complete message text |
| `{{preferred_contact}}` | How to contact back | "email" or "phone" |
| `{{to_name}}` | Your company name | "Draupathi Group" |

---

## ALTERNATIVE SIMPLE TEMPLATE

If you prefer a simpler design:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #3B82F6; border-bottom: 3px solid #3B82F6; padding-bottom: 10px;">
        New Website Contact Form Submission
    </h2>
    
    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1f2937; margin-top: 0;">Contact Details:</h3>
        <p><strong>Name:</strong> {{from_name}}</p>
        <p><strong>Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
        <p><strong>Phone:</strong> {{from_phone}}</p>
        <p><strong>Company:</strong> {{from_company}}</p>
    </div>
    
    <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1f2937; margin-top: 0;">Inquiry Information:</h3>
        <p><strong>Interested In:</strong> {{venture_interest}}</p>
        <p><strong>Subject:</strong> {{subject}}</p>
        <p><strong>Prefers Contact Via:</strong> {{preferred_contact}}</p>
    </div>
    
    <div style="background: #ffffff; padding: 20px; border-left: 4px solid #8B5CF6; margin: 20px 0;">
        <h3 style="color: #1f2937; margin-top: 0;">Message:</h3>
        <p style="white-space: pre-wrap;">{{message}}</p>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
    
    <p style="color: #6b7280; font-size: 12px; text-align: center;">
        Sent from Draupathi Group website contact form<br>
        📧 draupathiitsolutions@gmail.com | 📞 +91 7603925412
    </p>
</div>
```

---

## AUTO-REPLY TEMPLATE (OPTIONAL)

Create a second template for automatic replies to users:

**Template Name:** `Draupathi Contact Form Auto-Reply`

**Subject:** `Thank you for contacting Draupathi Group`

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">Thank You for Reaching Out!</h1>
    </div>
    
    <div style="padding: 40px; background: #f9fafb;">
        <p>Dear {{from_name}},</p>
        
        <p>Thank you for contacting <strong>Draupathi Group of Companies</strong>. We have received your message regarding <strong>{{venture_interest}}</strong> and appreciate your interest in our services.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3B82F6;">
            <h3 style="color: #3B82F6; margin-top: 0;">Your Submission Details:</h3>
            <p><strong>Subject:</strong> {{subject}}</p>
            <p><strong>Preferred Contact Method:</strong> {{preferred_contact}}</p>
        </div>
        
        <p><strong>What happens next?</strong></p>
        <ul>
            <li>Our team will review your inquiry carefully</li>
            <li>We'll respond within 24 business hours</li>
            <li>You'll hear from us via your preferred contact method</li>
        </ul>
        
        <p>If you need immediate assistance, please feel free to call us at <strong>+91 7603925412</strong>.</p>
        
        <p>Best regards,<br>
        <strong>Draupathi Group Team</strong></p>
    </div>
    
    <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
        <p style="margin: 0;"><strong>Draupathi Group of Companies</strong></p>
        <p>Namakkal, Tamil Nadu, India</p>
        <p>📧 draupathiitsolutions@gmail.com | 📞 +91 7603925412</p>
    </div>
</div>
```

---

## QUICK COPY-PASTE GUIDE

### For EmailJS Template Editor:

1. **Subject Field:**
   ```
   New Contact: {{subject}} - {{venture_interest}}
   ```

2. **Content Field:** 
   - Copy the entire HTML template (first detailed one)
   - Paste directly into EmailJS HTML editor

3. **Settings:**
   - **From Name:** `Draupathi Website`
   - **Reply To:** `{{from_email}}`
   - **To Email:** `draupathiitsolutions@gmail.com`

---

✅ **Your template is now ready to use!** Save it and use the Template ID in your `.env` file.

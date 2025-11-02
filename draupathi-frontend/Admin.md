# Master Prompt: Comprehensive Admin Panel for Draupathi Group Website

## Overview
Build a powerful, feature-rich admin dashboard that gives complete control over the entire website. The admin should be able to manage every aspect of content, users, media, analytics, and system settings through an intuitive interface with real-time updates.

---

## Core Admin Panel Architecture

### Technology Stack
**Frontend:**
- React.js with React Router DOM
- Tailwind CSS + shadcn/ui components
- Recharts for analytics visualization
- React Hook Form + Zod for forms
- TanStack Query (React Query) for data management
- Zustand or Context API for state management
- React DnD for drag-and-drop functionality
- React Quill or TipTap for rich text editing
- React Dropzone for file uploads
- Date-fns for date handling

**Backend:**
- Express.js with role-based access control
- JWT authentication with refresh tokens
- Multer for file uploads
- Sharp for image optimization
- MongoDB with proper indexing
- WebSocket (Socket.io) for real-time updates (optional)

---

## Complete Admin Panel Features

### 1. 🔐 Authentication & Security

#### Login System
- Secure admin login with email/password
- Two-factor authentication (optional)
- "Remember Me" functionality
- Password strength indicator
- Account lockout after failed attempts
- Session management

#### User Management
- Create admin accounts with different roles
- Role-based access control (Super Admin, Content Manager, Viewer)
- Permission management system
- User activity logs
- Account activation/deactivation
- Password reset functionality

**API Endpoints:**
```
POST /api/admin/auth/login - Admin login
POST /api/admin/auth/logout - Logout
POST /api/admin/auth/refresh - Refresh token
POST /api/admin/auth/forgot-password - Password reset request
POST /api/admin/auth/reset-password - Reset password
GET /api/admin/auth/me - Get current admin details

POST /api/admin/users - Create new admin user
GET /api/admin/users - List all admin users
PUT /api/admin/users/:id - Update user
DELETE /api/admin/users/:id - Delete user
PUT /api/admin/users/:id/toggle-status - Activate/deactivate
```

**Permissions System:**
```javascript
const PERMISSIONS = {
  SUPER_ADMIN: ['*'], // All permissions
  CONTENT_MANAGER: [
    'content.read', 'content.create', 'content.update', 'content.delete',
    'media.upload', 'media.delete',
    'products.manage', 'banners.manage'
  ],
  EDITOR: [
    'content.read', 'content.update',
    'media.upload'
  ],
  VIEWER: [
    'content.read', 'analytics.view'
  ]
};
```

---

### 2. 📊 Dashboard Overview

#### Main Dashboard Features
- **Welcome Section**: Admin name, last login time
- **Quick Stats Cards** (animated counters):
  - Total website visitors (today/week/month)
  - Total products across all ventures
  - Pending contact form submissions
  - Active announcements
  - Total ventures/services
  - Total media files
  
- **Analytics Charts**:
  - Visitor traffic graph (line chart)
  - Venture-wise product distribution (pie chart)
  - Page views by section (bar chart)
  - Top performing content
  
- **Recent Activity Feed**:
  - Latest contact form submissions
  - Recent content updates
  - New product additions
  - User actions log

- **Quick Actions Panel**:
  - Add New Product
  - Create Announcement
  - Upload Media
  - Update Home Banner
  - View Contact Submissions

**API Endpoints:**
```
GET /api/admin/dashboard/stats - Overall statistics
GET /api/admin/dashboard/analytics - Charts data
GET /api/admin/dashboard/recent-activity - Activity feed
GET /api/admin/dashboard/quick-stats - Real-time stats
```

---

### 3. 📝 Content Management System (CMS)

#### Home Page Management
**Editable Sections:**
- Hero Section:
  - Main heading with rich text editor
  - Subheading/tagline
  - Call-to-action buttons (text + links)
  - Background image/video upload
  - Enable/disable animations
  
- Company Highlights:
  - Add/edit/remove highlight cards
  - Icon selection
  - Title and description
  - Statistics counter (number + label)
  
- Featured Ventures Section:
  - Toggle visibility
  - Reorder ventures using drag-and-drop
  - Custom descriptions per venture
  
- Testimonials:
  - Add/edit/delete testimonials
  - Client name, designation, company
  - Rating stars
  - Profile image upload
  
- Partners/Clients Section:
  - Upload client logos
  - Add client names and websites
  - Drag-and-drop to reorder

**API Endpoints:**
```
GET /api/admin/content/home - Get all home content
PUT /api/admin/content/home/hero - Update hero section
POST /api/admin/content/home/highlights - Add highlight
PUT /api/admin/content/home/highlights/:id - Update highlight
DELETE /api/admin/content/home/highlights/:id - Delete highlight
PUT /api/admin/content/home/highlights/reorder - Reorder highlights

POST /api/admin/content/home/testimonials - Add testimonial
PUT /api/admin/content/home/testimonials/:id - Update testimonial
DELETE /api/admin/content/home/testimonials/:id - Delete testimonial

POST /api/admin/content/home/partners - Add partner/client
DELETE /api/admin/content/home/partners/:id - Delete partner
```

#### About Page Management
- Company Overview:
  - Mission statement (rich text)
  - Vision statement (rich text)
  - Core values (add/edit/remove)
  - Company description
  
- Company Journey Timeline:
  - Add milestone entries
  - Year, title, description
  - Upload milestone images
  - Drag-and-drop to reorder
  
- Leadership Team:
  - Add team members
  - Name, designation, bio
  - Profile photo upload
  - Social media links
  - Drag-and-drop to reorder

- Achievements Section:
  - Add/edit/remove achievements
  - Achievement title, description, date
  - Upload certificate/award images

**API Endpoints:**
```
GET /api/admin/content/about - Get all about content
PUT /api/admin/content/about/overview - Update overview
PUT /api/admin/content/about/mission-vision - Update mission/vision

POST /api/admin/content/about/timeline - Add timeline entry
PUT /api/admin/content/about/timeline/:id - Update entry
DELETE /api/admin/content/about/timeline/:id - Delete entry
PUT /api/admin/content/about/timeline/reorder - Reorder timeline

POST /api/admin/content/about/team - Add team member
PUT /api/admin/content/about/team/:id - Update member
DELETE /api/admin/content/about/team/:id - Delete member
PUT /api/admin/content/about/team/reorder - Reorder team

POST /api/admin/content/about/achievements - Add achievement
PUT /api/admin/content/about/achievements/:id - Update achievement
DELETE /api/admin/content/about/achievements/:id - Delete achievement
```

#### Contact Page Management
- Contact Information:
  - Company address (multiple locations)
  - Phone numbers (add multiple)
  - Email addresses (general, support, sales)
  - Office hours
  - Google Maps integration (coordinates)
  
- Social Media Links:
  - Facebook, Twitter, LinkedIn, Instagram, YouTube
  - Custom social platforms
  
- Contact Form Settings:
  - Enable/disable form
  - Custom form fields (add/remove)
  - Email notification settings
  - Auto-reply message customization
  - Success message customization

**API Endpoints:**
```
GET /api/admin/content/contact - Get contact page content
PUT /api/admin/content/contact/info - Update contact info
PUT /api/admin/content/contact/social - Update social links
PUT /api/admin/content/contact/form-settings - Update form settings
```

---

### 4. 🏢 Ventures Management

#### Universal Venture Controls (for all 3 ventures)

Each venture (IT Solutions, Irrigations, D Foods) should have:

**Venture Overview:**
- Venture name
- Description (rich text editor)
- Logo upload/change
- Cover image/banner
- Color theme selector
- Enable/disable venture

**Services/Solutions Management:**
- Add new service/solution
- Service title and description
- Icon selection or custom icon upload
- Key features (add multiple bullet points)
- Pricing information (if applicable)
- Drag-and-drop to reorder services
- Publish/unpublish individual services

**Projects/Portfolio (IT Solutions):**
- Add project case studies
- Project title, client name, duration
- Detailed description with rich text
- Technologies used (tags)
- Upload multiple project images
- Project URL/demo link
- Category/type of project
- Status (completed/ongoing)

**Products Catalog (Irrigations & D Foods):**
- Add/edit/delete products
- Product name and SKU
- Category management
- Detailed description
- Upload multiple product images
- Image gallery with drag-to-reorder
- Specifications table (custom fields)
- Price and availability
- Technical documents upload (PDFs)
- Related products linking

**API Endpoints:**
```
# Venture Overview
GET /api/admin/ventures - List all ventures
GET /api/admin/ventures/:ventureId - Get venture details
PUT /api/admin/ventures/:ventureId - Update venture overview
PUT /api/admin/ventures/:ventureId/toggle - Enable/disable venture

# Services Management
GET /api/admin/ventures/:ventureId/services - List services
POST /api/admin/ventures/:ventureId/services - Add service
PUT /api/admin/ventures/:ventureId/services/:id - Update service
DELETE /api/admin/ventures/:ventureId/services/:id - Delete service
PUT /api/admin/ventures/:ventureId/services/reorder - Reorder services

# Projects (IT Solutions)
POST /api/admin/ventures/it-solutions/projects - Add project
GET /api/admin/ventures/it-solutions/projects - List projects
PUT /api/admin/ventures/it-solutions/projects/:id - Update project
DELETE /api/admin/ventures/it-solutions/projects/:id - Delete project

# Products (Irrigations & D Foods)
POST /api/admin/products - Add product
GET /api/admin/products - List all products (with filters)
GET /api/admin/products/:id - Get product details
PUT /api/admin/products/:id - Update product
DELETE /api/admin/products/:id - Delete product
POST /api/admin/products/:id/images - Upload product images
DELETE /api/admin/products/:id/images/:imageId - Delete image
PUT /api/admin/products/:id/images/reorder - Reorder images

# Categories
POST /api/admin/categories - Add category
GET /api/admin/categories - List categories
PUT /api/admin/categories/:id - Update category
DELETE /api/admin/categories/:id - Delete category
```

#### Special: D Foods (Navathanya Products)

**Product Launch Management:**
- Mark products as "New Launch"
- Set launch date and time
- Launch countdown timer
- Pre-launch teaser content
- Launch notification system

**Nutritional Information:**
- Add nutritional facts table
- Ingredients list
- Allergen information
- Certifications (organic, etc.)

**Recipe Section:**
- Add recipes using the product
- Recipe title, ingredients, instructions
- Cooking time, servings
- Upload recipe images

**API Endpoints:**
```
POST /api/admin/products/launches - Schedule product launch
PUT /api/admin/products/:id/nutrition - Update nutrition info
POST /api/admin/products/:id/recipes - Add recipe
PUT /api/admin/products/:id/recipes/:recipeId - Update recipe
DELETE /api/admin/products/:id/recipes/:recipeId - Delete recipe
```

---

### 5. 🎨 Banner & Carousel Management

**Features:**
- Add/edit/delete banners
- Upload banner images (with size validation)
- Banner title and subtitle
- Call-to-action button (text + link)
- Link to internal page or external URL
- Position selector (home page, venture pages)
- Display order (drag-and-drop to reorder)
- Schedule banners:
  - Start date and time
  - End date and time
  - Auto-activate/deactivate
- Active/inactive toggle
- Preview before publishing
- Duplicate banner functionality
- Banner performance tracking (clicks)

**Banner Types:**
- Home page hero carousel
- Venture-specific banners
- Announcement banners (top bar)
- Promotional banners (sidebar)

**API Endpoints:**
```
POST /api/admin/banners - Create banner
GET /api/admin/banners - List all banners (with filters)
GET /api/admin/banners/:id - Get banner details
PUT /api/admin/banners/:id - Update banner
DELETE /api/admin/banners/:id - Delete banner
PUT /api/admin/banners/reorder - Reorder banners
POST /api/admin/banners/:id/duplicate - Duplicate banner
PUT /api/admin/banners/:id/toggle - Activate/deactivate
GET /api/admin/banners/:id/analytics - Banner click stats
```

---

### 6. 📢 Announcements & Notifications

**Announcement Management:**
- Create new announcements
- Announcement title and content (rich text)
- Announcement type:
  - General information
  - Product launch
  - Event
  - Important notice
  - Maintenance alert
- Priority level (low, medium, high, urgent)
- Target audience:
  - All visitors
  - Specific venture visitors
  - Specific page visitors
- Display location:
  - Top notification bar
  - Home page section
  - Popup modal
  - Side notification
- Schedule announcements:
  - Publish date and time
  - Expiry date and time
  - Auto-archive after expiry
- Style customization:
  - Background color
  - Text color
  - Icon selection
- Enable/disable
- Preview before publishing

**Notification System:**
- Email notifications for admin events
- Browser push notifications (optional)
- SMS notifications for critical events (optional)

**API Endpoints:**
```
POST /api/admin/announcements - Create announcement
GET /api/admin/announcements - List all announcements
GET /api/admin/announcements/:id - Get announcement
PUT /api/admin/announcements/:id - Update announcement
DELETE /api/admin/announcements/:id - Delete announcement
PUT /api/admin/announcements/:id/toggle - Activate/deactivate
GET /api/admin/announcements/active - Get active announcements
POST /api/admin/announcements/:id/duplicate - Duplicate
```

---

### 7. 📧 Contact Form Management

**Contact Submissions Dashboard:**
- View all form submissions in a table
- Filter by:
  - Date range
  - Venture interest
  - Read/unread status
  - Priority
- Search by name, email, or message content
- Sort by date, status, venture
- Pagination
- Bulk actions:
  - Mark multiple as read
  - Delete selected
  - Export selected
  - Assign to admin user

**Individual Submission View:**
- Full message details
- Sender information
- Date and time of submission
- Read/unread indicator
- Mark important/flag
- Add internal notes/comments
- Response status (pending, replied, resolved)
- Reply to sender directly from admin panel
- Export as PDF

**Email Settings:**
- Configure notification emails
- Email templates customization
- Auto-reply settings
- Email delivery testing
- SMTP configuration

**Analytics:**
- Form submission trends (graph)
- Response time statistics
- Most common inquiries
- Venture-wise submission distribution

**API Endpoints:**
```
GET /api/admin/contact/submissions - List all submissions
GET /api/admin/contact/submissions/:id - Get submission details
PUT /api/admin/contact/submissions/:id/read - Mark as read
PUT /api/admin/contact/submissions/:id/status - Update status
POST /api/admin/contact/submissions/:id/notes - Add internal note
DELETE /api/admin/contact/submissions/:id - Delete submission
POST /api/admin/contact/submissions/bulk-action - Bulk operations
GET /api/admin/contact/analytics - Contact form analytics
POST /api/admin/contact/reply - Reply to submission
GET /api/admin/contact/export - Export submissions (CSV/Excel)
```

---

### 8. 🖼️ Media Library Management

**Media Library Features:**
- Upload multiple files simultaneously
- Drag-and-drop file upload
- Supported formats:
  - Images: JPG, PNG, SVG, WebP, GIF
  - Documents: PDF, DOC, DOCX
  - Videos: MP4, WebM (for future use)
- Automatic image optimization
- Thumbnail generation
- Image editor (crop, rotate, resize)
- File organization:
  - Folders/categories
  - Tags system
  - Search by name or tags
- File details:
  - File name, size, dimensions
  - Upload date
  - Used in (shows where file is used)
- Bulk operations:
  - Delete multiple
  - Move to folder
  - Add tags
  - Download selected
- Storage usage indicator
- Replace file functionality
- Unused media detection
- Image SEO:
  - Alt text
  - Title attribute
  - Description

**API Endpoints:**
```
POST /api/admin/media/upload - Upload files
GET /api/admin/media - List all media files
GET /api/admin/media/:id - Get file details
PUT /api/admin/media/:id - Update file metadata
DELETE /api/admin/media/:id - Delete file
POST /api/admin/media/folders - Create folder
GET /api/admin/media/folders - List folders
DELETE /api/admin/media/folders/:id - Delete folder
POST /api/admin/media/bulk-delete - Delete multiple files
GET /api/admin/media/usage/:id - Check where file is used
GET /api/admin/media/unused - Find unused media
GET /api/admin/media/storage-stats - Storage usage statistics
```

---

### 9. 🎨 Appearance & Theme Settings

**Website Appearance Control:**
- Color scheme management:
  - Primary color picker
  - Secondary color picker
  - Accent colors
  - Venture-specific colors
  - Light/dark mode toggle settings
  
- Typography settings:
  - Font family selection (Google Fonts)
  - Heading fonts
  - Body font
  - Font sizes (H1-H6, body, small)
  
- Logo management:
  - Main logo upload (light version)
  - Dark mode logo
  - Favicon upload
  - Logo size adjustment
  
- Layout settings:
  - Container width
  - Spacing scale
  - Border radius
  - Shadow intensity
  
- Animation settings:
  - Enable/disable animations globally
  - Animation speed control
  - Transition effects

**API Endpoints:**
```
GET /api/admin/appearance/settings - Get all appearance settings
PUT /api/admin/appearance/colors - Update color scheme
PUT /api/admin/appearance/typography - Update fonts
POST /api/admin/appearance/logo - Upload logo
PUT /api/admin/appearance/layout - Update layout settings
PUT /api/admin/appearance/animations - Update animation settings
```

---

### 10. 🧭 Navigation & Menu Management

**Header Navigation:**
- Add/edit/remove menu items
- Create dropdown menus (multi-level)
- Drag-and-drop to reorder
- Link types:
  - Internal page
  - External URL
  - Venture page
  - Custom page
- Open in new tab option
- Highlight menu item (featured)
- Mobile menu settings

**Footer Management:**
- Footer columns management
- Add/edit footer sections
- Footer links organization
- Copyright text editor
- Social media links
- Newsletter signup settings
- Footer logo and description

**API Endpoints:**
```
GET /api/admin/navigation/header - Get header menu
PUT /api/admin/navigation/header - Update header menu
POST /api/admin/navigation/header/item - Add menu item
DELETE /api/admin/navigation/header/item/:id - Delete item
PUT /api/admin/navigation/header/reorder - Reorder items

GET /api/admin/navigation/footer - Get footer content
PUT /api/admin/navigation/footer - Update footer content
```

---

### 11. 🔍 SEO Management

**Global SEO Settings:**
- Default meta title template
- Default meta description
- Default keywords
- Open Graph default image
- Twitter card settings
- Sitemap generation
- Robots.txt editor

**Page-Specific SEO:**
- Custom meta titles for each page
- Custom meta descriptions
- Focus keywords
- Canonical URLs
- Open Graph settings per page
- Schema markup (JSON-LD)
- Breadcrumb settings

**SEO Tools:**
- SEO score analyzer
- Keyword density checker
- Broken link checker
- Image alt text checker
- Page speed insights
- Mobile-friendliness check

**API Endpoints:**
```
GET /api/admin/seo/global - Get global SEO settings
PUT /api/admin/seo/global - Update global settings
GET /api/admin/seo/pages/:page - Get page SEO
PUT /api/admin/seo/pages/:page - Update page SEO
GET /api/admin/seo/analyze/:page - SEO analysis
GET /api/admin/seo/sitemap - Generate sitemap
PUT /api/admin/seo/robots - Update robots.txt
```

---

### 12. 📈 Analytics & Reports

**Dashboard Analytics:**
- Real-time visitor count
- Total page views (today, week, month, all-time)
- Unique visitors
- Bounce rate
- Average session duration
- Traffic sources (direct, search, social, referral)
- Device breakdown (desktop, mobile, tablet)
- Browser statistics
- Geographic data (top countries/cities)

**Content Analytics:**
- Most viewed pages
- Least viewed pages
- Popular products/services
- Venture-wise traffic distribution
- Blog post performance (if applicable)

**Engagement Metrics:**
- Contact form submissions over time
- Download statistics (PDFs, brochures)
- Button click tracking
- Video watch time
- Scroll depth analysis

**Custom Reports:**
- Date range selector
- Generate PDF reports
- Export data as CSV/Excel
- Scheduled automated reports (email)

**API Endpoints:**
```
GET /api/admin/analytics/overview - Dashboard overview stats
GET /api/admin/analytics/traffic - Traffic data with date range
GET /api/admin/analytics/content - Content performance
GET /api/admin/analytics/engagement - Engagement metrics
GET /api/admin/analytics/sources - Traffic sources
GET /api/admin/analytics/devices - Device statistics
GET /api/admin/analytics/geographic - Geographic data
POST /api/admin/analytics/reports/generate - Generate custom report
GET /api/admin/analytics/reports - List saved reports
```

---

### 13. ⚙️ System Settings

**General Settings:**
- Website name
- Tagline/slogan
- Admin email address
- Support email
- Maintenance mode toggle
- Coming soon mode
- Language settings (if multi-lingual)
- Date/time format
- Timezone selection

**Email Configuration:**
- SMTP settings
- Email sender name
- Email sender address
- Test email functionality
- Email templates management

**Security Settings:**
- Session timeout duration
- Password policy enforcement
- Login attempt limits
- IP whitelist/blacklist
- Enable/disable admin API access
- SSL/HTTPS enforcement
- CORS settings

**Backup & Restore:**
- Database backup (manual/scheduled)
- Download backup files
- Restore from backup
- Backup history
- Auto-backup settings

**Cache Management:**
- Clear cache options
- Cache settings
- CDN configuration

**API Endpoints:**
```
GET /api/admin/settings/general - Get general settings
PUT /api/admin/settings/general - Update general settings
GET /api/admin/settings/email - Get email settings
PUT /api/admin/settings/email - Update email settings
POST /api/admin/settings/email/test - Send test email
GET /api/admin/settings/security - Get security settings
PUT /api/admin/settings/security - Update security settings
POST /api/admin/settings/backup/create - Create backup
GET /api/admin/settings/backup/list - List backups
POST /api/admin/settings/backup/restore - Restore backup
POST /api/admin/settings/cache/clear - Clear cache
```

---

### 14. 📊 Activity Logs & Audit Trail

**Activity Logging:**
- Track all admin actions:
  - Content changes (what was changed, old/new values)
  - User logins/logouts
  - File uploads/deletions
  - Settings modifications
  - Product additions/updates
  - Announcement publications
- Log details:
  - Action type
  - User who performed action
  - Timestamp
  - IP address
  - Device/browser info
  - Affected resource

**Activity Dashboard:**
- Recent activity feed
- Filter by:
  - Date range
  - Admin user
  - Action type
  - Resource type
- Search logs
- Export logs
- Auto-delete old logs (configurable)

**API Endpoints:**
```
GET /api/admin/activity-logs - Get activity logs
GET /api/admin/activity-logs/:id - Get log details
GET /api/admin/activity-logs/user/:userId - User-specific logs
DELETE /api/admin/activity-logs/:id - Delete log
POST /api/admin/activity-logs/export - Export logs
```

---

### 15. 🔔 Newsletter Management

**Subscriber Management:**
- View all newsletter subscribers
- Add subscribers manually
- Import subscribers (CSV)
- Export subscriber list
- Subscriber status (active/unsubscribed)
- Subscription date tracking
- Subscriber analytics

**Email Campaigns:**
- Create email campaigns
- Campaign templates
- Rich text email editor
- Preview email
- Test email sending
- Schedule campaigns
- Track campaign performance:
  - Open rate
  - Click rate
  - Unsubscribe rate

**API Endpoints:**
```
POST /api/admin/newsletter/subscribers - Add subscriber
GET /api/admin/newsletter/subscribers - List subscribers
DELETE /api/admin/newsletter/subscribers/:id - Remove subscriber
POST /api/admin/newsletter/subscribers/import - Import CSV
GET /api/admin/newsletter/subscribers/export - Export list

POST /api/admin/newsletter/campaigns - Create campaign
GET /api/admin/newsletter/campaigns - List campaigns
PUT /api/admin/newsletter/campaigns/:id - Update campaign
POST /api/admin/newsletter/campaigns/:id/send - Send campaign
GET /api/admin/newsletter/campaigns/:id/stats - Campaign statistics
```

---

## Admin Panel UI/UX Design Guidelines

### Layout Structure
```
┌─────────────────────────────────────────────────┐
│  Header: Logo | Admin Name | Notifications | ⚙  │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│  Sidebar │        Main Content Area             │
│  Nav     │                                      │
│          │                                      │
│          │                                      │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

### Sidebar Navigation (Collapsible)
```
📊 Dashboard
📝 Content Management
  ├─ Home Page
  ├─ About Page
  ├─ Contact Page
  └─ Footer Settings
🏢 Ventures
  ├─ IT Solutions
  ├─ Irrigations
  └─ D Foods
📦 Products
  ├─ All Products
  ├─ Categories
  └─ Product Launches
🎨 Banners & Carousels
📢 Announcements
📧 Contact Submissions
🖼️ Media Library
🧭 Navigation
  ├─ Header Menu
  └─ Footer Menu
🔍 SEO Management
📈 Analytics & Reports
👥 User Management
⚙️ Settings
  ├─ General
  ├─ Appearance
  ├─ Email
  ├─ Security
  └─ Backups
📋 Activity Logs
📰 Newsletter
```

### Design Principles
- **Clean & Minimal**: Avoid clutter, use white space effectively
- **Intuitive Navigation**: Clear hierarchy, breadcrumbs
- **Consistent**: Same patterns for similar actions
- **Responsive**: Works on desktop and tablets
- **Fast**: Loading indicators, optimistic updates
- **Accessible**: Keyboard navigation, screen reader support

### Color Scheme
- Primary: Blue (#3B82F6) - Actions, buttons
- Success: Green (#10B981) - Confirmations
- Warning: Yellow (#F59E0B) - Warnings
- Danger: Red (#EF4444) - Delete actions
- Neutral: Gray shades for backgrounds

### Components to Build

#### 1. Reusable Admin Components
```jsx
- <AdminLayout> - Main layout with sidebar
- <PageHeader> - Title, actions, breadcrumbs
- <DataTable> - Sortable, filterable table
- <StatCard> - Animated stat cards
- <FormBuilder> - Dynamic form generator
- <ImageUploader> - Drag-drop image upload
- <RichTextEditor> - WYSIWYG editor
- <ConfirmDialog> - Confirmation modals
- <Toast> - Success/error notifications
- <SearchBar> - Global search
- <DateRangePicker> - Date selection
- <ColorPicker> - Color selection
- <IconPicker> - Icon selection
- <TagInput> - Add/remove tags
- <DragDropList> - Reorderable lists
```

#### 2. Page Templates
```jsx
- ListPage - Table with filters, search, actions
- FormPage - Create/edit forms
- DetailPage - View single item details
- AnalyticsPage - Charts and graphs
- SettingsPage - Settings forms
```

---

## Implementation Roadmap

### Phase 1: Core Admin (Days 1-5)
1. Admin authentication system
2. Admin layout and navigation
3. Dashboard overview with basic stats
4. User management (if multiple admins)
5. Activity logging setup

### Phase 2: Content Management (Days 6-10)
1. Home page content editor
2. About page content editor
3. Contact page content editor
4. Media library
5. Banner management

### Phase 3: Venture & Products (Days 11-13)
1. Ventures management system
2. Products CRUD operations
3. Category management
4. Services/Projects management
5. Product launch system

### Phase 4: Advanced Features (Days 14-15)
1. SEO management
2. Analytics dashboard
3. Announcements system
4. Newsletter management
5. System settings
6. Final testing and optimization

---

## Database Models

### Admin User Model
```javascript
{
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  role: {
    type: String,
    enum: ['super_admin', 'content_manager', 'editor', 'viewer']
  },
  permissions: [String],
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Activity Log Model
```javascript
{
  userId: ObjectId,
  action: String, // 'create', 'update', 'delete', 'login', etc.
  resourceType: String, // 'product', 'banner', 'content', etc.
  resourceId: ObjectId,
  changes: Object, // old and new values
  ipAddress: String,
  userAgent: String,
  timestamp: Date
}
```

### Page Content Model
```javascript
{
  page: String, // 'home', 'about', 'contact'
  section: String, // 'hero', 'highlights', 'timeline'
  content: Mixed, // flexible schema
  lastUpdatedBy: ObjectId,
  version: Number,
  isPublished: Boolean,
  updatedAt: Date
}
```

---

## Security Best Practices

### Authentication
```javascript
// JWT configuration
const jwtConfig = {
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  issuer: 'draupathi-admin',
  algorithm: 'HS256'
};

// Password requirements
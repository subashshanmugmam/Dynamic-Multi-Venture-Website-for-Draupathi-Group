# Admin Settings Panel Documentation

## Overview

The Admin Settings panel provides comprehensive system configuration management for the Draupathi Group multi-venture website. It includes 8 main categories of settings that allow administrators to customize every aspect of the system.

## Settings Categories

### 1. General Settings
Configure basic site information and preferences.

**Features:**
- Site name and description
- Admin email and URL configuration
- Timezone and date format settings
- Language preferences
- Basic site metadata

**Fields:**
- **Site Name**: Display name for your website
- **Site Description**: Brief description shown in meta tags
- **Site URL**: Primary domain URL
- **Admin Email**: Primary administrative contact
- **Timezone**: Server timezone for date/time operations
- **Date Format**: Display format for dates throughout the system
- **Language**: Interface language (English, Hindi, Tamil, Telugu)

### 2. Security Settings
Manage authentication and security policies.

**Features:**
- Two-factor authentication toggle
- Session management
- Password policy configuration
- Login attempt limits
- Account lockout settings

**Security Policies:**
- **Session Timeout**: Automatic logout after inactivity (minutes)
- **Password Requirements**: Minimum length, special characters, numbers, uppercase
- **Login Protection**: Maximum attempts before lockout
- **Lockout Duration**: How long accounts remain locked

**Best Practices:**
- Enable 2FA for enhanced security
- Set session timeout to 30 minutes or less
- Require strong passwords (min 8 chars, special chars, numbers)
- Limit login attempts to 5 or fewer

### 3. Notification Settings
Control how and when notifications are sent.

**Notification Channels:**
- **Email Notifications**: Traditional email alerts
- **Push Notifications**: Browser-based notifications
- **SMS Notifications**: Text message alerts (requires SMS service)

**Event Types:**
- New user registrations
- New orders and inquiries
- System alerts and errors
- Maintenance mode notifications
- Marketing communications

**Configuration:**
Each notification type can be enabled/disabled independently for each channel.

### 4. Appearance Settings
Customize the visual appearance of the admin interface.

**Theme Options:**
- **Light Theme**: Clean, bright interface
- **Dark Theme**: Dark mode for reduced eye strain

**Color Customization:**
- **Primary Color**: Main theme color (buttons, links, highlights)
- **Secondary Color**: Accent color for secondary elements

**Branding:**
- **Logo URL**: Path to your organization's logo
- **Favicon URL**: Browser tab icon
- **Custom CSS**: Additional styling rules

**Interface Options:**
- **Enable Animations**: Smooth transitions and effects
- **Compact Mode**: Reduced padding and smaller elements

### 5. Integrations
Configure third-party services and APIs.

**Analytics:**
- **Google Analytics**: Track website usage and performance
- **Facebook Pixel**: Social media conversion tracking

**Services:**
- **Google Maps**: Location services and embedded maps
- **reCAPTCHA**: Bot protection for forms

**Media Storage:**
- **Cloudinary**: Cloud-based image and video management
- **API Keys**: Secure credentials for cloud services

**Security Note:** Never share API keys or secrets. Store them securely and rotate regularly.

### 6. Backup & Data
Manage data backup and recovery options.

**Automatic Backup:**
- **Frequency**: Hourly, daily, weekly, or monthly backups
- **Retention**: Number of days to keep backup files
- **Location**: Local storage, cloud storage, or both

**Backup Configuration:**
- **Max Size**: Maximum backup file size (MB)
- **Compression**: Optimize backup size with compression levels
- **Content**: Include/exclude uploads and database

**Manual Actions:**
- **Create Backup**: Generate immediate backup
- **Restore Backup**: Recover from existing backup
- **View Backups**: Browse available backup files

### 7. System Status
Monitor system health and configure performance settings.

**Status Monitoring:**
- **Server Status**: Real-time server health
- **Database Status**: Connection and storage info
- **Storage Usage**: Available space and usage statistics

**Performance Settings:**
- **Cache TTL**: Cache expiration time (seconds)
- **Log Level**: Verbosity of system logs (Error, Warn, Info, Debug)
- **Rate Limiting**: API requests per minute limit

**System Features:**
- **Maintenance Mode**: Temporarily disable public access
- **Debug Mode**: Enhanced error reporting
- **Cache System**: Improve performance with caching
- **CORS Support**: Cross-origin request handling

### 8. Advanced Settings
⚠️ **Warning**: These settings affect core system functionality. Only modify if you understand the implications.

**API Configuration:**
- **API Version**: Select active API version
- **Database Pool Size**: Connection pool optimization

**Security Keys:**
- **Session Secret**: Used for session encryption
- **JWT Secret**: Token signing and verification
- **Encryption Key**: General data encryption

**CORS & Origins:**
- **Allowed Origins**: Domains permitted to make API requests
- Add/remove origins as needed

**Webhook Configuration:**
- **Webhook URL**: Endpoint for system events
- **Webhook Secret**: Secure webhook verification

**Danger Zone:**
- **Reset to Defaults**: Restore original settings
- **Clear All Data**: Remove all user data (irreversible)
- **Factory Reset**: Complete system reset (irreversible)

## Import/Export Functionality

### Export Settings
- Click "Export" in the header to download current settings as JSON
- File naming: `draupathi-settings-YYYY-MM-DD.json`
- Use for backups or transferring configurations

### Import Settings
- Click "Import" to upload a JSON settings file
- Validates file format before applying
- Overwrites current settings entirely

## Security Best Practices

1. **Regular Backups**: Enable automatic daily backups
2. **Strong Authentication**: Use 2FA and strong password policies
3. **Monitor Access**: Review login attempts and system logs
4. **Update Secrets**: Rotate JWT and encryption keys regularly
5. **Limit Origins**: Only allow necessary domains in CORS settings
6. **Secure API Keys**: Never expose credentials in client-side code

## Troubleshooting

### Common Issues

**Settings Not Saving:**
- Check network connection
- Verify admin authentication token
- Review browser console for errors

**Import Fails:**
- Ensure JSON file is valid
- Check file format matches expected structure
- Verify all required fields are present

**Performance Issues:**
- Increase cache TTL for better performance
- Reduce log level in production
- Enable compression for large backups

### Support

For additional help:
1. Check system logs in the Advanced settings
2. Enable debug mode for detailed error information
3. Contact system administrator with error details

## Version Information

- **Settings Panel Version**: 2.0
- **Last Updated**: November 2024
- **Compatible API Versions**: v1, v2 (beta)

---

*This documentation covers all features of the Admin Settings panel. Keep this reference handy for system administration tasks.*
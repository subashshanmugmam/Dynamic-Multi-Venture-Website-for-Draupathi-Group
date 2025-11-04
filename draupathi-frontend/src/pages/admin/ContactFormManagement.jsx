import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Search,
  Filter,
  Eye,
  Trash2,
  Reply,
  Archive,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Calendar,
  Tag,
  MessageSquare,
  ExternalLink,
  Download,
  RefreshCw,
  AlertCircle,
  Zap,
  TrendingUp
} from 'lucide-react';

const ContactFormManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [searchQuery, statusFilter, priorityFilter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockContacts = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          subject: 'Product Inquiry - Enterprise Solution',
          message: 'Hello, I am interested in your enterprise solutions for our company with 500+ employees. Could you please provide more information about pricing and features?',
          status: 'new',
          priority: 'high',
          category: 'sales',
          isStarred: false,
          createdAt: new Date('2024-12-01T10:30:00'),
          lastReplied: null,
          source: 'website',
          company: 'Tech Corp Inc.',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0...',
          attachments: []
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah.j@company.com',
          phone: '+1 (555) 987-6543',
          subject: 'Technical Support - Login Issues',
          message: 'I have been experiencing login issues for the past 3 days. I have tried resetting my password but still cannot access my account. Please help.',
          status: 'in-progress',
          priority: 'urgent',
          category: 'support',
          isStarred: true,
          createdAt: new Date('2024-11-30T14:15:00'),
          lastReplied: new Date('2024-11-30T15:45:00'),
          source: 'email',
          company: 'Digital Solutions Ltd.',
          ipAddress: '10.0.0.25',
          userAgent: 'Mozilla/5.0...',
          attachments: ['screenshot.png', 'error-log.txt']
        },
        {
          id: 3,
          name: 'Michael Brown',
          email: 'mike.brown@startup.com',
          phone: null,
          subject: 'Partnership Opportunity',
          message: 'We are a growing startup and would like to explore partnership opportunities with your company. We believe there could be great synergy between our services.',
          status: 'responded',
          priority: 'medium',
          category: 'business',
          isStarred: false,
          createdAt: new Date('2024-11-28T09:20:00'),
          lastReplied: new Date('2024-11-29T11:30:00'),
          source: 'linkedin',
          company: 'InnovateTech',
          ipAddress: '172.16.0.5',
          userAgent: 'Mozilla/5.0...',
          attachments: ['proposal.pdf']
        },
        {
          id: 4,
          name: 'Emily Davis',
          email: 'emily.davis@gmail.com',
          phone: '+1 (555) 246-8135',
          subject: 'Feedback on Recent Purchase',
          message: 'I recently purchased your product and wanted to share some feedback. Overall, I am satisfied but noticed a few areas for improvement.',
          status: 'closed',
          priority: 'low',
          category: 'feedback',
          isStarred: false,
          createdAt: new Date('2024-11-25T16:45:00'),
          lastReplied: new Date('2024-11-26T10:15:00'),
          source: 'website',
          company: null,
          ipAddress: '203.0.113.10',
          userAgent: 'Mozilla/5.0...',
          attachments: []
        }
      ];

      setContacts(mockContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      setContacts(contacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, status: newStatus }
          : contact
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const handleToggleStar = async (contactId) => {
    try {
      setContacts(contacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, isStarred: !contact.isStarred }
          : contact
      ));
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        setContacts(contacts.filter(contact => contact.id !== contactId));
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      new: { color: 'bg-blue-100 text-blue-800', label: 'New', icon: <Mail className="w-4 h-4" /> },
      'in-progress': { color: 'bg-yellow-100 text-yellow-800', label: 'In Progress', icon: <Clock className="w-4 h-4" /> },
      responded: { color: 'bg-green-100 text-green-800', label: 'Responded', icon: <CheckCircle className="w-4 h-4" /> },
      closed: { color: 'bg-gray-100 text-gray-800', label: 'Closed', icon: <XCircle className="w-4 h-4" /> }
    };
    
    return configs[status] || configs.new;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      urgent: { color: 'bg-red-500', label: 'Urgent' },
      high: { color: 'bg-orange-500', label: 'High' },
      medium: { color: 'bg-yellow-500', label: 'Medium' },
      low: { color: 'bg-green-500', label: 'Low' }
    };
    
    return configs[priority] || configs.low;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      sales: <TrendingUp className="w-4 h-4" />,
      support: <AlertCircle className="w-4 h-4" />,
      business: <MessageSquare className="w-4 h-4" />,
      feedback: <Star className="w-4 h-4" />
    };
    
    return icons[category] || <MessageSquare className="w-4 h-4" />;
  };

  const ContactCard = ({ contact }) => {
    const statusConfig = getStatusConfig(contact.status);
    const priorityConfig = getPriorityConfig(contact.priority);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
          contact.status === 'new' ? 'border-blue-200 shadow-sm' : 'border-gray-200'
        }`}
        onClick={() => setSelectedContact(contact)}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3 flex-1">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  {contact.isStarred && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                  )}
                  <div className={`w-3 h-3 rounded-full ${priorityConfig.color} flex-shrink-0`} title={`${priorityConfig.label} Priority`} />
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                    {statusConfig.icon}
                    <span className="ml-1">{statusConfig.label}</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {getCategoryIcon(contact.category)}
                    <span className="ml-1 capitalize">{contact.category}</span>
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                  {contact.subject}
                </p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {contact.message}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {contact.email}
                  </span>
                  {contact.phone && (
                    <span className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {contact.phone}
                    </span>
                  )}
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {contact.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleStar(contact.id);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  contact.isStarred
                    ? 'text-yellow-600 hover:bg-yellow-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={contact.isStarred ? 'Remove Star' : 'Add Star'}
              >
                <Star className={`w-4 h-4 ${contact.isStarred ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReplyModal(true);
                  setSelectedContact(contact);
                }}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Reply"
              >
                <Reply className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(contact.id);
                }}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Attachments */}
          {contact.attachments && contact.attachments.length > 0 && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Tag className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-xs font-medium text-gray-700">Attachments</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {contact.attachments.map((file, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 bg-white text-xs text-gray-700 rounded border border-gray-200">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {file}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            {contact.status === 'new' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(contact.id, 'in-progress');
                }}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-yellow-200 transition-colors"
              >
                Mark In Progress
              </button>
            )}
            {contact.status === 'in-progress' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(contact.id, 'responded');
                }}
                className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-green-200 transition-colors"
              >
                Mark Responded
              </button>
            )}
            {contact.status === 'responded' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(contact.id, 'closed');
                }}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            )}
            <span className="text-xs text-gray-500">
              Source: {contact.source}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  const ContactDetailModal = () => selectedContact && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {selectedContact.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h2>
                <p className="text-gray-600">{selectedContact.email}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedContact(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Message Details</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedContact.subject}</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {selectedContact.attachments && selectedContact.attachments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {selectedContact.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{file}</span>
                        </div>
                        <button className="p-1 text-gray-500 hover:text-blue-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Reply</h3>
                <textarea
                  placeholder="Type your response..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Tag className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Send Reply
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedContact.email}</span>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedContact.phone}</span>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedContact.company}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status & Priority</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      value={selectedContact.status}
                      onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select 
                      value={selectedContact.priority}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Metadata</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Received:</span>
                    <span className="text-gray-700">{selectedContact.createdAt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Source:</span>
                    <span className="text-gray-700 capitalize">{selectedContact.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-700 capitalize">{selectedContact.category}</span>
                  </div>
                  {selectedContact.lastReplied && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Reply:</span>
                      <span className="text-gray-700">{selectedContact.lastReplied.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const ReplyModal = () => showReplyModal && selectedContact && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Reply to {selectedContact.name}</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              defaultValue={`Re: ${selectedContact.subject}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              placeholder="Type your response..."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Mark as responded</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Send copy to me</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={() => setShowReplyModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Send Reply
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Form Management</h1>
          <p className="text-gray-600 mt-1">Manage customer inquiries and communications</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchContacts()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Contacts', value: contacts.length, icon: Mail, color: 'blue' },
          { label: 'New Messages', value: contacts.filter(c => c.status === 'new').length, icon: Zap, color: 'yellow' },
          { label: 'In Progress', value: contacts.filter(c => c.status === 'in-progress').length, icon: Clock, color: 'orange' },
          { label: 'Starred', value: contacts.filter(c => c.isStarred).length, icon: Star, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 animate-pulse p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-600">Customer inquiries will appear here when received</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}

      {/* Modals */}
      <ContactDetailModal />
      <ReplyModal />
    </div>
  );
};

export default ContactFormManagement;
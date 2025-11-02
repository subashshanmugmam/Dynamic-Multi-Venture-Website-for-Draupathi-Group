import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save,
  Eye,
  ArrowLeft,
  Image,
  Link,
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Quote,
  Undo,
  Redo
} from 'lucide-react';

const ContentEditor = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    title: '',
    slug: '',
    type: 'page',
    content: '',
    excerpt: '',
    status: 'draft',
    categories: [],
    tags: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [],
      canonicalUrl: '',
      noIndex: false
    }
  });

  const [activeTab, setActiveTab] = useState('content');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id) {
      fetchContent();
    }
  }, [mode, id]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish = false) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('adminToken');
      
      const saveData = {
        ...content,
        status: publish ? 'published' : content.status
      };

      const url = mode === 'create' ? '/api/admin/content' : `/api/admin/content/${id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(saveData)
      });

      const data = await response.json();
      if (data.success) {
        if (mode === 'create') {
          navigate(`/admin/content/edit/${data.data._id}`);
        } else {
          setContent(data.data);
        }
        // Show success message
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleTitleChange = (title) => {
    setContent(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      seo: {
        ...prev.seo,
        metaTitle: prev.seo.metaTitle || title.substring(0, 60)
      }
    }));
  };

  const ToolbarButton = ({ icon: _Icon, onClick, active = false, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-colors ${
        active
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const insertText = (before, after = '') => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    setContent(prev => ({ ...prev, content: newText }));
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/content')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'create' ? 'Create Content' : 'Edit Content'}
            </h1>
            <p className="text-gray-600">
              {mode === 'create' ? 'Create new content' : `Editing: ${content.title}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {['content', 'seo'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <input
                      type="text"
                      value={content.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter title..."
                      className="w-full text-3xl font-bold border-0 outline-0 focus:ring-0 placeholder-gray-400"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={content.slug}
                      onChange={(e) => setContent(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={content.excerpt}
                      onChange={(e) => setContent(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description..."
                    />
                  </div>

                  {!previewMode ? (
                    <>
                      {/* Toolbar */}
                      <div className="border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-1 p-2 border-b border-gray-200">
                          <ToolbarButton
                            icon={Bold}
                            onClick={() => insertText('**', '**')}
                            title="Bold"
                          />
                          <ToolbarButton
                            icon={Italic}
                            onClick={() => insertText('*', '*')}
                            title="Italic"
                          />
                          <div className="w-px h-6 bg-gray-300 mx-2" />
                          <ToolbarButton
                            icon={List}
                            onClick={() => insertText('\n- ')}
                            title="List"
                          />
                          <ToolbarButton
                            icon={Quote}
                            onClick={() => insertText('\n> ')}
                            title="Quote"
                          />
                          <ToolbarButton
                            icon={Code}
                            onClick={() => insertText('`', '`')}
                            title="Code"
                          />
                          <div className="w-px h-6 bg-gray-300 mx-2" />
                          <ToolbarButton
                            icon={Link}
                            onClick={() => insertText('[', '](url)')}
                            title="Link"
                          />
                          <ToolbarButton
                            icon={Image}
                            onClick={() => insertText('![alt](', ')')}
                            title="Image"
                          />
                        </div>

                        {/* Content Editor */}
                        <textarea
                          id="content-editor"
                          value={content.content}
                          onChange={(e) => setContent(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full min-h-96 p-4 border-0 outline-0 focus:ring-0 resize-none font-mono text-sm"
                          placeholder="Start writing your content..."
                        />
                      </div>
                    </>
                  ) : (
                    /* Preview */
                    <div className="border border-gray-300 rounded-lg p-6 min-h-96 prose max-w-none">
                      <h1>{content.title}</h1>
                      {content.excerpt && (
                        <p className="lead text-gray-600">{content.excerpt}</p>
                      )}
                      <div dangerouslySetInnerHTML={{ 
                        __html: content.content.replace(/\n/g, '<br/>') 
                      }} />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={content.seo.metaTitle}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaTitle: e.target.value }
                      }))}
                      maxLength={60}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {content.seo.metaTitle.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={content.seo.metaDescription}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaDescription: e.target.value }
                      }))}
                      maxLength={160}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {content.seo.metaDescription.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={content.seo.canonicalUrl}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        seo: { ...prev.seo, canonicalUrl: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="noIndex"
                      checked={content.seo.noIndex}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        seo: { ...prev.seo, noIndex: e.target.checked }
                      }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="noIndex" className="ml-2 text-sm text-gray-700">
                      Prevent search engines from indexing this page
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={content.status}
                  onChange={(e) => setContent(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={content.type}
                  onChange={(e) => setContent(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="page">Page</option>
                  <option value="blog">Blog Post</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories & Tags */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories & Tags</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <input
                  type="text"
                  value={content.categories.join(', ')}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    categories: e.target.value.split(',').map(cat => cat.trim()).filter(Boolean)
                  }))}
                  placeholder="Enter categories, separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={content.tags.join(', ')}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                  }))}
                  placeholder="Enter tags, separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
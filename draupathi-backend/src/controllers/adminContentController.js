const Content = require('../models/Content');
const ActivityLog = require('../models/ActivityLog');

// Get all content with pagination and filtering
exports.getAllContent = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      status,
      section,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (type) query.type = type;
    if (status) query.status = status;
    if (section) query.section = section;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const [content, total] = await Promise.all([
      Content.find(query)
        .populate('author', 'name email')
        .populate('lastModifiedBy', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Content.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: {
        content,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

// Get single content by ID
exports.getContent = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate('author', 'name email')
      .populate('lastModifiedBy', 'name email');

    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    res.json({
      success: true,
      data: content
    });

  } catch (error) {
    next(error);
  }
};

// Create new content
exports.createContent = async (req, res, next) => {
  try {
    const contentData = {
      ...req.body,
      author: req.user.id
    };

    // Handle section-based content
    if (req.body.section && req.body.key) {
      contentData.type = 'section';
    }

    const content = new Content(contentData);
    await content.save();

    // Log activity
    await ActivityLog.logActivity(
      req.user.id,
      'create',
      'content',
      content._id,
      { title: content.title, type: content.type }
    );

    // Populate before sending response
    await content.populate('author', 'name email');

    res.status(201).json({
      success: true,
      data: content,
      message: 'Content created successfully'
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Content with this slug already exists'
      });
    }
    next(error);
  }
};

// Update content
exports.updateContent = async (req, res, next) => {
  try {
    const updateData = {
      ...req.body,
      lastModifiedBy: req.user.id,
      $inc: { version: 1 }
    };

    // Remove fields that shouldn't be updated directly
    delete updateData.author;
    delete updateData._id;
    delete updateData.analytics;

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('author', 'name email')
     .populate('lastModifiedBy', 'name email');

    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    // Log activity
    await ActivityLog.logActivity(
      req.user.id,
      'update',
      'content',
      content._id,
      { title: content.title, changes: Object.keys(req.body) }
    );

    res.json({
      success: true,
      data: content,
      message: 'Content updated successfully'
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Content with this slug already exists'
      });
    }
    next(error);
  }
};

// Delete content
exports.deleteContent = async (req, res, next) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    // Log activity
    await ActivityLog.logActivity(
      req.user.id,
      'delete',
      'content',
      content._id,
      { title: content.title, type: content.type }
    );

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

// Publish/Unpublish content
exports.togglePublishStatus = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found'
      });
    }

    // Toggle status
    content.status = content.status === 'published' ? 'draft' : 'published';
    content.lastModifiedBy = req.user.id;
    
    if (content.status === 'published') {
      content.publishedAt = new Date();
      content.isPublished = true;
    } else {
      content.isPublished = false;
    }

    await content.save();

    // Log activity
    await ActivityLog.logActivity(
      req.user.id,
      'update',
      'content',
      content._id,
      { 
        title: content.title, 
        action: content.status === 'published' ? 'published' : 'unpublished' 
      }
    );

    res.json({
      success: true,
      data: content,
      message: `Content ${content.status === 'published' ? 'published' : 'unpublished'} successfully`
    });

  } catch (error) {
    next(error);
  }
};

// Get content by section (for dynamic content)
exports.getContentBySection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const { published = 'true' } = req.query;

    const content = await Content.getBySection(section, published === 'true');

    res.json({
      success: true,
      data: content
    });

  } catch (error) {
    next(error);
  }
};

// Update section content (for dynamic content management)
exports.updateSectionContent = async (req, res, next) => {
  try {
    const { section, key } = req.params;
    const { value, type = 'text' } = req.body;

    const content = await Content.updateContent(
      section,
      key,
      value,
      type,
      req.user.id
    );

    // Log activity
    await ActivityLog.logActivity(
      req.user.id,
      'update',
      'section-content',
      content._id,
      { section, key, type }
    );

    res.json({
      success: true,
      data: content,
      message: 'Section content updated successfully'
    });

  } catch (error) {
    next(error);
  }
};

// Get content statistics
exports.getContentStats = async (req, res, next) => {
  try {
    const [
      totalContent,
      publishedContent,
      draftContent,
      pageCount,
      blogCount,
      sectionCount,
      recentContent
    ] = await Promise.all([
      Content.countDocuments(),
      Content.countDocuments({ status: 'published' }),
      Content.countDocuments({ status: 'draft' }),
      Content.countDocuments({ type: 'page' }),
      Content.countDocuments({ type: 'blog' }),
      Content.countDocuments({ type: 'section' }),
      Content.find()
        .populate('author', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title type status createdAt author')
    ]);

    // Get most viewed content
    const mostViewed = await Content.find({ 'analytics.views': { $gt: 0 } })
      .sort({ 'analytics.views': -1 })
      .limit(5)
      .select('title analytics.views url type');

    res.json({
      success: true,
      data: {
        overview: {
          total: totalContent,
          published: publishedContent,
          draft: draftContent
        },
        byType: {
          pages: pageCount,
          blogs: blogCount,
          sections: sectionCount
        },
        recent: recentContent,
        mostViewed
      }
    });

  } catch (error) {
    next(error);
  }
};

// Bulk operations
exports.bulkContentActions = async (req, res, next) => {
  try {
    const { action, contentIds } = req.body;

    if (!contentIds || !Array.isArray(contentIds) || contentIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Content IDs are required'
      });
    }

    let updateData = { lastModifiedBy: req.user.id };
    let logAction = action;

    switch (action) {
      case 'publish':
        updateData.status = 'published';
        updateData.publishedAt = new Date();
        updateData.isPublished = true;
        break;
      case 'unpublish':
        updateData.status = 'draft';
        updateData.isPublished = false;
        break;
      case 'archive':
        updateData.status = 'archived';
        updateData.isPublished = false;
        break;
      case 'delete':
        await Content.deleteMany({ _id: { $in: contentIds } });
        
        // Log bulk delete
        await ActivityLog.logActivity(
          req.user.id,
          'bulk_delete',
          'content',
          null,
          { count: contentIds.length, contentIds }
        );

        return res.json({
          success: true,
          message: `${contentIds.length} content items deleted successfully`
        });
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action'
        });
    }

    const result = await Content.updateMany(
      { _id: { $in: contentIds } },
      updateData
    );

    // Log bulk action
    await ActivityLog.logActivity(
      req.user.id,
      `bulk_${logAction}`,
      'content',
      null,
      { count: result.modifiedCount, contentIds }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} content items ${action}ed successfully`,
      data: {
        modifiedCount: result.modifiedCount
      }
    });

  } catch (error) {
    next(error);
  }
};
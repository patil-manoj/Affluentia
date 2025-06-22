import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Simple authentication middleware (you can enhance this with proper JWT/sessions)
const adminAuth = (req, res, next) => {
  const { authorization } = req.headers;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Set this in your .env file
  
  if (!authorization || authorization !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized access' 
    });
  }
  
  next();
};

// GET /api/admin/contacts - Get all contacts with pagination and filters
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter query
    const filter = {};
    if (req.query.projectType) {
      filter.projectType = req.query.projectType;
    }
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { message: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    if (req.query.dateFrom || req.query.dateTo) {
      filter.createdAt = {};
      if (req.query.dateFrom) {
        filter.createdAt.$gte = new Date(req.query.dateFrom);
      }
      if (req.query.dateTo) {
        filter.createdAt.$lte = new Date(req.query.dateTo);
      }
    }

    // Get contacts with pagination
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Contact.countDocuments(filter);
    
    // Get summary statistics
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          totalContacts: { $sum: 1 },
          averageMessageLength: { $avg: { $strLenCP: "$message" } }
        }
      }
    ]);

    const projectTypeStats = await Contact.aggregate([
      {
        $group: {
          _id: "$projectType",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        },
        stats: {
          total: stats[0]?.totalContacts || 0,
          averageMessageLength: Math.round(stats[0]?.averageMessageLength || 0),
          projectTypes: projectTypeStats
        }
      }
    });

  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
});

// GET /api/admin/contacts/:id - Get single contact details
router.get('/contacts/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('❌ Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: error.message
    });
  }
});

// DELETE /api/admin/contacts/:id - Delete a contact
router.delete('/contacts/:id', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message
    });
  }
});

// GET /api/admin/dashboard - Get dashboard overview
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get various statistics
    const totalContacts = await Contact.countDocuments();
    const contactsThisMonth = await Contact.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    const contactsThisWeek = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Project type distribution
    const projectTypeStats = await Contact.aggregate([
      {
        $group: {
          _id: "$projectType",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Monthly trend
    const monthlyTrend = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({
      success: true,
      data: {
        summary: {
          totalContacts,
          contactsThisMonth,
          contactsThisWeek,
          growthRate: totalContacts > 0 ? Math.round((contactsThisMonth / totalContacts) * 100) : 0
        },
        recentContacts,
        projectTypeStats,
        monthlyTrend
      }
    });

  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
});

// POST /api/admin/export - Export contacts to CSV
router.post('/export', adminAuth, async (req, res) => {
  try {
    const { format = 'csv', filters = {} } = req.body;
    
    // Build filter query
    const filter = {};
    if (filters.projectType) {
      filter.projectType = filters.projectType;
    }
    if (filters.dateFrom || filters.dateTo) {
      filter.createdAt = {};
      if (filters.dateFrom) {
        filter.createdAt.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        filter.createdAt.$lte = new Date(filters.dateTo);
      }
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    if (format === 'csv') {
      // Generate CSV
      const csvHeader = 'Name,Email,Phone,Project Type,Budget,Message,Files Count,Submitted Date\n';
      const csvRows = contacts.map(contact => {
        const row = [
          `"${contact.name || ''}"`,
          `"${contact.email || ''}"`,
          `"${contact.phone || ''}"`,
          `"${contact.projectType || ''}"`,
          `"${contact.budget || ''}"`,
          `"${(contact.message || '').replace(/"/g, '""')}"`,
          contact.files ? contact.files.length : 0,
          contact.createdAt ? new Date(contact.createdAt).toISOString().split('T')[0] : ''
        ].join(',');
        return row;
      }).join('\n');

      const csvContent = csvHeader + csvRows;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="contacts-${new Date().toISOString().split('T')[0]}.csv"`);
      res.send(csvContent);
    } else {
      // Return JSON
      res.json({
        success: true,
        data: contacts,
        count: contacts.length
      });
    }

  } catch (error) {
    console.error('❌ Error exporting contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export contacts',
      error: error.message
    });
  }
});

export default router;

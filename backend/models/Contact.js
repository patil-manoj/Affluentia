import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    enum: {
      values: ['residential', 'commercial', 'interior', 'renovation', 'consultation', 'landscaping', 'other'],
      message: 'Invalid project type'
    }
  },
  budget: {
    type: String,
    enum: ['under-50k', '50k-100k', '100k-250k', '250k-500k', '500k-1m', 'over-1m', ''],
    default: ''
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  files: [{
    originalName: String,
    filename: String,
    url: String,
    size: Number,
    mimetype: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'cancelled'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    default: 'website'
  },
  ipAddress: String,
  userAgent: String,
  followUpDate: Date,
  notes: [{
    content: String,
    addedBy: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  collection: 'contacts'
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ phone: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ projectType: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ priority: 1 });

// Virtual for full name display
contactSchema.virtual('displayName').get(function() {
  return this.name;
});

// Method to format phone number
contactSchema.methods.getFormattedPhone = function() {
  const phone = this.phone.replace(/\D/g, '');
  if (phone.length === 10) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return this.phone;
};

// Static method to get contacts by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get recent contacts
contactSchema.statics.getRecent = function(limit = 10) {
  return this.find().sort({ createdAt: -1 }).limit(limit);
};

// Pre-save middleware to set priority based on project type
contactSchema.pre('save', function(next) {
  if (this.isNew) {
    // Set higher priority for commercial and renovation projects
    if (['commercial', 'renovation'].includes(this.projectType)) {
      this.priority = 'high';
    } else if (this.projectType === 'consultation') {
      this.priority = 'low';
    }
    
    // Set follow-up date (3 days from creation)
    this.followUpDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  }
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

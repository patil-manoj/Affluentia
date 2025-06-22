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
    trim: true
  },  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    enum: ['residential', 'commercial', 'interior', 'renovation', 'consultation', 'landscaping', 'other']
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
    size: Number,
    mimetype: String
  }],
  status: {
    type: String,
    enum: ['new', 'contacted', 'completed'],
    default: 'new'
  },
  ipAddress: String
}, {
  timestamps: true
});

// Indexes for better performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;

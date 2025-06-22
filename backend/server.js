import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact-simple.js';
import adminRoutes from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for deployment platforms
app.set('trust proxy', true);

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://affluentia.netlify.app'
  ],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.log('⚠️ MONGO_URL not found in environment variables');
      console.log('📝 Running in development mode without database');
      return;
    }

    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME || 'affluentia_interior',
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('📝 Continuing without database - check your MongoDB credentials');
    console.log('🔍 Expected format: mongodb+srv://username:password@cluster.mongodb.net/');
  }
};

connectDB();

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Affluentia Interior Design API',
    version: '1.0.0',
    database: {
      connected: mongoose.connection.readyState === 1,
      status: mongoose.connection.readyState,
      // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      statusText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    }
  });
});

// Debug endpoint to check environment
app.get('/api/debug', (req, res) => {
  res.json({
    success: true,
    database: {
      connected: mongoose.connection.readyState === 1,
      status: mongoose.connection.readyState,
      hasMongoUrl: !!process.env.MONGO_URL,
      mongoUrlFormat: process.env.MONGO_URL ?
        (process.env.MONGO_URL.startsWith('mongodb+srv://') ? 'Atlas format' : 'Standard format') :
        'Not provided'
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use(errorHandler);

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await mongoose.connection.close();
  process.exit(0);
});

export default app;

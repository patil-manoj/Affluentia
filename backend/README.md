# Affluentia Interior Design - Backend API

A robust Node.js backend API for the Affluentia Interior Design website, built with Express.js and MongoDB.

## 🚀 Features

- **Contact Form Management**: Handle contact form submissions with file uploads
- **File Upload Support**: Upload images, documents, and design files to Cloudinary
- **Email Notifications**: Automated email notifications and auto-replies
- **Data Validation**: Comprehensive input validation with Joi
- **Rate Limiting**: Protection against spam and abuse
- **Error Handling**: Comprehensive error handling and logging
- **RESTful API**: Clean, organized API endpoints
- **Database Integration**: MongoDB integration with Mongoose
- **Security**: Helmet.js security headers and CORS configuration

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Storage**: Cloudinary
- **Email Service**: Nodemailer
- **Validation**: Joi
- **Security**: Helmet, CORS, Express Rate Limit
- **Environment**: dotenv

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the `.env` file and update the following variables:
   
   ```bash
   # Database
   MONGO_URL=mongodb+srv://affluentiainterior:AHCSloHoj3z7VI2T@affluentia.g4kbdh4.mongodb.net/?retryWrites=true&w=majority&appName=affluentia
   
   # Email Configuration (Gmail)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   
   # Cloudinary (for file uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Security
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 🔧 Email Setup (Gmail)

1. **Enable 2-Factor Authentication** in your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Update .env file** with your email and app password

## ☁️ Cloudinary Setup

1. **Create a Cloudinary account** at [cloudinary.com](https://cloudinary.com)
2. **Get your credentials** from the dashboard
3. **Update .env file** with your Cloudinary credentials

## 📚 API Endpoints

### Contact Form

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all contacts (admin) |
| GET | `/api/contact/:id` | Get single contact |
| PUT | `/api/contact/:id/status` | Update contact status |
| GET | `/api/contact/stats/dashboard` | Get dashboard statistics |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/` | API information |

## 📝 Contact Form Submission

**POST** `/api/contact`

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "projectType": "residential",
  "budget": "50k-100k",
  "message": "I need help with my living room design..."
}
```

### With File Upload
```javascript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+1234567890');
formData.append('projectType', 'residential');
formData.append('message', 'I need help with my living room design...');
formData.append('files', file1);
formData.append('files', file2);

fetch('/api/contact', {
  method: 'POST',
  body: formData
});
```

### Response
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": "605c5d5e9f1b2c001f647a3b",
    "name": "John Doe",
    "email": "john@example.com",
    "projectType": "residential",
    "status": "new",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "filesUploaded": 2
  }
}
```

## 🔐 Security Features

- **Rate Limiting**: 3 contact form submissions per 15 minutes per IP
- **Input Validation**: Comprehensive validation using Joi
- **File Upload Security**: File type and size restrictions
- **CORS Protection**: Configurable CORS origins
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Secure error responses

## 📊 Database Schema

### Contact Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  projectType: String,
  budget: String,
  message: String,
  files: Array,
  status: String,
  priority: String,
  source: String,
  ipAddress: String,
  userAgent: String,
  followUpDate: Date,
  notes: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Environment Variables for Production
```bash
NODE_ENV=production
PORT=5000
MONGO_URL=your-production-mongodb-url
CORS_ORIGIN=https://your-frontend-domain.com
```

### PM2 (Process Manager)
```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start server.js --name "affluentia-api"

# Monitor
pm2 monit

# View logs
pm2 logs affluentia-api
```

## 📁 Project Structure

```
backend/
├── models/
│   └── Contact.js          # MongoDB schemas
├── routes/
│   └── contact.js          # API routes
├── middleware/
│   ├── validation.js       # Input validation
│   └── errorHandler.js     # Error handling
├── services/
│   └── emailService.js     # Email functionality
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── server.js              # Main server file
└── README.md              # This file
```

## 🔧 Available Scripts

```bash
npm start         # Start production server
npm run dev       # Start development server with nodemon
npm run build     # No build step required
```

## 📞 Support

For support, email [affluentiainterior@gmail.com](mailto:affluentiainterior@gmail.com) or call +91 7756456178.

## 📄 License

This project is licensed under the MIT License.

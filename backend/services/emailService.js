import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email credentials not configured. Email notifications will be skipped.');
    return null;
  }

  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use app password for Gmail
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send notification email to company
export const sendContactEmail = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const projectTypeLabels = {
    residential: 'Residential Design',
    commercial: 'Commercial Space',
    interior: 'Interior Styling',
    renovation: 'Renovation',
    consultation: 'Consultation',
    landscaping: 'Landscaping',
    other: 'Other'
  };

  const budgetLabels = {
    'under-50k': 'Under $50,000',
    '50k-100k': '$50,000 - $100,000',
    '100k-250k': '$100,000 - $250,000',
    '250k-500k': '$250,000 - $500,000',
    '500k-1m': '$500,000 - $1,000,000',
    'over-1m': 'Over $1,000,000'
  };

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to company email
    subject: `🏡 New Contact Form Submission - ${contact.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B7355, #D4AF37); color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #8B7355; }
          .value { margin-top: 5px; }
          .priority-high { border-left: 4px solid #e74c3c; padding-left: 10px; }
          .priority-medium { border-left: 4px solid #f39c12; padding-left: 10px; }
          .priority-low { border-left: 4px solid #27ae60; padding-left: 10px; }
          .files { background: white; padding: 15px; border-radius: 5px; margin-top: 10px; }
          .file-item { padding: 8px; border-bottom: 1px solid #eee; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Affluentia Interior Design</p>
          </div>
          
          <div class="content priority-${contact.priority}">
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${contact.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${contact.email}">${contact.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${contact.phone}">${contact.phone}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Project Type:</div>
              <div class="value">${projectTypeLabels[contact.projectType] || contact.projectType}</div>
            </div>
            
            ${contact.budget ? `
            <div class="field">
              <div class="label">Budget:</div>
              <div class="value">${budgetLabels[contact.budget] || contact.budget}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value" style="white-space: pre-wrap;">${contact.message}</div>
            </div>
            
            <div class="field">
              <div class="label">Priority:</div>
              <div class="value" style="text-transform: uppercase; font-weight: bold; color: ${contact.priority === 'high' ? '#e74c3c' : contact.priority === 'medium' ? '#f39c12' : '#27ae60'};">${contact.priority}</div>
            </div>
            
            <div class="field">
              <div class="label">Submitted:</div>
              <div class="value">${new Date(contact.createdAt).toLocaleString()}</div>
            </div>
            
            ${contact.files && contact.files.length > 0 ? `
            <div class="field">
              <div class="label">Attached Files (${contact.files.length}):</div>
              <div class="files">
                ${contact.files.map(file => `
                  <div class="file-item">
                    <strong>${file.originalName}</strong><br>
                    <small>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB | Type: ${file.mimetype}</small><br>
                    <a href="${file.url}" target="_blank">View File</a>
                  </div>
                `).join('')}
              </div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Contact ID:</div>
              <div class="value">${contact._id}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from your website contact form.</p>
            <p>Please respond to this inquiry within 24 hours for best customer service.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Notification email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send notification email:', error);
    throw error;
  }
};

// Send auto-reply email to user
export const sendAutoReply = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: contact.email,
    subject: '🏡 Thank you for contacting Affluentia Interior Design',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B7355, #D4AF37); color: white; padding: 30px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; }
          .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; }
          .contact-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .social-links { margin-top: 20px; }
          .social-links a { margin: 0 10px; color: #D4AF37; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">✨ Affluentia Interior Design</div>
            <h1>Thank You for Your Interest!</h1>
          </div>
          
          <div class="content">
            <p>Dear ${contact.name},</p>
            
            <p>Thank you for reaching out to Affluentia Interior Design! We're excited about the possibility of working with you on your ${contact.projectType} project.</p>
            
            <div class="highlight">
              <h3>📋 Your Submission Summary:</h3>
              <p><strong>Project Type:</strong> ${contact.projectType.charAt(0).toUpperCase() + contact.projectType.slice(1)}</p>
              <p><strong>Submission Date:</strong> ${new Date(contact.createdAt).toLocaleDateString()}</p>
              <p><strong>Reference ID:</strong> ${contact._id.toString().slice(-8).toUpperCase()}</p>
              ${contact.files && contact.files.length > 0 ? `<p><strong>Files Received:</strong> ${contact.files.length} file(s)</p>` : ''}
            </div>
            
            <h3>🚀 What Happens Next?</h3>
            <ol>
              <li><strong>Review (24 hours):</strong> Our team will carefully review your project details and requirements.</li>
              <li><strong>Initial Consultation:</strong> We'll schedule a consultation call to discuss your vision in detail.</li>
              <li><strong>Proposal:</strong> Based on our discussion, we'll prepare a customized proposal for your project.</li>
              <li><strong>Project Kickoff:</strong> Once approved, we'll begin transforming your space!</li>
            </ol>
            
            <div class="contact-info">
              <h3>📞 Need to Reach Us Immediately?</h3>
              <p><strong>Phone:</strong> <a href="tel:+917756456178">+91 7756456178</a></p>
              <p><strong>Email:</strong> <a href="mailto:affluentiainterior@gmail.com">affluentiainterior@gmail.com</a></p>
              <p><strong>Response Time:</strong> We typically respond within 24 hours during business days.</p>
            </div>
            
            <p>We're passionate about creating beautiful, functional spaces that reflect your unique style and needs. Your project is important to us, and we can't wait to bring your vision to life!</p>
            
            <p>Best regards,<br>
            <strong>The Affluentia Interior Design Team</strong></p>
            
            <div class="social-links">
              <p>Follow us for design inspiration:</p>
              <a href="#">Facebook</a> |
              <a href="#">Instagram</a> |
              <a href="#">LinkedIn</a>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated response. Please do not reply directly to this email.</p>
            <p>If you need immediate assistance, please call us at +91 7756456178</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send auto-reply email:', error);
    throw error;
  }
};

// Send follow-up email (can be used for reminders)
export const sendFollowUpEmail = async (contact, message) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: contact.email,
    subject: `Follow-up: Your ${contact.projectType} project with Affluentia Interior Design`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B7355, #D4AF37); color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Follow-up: Your Interior Design Project</h1>
          </div>
          
          <div class="content">
            <p>Dear ${contact.name},</p>
            
            <div style="white-space: pre-wrap;">${message}</div>
            
            <p>If you have any questions or would like to schedule a consultation, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>
            <strong>Affluentia Interior Design Team</strong></p>
            
            <p><strong>Contact:</strong> +91 7756456178 | affluentiainterior@gmail.com</p>
          </div>
          
          <div class="footer">
            <p>Reference ID: ${contact._id.toString().slice(-8).toUpperCase()}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Follow-up email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send follow-up email:', error);
    throw error;
  }
};

export default {
  sendContactEmail,
  sendAutoReply,
  sendFollowUpEmail
};

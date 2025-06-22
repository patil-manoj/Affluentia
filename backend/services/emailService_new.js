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

  const emailText = `
New Contact Form Submission

Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone}
Project Type: ${projectTypeLabels[contact.projectType] || contact.projectType}
${contact.budget ? `Budget: ${contact.budget}` : ''}

Message:
${contact.message}

${contact.files?.length > 0 ? `Files attached: ${contact.files.length}` : 'No files attached'}

Submitted at: ${new Date(contact.createdAt).toLocaleString()}
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission - ${contact.name}`,
    text: emailText,
    html: emailText.replace(/\n/g, '<br>')
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send contact notification email:', error);
    throw error;
  }
};

// Send auto-reply to user
export const sendAutoReply = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const emailText = `
Dear ${contact.name},

Thank you for contacting Affluentia Interior Design! We have received your inquiry and will get back to you within 24 hours.

Here's a summary of your submission:
- Project Type: ${contact.projectType}
- Message: ${contact.message}

In the meantime, feel free to explore our portfolio at our website or call us directly at +91 775645618 if you have any urgent questions.

Best regards,
The Affluentia Interior Design Team

---
This is an automated response. Please do not reply to this email.
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: contact.email,
    subject: 'Thank you for contacting Affluentia Interior Design',
    text: emailText,
    html: emailText.replace(/\n/g, '<br>')
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send auto-reply email:', error);
    throw error;
  }
};

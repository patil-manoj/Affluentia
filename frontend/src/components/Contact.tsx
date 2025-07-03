import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BuildingOffice2Icon, 
  PhoneIcon, 
  EnvelopeIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Toast from './ui/Toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  files: File[];
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  files?: string;
  general?: string;
}
const social = [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    files: []
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Client-side validation
  const validateField = (name: string, value: string | File[]): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Name must be at least 2 characters long';
        }
        if (typeof value === 'string' && value.trim().length > 100) {
          return 'Name cannot exceed 100 characters';
        }
        break;
      
      case 'email':
        if (!value || typeof value !== 'string') {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        break;
      
      case 'phone':
        if (!value || typeof value !== 'string') {
          return 'Phone number is required';
        }
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value.trim().replace(/\s/g, ''))) {
          return 'Please enter a valid phone number (at least 10 digits)';
        }
        break;
      
      case 'projectType':
        if (!value || typeof value !== 'string') {
          return 'Project type is required';
        }
        break;
      
      case 'message':
        if (!value || typeof value !== 'string') {
          return 'Project details are required';
        }
        if (value.trim().length < 10) {
          return 'Please provide more details about your project (at least 10 characters)';
        }
        if (value.trim().length > 2000) {
          return 'Message cannot exceed 2000 characters';
        }
        break;
      
      case 'files':
        if (Array.isArray(value)) {
          if (value.length > 10) {
            return 'Maximum 10 files allowed';
          }
          for (const file of value) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
              return `File "${file.name}" is too large. Maximum size is 10MB per file`;
            }
          }
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
          const allowedExtensions = ['.dwg', '.skp'];
          
          for (const file of value) {
            const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
            const isAllowed = allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
            if (!isAllowed) {
              return `File "${file.name}" has an unsupported format. Allowed: PDF, DOC, DOCX, JPG, PNG, GIF, DWG, SKP`;
            }
          }
        }
        break;
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    errors.name = validateField('name', formData.name);
    errors.email = validateField('email', formData.email);
    errors.phone = validateField('phone', formData.phone);
    errors.projectType = validateField('projectType', formData.projectType);
    errors.message = validateField('message', formData.message);
    errors.files = validateField('files', formData.files);
    
    // Remove undefined errors
    Object.keys(errors).forEach(key => {
      if (errors[key as keyof FormErrors] === undefined) {
        delete errors[key as keyof FormErrors];
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    // Clear previous errors
    setSubmitError(null);
    setFormErrors({});
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitError('Please fix the errors above and try again.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://affluentia.onrender.com';
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('email', formData.email.trim());
      submitData.append('phone', formData.phone.trim());
      submitData.append('projectType', formData.projectType);
      if (formData.budget) {
        submitData.append('budget', formData.budget);
      }
      submitData.append('message', formData.message.trim());
      
      // Append files
      formData.files.forEach(file => {
        submitData.append('files', file);
      });

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        body: submitData,
      });      const result = await response.json();
      
      console.log('API Response:', { status: response.status, data: result });      if (response.ok && result.success) {
        setIsSubmitted(true);
        // Reset form and errors after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: '',
          files: []
        });
        setFormErrors({});
        setSubmitError(null); // Clear any previous errors
        setToastMessage('Message sent successfully! We\'ll get back to you soon.');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setShowToast(false);
        }, 8000); // Show success message for 8 seconds
      } else {
        // Handle server validation errors
        let errorMsg = 'Failed to submit form. Please try again.';
        
        if (result.errors && Array.isArray(result.errors)) {
          // Handle validation errors from server
          errorMsg = `Please fix the following issues: ${result.errors.join(', ')}`;
        } else if (result.message) {
          // Use server's error message
          errorMsg = result.message;
        }
        
        // Handle specific error cases
        if (response.status === 400) {
          if (result.message?.includes('File too large')) {
            errorMsg = 'One or more files are too large. Please ensure each file is under 10MB.';
          } else if (result.message?.includes('Too many files')) {
            errorMsg = 'Too many files selected. Maximum 10 files allowed.';
          } else if (result.message?.includes('File type')) {
            errorMsg = 'Unsupported file type. Please use PDF, DOC, DOCX, JPG, PNG, GIF, DWG, or SKP files.';
          }
        } else if (response.status === 429) {
          errorMsg = 'Too many requests. Please wait a few minutes before submitting again.';
        } else if (response.status >= 500) {
          errorMsg = 'Server error. Please try again later or contact us directly.';
        }
          setSubmitError(errorMsg);
        setToastMessage(errorMsg);
        setToastType('error');
        setShowToast(true);
        
        // If there are specific field errors from server, map them to form errors
        if (result.fieldErrors) {
          setFormErrors(result.fieldErrors);
        }
      }} catch (error) {
      console.error('Form submission error:', error);
      
      // Handle different types of errors
      let errorMessage = 'Unable to submit form. Please check your internet connection and try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again or contact us directly.';
        } else if (error.message.includes('413')) {
          errorMessage = 'Files are too large. Please reduce file sizes and try again.';
        } else if (error.message.includes('429')) {
          errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error. Please try again later or contact us directly.';
        } else {
          errorMessage = error.message;
        }
      }
        setSubmitError(errorMessage);
      setToastMessage(errorMessage);
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files) {
        const newFiles = Array.from(fileInput.files);
        const updatedFiles = [...formData.files, ...newFiles];
        
        setFormData(prev => ({
          ...prev,
          files: updatedFiles
        }));
        
        // Validate files immediately
        const fileError = validateField('files', updatedFiles);
        setFormErrors(prev => ({
          ...prev,
          files: fileError
        }));
        
        // Clear the input so the same file can be selected again if needed
        fileInput.value = '';
      }
    } else {
      const { name, value } = e.target;
      
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Real-time validation (only show errors after user starts typing)
      if (value.trim() !== '' || formErrors[name as keyof FormErrors]) {
        const error = validateField(name, value);
        setFormErrors(prev => ({
          ...prev,
          [name]: error
        }));
      }
    }
  };
  const removeFile = (indexToRemove: number) => {
    const updatedFiles = formData.files.filter((_, index) => index !== indexToRemove);
    setFormData(prev => ({
      ...prev,
      files: updatedFiles
    }));
    
    // Re-validate files after removal
    const fileError = validateField('files', updatedFiles);
    setFormErrors(prev => ({
      ...prev,
      files: fileError
    }));
  };
  return (
    <section className="relative isolate bg-gradient-to-b from-white to-stone-50" id="contact">
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(30deg, rgba(68,64,60,0.1) 12%, transparent 12.5%, transparent 87%, rgba(68,64,60,0.1) 87.5%, rgba(68,64,60,0.1)),
                             linear-gradient(150deg, rgba(68,64,60,0.1) 12%, transparent 12.5%, transparent 87%, rgba(68,64,60,0.1) 87.5%, rgba(68,64,60,0.1)),
                             linear-gradient(30deg, rgba(68,64,60,0.1) 12%, transparent 12.5%, transparent 87%, rgba(68,64,60,0.1) 87.5%, rgba(68,64,60,0.1)),
                             linear-gradient(150deg, rgba(68,64,60,0.1) 12%, transparent 12.5%, transparent 87%, rgba(68,64,60,0.1) 87.5%, rgba(68,64,60,0.1))`,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2 
            className="font-serif text-4xl md:text-6xl font-bold text-stone-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let's Create <span className="text-gradient">Together</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to transform your vision into reality? We'd love to hear about your project 
            and explore how we can bring your architectural dreams to life.
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="luxury-card p-8">
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BuildingOffice2Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">Visit Our Studio</h4>
                    <p className="text-stone-600">
                      oa pg 
                      <br />
                      basavangudi, Bengaluru
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">Call Us</h4>
                    <p className="text-stone-600">
                      +91 775645618<br />
                      <span className="text-sm">Mon-Fri 9am-6pm IST</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">Email Us</h4>
                    <p className="text-stone-600">
                      affluentiainterior@gmail.com
                    </p>                  </div>
                </motion.div>
              </div>

              <div className="flex space-x-6 mt-8">
              {social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >            <form onSubmit={handleSubmit} className="luxury-card p-8 space-y-6 relative z-10">
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">Start Your Project</h3>
              
              
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-stone-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 ${
                      formErrors.name 
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                        : 'border-stone-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                    placeholder="Your full name"
                  />
                  {formErrors.name && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div><div>
                  <label htmlFor="email" className="block text-sm font-semibold text-stone-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 ${
                      formErrors.email 
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                        : 'border-stone-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                    placeholder="your@email.com"
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-stone-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 ${
                      formErrors.phone 
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                        : 'border-stone-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                    placeholder="+91 8123456789"
                  />
                  {formErrors.phone && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-stone-900 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 ${
                      formErrors.projectType 
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                        : 'border-stone-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                  >
                    <option value="">Select project type</option>                    <option value="residential">Residential Design</option>
                    <option value="commercial">Commercial Space</option>
                    <option value="interior">Interior Styling</option>
                    <option value="renovation">Renovation</option>
                    <option value="consultation">Consultation</option>
                    <option value="landscaping">Landscaping</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.projectType && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.projectType}</p>
                  )}
                </div>
              </div>

              {/* <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-stone-900 mb-2">
                  Project Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                >
                  <option value="">Select budget range</option>
                  <option value="under-50k">Under $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k-500k">$250,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1,000,000</option>
                  <option value="over-1m">Over $1,000,000</option>
                </select>
              </div> */}              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-stone-900 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 resize-none ${
                    formErrors.message 
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                      : 'border-stone-200 focus:border-primary-400 focus:ring-primary-100'
                  }`}
                  placeholder="Tell us about your project, vision, timeline, and any specific requirements..."
                />
                {formErrors.message && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.message}</p>
                )}
                <p className="mt-2 text-sm text-stone-500">
                  {formData.message.length}/2000 characters
                </p>
              </div>              <div>
                <label htmlFor="files" className="block text-sm font-semibold text-stone-900 mb-2">
                  Submit Requirements 
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="files"
                    name="files"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.dwg,.skp"
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 ${
                      formErrors.files 
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                        : 'border-stone-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                  />
                  <p className="mt-2 text-sm text-stone-500">
                    Upload reference images, floor plans, inspiration photos, or any relevant documents. 
                    Accepted formats: PDF, DOC, DOCX, JPG, PNG, GIF, DWG, SKP (Max 100MB per file)
                  </p>
                  {formErrors.files && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.files}</p>
                  )}
                  {formData.files && formData.files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-stone-700">Selected files ({formData.files.length}/10):</p>
                      <div className="space-y-2">
                        {formData.files.map((file, index) => (
                          <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-stone-700 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-stone-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="ml-3 p-1 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                              title="Remove file"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, files: [] }));
                          setFormErrors(prev => ({ ...prev, files: undefined }));
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Clear all files
                      </button>
                    </div>
                  )}
                </div>
              </div>             
                        

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">{submitError}</p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitted || isSubmitting}
                className={`w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-600 text-white'
                    : isSubmitting
                    ? 'bg-stone-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-glow'
                }`}
                whileHover={{ scale: isSubmitted || isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitted || isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircleIcon className="w-6 h-6" />
                    Message Sent Successfully!
                  </span>
                ) : isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              <p className="text-sm text-stone-500 text-center">
                We'll get back to you within 24 hours. For urgent inquiries, please call us directly.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

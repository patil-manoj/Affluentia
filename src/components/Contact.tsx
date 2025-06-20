import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BuildingOffice2Icon, 
  PhoneIcon, 
  EnvelopeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="relative isolate bg-gradient-to-b from-white to-stone-50" id="contact">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
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
                    </p>
                  </div>
                </motion.div>

                {/* <motion.div 
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">Office Hours</h4>
                    <p className="text-stone-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: By appointment
                    </p>
                  </div>
                </motion.div> */}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-stone-200">
                <h4 className="font-semibold text-stone-900 mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {['Instagram', 'LinkedIn', 'Behance'].map((platform, index) => (
                    <motion.a
                      key={platform}
                      href="#"
                      className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {platform[0]}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="luxury-card p-8 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">Start Your Project</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
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
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
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
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-stone-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                    placeholder="+91 8123456789"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-stone-900 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential Design</option>
                    <option value="commercial">Commercial Space</option>
                    <option value="interior">Interior Design</option>
                    <option value="renovation">Renovation</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
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
              </div>

              <div>
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
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell us about your project, vision, timeline, and any specific requirements..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitted}
                className={`w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-glow'
                }`}
                whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
              >
                {isSubmitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircleIcon className="w-6 h-6" />
                    Message Sent Successfully!
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

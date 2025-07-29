import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Contact = lazy(() => import('../components/Contact'))

// Enhanced loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full opacity-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </div>
)

const ContactPage = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="relative overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <motion.div
          className="absolute inset-0 luxury-gradient"
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(42, 54, 37, 0.08) 0%, transparent 70%)",
            y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
          }}
        />
      </div>

      {/* Hero Section with Parallax Background */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Hero background image with parallax effect */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="w-full h-full"
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]),
            }}
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Contact us" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 z-10">
          <motion.div
            className="absolute top-1/4 left-1/3 w-56 h-56 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, 80, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-accent-200/20 to-primary-200/20 rounded-full blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, 50, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <SparklesIcon className="w-5 h-5" />
              Let's Start Your Project
            </motion.div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Get in <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-accent-100">Touch</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow mb-8">
              Ready to bring your vision to life? Let's start a conversation about your next project. We're here to help you create something extraordinary.
            </p>
            
            {/* Quick contact info */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneIcon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">+91 775645618</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EnvelopeIcon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">affluentiainterior@gmail.com</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
          marginTop: "-3vh",
          paddingTop: "6vh"
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </motion.div>

      {/* Enhanced Contact Information Section */}
      <motion.div
        className="relative z-10 bg-white/90 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)",
          marginTop: "-5vh",
          paddingTop: "10vh"
        }}
      >
        <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-900 mb-4">
                Why Choose <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">Affluentia</span>
              </h2>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto">
                Experience the difference of working with a team that truly understands your vision and brings it to life with precision and creativity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  icon: ChatBubbleLeftRightIcon,
                  title: "Personal Consultation",
                  description: "One-on-one meetings to understand your vision and requirements in detail.",
                  color: "from-blue-500 to-purple-600"
                },
                {
                  icon: DocumentTextIcon,
                  title: "Detailed Proposals",
                  description: "Comprehensive project proposals with timelines, budgets, and deliverables.",
                  color: "from-emerald-500 to-teal-600"
                },
                {
                  icon: ClockIcon,
                  title: "Quick Response",
                  description: "We typically respond to all inquiries within 24 hours during business days.",
                  color: "from-amber-500 to-orange-600"
                },
                {
                  icon: SparklesIcon,
                  title: "Free Consultation",
                  description: "Get started with a complimentary consultation to discuss your project goals.",
                  color: "from-rose-500 to-pink-600"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 text-center group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary-800 mb-3">{feature.title}</h3>
                  <p className="text-primary-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif text-2xl font-bold text-primary-900 mb-8">Visit Our Studio</h3>
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900 mb-1">Studio Address</h4>
                      <p className="text-primary-700">
                        oa pg<br />
                        basavangudi, Bengaluru<br />
                        Karnataka, India
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900 mb-1">Call Us</h4>
                      <p className="text-primary-700">
                        +91 775645618<br />
                        <span className="text-sm">Mon-Fri 9am-6pm IST</span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900 mb-1">Email Us</h4>
                      <p className="text-primary-700">
                        affluentiainterior@gmail.com
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-luxury">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Our design studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl opacity-20 blur-xl"></div>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-900 to-accent-900 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-primary-600/20 to-accent-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-accent-600/15 to-primary-600/15 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SparklesIcon className="w-5 h-5" />
              Ready to Transform Your Space?
            </motion.div>
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
              Let's Create Something <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-accent-100">Extraordinary</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our team is ready to bring your vision to life with innovative design, meticulous attention to detail, and uncompromising quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-800 font-medium rounded-full hover:shadow-2xl transition-all duration-300"
                >
                  View Our Work
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-primary-800 transition-all duration-300"
                >
                  Learn About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage

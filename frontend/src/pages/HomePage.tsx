import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon, HomeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

// Lazy load components
const Hero = lazy(() => import('../components/Hero'))
const DesignProcess = lazy(() => import('../components/DesignProcess'))
const Features = lazy(() => import('../components/Features'))
const Gallery = lazy(() => import('../components/Gallery'))
const Showcase = lazy(() => import('../components/Showcase'))

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

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="relative overflow-x-hidden">      {/* Animated background */}
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
      </div>{/* Hero Section - Enhanced for homepage */}
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>

      {/* Design Process Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <DesignProcess />
      </Suspense>

      {/* Enhanced Features Section */}
      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
          marginTop: "-3vh",
          paddingTop: "6vh"
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Features />
        </Suspense>
      </motion.div>

      {/* Gallery Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <Gallery />
      </Suspense>

      {/* Showcase Section */}
      <motion.div
        className="relative z-10 bg-white/90 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)",
          marginTop: "-5vh",
          paddingTop: "10vh"
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Showcase />
        </Suspense>
      </motion.div>      {/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-primary-200/20 to-accent-200/20 rounded-full blur-3xl"
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
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-accent-200/15 to-primary-200/15 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-primary-600 font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SparklesIcon className="w-5 h-5" />
              Ready to Transform Your Space?
            </motion.div>
            
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-stone-900 mb-6">
              Let's Create Something <span className="text-gradient">Extraordinary</span>
            </h2>
            <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
              Our team is ready to bring your vision to life with innovative design, meticulous attention to detail, and uncompromising quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium rounded-full hover:shadow-luxury transition-all duration-300"
                >
                  Start Your Project
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-600 text-primary-600 font-medium rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300"
                >
                  View Our Work
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-stone-600 text-sm">Projects Completed</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                <div className="text-stone-600 text-sm">Clients Satisfaction</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
                <div className="text-stone-600 text-sm">Years Experience</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">8+</div>
                <div className="text-stone-600 text-sm">Awards Won</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              From concept to completion, we offer comprehensive design solutions for every space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HomeIcon,
                title: "Residential Design",
                description: "Transform your home into a personalized sanctuary with our residential design services.",
                color: "from-blue-500 to-purple-600"
              },
              {
                icon: BuildingOfficeIcon,
                title: "Commercial Spaces",
                description: "Create inspiring work environments that boost productivity and reflect your brand.",
                color: "from-emerald-500 to-teal-600"
              },
              {
                icon: SparklesIcon,
                title: "Luxury Interiors",
                description: "Experience unparalleled elegance with our premium interior design solutions.",
                color: "from-amber-500 to-orange-600"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="luxury-card p-8 text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-4">{service.title}</h3>
                <p className="text-stone-600 mb-6">{service.description}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors duration-300"
                >
                  Learn More
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>    </main>
  )
}

export default HomePage

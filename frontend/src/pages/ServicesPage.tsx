import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion';

const Services = lazy(() => import('../components/Services'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-stone-200 border-t-primary-600 rounded-full"
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

const ServicesPage = () => {
  return (
    <main className="pt-20">
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-accent-200/20 to-primary-200/20 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >            <h1 className="font-serif text-5xl md:text-7xl font-bold text-stone-900 mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              From concept to completion, we offer comprehensive design services that transform your vision into reality. Experience our full-service approach to exceptional design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <Services />
      </Suspense>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-stone-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements and learn how our expert team can help you achieve your design goals.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium rounded-full hover:shadow-luxury transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage

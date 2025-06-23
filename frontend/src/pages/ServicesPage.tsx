import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';

const Services = lazy(() => import('../components/Services'))

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

const ServicesPage = () => {
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

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-16 overflow-hidden">
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
          >            <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-900 mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-primary-700 max-w-2xl mx-auto">
              From concept to completion, we offer comprehensive design services that transform your vision into reality. Experience our full-service approach to exceptional design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
          marginTop: "-3vh",
          paddingTop: "6vh"
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>
      </motion.div>

      {/* Call to Action - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/90 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)",
          marginTop: "-5vh",
          paddingTop: "10vh"
        }}
      >
        <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-900 mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-700 mb-8 max-w-2xl mx-auto">
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
      </motion.div>
    </main>
  )
}

export default ServicesPage

import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion';

const About = lazy(() => import('../components/About'))

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

const AboutPage = () => {
  return (
    <main className="pt-20">
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-accent-50 to-primary-50 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-r from-accent-200/25 to-primary-200/25 rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"
            animate={{
              rotate: [360, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >            <h1 className="font-serif text-5xl md:text-7xl font-bold text-stone-900 mb-6">
              About <span className="text-gradient">Affluentia</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Meet the passionate team behind exceptional design. Learn about our journey, values, and unwavering commitment to creating extraordinary spaces that inspire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>

      {/* Mission & Values Section */}
      <section className="py-16 bg-gradient-to-br from-white to-stone-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-bold text-stone-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                At Affluentia, we believe that exceptional design has the power to transform lives. Our mission is to create spaces that not only meet our clients' functional needs but also inspire and elevate their daily experiences.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                We are committed to sustainable practices, innovative solutions, and collaborative partnerships that result in timeless architectural masterpieces.
              </p>
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
                  src="https://images.pexels.com/photos/6585627/pexels-photo-6585627.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our team at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage

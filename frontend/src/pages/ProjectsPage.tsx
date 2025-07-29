import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';

const Projects = lazy(() => import('../components/Projects'))

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

const ProjectsPage = () => {
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

      {/* Page Header - Enhanced with parallax hero image */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Hero background image with parallax effect */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="w-full h-full"
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]),
            }}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800" 
              alt="Architecture showcase" 
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
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Our <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-accent-100">Projects</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Discover our portfolio of exceptional spaces that showcase our commitment to innovative design, 
              superior craftsmanship, and client satisfaction across residential and commercial projects.
            </p>
            
            {/* Added call-to-action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-primary-800 font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Explore All Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent text-white font-medium rounded-full border border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      

      {/* Projects Section - Enhanced */}
      <motion.div
        className="relative z-10 bg-primary-50/80 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
          marginTop: "0",
          paddingTop: "6vh"
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
      </motion.div>

      {/* Project Stats Section - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/90 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)",
          marginTop: "-5vh",
          paddingTop: "10vh"
        }}
      >
        <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                Project <span className="text-gradient">Excellence</span>
              </h2>
              <p className="text-lg text-primary-700 max-w-2xl mx-auto">
                Every project we undertake is a testament to our dedication to quality and innovation.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "8+", label: "Design Awards" },
                { number: "5+", label: "Years of Excellence" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-2xl shadow-soft"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-primary-700 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  )
}

export default ProjectsPage

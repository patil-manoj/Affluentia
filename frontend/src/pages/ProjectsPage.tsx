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

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/3 w-56 h-56 bg-gradient-to-r from-primary-200/40 to-accent-200/40 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-accent-200/30 to-primary-200/30 rounded-full blur-3xl"
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
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >            <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-900 mb-6">
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-primary-700 max-w-2xl mx-auto">
              Discover our portfolio of exceptional spaces that showcase our commitment to innovative design, 
              superior craftsmanship, and client satisfaction across residential and commercial projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
          marginTop: "-3vh",
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
                { number: "500+", label: "Projects Completed" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "50+", label: "Design Awards" },
                { number: "15+", label: "Years of Excellence" }
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

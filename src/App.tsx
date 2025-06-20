import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar'

// Lazy load components
const Hero = lazy(() => import('./components/Hero'))
const Projects = lazy(() => import('./components/Projects'))
const Services = lazy(() => import('./components/Services'))
const About = lazy(() => import('./components/About'))
const Features = lazy(() => import('./components/Features'))
const Gallery = lazy(() => import('./components/Gallery'))
const Showcase = lazy(() => import('./components/Showcase'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

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

const App = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="relative overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <motion.div
          className="absolute inset-0 luxury-gradient"
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(217,125,74,0.1) 0%, transparent 70%)",
            y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
          }}
        />
      </div>

      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>

      {/* Projects Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <Projects />
      </Suspense>

      {/* Services Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <Services />
      </Suspense>

      {/* About Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>

      {/* Features Section */}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
          marginTop: "-5vh",
          paddingTop: "10vh"
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
      </motion.div>

      {/* Contact Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>

      {/* Fixed scroll progress indicator */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-accent-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.a
          href="#contact"
          className="group w-14 h-14 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full shadow-luxury flex items-center justify-center text-white font-bold text-xl hover:shadow-glow transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="group-hover:rotate-12 transition-transform duration-300"
          >
            +
          </motion.span>
        </motion.a>
      </motion.div>
    </main>
  )
}

export default App

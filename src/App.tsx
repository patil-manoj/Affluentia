import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar'

// Lazy load components
const Hero = lazy(() => import('./components/Hero'))
const Features = lazy(() => import('./components/Features'))
const Gallery = lazy(() => import('./components/Gallery'))
const Showcase = lazy(() => import('./components/Showcase'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <motion.div
      className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
)

const App = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="relative">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50"
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)",
            y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
          }}
        />
      </div>

      {/* Layout */}
      <Navbar />
      
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>

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

      <Suspense fallback={<LoadingSpinner />}>
        <Gallery />
      </Suspense>

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

      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>

      {/* Fixed scroll progress indicator */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-primary-600 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  )
}

export default App

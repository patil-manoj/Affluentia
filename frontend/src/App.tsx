import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

// Import pages
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'

const App = () => {
  const { scrollYProgress } = useScroll();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen 
            key="loading"
            onComplete={() => setIsLoading(false)} 
          />
        ) : (
          <motion.main 
            key="main"
            className="relative overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Navigation */}
            <Navbar />
              {/* Routes */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>

            {/* Footer */}
            <Footer />

            {/* Enhanced scroll progress indicator */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 origin-left z-50"
              style={{ scaleX: scrollYProgress }}
            />       
          </motion.main>
        )}
      </AnimatePresence>
    </Router>
  )
}

export default App

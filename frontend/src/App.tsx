import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Import pages
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'

const App = () => {
  const { scrollYProgress } = useScroll();

  return (
    <Router>
      <main className="relative overflow-x-hidden">
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

        {/* Fixed scroll progress indicator */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-accent-600 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />       
      </main>
    </Router>
  )
}

export default App

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const springX = useSpring(0, { stiffness: 150, damping: 30 });
  const springY = useSpring(0, { stiffness: 150, damping: 30 });
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;
        
        springX.set(x * 20);
        springY.set(y * 20);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Main background image with dark overlay */}      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale, opacity }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        {/* Additional texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/10 to-dark-900/30" />
      </motion.div>      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-1">
        {/* Subtle geometric patterns */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border border-primary-200/20 rounded-lg rotate-12 opacity-30"
          animate={{
            rotate: [12, 22, 12],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-48 h-48 border border-primary-300/15 rounded-full opacity-25"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-600/8 to-primary-700/8 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-primary-700/6 to-primary-800/6 rounded-full blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 35, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8
          }}
        />
      </div>

      {/* Parallax Grid */}
      <motion.div
        className="absolute inset-0 opacity-5 z-1"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '60px 60px'
             }} 
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[0.9] mb-8 tracking-tight"
            style={{
              textShadow: '0 8px 32px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.4)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevating Spaces,
            <br />
            <span className="text-primary-100 font-serif italic">Enhancing Lives</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-primary-50 font-body leading-relaxed mb-12 max-w-3xl mx-auto"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the fusion of visionary architecture and bespoke interior design. Our 
            expert team transforms spaces into inspiring environments that reflect your unique 
            style, needs, and aspirations.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(42, 54, 37, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-architectural transition-all duration-300"
              >
                Discover Projects
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/80"
        >
          <span className="text-sm font-medium mb-2 text-primary-100">Scroll to explore</span>
          <ChevronDownIcon className="w-6 h-6" />
        </motion.div>
      </motion.div>      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 bg-primary-100 rounded-full z-5"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          x: springX,
          y: springY,
        }}
      />
      <motion.div
        className="absolute top-3/4 right-16 w-3 h-3 bg-primary-200 rounded-full z-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          x: useTransform(springX, (x) => -x),
          y: useTransform(springY, (y) => -y),
        }}
      />

      {/* Overlays for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-2"
        style={{ opacity, scale, y }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 via-transparent to-dark-900/10" />
      </motion.div>
    </section>
  );
};

export default Hero;

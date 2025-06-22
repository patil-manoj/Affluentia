import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
// import { ChevronDownIcon } from '@heroicons/react/24/outline';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-100"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent-200/20 to-primary-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Parallax Grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/10 to-transparent" 
             style={{
               backgroundImage: `linear-gradient(90deg, rgba(68,64,60,0.1) 1px, transparent 1px),
                                 linear-gradient(rgba(68,64,60,0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }} 
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >            <motion.h1 
              className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-stone-900 leading-none"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <span className="block">Crafting</span>
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Dreams
              </span>
              <span className="block">Into Reality</span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl text-stone-600 font-light leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1, 
              delay: 1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            We transform visionary concepts into breathtaking architectural realities, 
            crafting spaces that inspire and endure through time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1, 
              delay: 1.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-4 text-lg font-medium text-white shadow-luxury transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 20px 40px rgba(217, 125, 74, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Our Work
                <motion.span
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.a>

            <motion.a
              href="#contact"
              className="group relative rounded-full border-2 border-stone-300 px-8 py-4 text-lg font-medium text-stone-700 transition-all duration-300 hover:border-primary-400 hover:text-primary-600"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(217, 125, 74, 0.05)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                Start a Project
                <motion.span
                  whileHover={{ rotate: 45 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-6 h-6 border border-current rounded-full flex items-center justify-center text-xs"
                >
                  +
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 bg-primary-500 rounded-full"
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
        className="absolute top-3/4 right-16 w-3 h-3 bg-accent-500 rounded-full"
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
        className="absolute inset-0 pointer-events-none"
        style={{ opacity, scale, y }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5" />
      </motion.div>
    </section>
  );
};

export default Hero;

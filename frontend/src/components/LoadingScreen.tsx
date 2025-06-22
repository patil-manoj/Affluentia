import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Delay before hiding
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);
  const logoVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
    }
  };
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 1.2, ease: "easeInOut" }
      }}
    >
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(243, 233, 210, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(198, 205, 182, 0.08) 0%, transparent 50%),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px'
          }}
        />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary-300/20 rounded-lg rotate-12"
          animate={{
            rotate: [12, 22, 12],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-primary-200/25 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative text-center z-10">
        {/* Animated Logo */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <svg 
            width="120" 
            height="80" 
            viewBox="0 0 120 80" 
            className="mx-auto"
          >
            {/* Letter A */}            <motion.path
              d="M10 70 L25 20 L40 70 M18 50 L32 50"
              stroke="#F3E9D2"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              transition={{ 
                duration: 2.5, 
                ease: "easeInOut",
                delay: 0.5 
              }}
            />
            
            {/* Letter F */}
            <motion.path
              d="M50 70 L50 20 L80 20 M50 45 L75 45"
              stroke="#C6CDB6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              transition={{ 
                duration: 2.5, 
                ease: "easeInOut",
                delay: 0.8 
              }}
            />

            {/* Decorative line */}
            <motion.path
              d="M15 75 L85 75"
              stroke="#2A3625"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                delay: 1.8 
              }}
            />
          </svg>
        </motion.div>

        {/* Company Name */}
        <motion.h1 
          className="text-4xl font-display font-bold text-primary-50 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Affluentia
        </motion.h1>

        <motion.p 
          className="text-primary-200 font-body text-lg mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Architectural Excellence
        </motion.p>

        {/* Progress Bar */}
        <motion.div 
          className="w-64 mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="bg-primary-900/30 rounded-full h-1 mb-4">
            <motion.div 
              className="bg-gradient-to-r from-primary-400 to-primary-300 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          <motion.p 
            className="text-primary-300 text-sm font-body"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading your experience...
          </motion.p>
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

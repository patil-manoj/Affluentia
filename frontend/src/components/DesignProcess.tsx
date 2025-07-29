import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  PencilSquareIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';

const processSteps = [
  {
    step: 1,
    title: "Consultation",
    description: "We listen to your needs and preferences, understanding your vision to create a personalized design strategy.",
    icon: ChatBubbleLeftRightIcon,
    details: [
      "Initial site visit and assessment",
      "Design brief and requirements gathering",
      "Budget and timeline discussion",
      "Concept development"
    ]
  },
  {
    step: 2,
    title: "Design",
    description: "Our team crafts tailored design solutions for you, transforming concepts into detailed architectural plans.",
    icon: PencilSquareIcon,
    details: [
      "Detailed architectural drawings",
      "3D visualizations and renderings",
      "Material and finish selections",
      "Technical specifications"
    ]
  },
  {
    step: 3,
    title: "Implementation",
    description: "We bring your vision to life with precision, managing every detail from construction to final touches.",
    icon: WrenchScrewdriverIcon,
    details: [
      "Project management and coordination",
      "Quality control and inspections",
      "Progress updates and communication",
      "Final walkthrough and handover"
    ]
  }
];

const DesignProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      className="relative py-24 overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 25% 25%, rgba(42, 54, 37, 0.1) 0%, transparent 50%)",
            y: backgroundY
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: "radial-gradient(circle at 75% 75%, rgba(29, 37, 26, 0.08) 0%, transparent 50%)",
            y: useTransform(scrollYProgress, [0, 1], [0, 50])
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl lg:text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-base font-semibold leading-7 text-primary-600 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Design Process
          </motion.h2>
          <motion.p
            className="mt-2 text-4xl font-bold tracking-tight text-dark-800 sm:text-5xl font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Simple Three-Step Design Process
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-neutral-600 font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transforming your space begins with understanding your vision. 
            Our streamlined process ensures your ideas come to life seamlessly.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {processSteps.map((step, index) => (              <motion.div
                key={step.step}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 30 }
                }}
              >                {/* Step Card */}
                <div className="architectural-card p-10 h-full bg-white/98 backdrop-blur-sm border border-primary-200/30 group-hover:shadow-2xl transition-all duration-500 transform-gpu">
                  {/* Step Number with enhanced styling */}
                                    {/* Icon with enhanced styling */}
                  <motion.div 
                    className="mb-8 relative"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <step.icon className="w-8 h-8 text-primary-600 transition-colors duration-300" />
                      </motion.div>
                    </motion.div>
                  </motion.div>                  {/* Content with enhanced typography */}
                  <div className="space-y-6 relative z-10">
                    <motion.h3 
                      className="text-2xl font-bold text-dark-800 font-display leading-tight transition-colors duration-300"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Step {step.step}: {step.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-neutral-600 font-body leading-relaxed text-lg transition-colors duration-300"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                    >
                      {step.description}
                    </motion.p>                    {/* Details List with enhanced styling */}
                    <motion.div 
                      className="space-y-3 pt-4 border-t border-primary-100/50 transition-colors duration-300"
                      whileHover={{ x: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                    >
                      {step.details.map((detail, detailIndex) => (
                        <motion.div 
                          key={detailIndex}
                          className="flex items-start gap-4 text-sm text-neutral-600 font-body transition-colors duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          whileHover={{ 
                            x: 4,
                            transition: { type: "spring", stiffness: 400, delay: detailIndex * 0.02 }
                          }}
                          transition={{ duration: 0.5, delay: (index * 0.2) + (detailIndex * 0.1) }}
                        >
                          <motion.span 
                            className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mt-2 flex-shrink-0 shadow-sm"
                            whileHover={{ 
                              scale: 1.2
                            }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                          <span className="leading-relaxed">{detail}</span>
                        </motion.div>
                      ))}
                    </motion.div>                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default DesignProcess;

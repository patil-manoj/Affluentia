import { motion, useScroll, useTransform } from 'framer-motion';
const ServicesPage = () => {
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
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img 
              src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1800" 
              alt="Interior design services" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 z-10">
          <motion.div
            className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-accent-300/30 to-primary-300/30 rounded-full blur-3xl"
            animate={{
              x: [0, 70, 0],
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
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Our <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-accent-100">Services</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              From concept to completion, we offer comprehensive design services that transform your vision into reality. Experience our full-service approach to exceptional design.
            </p>
            
            {/* Added call-to-action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-primary-800 font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Explore All Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent text-white font-medium rounded-full border border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                Request Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
          marginTop: "-3vh",
          paddingTop: "6vh"
        }}
      >
        {/* Service category highlights with images */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-900 mb-4">
                Exceptional <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">Design Solutions</span>
              </h2>
              <p className="text-lg text-primary-700 max-w-2xl mx-auto">
                Explore our comprehensive range of design services tailored to meet your unique needs and vision.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                {
                  title: "Architecture Design",
                  description: "Creating stunning, functional spaces that blend aesthetics with practicality for residential and commercial projects.",
                  image: "https://images.pexels.com/photos/1829191/pexels-photo-1829191.jpeg?auto=compress&cs=tinysrgb&w=800",
                  link: "/services/architecture"
                },
                {
                  title: "Building Planning",
                  description: "Transforming interiors into beautiful, comfortable, and functional spaces that reflect your unique style and needs.",
                  image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934184/11_dsnnlr.png",
                  link: "/services/building-planning"
                },
                {
                  title: "Elevation",
                  description: "Crafting stunning building facades and exteriors that make a bold statement through innovative materials and architectural details.",
                  image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934698/vecteezy_beautiful-modern-house-exterior-with-carport-modern_26615064_zft3ax.jpg",
                  link: "/services/elevation"
                },
                {
                  title: "Landscaping",
                  description: "Transforming outdoor spaces with lush gardens, water features, and sustainable designs that harmonize with the natural environment.",
                  image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934679/naksha-banwao-QSXDXnYE8WQ-unsplash_uozaql.jpg",
                  link: "/services/landscaping"
                }
              ].map((service, index) => (
                <motion.div 
                  key={service.title}
                  className="group bg-white rounded-2xl shadow-soft overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif text-2xl font-bold text-primary-800 mb-3">{service.title}</h3>
                    <p className="text-primary-600 mb-6">{service.description}</p>
                    <motion.a
                      href={service.link}
                      className="inline-flex items-center text-accent-600 font-medium group/link"
                      whileHover={{ x: 5 }}
                    >
                      Learn more 
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover/link:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                {
                  title: "Building Construction",
                  description: "Creating stunning, functional spaces that blend aesthetics with practicality for residential and commercial projects.",
                  image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934622/komarov-egor-DDUNMLGq2Kc-unsplash_cn2olp.jpg",
                  link: "/services/architecture"
                },
              ].map((service, index) => (
                <motion.div 
                  key={service.title}
                  className="group bg-white rounded-2xl shadow-soft overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif text-2xl font-bold text-primary-800 mb-3">{service.title}</h3>
                    <p className="text-primary-600 mb-6">{service.description}</p>
                    <motion.a
                      href={service.link}
                      className="inline-flex items-center text-accent-600 font-medium group/link"
                      whileHover={{ x: 5 }}
                    >
                      Learn more 
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover/link:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Design Process Section */}
        <section className="py-16 bg-primary-50/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Process Highlight */}
            <motion.div
              className="bg-white rounded-3xl shadow-soft p-8 md:p-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h3 className="font-serif text-3xl font-bold text-primary-900 mb-4">Our Design Process</h3>
                  <p className="text-primary-700">We follow a structured, collaborative approach to ensure your vision becomes reality.</p>
                </div>
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      {
                        number: "01",
                        title: "Consultation",
                        description: "We begin with a thorough consultation to understand your needs, preferences, and vision."
                      },
                      {
                        number: "02",
                        title: "Concept Development",
                        description: "Our team develops initial concepts and design directions based on your requirements."
                      },
                      {
                        number: "03",
                        title: "Design Refinement",
                        description: "We refine the chosen concept with detailed plans, materials, and specifications."
                      },
                      {
                        number: "04",
                        title: "Implementation",
                        description: "Our experts oversee the execution to ensure the design is implemented to perfection."
                      }
                    ].map((step, index) => (
                      <motion.div
                        key={step.number}
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      >
                        <div className="flex-shrink-0">
                          <span className="inline-block w-12 h-12 rounded-full bg-accent-100 text-accent-600 font-serif text-xl font-bold flex items-center justify-center">
                            {step.number}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-serif text-xl font-bold text-primary-900 mb-2">{step.title}</h4>
                          <p className="text-primary-700">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Call to Action - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/90 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)",
          marginTop: "-5vh",
          paddingTop: "10vh"
        }}
      >
        <section className="py-16 relative overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-primary-900/80 z-10 mix-blend-multiply" />
            <img 
              src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1800" 
              alt="Interior design consultation" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Animated shapes */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/3 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
          
          <div className="max-w-5xl mx-auto text-center px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >              
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
                Ready to <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-accent-100">Transform</span> Your Space?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
                Contact us today to discuss your project requirements and learn how our expert team can help you achieve your design goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-800 font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Consultation
                </motion.a>
                <motion.a
                  href="/projects"
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-medium rounded-full border border-white/50 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Our Portfolio
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </main>
  )
}

export default ServicesPage
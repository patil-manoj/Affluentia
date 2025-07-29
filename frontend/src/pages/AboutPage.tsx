import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';

const About = lazy(() => import('../components/About'))

// Enhanced loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >      <motion.div
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

const AboutPage = () => {
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
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1800" 
              alt="Our design team" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 z-10">
          <motion.div
            className="absolute top-1/4 left-1/3 w-56 h-56 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-accent-200/20 to-primary-200/20 rounded-full blur-3xl"
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
        
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              About <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-accent-100">Affluentia</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Meet the passionate team behind exceptional design. Learn about our journey, values, and unwavering commitment to creating extraordinary spaces that inspire.
            </p>
            
            {/* Added call-to-action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-primary-800 font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
          marginTop: "-3vh",
          paddingTop: "6vh"
        }}
      >
        
      
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
      </motion.div>

      {/* Mission & Values Section - Enhanced */}
      <motion.div
        className="relative z-10 bg-white/90 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 95%)",
          marginTop: "-5vh",
          paddingTop: "10vh"
        }}
      >
        <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {/* Mission Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-4xl font-bold text-primary-900 mb-6">
                  Our <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">Mission</span>
                </h2>
                <p className="text-lg text-primary-700 leading-relaxed mb-6">
                  At Affluentia, we believe that exceptional design has the power to transform lives. Our mission is to create spaces that not only meet our clients' functional needs but also inspire and elevate their daily experiences.
                </p>
                <p className="text-lg text-primary-700 leading-relaxed mb-8">
                  We are committed to sustainable practices, innovative solutions, and collaborative partnerships that result in timeless architectural masterpieces.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-primary-800">Design Excellence</h3>
                    <p className="text-primary-700">Pushing boundaries through innovative approaches</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-luxury">
                  <img
                    src="https://images.pexels.com/photos/6585627/pexels-photo-6585627.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Our team at work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl opacity-20 blur-xl"></div>
                
              </motion.div>
            </div>
            
            {/* Values Section */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-900 mb-4">
                Our Core <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">Values</span>
              </h2>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto">
                These principles guide every decision we make and every project we undertake.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
                  title: "Innovation",
                  description: "We continuously explore new design methodologies and technologies to create forward-thinking spaces."
                },
                {
                  icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
                  title: "Passion",
                  description: "Our love for design drives us to go above and beyond for every project, no matter the size."
                },
                {
                  icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                  title: "Excellence",
                  description: "We hold ourselves to the highest standards of quality and precision in every detail."
                },
                {
                  icon: "M3 3l18 18m-6-10v5m-6-9h.01M19 13l-3-3m0 0l-3 3m3-3v12",
                  title: "Sustainability",
                  description: "We design with the future in mind, prioritizing eco-friendly approaches and materials."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary-800 mb-3">{value.title}</h3>
                  <p className="text-primary-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Team Highlight */}
            <motion.div 
              className="mt-20 bg-white rounded-3xl shadow-soft overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-full">
                  <img 
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                    alt="Our team collaborating" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-3xl text-white/80 font-serif font-bold mb-2">Meet Our Team</h3>
                    <p className="text-white/80 max-w-xs">A diverse group of passionate designers, architects and visionaries</p>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">Why Choose Affluentia?</h3>
                  <p className="text-primary-700 mb-6">
                    Our team brings together diverse perspectives, extensive experience, and unwavering dedication to create spaces that exceed expectations and stand the test of time.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Award-winning design professionals",
                      "Personalized approach tailored to your vision",
                      "Commitment to sustainable practices",
                      "End-to-end project management"
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      >
                        <svg className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-primary-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
      
      {/* Testimonials Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary-900/80 z-10 mix-blend-multiply" />
          <img 
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800" 
            alt="Interior design" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              Client <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-accent-100">Testimonials</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Hear what our clients have to say about their experience working with us.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Affluentia transformed our space beyond our expectations. Their attention to detail and innovative approach resulted in a home we're proud to show off.",
                author: "Sarah Johnson",
                position: "Homeowner",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
              },
              {
                quote: "Working with the team was seamless from concept to completion. They listened to our needs and delivered a design that perfectly balances functionality and aesthetics.",
                author: "Michael Chen",
                position: "Restaurant Owner",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
              },
              {
                quote: "The innovative solutions they brought to our office redesign have dramatically improved workflow and employee satisfaction. A truly visionary team.",
                author: "Emma Rodriguez",
                position: "CEO, TechVision Inc.",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <svg className="w-10 h-10 text-accent-300 mb-4" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8v8H6c0 4.4 3.6 8 8 8h2v-8h-6v-8h8zM24 8v8h-4c0 4.4 3.6 8 8 8h2v-8h-6v-8h8z" />
                </svg>
                <p className="text-white/90 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{testimonial.author}</h4>
                    <p className="text-white/60 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-primary-800 font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Read More Stories
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage

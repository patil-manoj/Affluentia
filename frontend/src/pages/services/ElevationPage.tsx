import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CubeTransparentIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ElevationPage = () => {
  return (
    <main className="pt-24 pb-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(68,64,60,0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-primary-600">
            <Link to="/" className="hover:text-primary-800 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-primary-800 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-primary-900 font-medium">Elevation</span>
          </nav>
        </div>

        {/* Back button */}
        <Link 
          to="/services"
          className="inline-flex items-center gap-2 mb-8 text-primary-600 hover:text-primary-800 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Services</span>
        </Link>

        {/* Service Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full mb-6">
              <CubeTransparentIcon className="w-5 h-5" />
              <span className="font-medium">Elevation</span>
            </div>
            <h1 className="font-serif text-5xl font-bold text-primary-900 mb-6">
              Stunning Elevation Design
            </h1>
            <p className="text-xl text-primary-700 mb-8 leading-relaxed">
              Stunning elevation designs that enhance curb appeal and reflect your unique style, 
              using modern and classical elements to create a memorable first impression.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium shadow-luxury hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
              <Link 
                to="/contact"
                className="px-8 py-4 border border-primary-300 text-primary-800 rounded-full font-medium hover:bg-primary-50 transition-all duration-300"
              >
                Get Custom Quote
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-luxury">
              <img 
                src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Elevation Design" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Features & Benefits */}
        <div className="mb-24">
          <motion.h2 
            className="font-serif text-3xl font-bold text-primary-900 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Features & Benefits
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "3D Elevation Rendering",
                description: "Photorealistic 3D renderings that provide a detailed preview of your building's exterior, helping you visualize the final result."
              },
              {
                title: "Material Palette Selection",
                description: "Expert guidance on selecting exterior materials, textures, and finishes that create visual impact and ensure durability."
              },
              {
                title: "Lighting & Facade Design",
                description: "Strategic design of facade elements and exterior lighting to enhance architectural features and create ambiance."
              },
              {
                title: "Theme-based Concepts",
                description: "Development of elevation designs based on various architectural styles, from contemporary to traditional, tailored to your preference."
              },
              {
                title: "Color Consultation",
                description: "Professional color scheme recommendations that complement your building's architectural style and surrounding environment."
              },
              {
                title: "Facade Enhancement",
                description: "Creative solutions to improve existing elevations with modern treatments, materials, and architectural elements."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-soft border border-stone-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-primary-900 mb-4">{feature.title}</h3>
                <p className="text-primary-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-24">
          <motion.h2 
            className="font-serif text-3xl font-bold text-primary-900 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Our Process
          </motion.h2>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Requirement Gathering",
                description: "Discussions to understand your aesthetic preferences, building style, and functional requirements for the facade design."
              },
              {
                step: "02",
                title: "Concept Sketches",
                description: "Development of preliminary elevation concepts and sketches that explore different design directions and architectural treatments."
              },
              {
                step: "03",
                title: "3D Visualization",
                description: "Creation of detailed 3D renderings that show your building's elevation from multiple angles with realistic materials and lighting."
              },
              {
                step: "04",
                title: "Material Finalization",
                description: "Selection and specification of exterior materials, textures, colors, and finishes that will achieve the desired aesthetic effect."
              },
              {
                step: "05",
                title: "Presentation & Handover",
                description: "Final presentation of elevation designs with detailed specifications for implementation during the construction phase."
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                className="flex gap-8 items-start p-6 rounded-2xl hover:bg-stone-50 transition-colors"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 text-white flex items-center justify-center font-bold text-2xl">
                  {process.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">{process.title}</h3>
                  <p className="text-primary-700">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="rounded-3xl overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Building Elevation" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
          </div>
          <div className="relative z-10 p-12 md:p-16 text-white max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Enhance Your Building's Appearance?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Let our design experts create stunning elevations that make your property stand out and leave a lasting impression.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="px-8 py-4 bg-white text-primary-900 rounded-full font-medium shadow-luxury hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
              <Link 
                to="/contact"
                className="px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ElevationPage;

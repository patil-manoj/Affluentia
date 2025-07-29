import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LightBulbIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const LandscapingPage = () => {
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
            <span className="text-primary-900 font-medium">Landscaping</span>
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
              <LightBulbIcon className="w-5 h-5" />
              <span className="font-medium">Landscaping</span>
            </div>
            <h1 className="font-serif text-5xl font-bold text-primary-900 mb-6">
              Creative Landscape Design
            </h1>
            <p className="text-xl text-primary-700 mb-8 leading-relaxed">
              Transform outdoor spaces with creative landscaping, blending nature and design 
              for beauty, sustainability, and relaxation tailored to your property.
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
                src="https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934623/komarov-egor-jzWQlIio8ks-unsplash_ajdpdj.jpg" 
                alt="Landscaping Service" 
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
                title: "Garden & Lawn Design",
                description: "Custom garden layouts and lawn designs that enhance your property's beauty while considering maintenance requirements and local climate."
              },
              {
                title: "Hardscape & Softscape",
                description: "Harmonious integration of hardscape elements (patios, walkways, retaining walls) with softscape features (plants, trees, flowers)."
              },
              {
                title: "Water Features",
                description: "Design and installation of fountains, ponds, and water gardens that create tranquil focal points and enhance the sensory experience."
              },
              {
                title: "Lighting & Irrigation",
                description: "Strategic outdoor lighting plans and efficient irrigation systems that showcase your landscape while ensuring its health and sustainability."
              },
              {
                title: "Sustainable Planting",
                description: "Selection of native and adaptive plants that thrive in your local environment while reducing water usage and maintenance needs."
              },
              {
                title: "Outdoor Living Spaces",
                description: "Creation of functional outdoor areas for relaxation, entertainment, and dining that extend your living space into the landscape."
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
                title: "Site Assessment",
                description: "Comprehensive evaluation of your property's topography, soil conditions, existing vegetation, drainage patterns, and sunlight exposure."
              },
              {
                step: "02",
                title: "Conceptual Layout",
                description: "Development of preliminary landscape concepts that integrate your aesthetic preferences and functional requirements with the site conditions."
              },
              {
                step: "03",
                title: "Plant & Material Selection",
                description: "Careful selection of plants, hardscape materials, and landscape features that create a cohesive and sustainable outdoor environment."
              },
              {
                step: "04",
                title: "Installation Supervision",
                description: "Expert oversight during the installation phase to ensure proper execution of the landscape design and adherence to quality standards."
              },
              {
                step: "05",
                title: "Maintenance Planning",
                description: "Development of a comprehensive maintenance program to keep your landscape thriving and beautiful throughout the seasons."
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
              src="https://images.pexels.com/photos/7594336/pexels-photo-7594336.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Landscaping" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
          </div>
          <div className="relative z-10 p-12 md:p-16 text-white max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Outdoor Space?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Let our landscape designers create a beautiful, functional, and sustainable outdoor environment that enhances your property.
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

export default LandscapingPage;
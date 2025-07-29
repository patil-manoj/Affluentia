import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BuildingOfficeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const BuildingConstructionPage = () => {
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
            <span className="text-primary-900 font-medium">Architecture</span>
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
              <BuildingOfficeIcon className="w-5 h-5" />
              <span className="font-medium">Architecture</span>
            </div>
            <h1 className="font-serif text-5xl font-bold text-primary-900 mb-6">
              Expert Building Construction Services
            </h1>
            <p className="text-xl text-primary-700 mb-8 leading-relaxed">
              From the first brick to the final finish, 
              we take care of the entire construction process with a focus on strength, quality, and long-term value.
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
                src="https://res.cloudinary.com/dwvh4dmer/image/upload/v1753628934/gonzz-ndG1YdTQBOk-unsplash_1_aehjjr.jpg" 
                alt="Architecture Service" 
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
                title: "End-to-End Project Management",
                description: "We handle every stage of the construction process, from site preparation to final handover, ensuring everything runs smoothly and stays on schedule."
              },
              {
                title: "Strong and Reliable Structures",
                description: "Our construction methods focus on safety and longevity, using high-quality materials and proven engineering practices."
              },
              {
                title: "Skilled Workforce",
                description: "Experienced professionals and trained workers bring craftsmanship and attention to detail to every part of the build."
              },
              {
                title: "Cost-Effective Solutions",
                description: "We offer smart construction planning and material selection that keeps quality high while staying within your budget."
              },
              {
                title: "Sustainable Solutions",
                description: "Integration of eco-friendly design principles and energy-efficient systems to reduce environmental impact and operating costs."
              },
              {
                title: "Regulatory Compliance",
                description: "Thorough knowledge of building codes and regulations to ensure your project meets all legal requirements and approval processes."
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
                title: "Planning & Site Assessment",
                description: "We begin with site visits and discussions to understand your vision, assess the land, and plan the best construction approach based on your goals and budget."
              },
              {
                step: "02",
                title: "Design Coordination",
                description: "We work closely with architects and engineers to finalize practical, safe, and efficient building designs that suit your needs and comply with local regulations."
              },
              {
                step: "03",
                title: "Pre-Construction & Approvals",
                description: "We handle the necessary documentation, permits, and approvals to ensure the construction is legally sound and ready to begin without delays."
              },
              {
                step: "04",
                title: "Construction Execution",
                description: "Our expert team begins the physical construction, managing timelines, materials, and workforce to bring your structure to life with quality and precision."
              },
              {
                step: "05",
                title: "Final Inspection & Handover",
                description: "We perform thorough inspections, address finishing touches, and hand over the completed project—ready for use and built to last."
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
              src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Architecture Design" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
          </div>
          <div className="relative z-10 p-12 md:p-16 text-white max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Architectural Vision?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Let our expert architects help you create spaces that blend beauty, functionality, and sustainability.
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

export default BuildingConstructionPage;
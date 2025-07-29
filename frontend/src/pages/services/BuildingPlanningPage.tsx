import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const BuildingPlanningPage = () => {
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
            <span className="text-primary-900 font-medium">Building Planning</span>
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
              <HomeIcon className="w-5 h-5" />
              <span className="font-medium">Building Planning</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Strategic Building Planning Solutions
            </h1>
            <p className="text-xl text-primary-700 mb-8 leading-relaxed">
              Strategic planning and design of building layouts, ensuring optimal space utilization, 
              compliance, and future-ready solutions tailored to your specific requirements.
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
                src="https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934685/nwar-igbariah-AteFNIFVGdo-unsplash_l3zdlh.jpg" 
                alt="Building Planning Service" 
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
                title: "Site Analysis & Feasibility",
                description: "Comprehensive analysis of site conditions, zoning regulations, and project feasibility to ensure optimal planning decisions."
              },
              {
                title: "Master Planning",
                description: "Holistic approach to development planning, considering current needs and future growth for sustainable, flexible solutions."
              },
              {
                title: "Zoning & Code Compliance",
                description: "Expert navigation of building codes, zoning regulations, and permit requirements to ensure smooth approval processes."
              },
              {
                title: "Space Optimization",
                description: "Strategic space planning that maximizes functionality and efficiency while enhancing user experience and flow."
              },
              {
                title: "Schematic Design",
                description: "Preliminary design concepts that visualize spatial relationships, circulation patterns, and overall building organization."
              },
              {
                title: "Sustainable Planning",
                description: "Integration of sustainable principles from the initial planning stages to promote energy efficiency and environmental responsibility."
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
                title: "Client Consultation",
                description: "We begin with in-depth discussions to understand your vision, requirements, constraints, and aspirations for the project."
              },
              {
                step: "02",
                title: "Site Survey",
                description: "A thorough site analysis to assess topography, orientation, access points, utilities, and environmental factors that will influence the design."
              },
              {
                step: "03",
                title: "Conceptual Planning",
                description: "Development of preliminary concepts and space planning options, establishing the functional relationships and overall organization."
              },
              {
                step: "04",
                title: "Design Development",
                description: "Refinement of the selected concept with detailed spatial arrangements, circulation patterns, and integration of technical requirements."
              },
              {
                step: "05",
                title: "Approval & Documentation",
                description: "Preparation of comprehensive documentation for regulatory approval, including detailed plans, specifications, and compliance reports."
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
              src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Building Planning" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
          </div>
          <div className="relative z-10 p-12 md:p-16 text-white max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Building Planning Project?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Let our expert team help you transform your vision into a well-planned, efficient, and compliant building design.
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

export default BuildingPlanningPage;
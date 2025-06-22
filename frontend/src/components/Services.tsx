import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  CubeTransparentIcon, 
  PaintBrushIcon,
  LightBulbIcon,
  CogIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  process: string[];
  image: string;
  price: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Architectural Design",
    description: "Complete architectural solutions from concept to construction documentation, creating spaces that inspire and function beautifully.",
    icon: HomeIcon,
    features: [
      "Conceptual Design & Planning",
      "3D Visualization & Renderings",
      "Construction Documentation",
      "Building Code Compliance",
      "Sustainable Design Integration"
    ],
    process: [
      "Initial Consultation",
      "Site Analysis",
      "Concept Development",
      "Design Development",
      "Documentation"
    ],
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "Starting from $15,000"
  },
  {
    id: 2,
    title: "Interior Design",
    description: "Transform your interiors with our comprehensive design services, focusing on functionality, aesthetics, and personal style.",
    icon: PaintBrushIcon,
    features: [
      "Space Planning & Layout",
      "Material & Finish Selection",
      "Custom Furniture Design",
      "Lighting Design",
      "Art & Accessory Curation"
    ],
    process: [
      "Style Assessment",
      "Space Measurement",
      "Concept Presentation",
      "Product Selection",
      "Installation Management"
    ],
    image: "https://images.pexels.com/photos/6207827/pexels-photo-6207827.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "Starting from $8,000"
  },
  {
    id: 3,
    title: "Commercial Spaces",
    description: "Design innovative commercial environments that enhance productivity, brand identity, and customer experience.",
    icon: BuildingOfficeIcon,
    features: [
      "Office Space Planning",
      "Retail Design",
      "Restaurant & Hospitality",
      "Healthcare Facilities",
      "Co-working Spaces"
    ],
    process: [
      "Business Analysis",
      "Brand Integration",
      "Functional Planning",
      "Construction Management",
      "Post-Occupancy Evaluation"
    ],
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "Starting from $25,000"
  },
  {
    id: 4,
    title: "3D Visualization",
    description: "Bring your projects to life with photorealistic renderings, virtual tours, and immersive visualization experiences.",
    icon: CubeTransparentIcon,
    features: [
      "Photorealistic Renderings",
      "Virtual Reality Tours",
      "Animation Walkthroughs",
      "Interactive 3D Models",
      "Marketing Visualizations"
    ],
    process: [
      "Model Creation",
      "Material Application",
      "Lighting Setup",
      "Rendering Process",
      "Post-Production"
    ],
    image: "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "Starting from $2,500"
  },
  {
    id: 5,
    title: "Sustainable Design",
    description: "Create environmentally responsible designs that minimize environmental impact while maximizing efficiency and comfort.",
    icon: LightBulbIcon,
    features: [
      "LEED Certification Guidance",
      "Energy Efficiency Analysis",
      "Renewable Energy Integration",
      "Water Conservation Systems",
      "Sustainable Material Selection"
    ],
    process: [
      "Environmental Assessment",
      "Sustainability Goals",
      "System Integration",
      "Performance Monitoring",
      "Certification Support"
    ],
    image: "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "Starting from $5,000"
  },
  {
    id: 6,
    title: "Project Management",
    description: "Comprehensive project oversight ensuring your vision is realized on time, within budget, and to the highest standards.",
    icon: CogIcon,
    features: [
      "Timeline Development",
      "Budget Management",
      "Contractor Coordination",
      "Quality Control",
      "Client Communication"
    ],
    process: [
      "Project Planning",
      "Team Assembly",
      "Progress Monitoring",
      "Issue Resolution",
      "Final Delivery"
    ],
    image: "https://images.pexels.com/photos/6489118/pexels-photo-6489118.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "Starting from $10,000"
  }
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'process'>('features');

  return (
    <motion.div
      className="luxury-card group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
    >
      {/* Service Header */}
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden rounded-t-2xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Icon */}
          <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <service.icon className="w-6 h-6 text-primary-600" />
          </div>

          {/* Price */}
          <div className="absolute top-6 right-6 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium text-stone-900">{service.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-stone-600 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Toggle Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            whileHover={{ x: 5 }}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRightIcon className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          {/* Tabs */}
          <div className="flex border-b border-stone-200 mb-6">
            {(['features', 'process'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-3">
              {service[activeTab].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-stone-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium shadow-luxury hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden" ref={containerRef}>
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(68,64,60,0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="font-serif text-4xl md:text-6xl font-bold text-stone-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From initial concept to final construction, we offer comprehensive architectural and design services 
            tailored to bring your vision to life with exceptional quality and attention to detail.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
            <h3 className="font-serif text-3xl font-bold text-stone-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-stone-600 mb-6">
              Let's discuss how we can bring your architectural vision to life with our expertise and creativity.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium shadow-luxury hover:shadow-glow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Consultation
              <ArrowRightIcon className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

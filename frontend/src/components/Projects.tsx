import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  thumbnailUrl: string;
  year: string;
  status: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Serenity Residence",
    category: "Residential",
    description: "A modern minimalist home that seamlessly blends with its natural surroundings.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    thumbnailUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2024",
    status: "Completed",
    tags: ["Modern", "Sustainable", "Minimalist"]
  },
  {
    id: 2,
    title: "Urban Oasis Tower",
    category: "Commercial",
    description: "A mixed-use development that redefines urban living with integrated green spaces.",
    image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934680/nastuh-abootalebi-eHD8Y1Znfpk-unsplash_akbted.jpg",
    thumbnailUrl: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2023",
    status: "Completed",
    tags: ["High-rise", "Mixed-use", "Green Building"]
  },
  {
    id: 3,
    title: "Coastal Retreat",
    category: "Residential",
    description: "An oceanfront villa designed to maximize natural light and panoramic views.",
    image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934572/allison-huang-_u8KhAZRGHs-unsplash_vjlr7n.jpg",
    thumbnailUrl: "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2024",
    status: "In Progress",
    tags: ["Oceanfront", "Luxury", "Contemporary"]
  },
  {
    id: 4,
    title: "Innovation Hub",
    category: "Commercial",
    description: "A tech campus designed to foster creativity and collaboration through flexible spaces.",
    image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934591/hammer-group-bEBLQQPhqi8-unsplash_rhax5w.jpg",
    thumbnailUrl: "https://images.pexels.com/photos/6207827/pexels-photo-6207827.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2023",
    status: "Completed",
    tags: ["Tech Campus", "Biophilic", "Flexible"]
  },
  {
    id: 5,
    title: "Heritage Restoration",
    category: "Restoration",
    description: "Careful restoration of a 19th-century mansion, preserving history.",
    image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934572/antonio-araujo-WQLIxSEczSA-unsplash_npviuw.jpg",
    thumbnailUrl: "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2024",
    status: "In Progress",
    tags: ["Historic", "Restoration", "Heritage"]
  },
  {
    id: 6,
    title: "Zen Garden Pavilion",
    category: "Hospitality",
    description: "A meditation retreat that harmonizes tradition with architectural principles.",
    image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934622/komarov-egor-DDUNMLGq2Kc-unsplash_cn2olp.jpg",
    thumbnailUrl: "https://images.pexels.com/photos/6489118/pexels-photo-6489118.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2023",
    status: "Completed",
    tags: ["Japanese", "Zen", "Pavilion"]
  },
  {
    id: 7,
    title: "Zen Garden Pavilion",
    category: "Hospitality",
    description: "A meditation retreat that harmonizes tradition with architectural principles.",
    image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934622/komarov-egor-DDUNMLGq2Kc-unsplash_cn2olp.jpg",
    thumbnailUrl: "https://images.pexels.com/photos/6489118/pexels-photo-6489118.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2023",
    status: "Completed",
    tags: ["Japanese", "Zen", "Pavilion"]
  },
  {
    id: 8,
    title: "Zen Garden Pavilion",
    category: "Hospitality",
    description: "A meditation retreat that harmonizes tradition with architectural principles.",
    image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934622/komarov-egor-DDUNMLGq2Kc-unsplash_cn2olp.jpg",
    thumbnailUrl: "https://images.pexels.com/photos/6489118/pexels-photo-6489118.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2023",
    status: "Completed",
    tags: ["Japanese", "Zen", "Pavilion"]
  },
  {
    id: 9,
    title: "Zen Garden Pavilion",
    category: "Hospitality",
    description: "A meditation retreat that harmonizes tradition with architectural principles.",
    image: "https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934622/komarov-egor-DDUNMLGq2Kc-unsplash_cn2olp.jpg",
    thumbnailUrl: "https://images.pexels.com/photos/6489118/pexels-photo-6489118.jpeg?auto=compress&cs=tinysrgb&w=600",
    year: "2023",
    status: "Completed",
    tags: ["Japanese", "Zen", "Pavilion"]
  }
];

const categories = ['All', ...new Set(projects.map(project => project.category))];

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl luxury-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse" />
        )}
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'Completed' 
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-stone-800">
            {project.category}
          </span>
        </div>

        
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">          <h3 className="font-serif text-xl font-bold text-primary-900 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-primary-600">{project.year}</span>
        </div>
          <p className="text-primary-700 mb-4 line-clamp-2">{project.description}</p>
        

        
      </div>
    </motion.div>
  );
};

const Projects = () => {  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-white to-stone-50" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >          <motion.h2 
            className="font-serif text-4xl md:text-6xl font-bold text-primary-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span className="text-gradient">Portfolio</span>
          </motion.h2>          <motion.p 
            className="text-xl text-primary-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our diverse collection of architectural masterpieces, each telling a unique story 
            of innovation, sustainability, and timeless design.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md mx-auto lg:mx-0">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-stone-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <FunnelIcon className="w-5 h-5 text-stone-400 flex-shrink-0" />
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-luxury'
                    : 'bg-white text-primary-700 border border-primary-200 hover:border-primary-300 hover:text-primary-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-stone-400" />
            </div>            <h3 className="font-serif text-2xl font-bold text-primary-900 mb-3">No projects found</h3>
            <p className="text-primary-700 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium shadow-luxury hover:shadow-glow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
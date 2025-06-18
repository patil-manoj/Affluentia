import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

// Image lazy loading component
const LazyImage = ({ src, alt, className, onLoad }: { 
  src: string; 
  alt: string; 
  className?: string;
  onLoad?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
      )}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        loading="lazy"
        onLoad={handleLoad}
      />
    </div>
  );
};

const showcaseProjects = [
  {
    title: "Modern Minimalist Villa",
    description: "A stunning blend of contemporary design and natural elements, featuring open spaces and seamless indoor-outdoor living.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnailUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    stats: [
      { label: "Area", value: "3,500 sq ft" },
      { label: "Duration", value: "4 months" },
      { label: "Recognition", value: "Award Winner" }
    ],
    details: [
      "Custom Italian marble flooring",
      "Floor-to-ceiling windows",
      "Smart home integration",
      "Sustainable materials"
    ]
  },
  {
    title: "Urban Loft Renovation",
    description: "Converting industrial space into luxurious living quarters while preserving the building's historic character.",
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnailUrl: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400",
    stats: [
      { label: "Area", value: "2,200 sq ft" },
      { label: "Duration", value: "3 months" },
      { label: "Status", value: "Featured Project" }
    ],
    details: [
      "Exposed brick walls",
      "Custom steel fixtures",
      "Polished concrete floors",
      "Original beam preservation"
    ]
  },
  {
    title: "Coastal Retreat",
    description: "Harmonizing indoor comfort with oceanfront views, creating a perfect balance of luxury and natural beauty.",
    image: "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnailUrl: "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=400",
    stats: [
      { label: "Area", value: "4,800 sq ft" },
      { label: "Duration", value: "6 months" },
      { label: "Feature", value: "Sustainable Design" }
    ],
    details: [
      "Panoramic ocean views",
      "Natural ventilation system",
      "Solar power integration",
      "Indigenous landscaping"
    ]
  }
];

const Showcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const handleImageLoad = useCallback((imageUrl: string) => {
    setLoadedImages(prev => new Set(prev).add(imageUrl));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section className="relative py-24 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-semibold mb-4">Featured Projects</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our most impactful transformations and innovative designs that redefine modern living spaces.
          </p>
        </motion.div>

        <div className="space-y-32">
          {showcaseProjects.map((project, index) => {
            const projectRef = useRef<HTMLDivElement>(null);
            const { scrollYProgress: projectProgress } = useScroll({
              target: projectRef,
              offset: ["start end", "end start"]
            });

            const imageScale = useTransform(projectProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
            const imageOpacity = useTransform(projectProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
            const textY = useTransform(projectProgress, [0, 0.5, 1], [100, 0, -100]);
            const textOpacity = useTransform(projectProgress, [0, 0.5, 1], [0, 1, 0]);

            return (
              <motion.div
                key={project.title}
                ref={projectRef}
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-20%" }}
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                  <motion.div
                    className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                    style={{ 
                      scale: imageScale,
                      opacity: loadedImages.has(project.thumbnailUrl) ? imageOpacity : 0
                    }}
                  >
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                      <LazyImage
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onLoad={() => handleImageLoad(project.thumbnailUrl)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0 mix-blend-multiply" />
                      
                      {/* Interactive overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-primary-600/0 hover:bg-primary-600/20 transition-colors duration-300"
                        whileHover="hover"
                      >
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center opacity-0"
                          variants={{
                            hover: {
                              opacity: 1
                            }
                          }}
                        >
                          <motion.span
                            className="px-6 py-3 bg-white text-primary-600 rounded-full font-semibold text-sm"
                            variants={{
                              hover: {
                                y: 0,
                                scale: 1
                              }
                            }}
                            initial={{ y: 20, scale: 0.9 }}
                          >
                            View Details
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} mt-8 lg:mt-0`}
                    style={{ 
                      y: textY,
                      opacity: textOpacity
                    }}
                  >
                    <h3 className="text-3xl font-semibold mb-4">{project.title}</h3>
                    <p className="text-neutral-600 mb-8">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {project.stats.map((stat, statIndex) => (
                        <motion.div
                          key={stat.label}
                          className="p-4 rounded-xl bg-white shadow-soft hover:shadow-medium transition-shadow"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 + statIndex * 0.1 }}
                        >
                          <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                          <p className="text-lg font-semibold text-primary-600">{stat.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {project.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detail}
                          className="flex items-center space-x-2"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 + detailIndex * 0.1 }}
                        >
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-primary-600"
                            whileInView={{
                              scale: [1, 1.5, 1],
                              opacity: [0, 1, 1]
                            }}
                            transition={{ duration: 0.5, delay: 1 + detailIndex * 0.1 }}
                          />
                          <span className="text-neutral-600">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -z-10"
                  style={{
                    left: index % 2 === 0 ? '0%' : '50%',
                    top: '20%',
                    width: '500px',
                    height: '500px',
                    background: `radial-gradient(circle, ${index % 2 === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.15)'}, transparent 70%)`,
                    borderRadius: '50%',
                    y: useTransform(projectProgress, [0, 1], [0, index % 2 === 0 ? -100 : 100]),
                    opacity: useTransform(projectProgress, [0, 0.5, 1], [0, 1, 0])
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed left-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
      >
        <div className="h-48 w-px bg-neutral-200 relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-primary-600"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Showcase;

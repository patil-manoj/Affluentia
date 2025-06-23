import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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



// Enhanced gallery data with architectural focus
const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    title: 'Contemporary Residence',
    category: 'Architecture',
    description: 'Modern architectural design with clean lines and expansive glass facades'
  },
  {
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    title: 'Elegant Living Space',
    category: 'Interior',
    description: 'Sophisticated interior design with premium finishes and curated furnishings'
  },
  {
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    title: 'Structural Elegance',
    category: 'Architecture',
    description: 'Meticulous attention to architectural details and material selection'
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    title: 'Culinary Excellence',
    category: 'Kitchen',
    description: 'A chef\'s kitchen designed for both functionality and aesthetic appeal'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    title: 'Urban Sophistication',
    category: 'Interior',
    description: 'Contemporary living space with thoughtful lighting and spatial flow'
  },
  {
    url: 'https://images.unsplash.com/photo-1600563438938-a42d493abb63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600563438938-a42d493abb63?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    title: 'Serene Sanctuary',
    category: 'Bedroom',
    description: 'Tranquil bedroom retreat with natural materials and calming tones'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    title: 'Spa-Like Retreat',
    category: 'Bathroom',
    description: 'Luxurious bathroom design with premium fixtures and natural stone finishes'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566752734-d1d4e8b8e2f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600566752734-d1d4e8b8e2f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    title: 'Urban Landmark',
    category: 'Architecture',
    description: 'Iconic building facade that defines the urban landscape'
  },
];

// Define animation variants
const imageVariants: Variants = {
  hover: {
    scale: 1.05,
  }
};

const overlayVariants: Variants = {
  hover: {
    opacity: 1
  }
};

const contentVariants: Variants = {
  initial: {
    y: 20,
    opacity: 0
  },
  hover: {
    y: 0,
    opacity: 1
  }
};

const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

const Gallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section ref={galleryRef} className="relative py-24 bg-neutral-50/50 backdrop-blur-sm" id="gallery">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-semibold mb-4">Our Portfolio</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Explore our collection of thoughtfully designed spaces that inspire and delight.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all
                ${selectedCategory === category 
                  ? 'bg-primary-600 text-white shadow-lg' 
                  : 'bg-white text-neutral-600 hover:bg-primary-50'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.url}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1,
                  scale: 1
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
                whileHover="hover"
              >
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-200"
                  variants={imageVariants}
                >                  <LazyImage
                    src={image.thumbnailUrl}
                    alt={image.title}
                    className="object-cover w-full h-full transform"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0"
                    variants={overlayVariants}
                  />
                  
                  <motion.div
                    className="absolute inset-0 p-6 flex flex-col justify-end text-white"
                    variants={contentVariants}
                  >
                    <h3 className="text-xl font-semibold">{image.title}</h3>
                    <p className="text-white/80 text-sm mt-2">{image.category}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog
            open={true}
            onClose={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

            <Dialog.Panel>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-white rounded-2xl overflow-hidden max-w-5xl w-full mx-auto"
              >
                <div className="relative aspect-[16/9]">
                  <LazyImage
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{selectedImage.title}</h3>
                  <p className="text-neutral-600 mt-2">{selectedImage.description}</p>
                  <p className="text-primary-600 font-medium mt-2">{selectedImage.category}</p>
                </div>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </motion.div>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: parallaxY }}
      >
        <motion.div
          className="absolute top-1/4 left-0 w-72 h-72 bg-primary-600/10 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-400/10 rounded-full mix-blend-multiply filter blur-xl"
        />
      </motion.div>
    </section>
  );
};

export default Gallery;

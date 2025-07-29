import { motion, useScroll, useTransform } from 'framer-motion';
import {
  HomeIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { useRef } from 'react';

const features = [
  {
    name: 'Architectural Excellence',
    description:
      'Where visionary ideas become iconic structures that inspire and endure.',
    icon: BuildingOfficeIcon,
    image:
      'https://res.cloudinary.com/dwvh4dmer/image/upload/v1753626162/image-1_b7lyhv.jpg',
  },
  {
    name: 'Interior Mastery',
    description:
      'Step inside sophistication—tailored interiors that elevate every moment.',
    icon: HomeIcon,
    image:
      'https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934243/living_1_1_qni1a3.png',
  },
  {
    name: 'Spatial Innovation',
    description:
      'Discover the extraordinary in every corner with creative spatial solutions that spark delight.',
    icon: CubeIcon,
    image:
      'https://res.cloudinary.com/dwvh4dmer/image/upload/v1752934184/11_dsnnlr.png',
  },
  {
    name: 'Luxury Craftsmanship',
    description:
      'Experience opulence redefined—luxury crafted with precision in every detail.',
    icon: SparklesIcon,
    image:
      'https://res.cloudinary.com/dwvh4dmer/image/upload/v1753627174/salman-saqib-GHlwOXqb8SU-unsplash_1_ecrtz6.jpg',
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  return (
    <div
      className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-primary-100/40"
      id="features"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(circle at 25% 25%, rgba(42, 54, 37, 0.1) 0%, transparent 100%)',
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]),
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background:
              'radial-gradient(circle at 75% 75%, rgba(29, 37, 26, 0.08) 0%, transparent 50%)',
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.9, 1.2]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.2, 0.05]),
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl lg:text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-base font-semibold leading-7 text-primary-600 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Expertise
          </motion.h2>
          <motion.p
            className="mt-2 text-4xl font-bold tracking-tight text-dark-800 sm:text-5xl font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Architectural Excellence Through Innovation
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover how our expert team brings innovation and elegance to every
            project, creating spaces that inspire and delight.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-7xl sm:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="group relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Feature Card */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-70 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-75`}
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <motion.div
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <feature.icon
                        className="h-8 w-8 flex-none"
                        aria-hidden="true"
                      />
                      <h3 className="text-2xl font-bold">{feature.name}</h3>
                    </motion.div>

                    <motion.p
                      className="text-lg text-white/90 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      {feature.description}
                    </motion.p>

                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white group/link w-fit"
                      whileHover={{ x: 5 }}
                    >
                      Learn more
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                    </motion.a>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-24 h-24 border border-white/20 rounded-full"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-16 h-16 border border-white/20 rounded-full"
                    initial={{ scale: 0, rotate: 180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

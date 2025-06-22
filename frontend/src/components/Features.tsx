import { motion, useScroll, useTransform } from 'framer-motion';
import {
  HomeIcon,
  PaintBrushIcon,
  LightBulbIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useRef } from 'react';

const features = [
  {
    name: 'Custom Design',
    description:
      'Tailored interior solutions that reflect your unique style and personality, creating spaces that truly feel like home.',
    icon: HomeIcon,
    image:
      'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg',
    accent: 'from-purple-600 to-blue-600',
  },
  {
    name: 'Artistic Vision',
    description:
      'We blend creativity with functionality, turning your ideas into stunning reality while maintaining practical livability.',
    icon: PaintBrushIcon,
    image:
      'https://images.pexels.com/photos/3255245/pexels-photo-3255245.jpeg',
    accent: 'from-rose-600 to-orange-600',
  },
  {
    name: 'Smart Solutions',
    description:
      'Innovative design approaches that maximize space utilization and enhance the natural flow of your environment.',
    icon: LightBulbIcon,
    image:
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    accent: 'from-emerald-600 to-teal-600',
  },
  {
    name: 'Luxury Finishes',
    description:
      'Premium materials and exquisite details that elevate your space to new heights of sophistication.',
    icon: SparklesIcon,
    image:
      'https://images.pexels.com/photos/3926542/pexels-photo-3926542.jpeg',
    accent: 'from-amber-600 to-yellow-600',
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
      className="relative py-24 sm:py-32 overflow-hidden"
      id="features"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)',
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl lg:text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-base font-semibold leading-7"
            style={{
              background: 'linear-gradient(to right, #4F46E5, #9333EA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Reimagine Your Space
          </motion.h2>
          <motion.p
            className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your Vision Into Reality
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
                    className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-70 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-75`}
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

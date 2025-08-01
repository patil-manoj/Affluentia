import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {  
  TrophyIcon,
  CalendarIcon,
  MapPinIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

// interface TeamMember {
//   id: number;
//   name: string;
//   role: string;
//   bio: string;
//   image: string;
//   education: string[];
//   specialties: string[];
//   experience: string;
// }

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const stats: Stat[] = [
  { value: '50+', label: 'Projects Completed', icon: TrophyIcon },
  { value: '5+', label: 'Years Experience', icon: CalendarIcon },
  { value: '50+', label: 'Happy Clients', icon: HeartIcon },
  { value: '8+', label: 'Awards', icon: MapPinIcon },
];

const values = [
  {
    title: 'Innovation',
    description: 'We push boundaries and embrace cutting-edge technologies to create revolutionary architectural solutions.',
    icon: '🚀'
  },
  {
    title: 'Sustainability',
    description: 'Environmental responsibility is at the core of our design philosophy, creating buildings that respect our planet.',
    icon: '🌱'
  },
  {
    title: 'Excellence',
    description: 'We maintain the highest standards in every aspect of our work, from initial concept to final delivery.',
    icon: '⭐'
  },
  {
    title: 'Collaboration',
    description: 'We believe the best results come from working closely with our clients, creating true partnerships.',
    icon: '🤝'
  }
];

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
      <stat.icon className="w-8 h-8 text-primary-600" />
    </div>
    <motion.div
      className="font-serif text-4xl font-bold text-primary-900 mb-2"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: "spring" }}
      viewport={{ once: true }}
    >
      {stat.value}
    </motion.div>
    <p className="text-primary-700 font-medium">{stat.label}</p>
  </motion.div>
);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >            <h3 className="font-serif text-3xl font-bold text-primary-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-primary-700 leading-relaxed">
              <p>
                Affluentia was born from a shared vision of creating architecture that doesn't just shelter, 
                but inspires. Our founders, coming from diverse backgrounds in architecture, engineering, 
                and design, united with a common goal: to challenge conventional design thinking.
              </p>
              <p>
                Over the years, we've grown from a small studio to an internationally recognized firm, 
                but we've never lost sight of our core values. Every project, whether a private residence 
                or a major commercial development, receives the same level of attention, creativity, and care.
              </p>
              <p>
                We believe that great architecture is the result of great collaboration. That's why we work 
                closely with our clients, local communities, and partner firms to ensure every project 
                contributes positively to its environment and the people who inhabit it.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl opacity-90" />
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-accent-600 to-primary-600 rounded-xl opacity-80" />
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-serif text-3xl font-bold text-primary-900 text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary-200/50 hover:shadow-elegant transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>                <h4 className="font-serif text-xl font-bold text-primary-900 mb-3">{value.title}</h4>
                <p className="text-primary-700 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

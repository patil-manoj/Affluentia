import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  TrophyIcon,
  CalendarIcon,
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  education: string[];
  specialties: string[];
  experience: string;
}

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}

const stats: Stat[] = [
  { value: '200+', label: 'Projects Completed', icon: TrophyIcon },
  { value: '15+', label: 'Years Experience', icon: CalendarIcon },
  { value: '50+', label: 'Happy Clients', icon: HeartIcon },
  { value: '12', label: 'Cities Worldwide', icon: MapPinIcon },
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Principal Architect',
    bio: 'Sarah leads our design vision with over 15 years of experience in sustainable architecture. Her innovative approach has earned international recognition.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=400&q=80',
    education: ['M.Arch from MIT', 'LEED AP BD+C'],
    specialties: ['Sustainable Design', 'Commercial Architecture', 'Urban Planning'],
    experience: '15+ years'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Creative Director',
    bio: 'Marcus brings artistic vision to every project, specializing in luxury residential design and innovative interior solutions.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    education: ['M.Design from Parsons', 'NCIDQ Certified'],
    specialties: ['Interior Design', 'Luxury Residential', 'Custom Furniture'],
    experience: '12+ years'
  },
  {
    id: 3,
    name: 'Elena Kowalski',
    role: 'Project Manager',
    bio: 'Elena ensures every project runs smoothly from conception to completion, with expertise in construction management and client relations.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    education: ['MBA in Construction Management', 'PMP Certified'],
    specialties: ['Project Management', 'Construction Administration', 'Client Relations'],
    experience: '10+ years'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Technical Director',
    bio: 'David oversees technical implementation and ensures all designs meet the highest engineering standards and building codes.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    education: ['M.Eng in Structural Engineering', 'PE Licensed'],
    specialties: ['Structural Engineering', 'Building Systems', 'Code Compliance'],
    experience: '13+ years'
  }
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
      className="font-serif text-4xl font-bold text-stone-900 mb-2"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: "spring" }}
      viewport={{ once: true }}
    >
      {stat.value}
    </motion.div>
    <p className="text-stone-600 font-medium">{stat.label}</p>
  </motion.div>
);

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <motion.div
    className="luxury-card group text-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="relative mb-6">
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full text-sm font-medium">
        {member.experience}
      </div>
    </div>

    <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">{member.name}</h3>
    <p className="text-primary-600 font-medium mb-4">{member.role}</p>
    <p className="text-stone-600 text-sm leading-relaxed mb-6">{member.bio}</p>

    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-stone-900 mb-2 flex items-center justify-center gap-2">
          <AcademicCapIcon className="w-4 h-4" />
          Education
        </h4>
        <div className="space-y-1">
          {member.education.map((edu, i) => (
            <p key={i} className="text-xs text-stone-600">{edu}</p>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-stone-900 mb-2">Specialties</h4>
        <div className="flex flex-wrap gap-1 justify-center">
          {member.specialties.map((specialty, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
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
    <section id="about" className="py-24 bg-gradient-to-b from-white to-stone-50 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
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
            About <span className="text-gradient">Affluentia</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Founded on the belief that exceptional architecture can transform lives, Affluentia has been creating 
            inspiring spaces that blend innovation, sustainability, and timeless design for over a decade. 
            Our passion for excellence drives us to push boundaries and redefine what's possible in modern architecture.
          </motion.p>
        </motion.div>

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
          >
            <h3 className="font-serif text-3xl font-bold text-stone-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-stone-600 leading-relaxed">
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
          <h3 className="font-serif text-3xl font-bold text-stone-900 text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-stone-200/50 hover:shadow-elegant transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">{value.title}</h4>
                <p className="text-stone-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-bold text-stone-900 mb-4 flex items-center justify-center gap-3">
              <UserGroupIcon className="w-8 h-8 text-primary-600" />
              Meet Our Team
            </h3>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of experience in architecture, 
              design, and construction management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

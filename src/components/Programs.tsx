import { motion } from 'motion/react';
import { Dumbbell, Heart, Users, Zap, Timer, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const programs = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    slug: "strength-training",
    desc: "Build muscle and increase power with our comprehensive weightlifting programs.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600"
  },
  {
    icon: Heart,
    title: "Cardio Excellence",
    slug: "cardio-excellence",
    desc: "Improve your endurance and heart health with high-intensity cardio sessions.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=600"
  },
  {
    icon: Users,
    title: "Group Classes",
    slug: "group-classes",
    desc: "Train together in a high-energy environment led by our expert instructors.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600"
  },
  {
    icon: Zap,
    title: "Functional Fitness",
    slug: "functional-fitness",
    desc: "Enhance your daily movements and athletic performance with functional drills.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600"
  },
  {
    icon: Timer,
    title: "HIIT Training",
    slug: "hiit-training",
    desc: "Burn maximum calories in minimum time with our intense interval training.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600"
  },
  {
    icon: Trophy,
    title: "Personal Coaching",
    slug: "personal-coaching",
    desc: "Get 1-on-1 attention and a roadmap designed specifically for your body.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=600"
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-accent font-bold tracking-widest uppercase text-sm mb-4 block">Our Programs</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">TRAIN LIKE A <span className="text-orange-accent">PRO.</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Whether you're a beginner or an elite athlete, our diverse range of programs 
            is designed to push your limits and help you achieve your peak physical condition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-dark-bg border border-white/5 hover:border-orange-accent/30 transition-all duration-500"
            >
              {/* Image Background */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Content */}
              <div className="p-8 relative">
                <div className="absolute -top-10 left-8 w-16 h-16 rounded-2xl bg-orange-accent flex items-center justify-center text-black shadow-xl">
                  <program.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-4">{program.title}</h3>
                <p className="text-white/50 mb-6 leading-relaxed">
                  {program.desc}
                </p>
                <Link to={`/programs/${program.slug}`} className="text-orange-accent font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                  LEARN MORE <span className="text-xl">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

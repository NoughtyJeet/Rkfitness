import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const trainers = [
  {
    name: "Marcus Thorne",
    role: "Head Coach / Strength",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600",
    bio: "10+ years experience in bodybuilding and powerlifting. Certified CSCS.",
  },
  {
    name: "Elena Rodriguez",
    role: "HIIT & Cardio Specialist",
    image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=600",
    bio: "Former professional sprinter. Expert in metabolic conditioning and fat loss.",
  },
  {
    name: "David Chen",
    role: "Functional Training",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    bio: "Specializes in mobility, injury prevention, and athletic performance.",
  }
];

export default function Trainers() {
  return (
    <section id="trainers" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-orange-accent font-bold tracking-widest uppercase text-sm mb-4 block">Meet the Team</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">EXPERT COACHES TO <br /><span className="text-orange-accent">GUIDE YOU.</span></h2>
          </div>
          <button className="border border-white/10 hover:border-orange-accent px-8 py-3 rounded-xl font-bold transition-colors">
            VIEW ALL TRAINERS
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {trainers.map((trainer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-orange-accent hover:text-black transition-all">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-orange-accent hover:text-black transition-all">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-orange-accent hover:text-black transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{trainer.name}</h3>
              <p className="text-orange-accent font-bold text-sm uppercase tracking-widest mb-3">{trainer.role}</p>
              <p className="text-white/50 text-sm leading-relaxed">
                {trainer.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

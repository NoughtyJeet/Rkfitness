import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "James Wilson",
    role: "Member since 2022",
    content: "RK Fitness changed my life. The trainers actually care about your progress and the community is incredibly supportive. Best gym in Miami!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Sarah Jenkins",
    role: "Member since 2023",
    content: "The equipment is top-notch and always clean. I love the group classes, they really push you to your limits. Highly recommend the HIIT sessions.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Michael Ross",
    role: "Member since 2021",
    content: "I've been to many gyms, but RK Fitness has the best atmosphere. It's not just about lifting weights; it's about becoming a better version of yourself.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-accent font-bold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">WHAT OUR <span className="text-orange-accent">MEMBERS SAY.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 relative group hover:border-orange-accent/30 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-orange-accent/10 group-hover:text-orange-accent/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < item.rating ? 'text-orange-accent fill-orange-accent' : 'text-white/10'}`} 
                  />
                ))}
              </div>

              <p className="text-white/70 italic mb-8 leading-relaxed">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

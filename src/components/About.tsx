import { motion } from 'motion/react';
import { CheckCircle2, Target, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: "Personalized Goals",
    desc: "We create custom workout plans tailored to your specific body type and fitness objectives."
  },
  {
    icon: Zap,
    title: "High-End Equipment",
    desc: "Train with the latest Hammer Strength and Life Fitness machines for maximum efficiency."
  },
  {
    icon: Users,
    title: "Elite Community",
    desc: "Join a group of motivated individuals who support and challenge each other every day."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800" 
                alt="Beautiful Gym Interior" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-10 z-20 glass-card p-8 max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-accent flex items-center justify-center text-black">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="font-display font-bold text-xl">Certified Facility</div>
              </div>
              <p className="text-white/60 text-sm">
                RK Fitness is a premier destination for athletes and fitness enthusiasts in Miami since 2015.
              </p>
            </div>
            {/* Background Shape */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-orange-accent/20 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-accent font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              WE ARE <span className="text-orange-accent">RK FITNESS.</span> <br />
              THE HEART OF MIAMI'S STRENGTH.
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Located in the International Shopping Plaza, we've built more than just a gym. 
              We've built a sanctuary for those who refuse to settle for average. Our mission is 
              to provide an environment that fosters growth, discipline, and results.
            </p>

            <div className="space-y-8">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-accent group-hover:text-black transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

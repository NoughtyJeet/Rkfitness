import { motion } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920" 
          alt="Gym Training" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-accent/10 border border-orange-accent/20 text-orange-accent text-xs font-bold tracking-widest uppercase mb-6">
              Elite Fitness Experience
            </span>
            <h1 className="text-6xl md:text-9xl font-display font-extrabold leading-[0.85] mb-8 tracking-tighter">
              TRANSFORM <br />
              <span className="text-orange-accent orange-text-glow italic">YOUR BODY.</span> <br />
              TRANSFORM LIFE.
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
              Experience the most advanced fitness facility in Miami. Expert coaching, 
              cutting-edge equipment, and a community that pushes you further.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/join-club" className="group relative bg-orange-accent text-black px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 overflow-hidden transition-all hover:pr-10">
                <span className="relative z-10">JOIN THE CLUB</span>
                <ChevronRight className="w-5 h-5 transition-all group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-white translate-y-full transition-transform group-hover:translate-y-0" />
              </Link>
              
              <Link to="/free-trial" className="group bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 rounded-full bg-orange-accent flex items-center justify-center text-black">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                BOOK FREE TRIAL
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-xl"
          >
            <div>
              <div className="text-3xl font-display font-bold text-orange-accent">10k+</div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-orange-accent">50+</div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Expert Trainers</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-orange-accent">4.5</div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Google Rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[600px] h-[600px] bg-orange-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}

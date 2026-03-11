import { motion } from 'motion/react';
import { Calendar, Clock, Star, Users, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const benefits = [
  {
    title: "3-Day Full Access",
    desc: "Experience every corner of our facility, from the heavy weights to the cardio zone.",
    icon: Calendar
  },
  {
    title: "1-on-1 Intro Session",
    desc: "Meet with a pro coach for a 30-minute goal-setting and movement assessment.",
    icon: Users
  },
  {
    title: "Free Recovery Shake",
    desc: "Enjoy a premium post-workout protein shake after your first session.",
    icon: Sparkles
  }
];

export default function FreeTrial() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-orange-accent hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO HOME
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-accent/10 border border-orange-accent/20 text-orange-accent text-xs font-bold tracking-widest uppercase mb-6">
                No Credit Card Required
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6">
                TEST YOUR <span className="text-orange-accent">LIMITS.</span> <br />
                FOR FREE.
              </h1>
              <p className="text-xl text-white/60 mb-12 leading-relaxed">
                Not ready to commit? No problem. Get a taste of the RK Fitness lifestyle 
                with a complimentary 3-day trial pass.
              </p>

              <div className="grid gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-accent/20 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-accent/10 flex items-center justify-center text-orange-accent">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-orange-accent/20 blur-3xl rounded-full opacity-20" />
              <div className="relative glass-card p-10 border-orange-accent/30">
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex text-orange-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Trusted by 10k+ Members</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-8">Book Your Session</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-accent transition-colors" placeholder="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Phone Number</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-accent transition-colors" placeholder="+1 (305) 000-0000" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Preferred Time</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" className="bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-bold hover:border-orange-accent hover:text-orange-accent transition-all">Morning</button>
                      <button type="button" className="bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-bold hover:border-orange-accent hover:text-orange-accent transition-all">Evening</button>
                    </div>
                  </div>

                  <button className="w-full bg-orange-accent text-black py-4 rounded-xl font-bold text-lg hover:bg-white transition-all flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    RESERVE MY FREE PASS
                  </button>
                  
                  <p className="text-center text-white/30 text-xs mt-6 italic">
                    * Valid for first-time visitors only. Must be 18+ or with legal guardian.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { motion } from 'motion/react';
import { Check, Gift, Shield, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const offers = [
  {
    title: "Elite Welcome Package",
    items: ["Premium Gym Bag", "Stainless Steel Shaker", "RK Fitness Performance Tee"],
    icon: Gift
  },
  {
    title: "Member Privileges",
    items: ["24/7 Access", "Free Guest Passes", "Monthly Body Scans"],
    icon: Shield
  }
];

export default function JoinClub() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-orange-accent hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO HOME
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-accent/10 border border-orange-accent/20 text-orange-accent text-xs font-bold tracking-widest uppercase mb-6">
                Limited Time Membership Offer
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6">
                JOIN THE <span className="text-orange-accent">ELITE.</span>
              </h1>
              <p className="text-xl text-white/60 mb-12 leading-relaxed">
                Become a part of Miami's most exclusive fitness community. 
                Sign up today and receive our <span className="text-white font-bold">Ultimate Starter Kit</span> worth $150 for free.
              </p>

              <div className="space-y-8">
                {offers.map((offer, idx) => (
                  <div key={idx} className="glass-card p-8 border-orange-accent/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-orange-accent flex items-center justify-center text-black">
                        <offer.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold">{offer.title}</h3>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {offer.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/60">
                          <Check className="w-4 h-4 text-orange-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 border-orange-accent/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <Zap className="w-12 h-12 text-orange-accent/10" />
              </div>
              
              <h2 className="text-3xl font-bold mb-8">Membership Application</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">First Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-accent transition-colors" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Last Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-accent transition-colors" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-accent transition-colors" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Select Plan</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-accent transition-colors appearance-none">
                    <option className="bg-dark-surface">Pro Membership - $59/mo</option>
                    <option className="bg-dark-surface">Elite Membership - $99/mo</option>
                    <option className="bg-dark-surface">Basic Membership - $39/mo</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button className="w-full bg-orange-accent text-black py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-[0_0_30px_rgba(255,107,0,0.2)]">
                    CLAIM MY OFFER & JOIN
                  </button>
                  <p className="text-center text-white/30 text-xs mt-6">
                    By clicking join, you agree to our Terms of Service and Privacy Policy. 
                    No commitment, cancel anytime.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

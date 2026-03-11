import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-accent font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">START YOUR <br /><span className="text-orange-accent">JOURNEY TODAY.</span></h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Our Location</h4>
                  <p className="text-white/50">4619 NW 7th St, Miami, FL 33126, United States</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-orange-accent text-sm font-bold mt-2 flex items-center gap-1 hover:underline">
                    GET DIRECTIONS <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-accent">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                  <p className="text-white/50">+1 305-774-6774</p>
                  <p className="text-white/30 text-xs mt-1">Available during business hours</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-accent">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Business Hours</h4>
                  <p className="text-white/50">Mon - Fri: 06:00 AM - 10:00 PM</p>
                  <p className="text-white/50">Sat - Sun: 08:00 AM - 08:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-3xl overflow-hidden border border-white/10 h-64 relative">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                alt="Miami Fitness Scene" 
                className="w-full h-full object-cover opacity-50 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <div className="bg-dark-bg/80 border border-white/10 p-4 rounded-xl text-center">
                  <MapPin className="w-8 h-8 text-orange-accent mx-auto mb-2" />
                  <span className="text-sm font-bold">International Shopping Plaza</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Select Program</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors appearance-none">
                  <option className="bg-dark-bg">Strength Training</option>
                  <option className="bg-dark-bg">Cardio Excellence</option>
                  <option className="bg-dark-bg">Group Classes</option>
                  <option className="bg-dark-bg">Personal Coaching</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Your Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your fitness goals..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-accent transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-orange-accent text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all">
                SEND MESSAGE <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

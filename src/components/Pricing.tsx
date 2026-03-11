import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Monthly",
    price: "49",
    desc: "Perfect for casual gym-goers",
    features: [
      "24/7 Gym Access",
      "Locker Room Access",
      "Free Fitness Assessment",
      "Standard Equipment",
    ],
    popular: false
  },
  {
    name: "Annual",
    price: "39",
    desc: "Best value for dedicated members",
    features: [
      "All Monthly Features",
      "2 Free Personal Training Sessions",
      "Access to All Group Classes",
      "10% Discount on Supplements",
      "Priority Booking",
    ],
    popular: true
  },
  {
    name: "Quarterly",
    price: "45",
    desc: "Balanced commitment for results",
    features: [
      "All Monthly Features",
      "1 Free Personal Training Session",
      "Access to Group Classes",
      "Standard Equipment",
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-dark-surface relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-orange-accent font-bold tracking-widest uppercase text-sm mb-4 block">Pricing Plans</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">CHOOSE YOUR <span className="text-orange-accent">LEVEL.</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Choose the plan that fits your 
            lifestyle and start your transformation today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 rounded-3xl border transition-all duration-500 ${
                plan.popular 
                  ? 'bg-orange-accent text-black border-orange-accent scale-105 shadow-[0_0_40px_rgba(255,107,0,0.2)] z-20' 
                  : 'bg-dark-bg text-white border-white/5 hover:border-white/20 z-10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-black' : 'text-white'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold">$</span>
                  <span className="text-6xl font-display font-bold">{plan.price}</span>
                  <span className={`text-sm font-bold ${plan.popular ? 'text-black/60' : 'text-white/40'}`}>/month</span>
                </div>
                <p className={`text-sm mt-2 ${plan.popular ? 'text-black/70' : 'text-white/50'}`}>{plan.desc}</p>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-black text-orange-accent' : 'bg-orange-accent/20 text-orange-accent'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={`text-sm font-medium ${plan.popular ? 'text-black/80' : 'text-white/70'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/join-club" className={`w-full py-4 rounded-xl font-bold transition-all text-center block ${
                plan.popular 
                  ? 'bg-black text-white hover:bg-white hover:text-black' 
                  : 'bg-white/5 border border-white/10 hover:bg-orange-accent hover:text-black hover:border-orange-accent'
              }`}>
                GET STARTED
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


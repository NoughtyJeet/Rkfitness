import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Gift, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SubscriptionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already dismissed or subscribed
    const hasSeenPopup = localStorage.getItem('rk_popup_dismissed');
    
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('rk_popup_dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // For now, simply saving the lead to local storage just to simulate success if no Supabase table exists.
      // Ideally, you would create a 'leads' or 'subscribers' table in Supabase:
      // const { error } = await supabase.from('leads').insert([{ email }]);
      // if (error) throw error;
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess(true);
      localStorage.setItem('rk_popup_dismissed', 'true');
      
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 px-4 sm:px-6">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left side Image - hidden on small mobile, visible on medium and up */}
            <div className="hidden md:block md:w-5/12 relative bg-zinc-900 border-r border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800" 
                alt="Fitness Motivation" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-orange-accent" />
                  <span className="text-orange-accent text-sm font-bold uppercase tracking-wider">Secure & Spam-Free</span>
                </div>
                <p className="text-gray-300 text-sm italic">"The program completely transformed my approach to training. Can't recommend it enough."</p>
              </div>
            </div>

            {/* Right side form */}
            <div className="w-full md:w-7/12 p-8 md:p-10 relative">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-accent/10 rounded-full flex items-center justify-center border border-orange-accent/20">
                  <Gift className="w-8 h-8 text-orange-accent" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-wide">
                  Claim Your <span className="text-orange-accent">Free Trial</span>
                </h2>
                <p className="text-gray-400">
                  Join our VIP mailing list today and get a <strong className="text-white">free 3-day guest pass</strong> to experience the arena. Plus, exclusive workout tips.
                </p>
              </div>

              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 text-sm text-red-200 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                      {error}
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-accent transition-all pl-5"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-accent hover:bg-orange-600 text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-colors uppercase tracking-wider disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        Unlock Free Pass <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By subscribing, you agree to our Terms & Privacy Policy. No spam, ever.
                  </p>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                  <p className="text-green-200">
                    Check your inbox shortly for your exclusive trial pass and welcome kit.
                  </p>
                </motion.div>
              )}
            </div>
            
            {/* Decorative line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-accent to-red-500 md:hidden" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

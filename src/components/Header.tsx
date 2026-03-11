import { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { name: 'Home', href: '/#' },
  { name: 'About', href: '/#about' },
  { name: 'Programs', href: '/#programs' },
  { name: 'Trainers', href: '/#trainers' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Schedule', href: '/#schedule' },
  { name: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-bg/90 backdrop-blur-md border-bottom border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-orange-accent p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter">
              RK <span className="text-orange-accent">FITNESS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-orange-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white">Hi, {profile?.full_name || user.email?.split('@')[0]}</span>
                <button onClick={() => signOut()} className="text-sm font-medium text-white/70 hover:text-orange-accent transition-colors">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-white/70 hover:text-orange-accent transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-orange-accent text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-white transition-colors">
                  JOIN NOW
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-surface border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-white/70 hover:text-orange-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              {user ? (
                <>
                  <div className="py-2 text-sm font-medium text-white/70 border-t border-white/5">
                    Signed in as {profile?.full_name || user.email}
                  </div>
                  <button onClick={() => { signOut(); setIsOpen(false); }} className="block w-full text-left text-lg font-medium text-white/70 hover:text-red-400 transition-colors">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-white/70 hover:text-orange-accent transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full bg-orange-accent text-black py-3 rounded-xl font-bold hover:bg-white transition-colors text-center block mt-4">
                    JOIN NOW
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

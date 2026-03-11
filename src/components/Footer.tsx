import { Dumbbell, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark-bg pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-orange-accent p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-display font-bold tracking-tighter">
                RK <span className="text-orange-accent">FITNESS</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              The premier fitness destination in Miami. We provide the tools, 
              coaching, and community you need to reach your peak performance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-accent hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-accent hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-accent hover:text-black transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-accent hover:text-black transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/#' },
                { name: 'About Us', href: '/#about' },
                { name: 'Programs', href: '/#programs' },
                { name: 'Trainers', href: '/#trainers' },
                { name: 'Pricing', href: '/#pricing' },
                { name: 'Schedule', href: '/#schedule' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/40 hover:text-orange-accent transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-lg mb-6">Programs</h4>
            <ul className="space-y-4">
              {[
                { name: 'Strength Training', slug: 'strength-training' },
                { name: 'Cardio Excellence', slug: 'cardio-excellence' },
                { name: 'Group Classes', slug: 'group-classes' },
                { name: 'Functional Fitness', slug: 'functional-fitness' },
                { name: 'Personal Coaching', slug: 'personal-coaching' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={`/programs/${item.slug}`} className="text-white/40 hover:text-orange-accent transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-white/40 text-sm mb-6">
              Subscribe to get fitness tips, class updates, and special offers.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-accent transition-colors text-sm"
              />
              <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm hover:bg-orange-accent transition-all">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs">
            © 2026 RK Fitness Center. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs">Terms of Service</a>
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Trainers from './components/Trainers';
import Pricing from './components/Pricing';
import Schedule from './components/Schedule';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JoinClub from './pages/JoinClub';
import FreeTrial from './pages/FreeTrial';
import ProgramDetail from './pages/ProgramDetail';
import { Dumbbell } from 'lucide-react';

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Programs />
      <Trainers />
      <Pricing />
      <Schedule />
      
      {/* Gallery Section - Inline for simplicity */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-accent font-bold tracking-widest uppercase text-sm mb-4 block">Gallery</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">INSIDE THE <span className="text-orange-accent">ARENA.</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=400"
            ].map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden border border-white/5"
              >
                <img 
                  src={img} 
                  alt={`Gym Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Contact />
    </main>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <div className="relative">
        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-orange-accent z-[60] origin-left" 
          style={{ scaleX }}
        />

        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
              {/* Floating CTA for Mobile */}
              <div className="fixed bottom-6 right-6 z-40 md:hidden">
                <Link to="/join-club" className="bg-orange-accent text-black w-14 h-14 rounded-full shadow-2xl flex items-center justify-center animate-bounce">
                  <Dumbbell className="w-6 h-6" />
                </Link>
              </div>
            </>
          } />
          <Route path="/join-club" element={<JoinClub />} />
          <Route path="/free-trial" element={<FreeTrial />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
        </Routes>
      </div>
    </Router>
  );
}



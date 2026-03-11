import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Clock, Users, Trophy, Zap, Dumbbell, Heart, Timer } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const programDetails: Record<string, any> = {
  'strength-training': {
    title: "Strength Training",
    subtitle: "Build Raw Power & Muscle",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
    icon: Dumbbell,
    description: "Our Strength Training program is designed for those who want to push their physical limits. Whether you're looking to build massive muscle or functional strength, our expert coaches will guide you through progressive overload techniques and proper form.",
    benefits: [
      "Increased muscle mass and bone density",
      "Improved metabolic rate and fat loss",
      "Enhanced functional strength for daily life",
      "Better posture and injury prevention"
    ],
    features: [
      { title: "Expert Coaching", desc: "1-on-1 guidance on complex lifts like squats, deadlifts, and bench press.", icon: Users },
      { title: "Custom Programming", desc: "Periodized training blocks tailored to your specific strength goals.", icon: Trophy },
      { title: "Advanced Equipment", desc: "Access to competition-grade racks, bars, and specialized machines.", icon: Zap }
    ]
  },
  'cardio-excellence': {
    title: "Cardio Excellence",
    subtitle: "Boost Your Endurance",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=1200",
    icon: Heart,
    description: "Elevate your cardiovascular health with our Cardio Excellence program. We combine high-tech monitoring with varied training methods to improve your heart health, lung capacity, and overall stamina.",
    benefits: [
      "Improved heart and lung health",
      "Increased calorie burn and weight management",
      "Reduced stress and improved mental clarity",
      "Enhanced athletic performance in all sports"
    ],
    features: [
      { title: "Heart Rate Monitoring", desc: "Real-time data tracking to ensure you're in the optimal training zone.", icon: Timer },
      { title: "Varied Equipment", desc: "From assault bikes to curved treadmills and rowing machines.", icon: Zap },
      { title: "Endurance Coaching", desc: "Learn pacing strategies and breathing techniques from pros.", icon: Users }
    ]
  },
  'group-classes': {
    title: "Group Classes",
    subtitle: "Community-Driven Results",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200",
    icon: Users,
    description: "Join a high-energy environment where community meets competition. Our group classes are designed to be inclusive yet challenging, ensuring everyone from beginners to pros gets a world-class workout.",
    benefits: [
      "High motivation from a supportive community",
      "Varied workouts that keep you engaged",
      "Expert instruction in every single session",
      "Social connection and accountability"
    ],
    features: [
      { title: "Diverse Formats", desc: "Yoga, HIIT, Boxing, and Strength classes available daily.", icon: Zap },
      { title: "Elite Instructors", desc: "Our coaches are experts at managing groups while providing individual cues.", icon: Users },
      { title: "Dynamic Atmosphere", desc: "Premium sound systems and lighting to keep the energy high.", icon: Trophy }
    ]
  },
  'functional-fitness': {
    title: "Functional Fitness",
    subtitle: "Move Better, Live Better",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200",
    icon: Zap,
    description: "Functional fitness focuses on movements that mimic real-life activities. We train your muscles to work together and prepare them for daily tasks by simulating common movements you might do at home, at work, or in sports.",
    benefits: [
      "Improved balance and coordination",
      "Greater flexibility and range of motion",
      "Reduced risk of injury in daily activities",
      "Enhanced core stability and power"
    ],
    features: [
      { title: "Movement Assessment", desc: "We start with a screen to identify and fix movement imbalances.", icon: Users },
      { title: "Versatile Tools", desc: "Kettlebells, TRX, sandbags, and bodyweight training.", icon: Dumbbell },
      { title: "Real-World Prep", desc: "Workouts designed to make your everyday life easier and safer.", icon: Trophy }
    ]
  },
  'hiit-training': {
    title: "HIIT Training",
    subtitle: "Maximum Intensity, Maximum Results",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
    icon: Timer,
    description: "High-Intensity Interval Training (HIIT) is the most efficient way to burn fat and improve fitness. Our sessions are short, intense, and designed to keep your metabolism elevated for hours after you leave the gym.",
    benefits: [
      "Maximum calorie burn in minimum time",
      "Increased metabolic rate for up to 24 hours",
      "Improved aerobic and anaerobic fitness",
      "No equipment necessary (though we use the best)"
    ],
    features: [
      { title: "Interval Protocols", desc: "Tabata, EMOM, and AMRAP styles to keep your body guessing.", icon: Clock },
      { title: "Expert Pacing", desc: "Coaches ensure you push hard enough during work and recover during rest.", icon: Users },
      { title: "Rapid Progress", desc: "See measurable improvements in your fitness in just weeks.", icon: Zap }
    ]
  },
  'personal-coaching': {
    title: "Personal Coaching",
    subtitle: "Your Goals, Our Priority",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1200",
    icon: Trophy,
    description: "Our Personal Coaching is the gold standard of fitness. You'll work 1-on-1 with an elite trainer who will design every aspect of your fitness journey, from nutrition to recovery and specialized training blocks.",
    benefits: [
      "100% personalized training and nutrition plans",
      "Maximum accountability and motivation",
      "Expert technical feedback on every movement",
      "Faster, safer, and more sustainable results"
    ],
    features: [
      { title: "Bespoke Plans", desc: "No cookie-cutter routines. Everything is built for your unique body.", icon: Zap },
      { title: "Nutritional Guidance", desc: "Full macro and meal planning to fuel your performance.", icon: Heart },
      { title: "Lifestyle Integration", desc: "We help you manage sleep, stress, and recovery for total health.", icon: Clock }
    ]
  }
};

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = slug ? programDetails[slug] : null;

  if (!program) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Program Not Found</h1>
          <Link to="/" className="text-orange-accent hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const Icon = program.icon;

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/#programs" className="inline-flex items-center gap-2 text-orange-accent hover:text-white transition-colors mb-8 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                BACK TO PROGRAMS
              </Link>
              <h1 className="text-6xl md:text-8xl font-display font-extrabold leading-none mb-4">
                {program.title.split(' ')[0]} <br />
                <span className="text-orange-accent italic">{program.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-2xl text-white/80 font-medium tracking-wide uppercase">{program.subtitle}</p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-16">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-accent flex items-center justify-center text-black">
                      <Icon className="w-6 h-6" />
                    </div>
                    Overview
                  </h2>
                  <p className="text-xl text-white/60 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  {program.features.map((feature: any, idx: number) => (
                    <div key={idx} className="glass-card p-8 border-white/5 hover:border-orange-accent/20 transition-colors">
                      <feature.icon className="w-8 h-8 text-orange-accent mb-6" />
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar: Benefits & CTA */}
              <div className="space-y-8">
                <div className="glass-card p-8 border-orange-accent/20 bg-orange-accent/5">
                  <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
                  <ul className="space-y-4">
                    {program.benefits.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-orange-accent flex-shrink-0 mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card p-8 border-white/10 text-center">
                  <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
                  <p className="text-white/50 text-sm mb-8">
                    Join Miami's elite fitness community and transform your life today.
                  </p>
                  <Link 
                    to="/join-club" 
                    className="block w-full bg-orange-accent text-black py-4 rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(255,107,0,0.2)]"
                  >
                    JOIN THE CLUB
                  </Link>
                  <Link 
                    to="/free-trial" 
                    className="block w-full mt-4 border border-white/10 text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
                  >
                    BOOK FREE TRIAL
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

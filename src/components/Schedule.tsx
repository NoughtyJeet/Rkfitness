import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, User, MapPin } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const scheduleData: Record<string, any[]> = {
  Monday: [
    { time: "06:00 AM", class: "Crossfit", trainer: "Marcus T.", type: "High Intensity" },
    { time: "09:00 AM", class: "Body Pump", trainer: "David C.", type: "Strength" },
    { time: "12:00 PM", class: "Open Gym", trainer: "Staff", type: "General" },
    { time: "05:00 PM", class: "Boxing", trainer: "Marcus T.", type: "High Intensity" },
    { time: "07:00 PM", class: "Yoga", trainer: "Elena R.", type: "Mind & Body" },
  ],
  Tuesday: [
    { time: "06:00 AM", class: "Yoga", trainer: "Elena R.", type: "Mind & Body" },
    { time: "09:00 AM", class: "Cardio", trainer: "Elena R.", type: "High Intensity" },
    { time: "12:00 PM", class: "Open Gym", trainer: "Staff", type: "General" },
    { time: "05:00 PM", class: "Crossfit", trainer: "Marcus T.", type: "High Intensity" },
    { time: "07:00 PM", class: "Body Pump", trainer: "David C.", type: "Strength" },
  ],
  Wednesday: [
    { time: "06:00 AM", class: "Crossfit", trainer: "Marcus T.", type: "High Intensity" },
    { time: "09:00 AM", class: "Body Pump", trainer: "David C.", type: "Strength" },
    { time: "12:00 PM", class: "Open Gym", trainer: "Staff", type: "General" },
    { time: "05:00 PM", class: "Boxing", trainer: "Marcus T.", type: "High Intensity" },
    { time: "07:00 PM", class: "Yoga", trainer: "Elena R.", type: "Mind & Body" },
  ],
  Thursday: [
    { time: "06:00 AM", class: "Yoga", trainer: "Elena R.", type: "Mind & Body" },
    { time: "09:00 AM", class: "Cardio", trainer: "Elena R.", type: "High Intensity" },
    { time: "12:00 PM", class: "Open Gym", trainer: "Staff", type: "General" },
    { time: "05:00 PM", class: "Crossfit", trainer: "Marcus T.", type: "High Intensity" },
    { time: "07:00 PM", class: "Body Pump", trainer: "David C.", type: "Strength" },
  ],
  Friday: [
    { time: "06:00 AM", class: "Crossfit", trainer: "Marcus T.", type: "High Intensity" },
    { time: "09:00 AM", class: "Body Pump", trainer: "David C.", type: "Strength" },
    { time: "12:00 PM", class: "Open Gym", trainer: "Staff", type: "General" },
    { time: "05:00 PM", class: "Boxing", trainer: "Marcus T.", type: "High Intensity" },
    { time: "07:00 PM", class: "Yoga", trainer: "Elena R.", type: "Mind & Body" },
  ],
  Saturday: [
    { time: "06:00 AM", class: "Open Gym", trainer: "Staff", type: "General" },
    { time: "09:00 AM", class: "Zumba", trainer: "Elena R.", type: "High Intensity" },
    { time: "12:00 PM", class: "Open Gym", trainer: "Staff", type: "General" },
  ],
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Monday');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'High Intensity': return 'text-orange-accent bg-orange-accent/10 border-orange-accent/20';
      case 'Mind & Body': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Strength': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  return (
    <section id="schedule" className="py-24 bg-dark-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-accent font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Class Timetable
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            WEEKLY <span className="text-orange-accent">SCHEDULE.</span>
          </motion.h2>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border ${
                activeDay === day 
                  ? 'bg-orange-accent text-black border-orange-accent shadow-[0_0_20px_rgba(255,107,0,0.3)]' 
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
              }`}
            >
              {day.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {scheduleData[activeDay].map((item, idx) => (
                <div 
                  key={idx}
                  className="group glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-orange-accent/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-orange-accent group-hover:text-black transition-colors duration-500">
                      <Clock className="w-5 h-5 mb-1" />
                      <span className="text-xs font-bold">{item.time}</span>
                    </div>
                    <div>
                      <div className={`inline-block px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-3 ${getTypeColor(item.type)}`}>
                        {item.type}
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-orange-accent transition-colors">{item.class}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 md:border-l border-white/10 md:pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-orange-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Trainer</div>
                        <div className="font-bold text-sm">{item.trainer}</div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Location</div>
                        <div className="font-bold text-sm">Studio A</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


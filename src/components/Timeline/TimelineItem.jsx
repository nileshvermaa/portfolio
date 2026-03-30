import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, BookOpen, School, BadgeCheck, Laptop2 } from 'lucide-react';
import './TimelineItem.css';

const iconMap = {
  work: <Briefcase className="w-5 h-5" />,
  education: <BookOpen className="w-5 h-5" />,
  graduation: <GraduationCap className="w-5 h-5" />,
  internship: <Laptop2 className="w-5 h-5" />,
  school: <School className="w-5 h-5" />,
  achievement: <BadgeCheck className="w-5 h-5" />
};

const TimelineItem = ({ index, year, title, description, type = 'education' }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex items-center justify-between md:justify-normal w-full ${
        isEven ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Spacer for alternating layout on desktop */}
      <div className="hidden md:block w-1/2" />

      {/* Center glowing node */}
      <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-apple-dark border-4 border-[#1d1d1f] flex items-center justify-center transform -translate-x-1/2 z-10">
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
      </div>

      <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${
        isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
      }`}>
        <div className={`p-6 sm:p-8 rounded-3xl bg-[#1d1d1f]/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden ${
          isEven ? 'md:items-end' : 'md:items-start'
        } flex flex-col`}>
          
          {/* Subtle gradient flash on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="flex items-center gap-3 mb-4 text-white/50 group-hover:text-white transition-colors duration-300">
             {iconMap[type] || <BookOpen className="w-5 h-5" />}
             <span className="text-sm font-semibold font-mono tracking-wider">{year}</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-3">{title}</h3>
          <p className="text-apple-gray leading-relaxed text-[15px]">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;

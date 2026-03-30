import React from 'react';
import { motion } from 'framer-motion';
import TimelineItem from '../components/Timeline/TimelineItem';
import './Timeline.css';

const timelineData = [
  { year: '2025 - 2027', title: 'MBA in Progress – IIT Patna', description: 'Pursuing MBA at Indian Institute of Technology, Patna.', type: 'education' },
  { year: '2023 - Present', title: 'DevOps Engineer – Cloudframe', description: 'Leading deployments with Jenkins, Docker, and Azure.', type: 'work' },
  { year: '2019 - 2022', title: 'Graduated B.E. – NMIT Bengaluru', description: 'GPA 9.07 | Published a paper with Springer.', type: 'graduation' },
  { year: '2022 – 2023', title: 'Internship – CRIS (Railways)', description: 'Deployed Java-based applications under Govt. projects.', type: 'internship' },
  { year: '2017', title: 'Completed XII – CBSE', description: 'PCM-CS | Jagran Public School, Lucknow.', type: 'school' },
  { year: '2015', title: '10th Grade – CBSE', description: 'Perfect GPA: 10 | Jagran Public School, Lucknow.', type: 'school' }
];

const Timeline = () => {
  return (
    <div className="min-h-screen bg-apple-dark pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6"
          >
            My <span className="text-gradient">Journey.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-apple-gray font-medium"
          >
            The milestones that shape my engineering career.
          </motion.p>
        </div>

        {/* Central glowing timeline track */}
        <div className="absolute left-4 md:left-1/2 top-48 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

        <div className="flex flex-col gap-12 relative">
          {timelineData.map((item, index) => (
             <TimelineItem key={index} index={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

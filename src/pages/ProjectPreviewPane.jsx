import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

const ProjectPreviewPane = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-end">
      
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Side Drawer Modal */}
      <motion.div 
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full sm:w-[500px] h-[90vh] sm:h-full bg-[#111111] border-l border-white/10 shadow-2xl overflow-y-auto flex flex-col z-10"
      >
        <div className="sticky top-0 right-0 z-20 flex justify-end p-6 bg-gradient-to-b from-[#111111] to-transparent">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pb-12 flex-1">
          <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-8 relative border border-white/5">
             <div className="absolute inset-0 bg-black/30 z-10" />
             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {project.title}
          </h2>
          <p className="text-apple-gray leading-relaxed mb-8">
            {project.details}
          </p>

          <div className="space-y-4 mb-10">
            {project.accordionItems?.map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {item.title}
                </h4>
                <p className="text-sm text-apple-gray leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-white/10 bg-[#111111] p-6 flex gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-white text-black py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            {project.link.includes('github') ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
            View Source
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectPreviewPane;

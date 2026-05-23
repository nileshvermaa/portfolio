import React from 'react';
import { motion } from 'framer-motion';
import { useSeoMeta } from '../hooks/useSeoMeta';

const Terms = () => {
  useSeoMeta({ title: 'Terms', description: 'Terms and conditions for NILESH.SYS.', path: '/terms' });
  return (
    <div className="min-h-screen bg-apple-dark pt-32 pb-24 px-6 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-apple-gray font-medium">Please review these terms.</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-apple-gray">
          <p className="lead text-white/90">
             By accessing this portfolio, you agree to comply with and be bound by the following terms and conditions of use, which govern our relationship with you in relation to this website.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Usage</h2>
          <p>
            This website is for personal and educational use only. Unauthorized use, reproduction, or redistribution of the provided code, assets, or personal imagery is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Disclaimer</h2>
          <p>
            All content is provided "as is" with no warranties, expressed or implied. We explicitly reserve the right to update or modify content without prior notice. 
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
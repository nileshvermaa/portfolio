import React from 'react';
import { motion } from 'framer-motion';
import { useSeoMeta } from '../hooks/useSeoMeta';

const Privacy = () => {
  useSeoMeta({ title: 'Privacy', description: 'Privacy policy for NILESH.SYS.', path: '/privacy' });
  return (
    <div className="min-h-screen bg-apple-dark pt-32 pb-24 px-6 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-apple-gray font-medium">Effective Date: Today</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-apple-gray">
          <p className="lead text-white/90">
            We value your privacy and are committed to protecting your personal data. This privacy policy outlines the types of information we collect and how we use, disclose, and protect that information.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and any other details submitted via forms within this application. All data collected is stored securely.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">How We Use Your Information</h2>
          <p>
            The information is used solely to improve our services, communicate updates, and ensure the best customized user experience possible. We do not sell or rent your personal data to third parties under any circumstances.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
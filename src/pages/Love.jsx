import React from 'react';
import { motion } from 'framer-motion';
import loveImage from '../assets/LOVE.png'; // Ensure image exists

const Love = () => {
  return (
    <div className="min-h-screen bg-apple-dark pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-rose-400">Cutu</span>.
          </h1>
          <h2 className="text-xl md:text-2xl text-apple-gray font-medium">
            You are the reason I smile brighter.
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1d1d1f]/60 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-14 shadow-2xl overflow-hidden relative"
        >
          {/* Subtle warm glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 blur-[100px] pointer-events-none" />

          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 border border-white/5 relative z-10">
            <img 
              src={loveImage} 
              alt="My Love" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop"; }}
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-apple-gray relative z-10">
            <p className="text-xl leading-relaxed text-white/90 font-medium mb-10">
              From the moment I met you, I’ve known there was something truly special about you — a magic that radiates far beyond just beauty. Every day, you show me what real love looks like. 💖
            </p>

            <p className="mb-6">Here's everything that makes you unforgettable:</p>

            <ul className="space-y-6 mb-12 list-none p-0">
              <li className="flex gap-4">
                <span className="text-2xl">🌟</span>
                <div>
                  <strong className="text-white">Radiant Confidence:</strong> Watching you dance is like watching joy in its purest form. You inspire everyone to dream bigger and smile wider.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">🤗</span>
                <div><strong className="text-white">Unwavering Kindness:</strong> Your heart is open to everyone — your empathy turns ordinary days into beautiful memories.</div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">🕊️</span>
                <div><strong className="text-white">Healing Light:</strong> Whether it's through a scolding or a hug, you always find a way to bring me back to myself when I’m lost.</div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">🌸</span>
                <div><strong className="text-white">Innocent Joy:</strong> You see magic in the little things — your laughter, your curiosity, your silly moments... they melt my heart.</div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">💪</span>
                <div><strong className="text-white">Strength & Wisdom:</strong> No matter what life throws at you, you rise — with grace, with patience, and with unmatched elegance.</div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">❤️</span>
                <div><strong className="text-white">Deepest Love:</strong> You love with all your soul — in a way that sees the real me and loves me more for it.</div>
              </li>
            </ul>

            <div className="pt-8 border-t border-white/10 text-center">
              <p className="text-xl mb-6">
                <strong className="text-white">Pragati</strong>, you are not just special — <strong className="text-white">you are extraordinary</strong>. ✨ You’ve brought light, meaning, and magic into my life in ways I never imagined.
              </p>
              <p className="text-lg">
                Thank you for being my sunshine, my safe place, my most beautiful person inside and out. ☀️💫<br/>
                I admire you endlessly and love you more than words can ever say. 💌
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Love;

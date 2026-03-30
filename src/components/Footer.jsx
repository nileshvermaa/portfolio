import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Loader2 } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [isOracleOpen, setIsOracleOpen] = useState(false);
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const consultOracle = async () => {
    setIsOracleOpen(true);
    setLoading(true);
    try {
      // The Advice Slip API occasionally caches aggressively on the same endpoint, adding a cache-busting timestamp
      const res = await fetch(`https://api.adviceslip.com/advice?t=${new Date().getTime()}`);
      const data = await res.json();
      setAdvice(data.slip.advice);
    } catch (err) {
      setAdvice("Even the Oracle is silent sometimes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer className="border-t border-white/10 bg-[#1d1d1f] flex flex-col items-center justify-center py-10 px-6 relative z-10">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-apple-gray font-medium text-sm">
            © {new Date().getFullYear()} Nilesh Verma. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm font-medium text-apple-gray hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm font-medium text-apple-gray hover:text-white transition-colors">Terms</Link>


            {/* Oracle Button */}
            <button
              onClick={consultOracle}
              className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full overflow-hidden hover:bg-white/10 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Consult Oracle</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Oracle Modal */}
      <AnimatePresence>
        {isOracleOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOracleOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="relative w-full max-w-lg bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col items-center text-center"
            >
              {/* Magical Glow */}
              <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none" />

              <button
                onClick={() => setIsOracleOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 border border-yellow-400/20">
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">The Oracle Speaks</h3>

              <div className="mt-6 min-h-[80px] flex items-center justify-center w-full">
                {loading ? (
                  <Loader2 className="w-8 h-8 text-apple-gray animate-spin" />
                ) : (
                  <p className="text-xl md:text-2xl font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
                    "{advice}"
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;

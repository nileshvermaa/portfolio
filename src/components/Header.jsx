import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const links = [
    { path: '/', name: 'Bio' },
    { path: '/timeline', name: 'Journey' },
    { path: '/projects', name: 'Projects' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav py-3">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tighter text-white hover:text-white/80 transition-colors">
          NV
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors relative ${
                activeLink === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              {activeLink === link.path && (
                <motion.div 
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-px bg-white"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <a 
          href="/contact" 
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        >
          Contact
        </a>
      </div>
    </header>
  );
};

export default Header;

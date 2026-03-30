import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, Terminal, Code, Cpu, Layers } from 'lucide-react';
import { SiC, SiCplusplus, SiJenkins, SiJavascript, SiPython, SiDocker, SiKubernetes, SiReact } from 'react-icons/si';
import profilePic from '../assets/profile-placeholder.png'; // Verify if it exists, otherwise keep it as an import

// Scroll-Triggered Typography Component
const ScrollRevealText = ({ text }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <div ref={container} className="py-32 md:py-48 max-w-5xl mx-auto px-6">
      <p className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white flex flex-wrap gap-x-[0.5em] gap-y-[0.2em]">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
          return (
            <motion.span key={i} style={{ opacity }} className="relative">
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
};

const HomePage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Fetch top 4 repos for nileshcf
    const fetchGithubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/nileshcf/repos?sort=updated&per_page=4');
        const data = await response.json();
        setRepos(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load generic data", err);
        setLoading(false);
      }
    };
    fetchGithubData();
  }, []);

  return (
    <div className="min-h-screen bg-apple-dark overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#1d1d1f] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
            alt="Cyber technology circuit background" 
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
              Engineering <br />
              <span className="text-gradient">The Extraordinary.</span>
            </h1>
            <p className="text-xl md:text-2xl text-apple-gray font-medium max-w-2xl mx-auto -tracking-wide">
              DevOps Engineer • Cloud Enthusiast • Full-Stack Explorer
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scroll Reveal Text */}
      <ScrollRevealText text="I bridge the gap between development and operations through elegant infrastructure, building robust automated systems that scale effortlessly." />

      {/* Bento Box Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Recent Work. <span className="text-apple-gray">Live Data.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Bento Card 1: Bio */}
          <div className="bento-card p-8 md:col-span-2 row-span-2 group">
             <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 mb-6">
                    <img 
                      src={profilePic} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1531297172867-4f54130026e6?w=400&auto=format&fit=crop&q=80"; }}
                      alt="Profile" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Nilesh Verma</h3>
                  <p className="text-apple-gray leading-relaxed text-lg max-w-md">
                    Passionate about building reliable, scalable, and automated systems with a strong foundation in Java programming and modern infrastructure.
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                   <a href="/NileshResume.pdf" download className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                      Download Resume
                   </a>
                   <a href="https://github.com/nileshcf" target="_blank" rel="noreferrer" className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors">
                      GitHub
                   </a>
                </div>
             </div>
          </div>

          {/* Bento Card 2: Skills Grid */}
          <div className="bento-card p-6 md:row-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-[#1d1d1f] to-black">
             <h3 className="text-xl font-bold text-white mb-8 tracking-tight self-start w-full">Tech Stack</h3>
             <div className="grid grid-cols-3 gap-6 w-full place-items-center opacity-80">
                <SiKubernetes className="text-4xl text-white transition-transform hover:scale-110" />
                <SiDocker className="text-4xl text-white transition-transform hover:scale-110" />
                <SiJenkins className="text-4xl text-white transition-transform hover:scale-110" />
                <SiReact className="text-4xl text-white transition-transform hover:scale-110" />
                <SiPython className="text-4xl text-white transition-transform hover:scale-110" />
                <SiJavascript className="text-4xl text-white transition-transform hover:scale-110" />
                <SiCplusplus className="text-4xl text-white transition-transform hover:scale-110" />
                <Terminal className="text-4xl text-white transition-transform hover:scale-110" />
                <Layers className="text-4xl text-white transition-transform hover:scale-110" />
             </div>
          </div>

          {/* Dynamic API Bento Cards (GitHub Repos) */}
          {loading ? (
             <>
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="bento-card p-6 animate-pulse">
                   <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
                   <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                   <div className="h-4 bg-white/5 rounded w-3/4"></div>
                 </div>
               ))}
             </>
          ) : (
             repos.slice(0, 3).map((repo) => (
               <a 
                 key={repo.id} 
                 href={repo.html_url} 
                 target="_blank" 
                 rel="noreferrer"
                 className="bento-card p-6 hover:bg-white/[0.03] transition-colors flex flex-col justify-between group"
               >
                 <div>
                   <div className="flex justify-between items-start mb-4">
                     <Github className="text-apple-gray group-hover:text-white transition-colors" />
                     <ExternalLink className="w-4 h-4 text-apple-gray opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2 truncate">{repo.name}</h3>
                   <p className="text-sm text-apple-gray line-clamp-2">
                     {repo.description || "No description provided for this repository."}
                   </p>
                 </div>
                 <div className="mt-4 flex items-center gap-3 text-xs font-mono text-apple-gray">
                   {repo.language && (
                     <span className="flex items-center gap-1">
                       <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                       {repo.language}
                     </span>
                   )}
                   <span>⭐ {repo.stargazers_count}</span>
                 </div>
               </a>
             ))
          )}
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;

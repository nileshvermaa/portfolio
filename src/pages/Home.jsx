import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, Terminal, Layers, TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';
import { SiCplusplus, SiJenkins, SiJavascript, SiPython, SiDocker, SiKubernetes, SiReact } from 'react-icons/si';
import profilePic from '../assets/profile-placeholder.png'; // Verify if it exists

// Scroll-Triggered Typography Component
const ScrollRevealText = ({ text }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start 80%", "end 50%"] });
  const words = text.split(" ");
  return (
    <div ref={container} className="py-32 md:py-48 max-w-5xl mx-auto px-6">
      <p className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white flex flex-wrap gap-x-[0.5em] gap-y-[0.2em]">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
          return <motion.span key={i} style={{ opacity }} className="relative">{word}</motion.span>;
        })}
      </p>
    </div>
  );
};

const HomePage = () => {
  // States
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  const [cryptoData, setCryptoData] = useState(null);
  const [loadingCrypto, setLoadingCrypto] = useState(true);

  const [apod, setApod] = useState(null);

  // Scroll logic for Hero
  const { scrollYProgress: heroScroll } = useScroll();
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  // Scroll logic for NASA Parallax
  const nasaRef = useRef(null);
  const { scrollYProgress: nasaScroll } = useScroll({ target: nasaRef, offset: ["start end", "end start"] });
  const nasaY = useTransform(nasaScroll, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    // 1. Fetch GitHub
    fetch('https://api.github.com/users/nileshcf/repos?sort=updated&per_page=2')
      .then(res => res.json())
      .then(data => { setRepos(data); setLoadingRepos(false); })
      .catch(() => setLoadingRepos(false));

    // 2. Fetch CoinGecko
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true')
      .then(res => res.json())
      .then(data => { setCryptoData(data); setLoadingCrypto(false); })
      .catch(() => setLoadingCrypto(false));

    // 3. Fetch NASA APOD
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(res => res.json())
      .then(data => setApod(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-apple-dark overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
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

          {/* Bento Card 2: Live Crypto Tracker */}
          <div className="bento-card p-6 flex flex-col justify-between group">
             <div className="flex items-center gap-2 mb-4">
               <Bitcoin className="text-yellow-500" />
               <h3 className="text-lg font-bold text-white tracking-tight">Live Market</h3>
             </div>
             
             {loadingCrypto ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-white/10 rounded w-full"></div>
                  <div className="h-12 bg-white/10 rounded w-full"></div>
                </div>
             ) : cryptoData ? (
                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  {Object.entries(cryptoData).map(([coin, data]) => {
                    const isUp = data.usd_24h_change > 0;
                    return (
                      <div key={coin} className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                        <div>
                          <p className="text-sm text-apple-gray font-medium capitalize">{coin}</p>
                          <p className="text-white font-mono font-bold">${data.usd.toLocaleString()}</p>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                          {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {Math.abs(data.usd_24h_change).toFixed(2)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
             ) : (
                <p className="text-apple-gray text-sm">Failed to load market data.</p>
             )}
          </div>

          {/* Github Repo Cards (Fetch 2) */}
          {loadingRepos ? (
             <>
               {[...Array(2)].map((_, i) => (
                 <div key={i} className="bento-card p-6 animate-pulse">
                   <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
                   <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                   <div className="h-4 bg-white/5 rounded w-3/4"></div>
                 </div>
               ))}
             </>
          ) : (
             repos.slice(0, 2).map((repo) => (
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
                     {repo.description || "No description provided."}
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

          {/* Bento Card: Skills Grid */}
          <div className="bento-card p-6 md:col-span-3 flex flex-col items-center justify-center bg-gradient-to-br from-[#1d1d1f] to-black">
             <div className="w-full flex items-center justify-between mb-8 overflow-hidden">
               <h3 className="text-xl font-bold text-white tracking-tight z-10">Tech Stack</h3>
               <div className="h-px bg-white/10 flex-1 ml-6" />
             </div>
             <div className="flex flex-wrap gap-8 w-full justify-center opacity-80">
                <SiKubernetes className="text-5xl text-white transition-transform hover:scale-110" />
                <SiDocker className="text-5xl text-white transition-transform hover:scale-110" />
                <SiJenkins className="text-5xl text-white transition-transform hover:scale-110" />
                <SiReact className="text-5xl text-white transition-transform hover:scale-110" />
                <SiPython className="text-5xl text-white transition-transform hover:scale-110" />
                <SiJavascript className="text-5xl text-white transition-transform hover:scale-110" />
                <SiCplusplus className="text-5xl text-white transition-transform hover:scale-110" />
                <Terminal className="text-5xl text-white transition-transform hover:scale-110" />
                <Layers className="text-5xl text-white transition-transform hover:scale-110" />
             </div>
          </div>

        </div>
      </section>

      {/* NASA APOD Parallax Explorer Section */}
      <section ref={nasaRef} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden border-t border-white/5 my-24">
        {apod ? (
          <>
            <motion.div style={{ y: nasaY }} className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] via-black/60 to-[#1d1d1f] z-10" />
              <img 
                src={apod.hdurl || apod.url} 
                alt={apod.title} 
                className="w-full h-full object-cover scale-125 saturate-150"
              />
            </motion.div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/10"
              >
                <p className="text-sm md:text-base font-semibold text-blue-400 tracking-widest uppercase mb-4">Astronomy Picture Of The Day</p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                  {apod.title}
                </h2>
                <p className="text-sm md:text-base text-apple-gray font-medium max-w-2xl mx-auto leading-relaxed line-clamp-4">
                  {apod.explanation}
                </p>
                <p className="mt-8 text-xs text-apple-gray/60 font-mono">Powered by NASA Open APIs</p>
              </motion.div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-apple-gray">
             <div className="w-10 h-10 border-4 border-white/10 border-t-white/80 rounded-full animate-spin mb-4" />
             <p>Establishing uplink to Cosmos...</p>
          </div>
        )}
      </section>

    </div>
  );
};

export default HomePage;

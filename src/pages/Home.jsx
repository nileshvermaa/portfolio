import React, { useEffect, useState } from "react";
import { Github, ExternalLink, TrendingUp, TrendingDown, Download } from "lucide-react";
import { SiKubernetes, SiDocker, SiJenkins, SiReact, SiPython, SiAmazon, SiGooglecloud, SiTerraform } from "react-icons/si";
import BeveledPanel from "../components/ui/BeveledPanel";
import BlinkingCursor from "../components/ui/BlinkingCursor";
import WinampWidget from "../components/ui/WinampWidget";
import { useTypewriter } from "../hooks/useTypewriter";
import { currently } from "../content/currently";
import { skills } from "../content/skills";
import Terminal from "../components/terminal/Terminal";
import { useSeoMeta } from "../hooks/useSeoMeta";
import profilePhoto from "../assets/Photo.jpeg";

const VISITOR_KEY = "nilesh.sys.visitor";

// ASCII art — ANSI Shadow style (Unicode box-drawing chars, monospace)
const ASCII_NAME = `
 ███╗   ██╗██╗██╗     ███████╗███████╗██╗  ██╗
 ████╗  ██║██║██║     ██╔════╝██╔════╝██║  ██║
 ██╔██╗ ██║██║██║     █████╗  ███████╗███████║
 ██║╚██╗██║██║██║     ██╔══╝  ╚════██║██╔══██║
 ██║ ╚████║██║███████╗███████╗███████║██║  ██║
 ╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝

 ██╗   ██╗███████╗██████╗ ███╗   ███╗ █████╗
 ██║   ██║██╔════╝██╔══██╗████╗ ████║██╔══██╗
 ██║   ██║█████╗  ██████╔╝██╔████╔██║███████║
 ╚██╗ ██╔╝██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══██║
  ╚████╔╝ ███████╗██║  ██║██║ ╚═╝ ██║██║  ██║
   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝`;

const TAGLINE =
  "> Hi, I'm Nilesh — Cloud Specialist & Solutions Architect at Niveus Solutions.";

const INTRO =
  "Passionate about designing scalable cloud architectures that solve real business problems. " +
  "I bridge the gap between infrastructure engineering and solutions architecture — " +
  "turning complex multi-cloud requirements into elegant, cost-optimized, production-grade systems. " +
  "Currently helping Niveus Solutions deliver cloud transformation for enterprise customers.";

const SKILL_ICONS = {
  "aws.sh": SiAmazon,
  "gcp.sh": SiGooglecloud,
  "kubernetes.ko": SiKubernetes,
  "docker.sock": SiDocker,
  "terraform.tf": SiTerraform,
  "jenkins.groovy": SiJenkins,
  "react.jsx": SiReact,
  "python.py": SiPython,
};

const SkillRow = ({ name, size, perms }) => {
  const Icon = SKILL_ICONS[name];
  const date = "May 23 00:00";
  return (
    <div className="flex items-center gap-2 py-[2px] hover:bg-retro-chrome hover:text-retro-chrome-fg px-1 font-mono text-xs sm:text-sm">
      <span className="text-retro-fg-dim shrink-0">{perms}</span>
      <span className="text-retro-fg-dim shrink-0 w-6">1</span>
      <span className="text-retro-accent shrink-0">nilesh</span>
      <span className="text-retro-fg-dim shrink-0">cloud</span>
      <span className="text-retro-fg-dim shrink-0 w-10 text-right">{size}</span>
      <span className="text-retro-fg-dim shrink-0">{date}</span>
      {Icon && <Icon className="shrink-0 w-3 h-3" aria-hidden="true" />}
      <span className="text-retro-fg">{name}</span>
    </div>
  );
};

const CurrentlyWidget = () => (
  <div className="font-mono text-sm space-y-1">
    {[
      ["📖", "reading", currently.reading],
      ["🎓", "learning", currently.learning],
      ["🔧", "building", currently.building],
      ["🎵", "listening", currently.listening],
      ["📍", "location", currently.location],
    ].map(([icon, key, val]) => (
      <div key={key} className="flex gap-2">
        <span aria-hidden>{icon}</span>
        <span className="text-retro-fg-dim">{key}:</span>
        <span className="text-retro-fg flex-1">{val}</span>
      </div>
    ))}
  </div>
);

const CryptoTicker = ({ data, loading }) => {
  if (loading)
    return (
      <div className="text-retro-fg-dim font-mono text-sm">
        Fetching market data<BlinkingCursor />
      </div>
    );
  if (!data)
    return (
      <div className="text-retro-fg-dim font-mono text-sm">
        [ERR] Connection refused: api.coingecko.com:443
      </div>
    );
  return (
    <div className="space-y-2">
      {Object.entries(data).map(([coin, d]) => {
        const up = d.usd_24h_change > 0;
        return (
          <div
            key={coin}
            className="bevel-in flex justify-between items-center px-2 py-1 font-mono text-sm"
          >
            <span className="text-retro-fg capitalize">{coin}</span>
            <span className="text-retro-fg font-bold">
              ${d.usd.toLocaleString()}
            </span>
            <span
              style={{ color: up ? "#00ff88" : "#ff4444" }}
              className="flex items-center gap-1 text-xs"
            >
              {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(d.usd_24h_change).toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

const GithubRepos = ({ repos, loading }) => {
  if (loading)
    return (
      <div className="text-retro-fg-dim font-mono text-sm">
        $ git fetch github<BlinkingCursor />
      </div>
    );
  return (
    <div className="space-y-2">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="bevel-out block p-2 no-underline hover:bg-retro-chrome hover:text-retro-chrome-fg"
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-2 items-center">
              <Github className="w-3 h-3 shrink-0" aria-hidden />
              <span className="font-mono text-sm font-bold text-retro-fg">
                {repo.name}
              </span>
            </div>
            <ExternalLink className="w-3 h-3 shrink-0 text-retro-fg-dim" aria-hidden />
          </div>
          {repo.description && (
            <p className="text-retro-fg-dim font-mono text-xs mt-1 line-clamp-2">
              {repo.description}
            </p>
          )}
          <div className="flex gap-3 mt-1 font-mono text-xs text-retro-fg-dim">
            {repo.language && <span>● {repo.language}</span>}
            <span>⭐ {repo.stargazers_count}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

/* Plain-language heading shown inside a retro panel — the "clarity layer"
   that sits alongside the terminal-style window titles and command lines. */
const SectionHeading = ({ children, sub }) => (
  <div className="mb-2">
    <h2 className="font-sys text-retro-accent text-base sm:text-lg font-bold tracking-wide">
      {children}
    </h2>
    {sub && (
      <p className="text-retro-fg-dim text-xs font-mono mt-0.5">{sub}</p>
    )}
  </div>
);

const HomePage = () => {
  useSeoMeta({
    title: "Home",
    description: "Nilesh Verma — Cloud Specialist / Solutions Architect at Niveus Solutions. Specialising in AWS, GCP, Azure, Kubernetes, and Terraform.",
    path: "/",
  });
  const [bootDone] = useState(() => {
    try { return localStorage.getItem("nilesh.sys.booted") === "1"; }
    catch { return true; }
  });
  const [visitorCount, setVisitorCount] = useState(null);
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [crypto, setCrypto] = useState(null);
  const [cryptoLoading, setCryptoLoading] = useState(true);

  // Typewriter hook — starts only after boot sequence completes
  const { displayed: taglineText } = useTypewriter(TAGLINE, {
    speed: 22,
    startDelay: 200,
    enabled: bootDone,
  });
  const { displayed: introText, done: introDone } = useTypewriter(INTRO, {
    speed: 12,
    startDelay: bootDone ? 400 : 0,
    enabled: bootDone,
  });

  useEffect(() => {
    // Read visitor count written by Sidebar
    const t = setTimeout(() => {
      try {
        const n = parseInt(localStorage.getItem(VISITOR_KEY) || "0", 10);
        setVisitorCount(n || 41328);
      } catch { setVisitorCount(41328); }
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/users/nileshvermaa/repos?sort=updated&per_page=4")
      .then((r) => r.json())
      .then((d) => { setRepos(Array.isArray(d) ? d : []); setReposLoading(false); })
      .catch(() => setReposLoading(false));

    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
    )
      .then((r) => r.json())
      .then((d) => { setCrypto(d); setCryptoLoading(false); })
      .catch(() => setCryptoLoading(false));
  }, []);

  return (
    <div className="space-y-4 py-2">
      {/* ── ASCII Banner Hero ── */}
      <BeveledPanel
        title="nilesh.sys — v4.0.1-stable"
        className="overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* ── Left: ASCII + tagline + buttons ── */}
          <div className="flex-1 min-w-0">
            <div className="overflow-x-auto">
              <pre
                className="ascii text-retro-accent retro-flicker m-0"
                style={{ fontSize: "clamp(7px, 1.1vw, 13px)", lineHeight: 1.15 }}
                aria-label="ASCII art: Nilesh Verma"
              >
                {ASCII_NAME}
              </pre>
            </div>

            {/* Tagline */}
            <div className="mt-3 font-mono text-retro-fg text-sm sm:text-base min-h-[1.5em]">
              {taglineText || (bootDone ? "" : "")}
              {taglineText.length < TAGLINE.length && bootDone && (
                <BlinkingCursor />
              )}
            </div>

            {/* Visitor counter + buttons */}
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="bevel-in px-3 py-1 font-mono text-sm">
                <span className="text-retro-fg-dim">visitor# </span>
                <span className="text-retro-accent font-bold">
                  {visitorCount != null
                    ? String(visitorCount).padStart(7, "0")
                    : "░░░░░░░"}
                </span>
              </div>
              <a
                href="/NileshResume.pdf"
                download
                className="bevel-out px-3 py-1 font-mono text-xs no-underline text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg flex items-center gap-2"
              >
                <Download className="w-3 h-3" aria-hidden />
                Download Résumé
              </a>
              <a
                href="https://github.com/nileshvermaa"
                target="_blank"
                rel="noreferrer"
                className="bevel-out px-3 py-1 font-mono text-xs no-underline text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg flex items-center gap-2"
              >
                <Github className="w-3 h-3" aria-hidden />
                GitHub Profile
              </a>
            </div>
          </div>

          {/* ── Right: profile photo ── */}
          <div className="flex-shrink-0">
            <div className="bevel-out p-1" style={{ display: "inline-block" }}>
              <div className="font-mono text-xs text-center px-1 py-0.5 bg-retro-chrome text-retro-chrome-fg mb-1">
                nilesh.jpg
              </div>
              <img
                src={profilePhoto}
                alt="Nilesh Verma"
                style={{
                  width: 140,
                  height: 160,
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: "contrast(1.05)",
                }}
              />
              <div className="font-mono text-xs text-center text-retro-fg-dim mt-1">
                1 file · 140×160
              </div>
            </div>
          </div>
        </div>
      </BeveledPanel>

      {/* ── About ── */}
      <BeveledPanel title="about.txt">
        <SectionHeading sub="$ cat about.txt">About Me</SectionHeading>
        <div className="font-mono text-sm">
          <p className="text-retro-fg leading-relaxed min-h-[4em]">
            {introText}
            {!introDone && bootDone && <BlinkingCursor />}
          </p>
        </div>
      </BeveledPanel>

      {/* ── Currently + Winamp ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BeveledPanel title="currently.log">
          <SectionHeading sub="what I'm up to right now">Currently</SectionHeading>
          <CurrentlyWidget />
        </BeveledPanel>

        <BeveledPanel title="winamp.exe" bodyClassName="">
          <SectionHeading sub="optional — off by default, click ▶ to play">
            Now Playing — Radio
          </SectionHeading>
          <div className="flex justify-center">
            <WinampWidget />
          </div>
        </BeveledPanel>
      </div>

      {/* ── GitHub Repos ── */}
      <BeveledPanel title="github_repos.sh">
        <SectionHeading sub="$ git ls-remote github.com/nileshvermaa">
          Latest from GitHub
        </SectionHeading>
        <GithubRepos repos={repos} loading={reposLoading} />
      </BeveledPanel>

      {/* ── Skills ── */}
      <BeveledPanel title="skills.d — ls -la /skills/">
        <SectionHeading sub="$ ls -la /home/nilesh/skills/">
          Skills &amp; Tools
        </SectionHeading>
        <div className="font-mono text-xs text-retro-fg-dim mb-2">
          total {skills.length * 8}
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[520px]">
            <div className="flex gap-2 px-1 pb-1 border-b-2 border-retro-border-dark font-mono text-xs text-retro-fg-dim">
              <span className="w-28">perms</span>
              <span className="w-4">ln</span>
              <span className="w-12">owner</span>
              <span className="w-10">group</span>
              <span className="w-10 text-right">size</span>
              <span className="w-24">date</span>
              <span>name</span>
            </div>
            {skills.map((s) => (
              <SkillRow key={s.name} {...s} />
            ))}
          </div>
        </div>
      </BeveledPanel>

      {/* ── Live Market ── */}
      <BeveledPanel title="live_market.dat">
        <SectionHeading sub="$ curl api.coingecko.com — a little live data, just for fun">
          Live Market
        </SectionHeading>
        <CryptoTicker data={crypto} loading={cryptoLoading} />
      </BeveledPanel>

      {/* ── Interactive Terminal ── */}
      <BeveledPanel title="terminal.sh — interactive shell">
        <SectionHeading sub="New here? Type “help” and press Enter to explore. (Totally optional!)">
          Interactive Terminal
        </SectionHeading>
        <Terminal height={460} />
      </BeveledPanel>
    </div>
  );
};

export default HomePage;

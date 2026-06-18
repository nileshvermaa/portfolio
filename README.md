<div align="center">

# ◼ NILESH.SYS — Portfolio v4.0.1

[![CI](https://github.com/nileshvermaa/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/nileshvermaa/portfolio/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/badge/deployed-Vercel-000000?logo=vercel&logoColor=white)](https://nileshvermaaresume.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DBFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ff00)](./LICENSE)

**Retro hacker-aesthetic personal portfolio of [Nilesh Verma](https://nileshvermaaresume.vercel.app/) — Cloud Specialist / Solutions Architect @ Niveus Solutions.**

[**🌐 Live Demo →**](https://nileshvermaaresume.vercel.app/)

</div>

---

## ✨ Features

| Category | Details |
|---|---|
| 🎨 **Themes** | Terminal (green), Amber, Monochrome (B&W), Win95 — persisted in localStorage |
| 🖥️ **Effects** | CRT scanlines, vignette, Matrix rain (Konami code), synthwave perspective grid |
| 📻 **Radio** | Live SomaFM radio player (4 stations) — off by default, zero-config |
| 💻 **Terminal** | Interactive in-browser terminal with custom commands (`help`, `whoami`, `ls`, `cat`, etc.) |
| 🚀 **Performance** | Lazy-loaded routes, PWA with service worker, Vercel edge caching |
| 🔍 **SEO** | Per-page meta tags, Open Graph, Twitter Card, JSON-LD Person schema, sitemap, robots.txt |
| 📱 **Responsive** | Mobile-first; sidebar hidden on small screens |
| ♿ **Accessible** | Semantic HTML, ARIA labels, `prefers-reduced-motion` respected throughout |
| 🐛 **Easter eggs** | Konami code → Matrix rain; `/love` hidden route; walking pixel mushroom sprite |
| 📊 **Analytics** | Vercel Analytics (privacy-friendly, no cookie banner) |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + CSS custom properties (multi-theme) |
| **Routing** | [React Router v6](https://reactrouter.com/) with lazy loading |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + CSS keyframes |
| **Audio** | HTML5 Audio API → [SomaFM](https://somafm.com/) live streams |
| **Contact form** | [Web3Forms](https://web3forms.com/) (no backend required) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **PWA** | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| **Deployment** | [Vercel](https://vercel.com/) with custom headers & SPA rewrites |
| **Icons** | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9

### Local development

```bash
# 1. Clone the repo
git clone https://github.com/nileshvermaa/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local — add your Web3Forms key (optional; form runs in demo mode without it)

# 4. Start dev server  (http://localhost:5173)
npm run dev
```

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint check (ES2022 + React hooks) |

---

## 📁 Project Structure

```
portfolio/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml            # Lint + build quality gate
│   │   └── lighthouse.yml    # Lighthouse CI on main
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   └── pull_request_template.md
├── public/
│   ├── favicon.svg           # Pixel "N" monogram
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── assets/               # Static assets (Photo, icons)
│   ├── components/
│   │   ├── effects/          # MatrixRain, ScanlineOverlay, GlitchText, PixelSprite
│   │   ├── layout/           # Header (menubar), Sidebar, Footer, BootSequence
│   │   ├── terminal/         # Terminal emulator + command handlers
│   │   └── ui/               # BeveledPanel, WinampWidget (live radio), DialogWindow
│   ├── content/              # Data files: projects, skills, timeline, currently
│   ├── hooks/                # useTheme, useSeoMeta, useTypewriter, useKonami
│   ├── pages/                # Route-level components (lazy loaded)
│   └── styles/               # themes.css, animations.css, global.css
├── index.html                # Entry HTML (OG/Twitter meta, JSON-LD schema)
├── vercel.json               # SPA rewrites, security headers, asset caching
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in values.

| Variable | Required | Description |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Optional | [Web3Forms](https://web3forms.com/) access key for the contact form. Without it, the form runs in simulation mode. |

> **Never commit `.env.local` to git.** It is in `.gitignore` by default.

---

## 🚢 Deployment

The project deploys automatically to **Vercel** on every push to `main`.

### First-time Vercel setup

```bash
# Install Vercel CLI (optional — or use the Vercel dashboard)
npm i -g vercel

# Link project and deploy
vercel --prod
```

### Vercel environment variables

Set `VITE_WEB3FORMS_KEY` in the Vercel dashboard under **Project → Settings → Environment Variables**.

### Manual production build

```bash
npm run build
# Output is in dist/ — deploy the contents of dist/ to any static host
```

---

## 🎵 Radio Player

The Winamp-style widget on the home page streams **live internet radio** via [SomaFM](https://somafm.com/) — a free, listener-supported, no-ads station.

| Station | Genre | Stream |
|---|---|---|
| Groove Salad | Ambient / Lofi | `groovesalad-128-mp3` |
| Vaporwaves | Vaporwave / Chill | `vaporwaves-128-mp3` |
| Drone Zone | Deep Ambient | `dronezone-128-mp3` |
| Secret Agent | Spy Jazz / Retro | `secretagent-128-mp3` |

The player is **off by default**. No API key or backend required — it's plain HTML5 `<audio>`.

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on reporting bugs, requesting features, and submitting pull requests.

---

## 📄 License

[MIT](./LICENSE) — feel free to fork and adapt for your own portfolio. A credit or link back is appreciated but not required.

---

<div align="center">
  <sub>Made with ❤️ and too much ☕ · <a href="https://nileshvermaaresume.vercel.app/">nilesh.sys</a> · Best viewed in Netscape Navigator 4.0 @ 800×600</sub>
</div>

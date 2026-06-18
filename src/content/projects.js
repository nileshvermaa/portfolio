// Project data — pages render from this file. Edit here.
//
// Field reference:
//   slug            unique id used for routing/expansion state
//   title           human-readable project name (shown as the heading)
//   filename        retro "ls" filename shown in the project list row
//   description     one-line plain-language summary (HR-friendly)
//   details         longer description (supports multi-line bullet text)
//   link            GitHub repository URL ("#" if private/none)
//   demo            live deployment URL — renders a "Launch Live Demo" button
//   tech            array of tech-stack labels (rendered as badges)
//   image           preview image (local screenshot in /public/projects or Unsplash)
//   accordionItems  expandable "implementation details" sections

export const projects = [
  {
    slug: "cloudcraft-studio",
    title: "CloudCraft Studio",
    filename: "cloudcraft.app",
    description:
      "A playful, browser-based cloud architecture simulator — drag service tiles onto a board, pour real traffic on your design, and watch where it breaks (and why).",
    details: `CloudCraft Studio turns cloud architecture into a game anyone can play:
- Build a system by dragging service tiles (load balancers, app servers, databases, caches) onto an isometric workbench.
- Inject traffic loads of up to 1,000,000 requests/second and watch live dashboards for latency, throughput, availability, and cost.
- Take on "mission" challenges with real-world constraints — SLA targets, budgets, and latency limits — and get scored on how resilient and efficient your design is.
- A deterministic simulation engine means the same design always scores the same way, so it's fair and repeatable.`,
    link: "https://github.com/nileshvermaa/cloudcraft",
    demo: "https://cloudcraft-smoky.vercel.app",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "/projects/cloudcraft.png",
    accordionItems: [
      {
        title: "Drag-and-drop architecture board",
        content:
          "A free-form canvas (built on React Flow) lets you place and connect cloud service tiles. Each tile carries realistic capacity, latency, and cost characteristics.",
      },
      {
        title: "Traffic simulation engine",
        content:
          "A deterministic engine pushes synthetic load through your topology and surfaces bottlenecks, dropped requests, and failure points in real time.",
      },
      {
        title: "Mission mode & scoring",
        content:
          "Scenario-based missions add SLA, budget, and latency constraints. A scoring system rewards architectures that stay resilient and cost-efficient under pressure.",
      },
    ],
  },
  {
    slug: "aeropdf-editor",
    title: "AeroPDF — PDF Editor",
    filename: "aeropdf.app",
    description:
      "A browser-based PDF editor that lets you edit existing PDF text directly and layer on new elements — text, shapes, signatures, images — Figma-style, with full undo/redo.",
    details: `AeroPDF is a full PDF editing studio that runs in your browser:
- Edit the actual text inside an existing PDF, with redaction and reflow — not just annotations on top.
- Find-and-replace across a single page or the whole document.
- Add overlay objects: text boxes, comments, signatures, images, and vector shapes, all freely positioned.
- Run client-side OCR on scanned pages so even image-only PDFs become editable.
- Reorder, rotate, duplicate, insert, and delete pages, then export a clean flattened PDF.`,
    link: "https://github.com/nileshvermaa/pdf-editor",
    demo: "https://proeditorfree.vercel.app",
    tech: ["React", "TypeScript", "Python", "Node.js"],
    image: "/projects/aeropdf.png",
    accordionItems: [
      {
        title: "Direct PDF text editing",
        content:
          "Powered by PyMuPDF on a FastAPI backend, AeroPDF edits the real text objects inside a PDF — supporting redaction, reflow, and document-wide find-and-replace.",
      },
      {
        title: "Figma-style overlay layer",
        content:
          "A React + PDF.js front end renders an editable overlay of text boxes, shapes, signatures, and images that flatten cleanly into the exported file.",
      },
      {
        title: "In-browser OCR",
        content:
          "Tesseract.js runs OCR on scanned pages entirely client-side, turning image-only documents into searchable, editable text.",
      },
    ],
  },
  {
    slug: "ats-resume-builder",
    title: "ATS Resume Builder",
    filename: "resume-builder.app",
    description:
      "A privacy-first resume builder that runs entirely in your browser — live PDF preview, job-description keyword analysis, and ATS-safe PDF/DOCX export. No data ever leaves your device.",
    details: `An ATS-first resume builder focused on privacy and parse-ability:
- Split-screen editor with a live, paginated preview that matches the exported file exactly.
- ATS-safe by design — no tables, columns, or images that confuse applicant-tracking systems.
- Import an existing resume from PDF or DOCX and auto-fill the editor.
- Paste a job description for keyword-gap analysis — entirely on-device, nothing is uploaded.
- Export to both PDF and editable DOCX, with resume variants and version history you can roll back.
- Optional AI assistance with a bring-your-own API key, plus full no-AI fallbacks.`,
    link: "https://github.com/nileshvermaa/resume-builder",
    demo: "https://atsresumebuild.vercel.app",
    tech: ["TypeScript", "React", "Tailwind CSS"],
    image: "/projects/atsresumebuild.png",
    accordionItems: [
      {
        title: "100% in-browser & private",
        content:
          "All editing, parsing, and storage happen locally using IndexedDB — no backend, no uploads, no tracking. Your resume data never leaves the device.",
      },
      {
        title: "Import & keyword tailoring",
        content:
          "pdfjs-dist and mammoth parse existing PDF/DOCX resumes for auto-fill. Paste a job description to see which keywords you're missing.",
      },
      {
        title: "Dual export (PDF + DOCX)",
        content:
          "Exports to a clean, single-column ATS-safe PDF and an editable DOCX with matching page breaks — compatible with Workday, Greenhouse, and Lever.",
      },
    ],
  },
  {
    slug: "prags-pov-portfolio",
    title: "Prags.pov — Cinematic 3D Portfolio",
    filename: "prags-pov.app",
    description:
      "A cinematic 3D portfolio website built for a content creator — an animated WebGL hero, film grain, and buttery-smooth momentum scrolling.",
    details: `A high-end, client-facing portfolio site with a film-like feel:
- A 3D WebGL hero scene with an animated liquid-metal blob, halo effects, and particle fields (Three.js + React Three Fiber).
- Smooth momentum scrolling powered by Lenis, with cinematic Framer Motion transitions throughout.
- A dark "noir" visual design with film grain and a glass-morphism mobile navbar.
- The entire site's content lives in a single data file, so it's trivial to update.
- Accessibility-first: reduced-motion support, keyboard navigation, and automated SEO (Open Graph, sitemap, robots).`,
    link: "https://github.com/nileshvermaa/content-creator",
    demo: "https://pragspov.vercel.app",
    tech: ["React", "TypeScript", "Node.js"],
    image: "/projects/pragspov.png",
    accordionItems: [
      {
        title: "WebGL hero scene",
        content:
          "A Three.js / React Three Fiber scene renders an animated liquid-metal blob with halos and particle fields as the centrepiece of the landing page.",
      },
      {
        title: "Cinematic motion",
        content:
          "Lenis drives smooth momentum scrolling while Framer Motion handles section reveals and transitions, giving the site a film-like pacing.",
      },
      {
        title: "Single-file content model",
        content:
          "All copy, links, and media references live in one data file, so the whole site can be re-themed or updated without touching component code.",
      },
    ],
  },
  {
    slug: "sandbox-codenavigator",
    title: "Sandbox for Codenavigator",
    filename: "sandbox.sh",
    description:
      "Automated sandbox deployment platform integrating UI, backend, and CI/CD to spin up demo environments on demand.",
    details: `This internal tooling project enables seamless deployment of isolated environments for product demos:
- A JavaScript-based UI button embedded in a WordPress site triggers the process.
- The button hits an Express.js backend hosted in Docker, which securely handles Jenkins credentials and manages job execution.
- Jenkins pulls, builds, dockerizes, and deploys a Java project to a remote server, returning the live URL.`,
    link: "#",
    tech: ["WordPress", "Express.js", "Docker", "Jenkins", "Java"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    accordionItems: [
      {
        title: "WordPress UI Integration",
        content:
          "A JS script deployed in WordPress displays a trigger button that initiates a sandbox deployment flow and polls the backend for deployment status.",
      },
      {
        title: "Node.js Express Middleware",
        content:
          "Handles secure API calls from the UI, triggers Jenkins pipelines, and serves console outputs and deployment details to the frontend.",
      },
      {
        title: "Jenkins CI/CD",
        content:
          "Builds and dockerizes a Java project from an internal Git repo and deploys it to a remote server, exposing the sandbox to customers.",
      },
    ],
  },
  {
    slug: "jenkins-pipeline",
    title: "Dynamic Jenkins CI/CD Pipeline",
    filename: "Jenkinsfile",
    description:
      "Multi-module CI/CD pipeline for building, testing, and Dockerizing Java projects with custom user environments.",
    details:
      "Designed and implemented an advanced Jenkins pipeline using scripted Groovy syntax. It dynamically allocates PostgreSQL ports per user, builds Maven-based multi-module Java projects, handles resource constraints gracefully, packages Docker containers, and archives build artifacts with rollback capabilities.",
    link: "#",
    tech: ["Jenkins", "Groovy", "Maven", "Docker", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop",
    accordionItems: [
      {
        title: "Dynamic Port Allocation",
        content:
          "Each build session is assigned a unique PostgreSQL port by reserving entries in a shared database, ensuring isolated environments per user.",
      },
      {
        title: "Modular Maven Builds",
        content:
          "Multiple Java modules are independently built and packaged using Maven, supporting efficient modular development.",
      },
      {
        title: "Dockerization & Archiving",
        content:
          "Each successful build is Dockerized with custom tags and pushed to a private registry. Artifacts are archived for rollback and auditing.",
      },
      {
        title: "Failure Handling & Cleanup",
        content:
          "Includes robust error handling and post-build cleanup logic. Frees up database reservations and resources to avoid port leakage.",
      },
    ],
  },
  {
    slug: "java-debugger",
    title: "Event-Driven Java Debugger Backend",
    filename: "debugger.jar",
    description:
      "Backend system for real-time debugging of Java programs by intercepting and analyzing JVM events to monitor variable states and program flow.",
    details:
      "Contributed to the development of a Java-based debugger backend that leverages the Java Debug Interface (JDI) to capture runtime events such as method entry/exit, variable changes, and breakpoints. Implemented handlers to track and log variable values and control program execution flow for enhanced debugging capabilities.",
    link: "#",
    tech: ["Java", "JDI", "JVM", "Concurrency"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    accordionItems: [
      {
        title: "JVM Event Interception",
        content:
          "Used JDI to listen for events like breakpoints, variable modifications, and method invocations to enable dynamic inspection of the target program.",
      },
      {
        title: "Variable State Tracking",
        content:
          "Tracked variable values during program execution and maintained a history of changes to aid in runtime analysis and debugging.",
      },
      {
        title: "Custom Debug Operations",
        content:
          "Implemented custom handlers to pause/resume execution, inspect call stacks, and manipulate program flow based on debug events.",
      },
    ],
  },
  {
    slug: "bus-management",
    title: "Java Bus Management System",
    filename: "bus-mgmt.java",
    description:
      "Native Java Swing-based bus management system with MySQL integration, offering full CRUD operations for buses, drivers, conductors, routes, passengers, and tours.",
    details:
      "Developed a desktop application using Java Swing and MySQL Connector/J that enables administrators and operators to manage all aspects of bus transportation — from scheduling tours and assigning routes to managing passengers and staff.",
    link: "https://github.com/newton00009/bus_management",
    tech: ["Java", "Swing", "MySQL", "JDBC"],
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2669&auto=format&fit=crop",
    accordionItems: [
      {
        title: "Modular GUI with Swing",
        content:
          "Each feature (add/update/delete/view) for buses, conductors, drivers, passengers, and routes is built as a separate GUI module using Swing's form builder.",
      },
      {
        title: "MySQL-Backed Data Persistence",
        content:
          "All data such as tours, schedules, and staff assignments are stored and retrieved using MySQL via JDBC connection.",
      },
    ],
  },
  {
    slug: "budgeting-app",
    title: "Personal Budgeting Web App",
    filename: "budget.mern",
    description:
      "Full-stack budgeting application that helps users track expenses, manage earnings, and visualize spending patterns with real-time charts.",
    details:
      "Built a MERN-stack budgeting tool with secure authentication, dynamic chart rendering, and intuitive expense tracking. Users can register, log in, add or remove expenses, update earnings, and get real-time financial insights.",
    link: "https://github.com/Prateekg2050/Budgeting_WebApplication",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    accordionItems: [
      {
        title: "Secure Auth & JWT Integration",
        content:
          "Implemented user registration and login with hashed passwords using bcrypt and JWT tokens for secure route access.",
      },
      {
        title: "Expense CRUD API",
        content:
          "Users can add, view, and delete expenses through authenticated API routes that interact with MongoDB collections.",
      },
    ],
  },
];

export default projects;

// Project data — extracted verbatim from the previous Projects.jsx so
// content survives the redesign. Edit here; pages render from this file.

export const projects = [
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
  {
    slug: "ats-resume-builder",
    title: "ATS Resume Builder",
    filename: "resume-builder.tsx",
    description:
      "AI-powered ATS-optimised resume builder that analyses job descriptions, scores resume compatibility, and generates clean recruiter-ready PDFs.",
    details: `A full-stack resume builder designed to beat Applicant Tracking Systems:
- Paste any job description and get an instant ATS compatibility score with keyword gap analysis.
- Build your resume section-by-section using a live editor — changes reflect in a real-time PDF preview.
- AI suggestions rewrite bullet points to match JD keywords without sounding robotic.
- One-click export generates a clean, ATS-parseable PDF with no tables, columns, or graphics that confuse parsers.
- Deployed on Vercel with edge-optimised serverless functions.`,
    link: "https://nileshvermaaresume.vercel.app/",
    tech: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop",
    accordionItems: [
      {
        title: "ATS Score & Keyword Analysis",
        content:
          "Parses job descriptions to extract hard and soft skill keywords, then scores the resume against them — highlighting missing terms and overused filler phrases.",
      },
      {
        title: "Live PDF Preview",
        content:
          "Resume sections are rendered in a side-by-side editor + preview layout. The PDF output uses a single-column, plain-text-friendly layout optimised for ATS parsers.",
      },
      {
        title: "AI Bullet-Point Rewriter",
        content:
          "Integrates an AI layer that rewrites experience bullets to align with JD language while preserving factual accuracy — no hallucinations, just tone and keyword tuning.",
      },
      {
        title: "One-Click Export",
        content:
          "Generates a pixel-perfect, ATS-safe PDF with correct heading hierarchy, no embedded images or columns, and proper Unicode — compatible with Workday, Greenhouse, and Lever.",
      },
    ],
  },
];

export default projects;

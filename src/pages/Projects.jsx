import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronRight, ChevronDown } from "lucide-react";
import BeveledPanel from "../components/ui/BeveledPanel";
import BlinkingCursor from "../components/ui/BlinkingCursor";
import { projects } from "../content/projects";
import { useSeoMeta } from "../hooks/useSeoMeta";

/* ── Tech-stack 88×31 badges ─────────────────────────────────────── */

const BADGE_PALETTE = {
  Docker:      { bg: "#1D63ED", fg: "#fff" },
  Jenkins:     { bg: "#D33833", fg: "#fff" },
  AWS:         { bg: "#FF9900", fg: "#000" },
  GCP:         { bg: "#4285F4", fg: "#fff" },
  Kubernetes:  { bg: "#326CE5", fg: "#fff" },
  Terraform:   { bg: "#623CE4", fg: "#fff" },
  Java:        { bg: "#ED8B00", fg: "#000" },
  JavaScript:  { bg: "#F7DF1E", fg: "#000" },
  Python:      { bg: "#3776AB", fg: "#fff" },
  React:       { bg: "#61DAFB", fg: "#000" },
  MongoDB:     { bg: "#47A248", fg: "#fff" },
  Groovy:      { bg: "#629CBF", fg: "#000" },
  PostgreSQL:  { bg: "#336791", fg: "#fff" },
  Maven:       { bg: "#C71A36", fg: "#fff" },
  JWT:         { bg: "#000",    fg: "#ffff00" },
  MySQL:       { bg: "#4479A1", fg: "#fff" },
  Swing:       { bg: "#333",    fg: "#0f0" },
  JDI:         { bg: "#ED8B00", fg: "#000" },
  JVM:         { bg: "#333",    fg: "#ED8B00" },
  WordPress:   { bg: "#21759B", fg: "#fff" },
  "Express.js":{ bg: "#333",    fg: "#fff" },
  "Node.js":   { bg: "#339933", fg: "#fff" },
  JDBC:        { bg: "#000080", fg: "#fff" },
  Concurrency: { bg: "#555",    fg: "#fff" },
};

const Badge = ({ label }) => {
  const c = BADGE_PALETTE[label] ?? { bg: "#222", fg: "#00ff00" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: c.bg,
        color: c.fg,
        minWidth: 88,
        height: 31,
        padding: "0 8px",
        fontSize: 10,
        fontFamily: '"IBM Plex Mono", monospace',
        lineHeight: 1,
        border: "2px solid",
        borderTopColor: "#ffffff55",
        borderLeftColor: "#ffffff55",
        borderBottomColor: "#00000055",
        borderRightColor: "#00000055",
        letterSpacing: 0.5,
      }}
    >
      {label}
    </span>
  );
};

/* ── Accordion item ──────────────────────────────────────────────── */

const AccordionItem = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-retro-border-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-2 py-1 text-left font-mono text-sm hover:bg-retro-chrome hover:text-retro-chrome-fg"
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="w-3 h-3 shrink-0" aria-hidden />
        ) : (
          <ChevronRight className="w-3 h-3 shrink-0" aria-hidden />
        )}
        <span className="text-retro-fg">{title}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-6 py-2 text-retro-fg-dim font-mono text-sm leading-relaxed">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── README detail panel ─────────────────────────────────────────── */

const ReadmePanel = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.18 }}
  >
    <BeveledPanel
      title={`README.md — ${project.filename}`}
      className="ml-4 mt-1 mb-2"
      bodyClassName="!p-0"
    >
      {/* Close strip */}
      <div className="flex justify-end px-3 pt-2 pb-0">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project detail"
          className="bevel-out px-2 py-0 font-sys text-xs hover:bg-retro-chrome hover:text-retro-chrome-fg"
        >
          [×] close
        </button>
      </div>

      <div className="p-3 space-y-3 font-mono text-sm">
        {/* Title */}
        <div>
          <span className="text-retro-accent font-bold text-base">
            # {project.title}
          </span>
        </div>

        {/* Description */}
        <div>
          <div className="text-retro-fg-dim text-xs mb-1">## Description</div>
          <p className="text-retro-fg leading-relaxed">{project.description}</p>
        </div>

        {/* Details */}
        <div>
          <div className="text-retro-fg-dim text-xs mb-1">## Details</div>
          <pre className="whitespace-pre-wrap text-retro-fg leading-relaxed text-xs">
            {project.details}
          </pre>
        </div>

        {/* Tech stack */}
        <div>
          <div className="text-retro-fg-dim text-xs mb-2">## Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} label={t} />
            ))}
          </div>
        </div>

        {/* Accordion */}
        {project.accordionItems?.length > 0 && (
          <div className="bevel-in">
            <div className="text-retro-fg-dim text-xs px-2 py-1 border-b-2 border-retro-border-dark">
              ## Implementation Details
            </div>
            {project.accordionItems.map((item) => (
              <AccordionItem
                key={item.title}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        )}

        {/* Link */}
        {project.link && project.link !== "#" && (
          <div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bevel-out px-3 py-1 no-underline text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg text-xs"
            >
              <ExternalLink className="w-3 h-3" aria-hidden />
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </BeveledPanel>
  </motion.div>
);

/* ── Project row ─────────────────────────────────────────────────── */

const ProjectRow = ({ project, selected, onSelect }) => {
  const isOpen = selected === project.slug;
  return (
    <>
      <button
        type="button"
        onClick={() => onSelect(isOpen ? null : project.slug)}
        className={`w-full text-left flex items-center gap-2 px-2 py-[3px] font-mono text-sm hover:bg-retro-chrome hover:text-retro-chrome-fg ${
          isOpen ? "bg-retro-chrome text-retro-chrome-fg" : ""
        }`}
        aria-expanded={isOpen}
        aria-controls={`readme-${project.slug}`}
      >
        {isOpen ? (
          <ChevronDown className="w-3 h-3 shrink-0" aria-hidden />
        ) : (
          <ChevronRight className="w-3 h-3 shrink-0" aria-hidden />
        )}
        <span className="text-retro-fg-dim shrink-0">drwxr-xr-x</span>
        <span className="text-retro-fg-dim shrink-0 hidden sm:inline">
          nilesh cloud May 23 2026
        </span>
        <span className="text-retro-accent font-bold">{project.filename}</span>
        <span className="text-retro-fg-dim hidden md:inline truncate">
          {" "}
          — {project.description.slice(0, 55)}…
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <div id={`readme-${project.slug}`}>
            <ReadmePanel
              project={project}
              onClose={() => onSelect(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Page ────────────────────────────────────────────────────────── */

const Projects = () => {
  useSeoMeta({
    title: "Projects",
    description: "Cloud and software projects by Nilesh Verma — CI/CD pipelines, Kubernetes, Java backends, and more.",
    path: "/projects",
  });
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-4 py-2">
      <BeveledPanel title="projects.d — ~/projects/ — ls -la">
        {/* Column headers */}
        <div className="font-mono text-xs text-retro-fg-dim mb-1 px-2">
          $ ls -la ~/projects/
        </div>
        <div className="font-mono text-xs text-retro-fg-dim px-2 mb-1">
          total {projects.length * 8}
        </div>
        <div className="font-mono text-xs px-2 py-1 border-b-2 border-retro-border-dark flex items-center gap-2 text-retro-fg-dim">
          <span className="w-3" />
          <span className="shrink-0">perms</span>
          <span className="shrink-0 hidden sm:inline ml-4">owner · group · date</span>
          <span className="ml-4">filename — description</span>
        </div>

        {/* Rows */}
        <div>
          {projects.map((p) => (
            <ProjectRow
              key={p.slug}
              project={p}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
        </div>

        <div className="font-mono text-xs text-retro-fg-dim px-2 pt-2 border-t-2 border-retro-border-dark mt-1">
          Click a row to expand README · {projects.length} projects total
        </div>
      </BeveledPanel>
    </div>
  );
};

export default Projects;

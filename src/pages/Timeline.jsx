import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import BeveledPanel from "../components/ui/BeveledPanel";
import { timeline } from "../content/timeline";
import { useSeoMeta } from "../hooks/useSeoMeta";

const SEVERITY_STYLE = {
  MILESTONE: { color: "#ff00ff", label: "[MILESTONE]" },
  ACHIEVEMENT: { color: "#ffff00", label: "[ACHIEVEMENT]" },
  INFO: { color: "var(--retro-fg-dim)", label: "[INFO]     " },
};

const TYPE_ICON = {
  work:       "⚙",
  education:  "📚",
  graduation: "🎓",
  internship: "💻",
  school:     "🏫",
};

const LogEntry = ({ entry, index }) => {
  const [open, setOpen] = useState(false);
  const sev = SEVERITY_STYLE[entry.severity] ?? SEVERITY_STYLE.INFO;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full text-left flex items-start gap-1 px-2 py-[3px] font-mono text-xs sm:text-sm hover:bg-retro-chrome hover:text-retro-chrome-fg ${
          open ? "bg-retro-chrome text-retro-chrome-fg" : ""
        }`}
        aria-expanded={open}
      >
        <span className="shrink-0 mt-[2px]" aria-hidden>
          {open ? (
            <ChevronDown className="w-3 h-3 inline" />
          ) : (
            <ChevronRight className="w-3 h-3 inline" />
          )}
        </span>
        {/* Timestamp */}
        <span className="shrink-0 text-retro-fg-dim hidden sm:inline">
          [{entry.date}]
        </span>
        {/* Severity */}
        <span className="shrink-0" style={{ color: sev.color }}>
          {sev.label}
        </span>
        {/* Type icon */}
        <span className="shrink-0" aria-hidden>
          {TYPE_ICON[entry.type] ?? "●"}
        </span>
        {/* Title */}
        <span className="text-retro-fg font-bold">{entry.title}</span>
        {/* Year hint on mobile */}
        <span className="text-retro-fg-dim text-xs ml-auto shrink-0 hidden xs:inline">
          {entry.year}
        </span>
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
            <div className="pl-8 pr-3 py-2 bevel-in ml-4 mr-2 my-1 font-mono text-sm">
              <div className="text-retro-fg-dim text-xs mb-1">
                {entry.year}
              </div>
              <p className="text-retro-fg leading-relaxed">
                {entry.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Timeline = () => {
  useSeoMeta({
    title: "Timeline",
    description: "Nilesh Verma's career log — education, work history, and key milestones in Cloud and Software Engineering.",
    path: "/timeline",
  });
  return (
  <div className="space-y-4 py-2">
    <BeveledPanel title="career.log — /var/log/nilesh/career.log">
      <div className="font-mono text-xs text-retro-fg-dim mb-2 px-2">
        $ tail -f /var/log/nilesh/career.log
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 px-2 pb-2 border-b-2 border-retro-border-dark font-mono text-xs">
        {Object.entries(SEVERITY_STYLE).map(([k, v]) => (
          <span key={k} style={{ color: v.color }}>
            {v.label.trim()}
          </span>
        ))}
        <span className="text-retro-fg-dim">— click entry to expand</span>
      </div>

      {/* Log entries */}
      <div className="mt-1">
        {timeline.map((entry, i) => (
          <LogEntry key={`${entry.date}-${i}`} entry={entry} index={i} />
        ))}
      </div>

      <div className="font-mono text-xs text-retro-fg-dim px-2 pt-2 border-t-2 border-retro-border-dark mt-1">
        {timeline.length} entries · reverse-chronological · last updated:{" "}
        {new Date().toISOString().slice(0, 10)}
      </div>
    </BeveledPanel>
  </div>
  );
};

export default Timeline;

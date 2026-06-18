import React, { useState, useEffect } from "react";
import { projects } from "../../content/projects";
import { timeline } from "../../content/timeline";
import { skills } from "../../content/skills";

/* ── Shared helpers ─────────────────────────────────────────────── */

const Row = ({ children, className = "" }) => (
  <div className={`leading-snug ${className}`}>{children}</div>
);
const Dim = ({ children }) => (
  <span className="text-retro-fg-dim">{children}</span>
);
const Accent = ({ children }) => (
  <span className="text-retro-accent">{children}</span>
);
const Warn = ({ children }) => (
  <span style={{ color: "#ff4444" }}>{children}</span>
);
const Sep = () => (
  <Row>
    <Dim>{"─".repeat(56)}</Dim>
  </Row>
);

/* ── Individual command outputs ─────────────────────────────────── */

const HelpOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Accent>NILESH.SYS Terminal</Accent>
      <Dim> — available commands</Dim>
    </Row>
    <Sep />
    {[
      ["help", "show this help message"],
      ["whoami", "print current user info"],
      ["about", "cat /home/nilesh/about.txt"],
      ["projects", "ls -la ~/projects/"],
      ["timeline", "tail /var/log/career.log"],
      ["skills", "ls -la ~/skills/"],
      ["contact", "cat ~/.contact"],
      ["resume", "wget resume.pdf (triggers download)"],
      ["sudo hire-me", "initiate hire sequence"],
      ["clear", "clear terminal  (also Ctrl+L)"],
      ["exit", "exit (nice try)"],
    ].map(([cmd, desc]) => (
      <Row key={cmd}>
        <span className="inline-block w-20 text-retro-fg">{cmd}</span>
        <Dim> — {desc}</Dim>
      </Row>
    ))}
    <Sep />
    <Row>
      <Dim>↑/↓ for history · Tab to autocomplete · Ctrl+L to clear</Dim>
    </Row>
  </div>
);

const WhoamiOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Accent>nilesh.verma</Accent>
    </Row>
    <Row>
      <Dim>
        uid=1000(nilesh) gid=1000(cloud) groups=1000(cloud),4(adm),27(sudo),100(architect)
      </Dim>
    </Row>
    <Sep />
    {[
      ["role", "Cloud Specialist / Solutions Architect"],
      ["company", "Niveus Solutions"],
      ["location", "India"],
      ["status", "taking on cloud architecture challenges"],
    ].map(([k, v]) => (
      <Row key={k}>
        <span className="inline-block w-12 text-retro-fg-dim">{k}:</span>
        <span className="text-retro-fg"> {v}</span>
      </Row>
    ))}
  </div>
);

const AboutOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Dim>$ cat /home/nilesh/about.txt</Dim>
    </Row>
    <Sep />
    <Row>
      <Accent>Nilesh Verma</Accent>
    </Row>
    <Row>
      <Dim>Cloud Specialist / Solutions Architect @ Niveus Solutions</Dim>
    </Row>
    <Row>&nbsp;</Row>
    <Row className="max-w-xl leading-relaxed">
      Passionate about designing scalable cloud architectures that solve real
      business problems. I bridge the gap between infrastructure engineering and
      solutions architecture — turning complex multi-cloud requirements into
      elegant, cost-optimized, production-grade systems.
    </Row>
    <Row>&nbsp;</Row>
    <Row>
      <Dim>Background:</Dim>
    </Row>
    {[
      "B.E. Computer Engineering, NMIT Bengaluru (GPA 9.07, Springer paper)",
      "MBA in progress, IIT Patna",
      "DevOps Engineer @ Cloudframe — Jenkins, Docker, Azure",
      "Internship @ CRIS (Indian Railways)",
    ].map((item) => (
      <Row key={item}>
        <Dim>  • </Dim>
        {item}
      </Row>
    ))}
  </div>
);

const ProjectsOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Dim>$ ls -la ~/projects/</Dim>
    </Row>
    <Row>
      <Dim>total {projects.length}</Dim>
    </Row>
    <Sep />
    {projects.map((p) => (
      <Row key={p.slug}>
        <Dim>drwxr-xr-x  nilesh  cloud  May 23 2026  </Dim>
        <Accent>{p.filename}</Accent>
        <Dim>  — {p.description.slice(0, 50)}…</Dim>
      </Row>
    ))}
    <Sep />
    <Row>
      <Dim>→ </Dim>
      <a href="/projects" className="text-retro-link underline">
        /projects
      </a>
      <Dim> for full details (navigating in 1s…)</Dim>
    </Row>
  </div>
);

const TimelineOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Dim>$ tail -n 7 /var/log/nilesh/career.log</Dim>
    </Row>
    <Sep />
    {timeline.map((t, i) => {
      const tagColor =
        t.severity === "MILESTONE"
          ? { color: "#ff00ff" }
          : t.severity === "ACHIEVEMENT"
          ? { color: "#ffff00" }
          : undefined;
      return (
        <Row key={i}>
          <Dim>[{t.date}] </Dim>
          <span style={tagColor}>[{t.severity}]</span>
          <span className="text-retro-fg"> {t.title}</span>
        </Row>
      );
    })}
    <Sep />
    <Row>
      <Dim>→ </Dim>
      <a href="/timeline" className="text-retro-link underline">
        /timeline
      </a>
      <Dim> for full log (navigating in 1s…)</Dim>
    </Row>
  </div>
);

const SkillsOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Dim>$ ls -la ~/skills/</Dim>
    </Row>
    <Row>
      <Dim>total {skills.length * 8}</Dim>
    </Row>
    <Sep />
    {skills.map((s) => (
      <Row key={s.name}>
        <Dim>{s.perms}  1  nilesh  cloud  </Dim>
        <span className="inline-block w-10 text-right text-retro-fg-dim">
          {s.size}
        </span>
        <Dim>  May 23 00:00  </Dim>
        <Accent>{s.name}</Accent>
      </Row>
    ))}
  </div>
);

const ContactOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Dim>$ cat ~/.contact</Dim>
    </Row>
    <Sep />
    {[
      ["email", "nileshvermaq@gmail.com", "mailto:nileshvermaq@gmail.com"],
      ["github", "github.com/nileshvermaa", "https://github.com/nileshvermaa"],
      [
        "linkedin",
        "linkedin.com/in/nileshvermaa",
        "https://www.linkedin.com/in/nileshvermaa/",
      ],
      ["form", "nilesh.sys/contact", "/contact"],
    ].map(([key, label, href]) => (
      <Row key={key}>
        <span className="inline-block w-10 text-retro-fg-dim">{key}:</span>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="text-retro-link underline ml-2"
        >
          {label}
        </a>
      </Row>
    ))}
    <Sep />
    <Row>
      <Dim>→ </Dim>
      <a href="/contact" className="text-retro-link underline">
        /contact
      </a>
      <Dim> for the full message form (navigating in 1s…)</Dim>
    </Row>
  </div>
);

const WgetOutput = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (pct >= 100) return;
    const t = setTimeout(() => setPct((p) => Math.min(p + 7, 100)), 70);
    return () => clearTimeout(t);
  }, [pct]);

  const filled = Math.floor(pct / 5);
  const bar =
    "=".repeat(filled) +
    (pct < 100 ? ">" : "") +
    " ".repeat(Math.max(0, 20 - filled - (pct < 100 ? 1 : 0)));

  return (
    <div className="space-y-[2px]">
      <Row>
        <Dim>
          --{new Date().toISOString().slice(0, 10)}--
          {"  "}https://nilesh.sys/NileshResume.pdf
        </Dim>
      </Row>
      <Row>
        <Dim>Resolving nilesh.sys... 76.76.21.21</Dim>
      </Row>
      <Row>
        <Dim>Connecting to nilesh.sys:443... connected.</Dim>
      </Row>
      <Row>
        <Dim>HTTP/2 200 OK — Content-Type: application/pdf</Dim>
      </Row>
      <Row>
        <Dim>Saving to: </Dim>
        <Accent>'NileshResume.pdf'</Accent>
      </Row>
      <Row>
        <span className="font-mono text-retro-fg">
          [{bar}] {pct}%
        </span>
      </Row>
      {pct === 100 && (
        <>
          <Row>
            <Accent>✓ NileshResume.pdf saved [~240K]</Accent>
          </Row>
          <Row>
            <Dim>If download did not start — </Dim>
            <a
              href="/NileshResume.pdf"
              download
              className="text-retro-link underline"
            >
              click here
            </a>
          </Row>
        </>
      )}
    </div>
  );
};

const HIRE_LINES = [
  { t: "[sudo] password for recruiter: ••••••••", delay: 400 },
  { t: "Verifying credentials...", delay: 900 },
  {
    t: "sudo: verification complete — welcome, Hiring Manager.",
    delay: 1500,
    c: "ok",
  },
  { t: "", delay: 1700 },
  { t: "Initiating hire sequence...", delay: 2000 },
  { t: "  checking cloud expertise.............. [OK]", delay: 2300, c: "ok" },
  {
    t: "  checking solutions architecture........ [OK]",
    delay: 2600,
    c: "ok",
  },
  {
    t: "  checking IaC / DevOps proficiency...... [OK]",
    delay: 2900,
    c: "ok",
  },
  {
    t: "  checking leadership & comm skills...... [OK]",
    delay: 3200,
    c: "ok",
  },
  { t: "  checking enthusiasm for cloud.......... [OK]", delay: 3500, c: "ok" },
  { t: "", delay: 3700 },
  {
    t: "══════════════════════════════════════════",
    delay: 3900,
    c: "banner",
  },
  {
    t: "  HIRE SEQUENCE COMPLETE — CANDIDATE APPROVED",
    delay: 4100,
    c: "banner",
  },
  {
    t: "══════════════════════════════════════════",
    delay: 4200,
    c: "banner",
  },
  { t: "", delay: 4400 },
  { t: "Next steps:", delay: 4600 },
  { t: "  → Email:    nileshvermaq@gmail.com", delay: 4800, c: "link" },
  { t: "  → LinkedIn: linkedin.com/in/nileshvermaa", delay: 5000, c: "link" },
  { t: "  → Form:     nilesh.sys/contact", delay: 5200, c: "link" },
  { t: "", delay: 5400 },
  {
    t: "Note: offer quality must be ≥ senior level. sudo session expires in 30m.",
    delay: 5600,
    c: "dim",
  },
];

const SudoHireMeOutput = () => {
  const [shown, setShown] = useState([]);

  useEffect(() => {
    const timers = HIRE_LINES.map((line) =>
      setTimeout(() => setShown((prev) => [...prev, line]), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const style = (c) => {
    if (c === "ok") return { color: "#00ff88" };
    if (c === "banner") return { color: "#ff00ff", fontWeight: "bold" };
    if (c === "link") return { color: "var(--retro-link)" };
    if (c === "dim") return { color: "var(--retro-fg-dim)" };
    return {};
  };

  return (
    <div className="space-y-[1px]">
      {shown.map((line, i) =>
        line.t === "" ? (
          <div key={i} style={{ height: "0.5em" }} />
        ) : (
          <div key={i} style={style(line.c)} className="font-mono">
            {line.t}
          </div>
        )
      )}
    </div>
  );
};

const ExitOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Warn>bash: exit: permission denied</Warn>
    </Row>
    <Row>
      <Dim>
        This terminal runs forever. Try Ctrl+C. Or close the tab. We don't
        judge.
      </Dim>
    </Row>
  </div>
);

const ManOutput = () => (
  <div className="space-y-[2px]">
    <Row>
      <Accent>NILESH(1)</Accent>
      <Dim> — Nilesh Verma Manual Page</Dim>
    </Row>
    <Sep />
    <Row>
      <Dim>NAME</Dim>
    </Row>
    <Row>{"       "}nilesh — cloud specialist and solutions architect</Row>
    <Row>&nbsp;</Row>
    <Row>
      <Dim>SYNOPSIS</Dim>
    </Row>
    <Row>{"       "}nilesh [--hire] [--contact] [--projects]</Row>
    <Row>&nbsp;</Row>
    <Row>
      <Dim>SEE ALSO</Dim>
    </Row>
    <Row>
      {"       "}
      <a href="/about" className="text-retro-link underline">
        about(1)
      </a>
      ,{" "}
      <a href="/projects" className="text-retro-link underline">
        projects(1)
      </a>
      ,{" "}
      <a href="/contact" className="text-retro-link underline">
        contact(1)
      </a>
    </Row>
  </div>
);

/* ── Registry & executor ────────────────────────────────────────── */

const REGISTRY = {
  help: () => ({ output: <HelpOutput /> }),
  whoami: () => ({ output: <WhoamiOutput /> }),
  about: () => ({ output: <AboutOutput /> }),
  projects: () => ({ output: <ProjectsOutput />, navigate: "/projects" }),
  timeline: () => ({ output: <TimelineOutput />, navigate: "/timeline" }),
  skills: () => ({ output: <SkillsOutput /> }),
  contact: () => ({ output: <ContactOutput />, navigate: "/contact" }),
  resume: () => ({ output: <WgetOutput />, download: "/NileshResume.pdf" }),
  "sudo hire-me": () => ({ output: <SudoHireMeOutput /> }),
  clear: () => ({ clear: true, output: null }),
  exit: () => ({ output: <ExitOutput /> }),
  pwd: () => ({
    output: <Row className="text-retro-fg">/home/nilesh/portfolio</Row>,
  }),
  date: () => ({
    output: <Row className="text-retro-fg">{new Date().toString()}</Row>,
  }),
  ls: () => ({ output: <ProjectsOutput />, navigate: "/projects" }),
  man: () => ({ output: <ManOutput /> }),
};

export const COMMAND_NAMES = Object.keys(REGISTRY);

export function executeCommand(raw) {
  const cmd = raw.trim().toLowerCase();

  if (REGISTRY[cmd]) return REGISTRY[cmd]();

  if (cmd.startsWith("echo ")) {
    return {
      output: <Row className="text-retro-fg">{raw.slice(5)}</Row>,
    };
  }

  if (cmd === "sudo" || (cmd.startsWith("sudo ") && !cmd.includes("hire-me"))) {
    return {
      output: (
        <Row>
          <span style={{ color: "#ff4444" }}>
            sudo: only &apos;sudo hire-me&apos; is permitted in this environment.
          </span>
        </Row>
      ),
    };
  }

  return {
    output: (
      <div className="space-y-[2px]">
        <Row>
          <span style={{ color: "#ff4444" }}>
            bash: {raw}: command not found
          </span>
        </Row>
        <Row>
          <Dim>Type </Dim>
          <span className="text-retro-fg">help</span>
          <Dim> for available commands.</Dim>
        </Row>
      </div>
    ),
  };
}

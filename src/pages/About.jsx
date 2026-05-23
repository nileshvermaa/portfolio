import React from "react";
import BeveledPanel from "../components/ui/BeveledPanel";
import BlinkingCursor from "../components/ui/BlinkingCursor";
import { skills, certifications } from "../content/skills";
import { useSeoMeta } from "../hooks/useSeoMeta";
import profilePhoto from "../assets/Photo.jpeg";

/* ── ASCII certification box ─────────────────────────────────────── */

const CertBox = ({ cert }) => (
  <div className="font-mono text-xs bevel-out p-3 inline-block min-w-[260px]">
    <div className="text-retro-accent font-bold text-center mb-1">
      ╔══════════════════════════════════╗
    </div>
    <div className="text-retro-fg text-center">
      ║{"  "}{cert.name.slice(0, 32).padEnd(32)}{"  "}║
    </div>
    <div className="text-retro-fg-dim text-center">
      ║{"  "}Issued by: {cert.issuer.padEnd(23)}{"  "}║
    </div>
    <div className="text-retro-fg-dim text-center">
      ║{"  "}Year: {cert.year.padEnd(28)}{"  "}║
    </div>
    <div className="text-retro-accent font-bold text-center mt-1">
      ╚══════════════════════════════════╝
    </div>
  </div>
);

const About = () => {
  useSeoMeta({
    title: "About",
    description: "About Nilesh Verma — background, skills, certifications, and contact info for this Cloud Specialist / Solutions Architect.",
    path: "/about",
  });
  return (
  <div className="space-y-4 py-2">
    {/* ── Bio ── */}
    <BeveledPanel title="about.txt — cat /home/nilesh/about.txt">
      <div className="font-mono text-sm space-y-3">
        <div className="text-retro-fg-dim">
          $ cat /home/nilesh/about.txt
        </div>

        <div className="bevel-in p-3 space-y-3">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* ── Profile photo ── */}
            <div className="flex-shrink-0">
              <div className="bevel-out p-1" style={{ display: "inline-block" }}>
                <div className="text-retro-fg-dim font-mono text-xs text-center px-1 py-0.5 bg-retro-chrome text-retro-chrome-fg mb-1">
                  nilesh.jpg — eog
                </div>
                <img
                  src={profilePhoto}
                  alt="Nilesh Verma"
                  className="block"
                  style={{
                    width: 140,
                    height: 160,
                    objectFit: "cover",
                    objectPosition: "center top",
                    imageRendering: "auto",
                    filter: "contrast(1.05)",
                  }}
                />
                <div className="text-retro-fg-dim font-mono text-xs text-center mt-1">
                  1 file · 140×160
                </div>
              </div>
            </div>

            {/* ── Name + role ── */}
            <div className="space-y-2 flex-1">
              <div>
                <span className="text-retro-accent font-bold text-base">
                  Nilesh Verma
                </span>
                <BlinkingCursor />
              </div>

              <div className="text-retro-fg-dim">
                Cloud Specialist / Solutions Architect @ Niveus Solutions
              </div>
            </div>{/* end name+role flex child */}
          </div>{/* end photo+name flex row */}

          <p className="text-retro-fg leading-relaxed max-w-2xl">
            Passionate about designing scalable cloud architectures that solve
            real business problems. I bridge the gap between infrastructure
            engineering and solutions architecture — turning complex multi-cloud
            requirements into elegant, cost-optimized, production-grade systems.
          </p>

          <p className="text-retro-fg leading-relaxed max-w-2xl">
            Currently helping Niveus Solutions deliver cloud transformation
            initiatives for enterprise customers across AWS, GCP, and Azure.
            My background spans CI/CD automation, containerization, IaC, and
            full-stack development — giving me a holistic view from code to
            infrastructure.
          </p>

          <div>
            <div className="text-retro-fg-dim mb-1">## Background</div>
            <ul className="space-y-1 text-retro-fg">
              {[
                ["⚙", "Cloud Specialist @ Niveus Solutions (2026 – present)"],
                ["💻", "DevOps Engineer @ Cloudframe (2023 – 2026) — Jenkins, Docker, Azure"],
                ["🎓", "MBA in progress @ IIT Patna (2025 – 2027)"],
                ["🏛", "B.E. Computer Engineering, NMIT Bengaluru (GPA 9.07 · Springer paper)"],
                ["🚂", "Internship @ CRIS, Indian Railways — Govt. Java deployments"],
                ["📍", "Based in India"],
              ].map(([icon, text]) => (
                <li key={text} className="flex gap-2">
                  <span aria-hidden>{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BeveledPanel>

    {/* ── Skills ── */}
    <BeveledPanel title="skills.d — ls -la /home/nilesh/skills/">
      <div className="font-mono text-xs text-retro-fg-dim mb-2">
        $ ls -la /home/nilesh/skills/
      </div>
      <div className="font-mono text-xs text-retro-fg-dim mb-1">
        total {skills.length * 8}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Header */}
          <div className="flex gap-2 px-1 pb-1 border-b-2 border-retro-border-dark font-mono text-xs text-retro-fg-dim">
            <span className="w-28">permissions</span>
            <span className="w-4">ln</span>
            <span className="w-12">owner</span>
            <span className="w-10">group</span>
            <span className="w-10 text-right">size</span>
            <span className="w-24 ml-1">date</span>
            <span>name</span>
          </div>
          {skills.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-2 py-[2px] hover:bg-retro-chrome hover:text-retro-chrome-fg px-1 font-mono text-xs sm:text-sm"
            >
              <span className="text-retro-fg-dim shrink-0 w-28">{s.perms}</span>
              <span className="text-retro-fg-dim shrink-0 w-4">1</span>
              <span className="text-retro-accent shrink-0 w-12">nilesh</span>
              <span className="text-retro-fg-dim shrink-0 w-10">cloud</span>
              <span className="text-retro-fg-dim shrink-0 w-10 text-right">{s.size}</span>
              <span className="text-retro-fg-dim shrink-0 w-24 ml-1">May 23 00:00</span>
              <span className="text-retro-fg">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </BeveledPanel>

    {/* ── Certifications ── */}
    {certifications?.length > 0 && (
      <BeveledPanel title="certifications.d — ls ~/certs/">
        <div className="font-mono text-xs text-retro-fg-dim mb-3">
          $ ls -la ~/certs/
        </div>
        <div className="flex flex-wrap gap-4">
          {certifications.map((cert) => (
            <CertBox key={cert.name} cert={cert} />
          ))}
        </div>
      </BeveledPanel>
    )}

    {/* ── Contact ── */}
    <BeveledPanel title=".contact — cat ~/.contact">
      <div className="font-mono text-sm space-y-1">
        <div className="text-retro-fg-dim text-xs mb-2">$ cat ~/.contact</div>
        {[
          ["email",    "nileshvermaq@gmail.com", "mailto:nileshvermaq@gmail.com"],
          ["github",   "github.com/nileshcf",          "https://github.com/nileshcf"],
          ["linkedin", "linkedin.com/in/nileshvermaa",     "https://www.linkedin.com/in/nileshvermaa/"],
          ["resume",   "wget resume.pdf",              "/NileshResume.pdf"],
        ].map(([key, label, href]) => (
          <div key={key} className="flex gap-2">
            <span className="text-retro-fg-dim w-10 shrink-0">{key}:</span>
            <a
              href={href}
              download={key === "resume" ? "NileshResume.pdf" : undefined}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {label}
            </a>
          </div>
        ))}
      </div>
    </BeveledPanel>
  </div>
  );
};

export default About;

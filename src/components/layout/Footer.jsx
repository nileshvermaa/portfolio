import React from "react";
import { Link } from "react-router-dom";

const SIG = String.raw`
  __    _ __         __        _    __
 / /   (_) /__  ___ / /  __ __(_)__/ /
/ /_  / / / -_)(_-</ _ \/ // / / _  /
\___/_/_/\__//___/_//_/\_,_/_/\_,_/
`;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="bevel-out mt-8 font-sys text-xs"
      role="contentinfo"
    >
      {/* Marquee row */}
      <div className="overflow-hidden border-b-2 border-retro-border-dark bg-retro-bg-alt">
        <div className="retro-marquee py-1 text-retro-accent font-mono text-sm">
          ★ NILESH.SYS v4.0 ★ Cloud Specialist @ Niveus Solutions ★ AWS / GCP / Azure / K8s / Terraform ★
          available for senior cloud architect roles ★ type `sudo hire-me` in the terminal ★
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 justify-center p-3 border-b-2 border-retro-border-dark">
        {[
          ["Valid HTML 4.01", "#0000ff", "#ffffff"],
          ["Powered by Apache", "#cc0000", "#ffffff"],
          ["Made with Notepad", "#000080", "#ffff00"],
          ["AWS Certified", "#ff9900", "#000000"],
          ["GCP", "#4285f4", "#ffffff"],
          ["Azure", "#0078d4", "#ffffff"],
          ["K8s", "#326ce5", "#ffffff"],
        ].map(([label, bg, fg]) => (
          <span
            key={label}
            className="bevel-out px-2 py-1 font-mono"
            style={{
              background: bg,
              color: fg,
              minWidth: 88,
              height: 31,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              lineHeight: 1,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* ASCII sig + links */}
      <div className="grid md:grid-cols-2 gap-3 p-3 items-center">
        <pre className="ascii text-retro-fg-dim text-[10px] m-0 overflow-x-auto" aria-hidden="true">
{SIG}
        </pre>
        <div className="flex flex-col md:items-end gap-1">
          <div className="font-mono">
            © {year} Nilesh Verma. All rights reserved.
          </div>
          <div className="flex gap-3 font-mono">
            <Link to="/privacy">privacy.txt</Link>
            <Link to="/terms">terms.txt</Link>
            <a href="mailto:nileshvermaq@gmail.com">mail</a>
          </div>
          <div className="text-retro-fg-dim font-mono">
            served from /var/www/nilesh — uptime 9001d
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

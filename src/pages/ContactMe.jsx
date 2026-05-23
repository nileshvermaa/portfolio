import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import DialogWindow from "../components/ui/DialogWindow";
import { useSeoMeta } from "../hooks/useSeoMeta";

/* ── Helpers ────────────────────────────────────────────────────── */

const EMPTY = { name: "", email: "", subject: "", message: "" };

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = "Name is required";
  if (!f.email.trim() || !/\S+@\S+\.\S+/.test(f.email))
    e.email = "Valid email address required";
  if (!f.subject.trim()) e.subject = "Subject is required";
  if (f.message.trim().length < 10)
    e.message = "Message must be at least 10 characters";
  return e;
}

const PacketBar = ({ pct }) => {
  const filled = Math.floor(pct / 5);
  const bar =
    "=".repeat(filled) +
    (pct < 100 ? ">" : "") +
    " ".repeat(Math.max(0, 20 - filled - (pct < 100 ? 1 : 0)));
  return (
    <div className="font-mono text-sm space-y-1">
      <div className="text-retro-fg-dim">
        Sending packets to nileshvermaq@gmail.com...
      </div>
      <div className="text-retro-fg">
        [{bar}] {pct}%
      </div>
    </div>
  );
};

const FieldRow = ({ label, required, error, children }) => (
  <div className="flex items-start gap-0">
    <label className="font-sys text-xs shrink-0 w-20 pt-[5px] text-retro-fg">
      {label}
      {required && (
        <span style={{ color: "#ff4444" }} className="ml-0.5">
          *
        </span>
      )}
    </label>
    <div className="flex-1">
      {children}
      {error && (
        <div
          className="font-mono text-xs mt-[2px]"
          style={{ color: "#ff4444" }}
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  </div>
);

const inputCls =
  "w-full font-mono text-sm px-[5px] py-[3px] bg-retro-bg text-retro-fg outline-none focus:ring-1 focus:ring-retro-accent bevel-in disabled:opacity-60";

const SocialBtn = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target={href.startsWith("mailto") ? undefined : "_blank"}
    rel="noreferrer"
    className="bevel-out inline-flex items-center gap-2 px-3 py-1 font-sys text-xs no-underline text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg"
  >
    <Icon className="w-3 h-3" aria-hidden />
    {label}
  </a>
);

/* ── Page ────────────────────────────────────────────────────────── */

const ContactMe = () => {
  useSeoMeta({
    title: "Contact",
    description: "Send a message to Nilesh Verma — Cloud Specialist / Solutions Architect. Get in touch via the retro compose window.",
    path: "/contact",
  });
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [pct, setPct] = useState(0);
  const timerRef = useRef(null);

  const change = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    setPct(0);

    // Animate 0 → 85 at ~4% per 80ms, then hold
    let cur = 0;
    timerRef.current = setInterval(() => {
      cur = Math.min(cur + 4, 85);
      setPct(cur);
      if (cur >= 85) clearInterval(timerRef.current);
    }, 80);

    const key = import.meta.env.VITE_WEB3FORMS_KEY;

    try {
      if (key) {
        const fd = new FormData();
        fd.append("access_key", key);
        fd.append("name", form.name);
        fd.append("email", form.email);
        fd.append("subject", `[NILESH.SYS] ${form.subject}`);
        fd.append("message", form.message);
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message ?? "Failed");
      } else {
        // No API key — simulate in demo mode
        await new Promise((r) => setTimeout(r, 1800));
      }

      clearInterval(timerRef.current);
      setPct(100);
      setTimeout(() => {
        setStatus("success");
        setForm(EMPTY);
      }, 400);
    } catch {
      clearInterval(timerRef.current);
      setPct(100);
      setTimeout(() => setStatus("error"), 400);
    }
  };

  const reset = () => {
    setStatus("idle");
    setPct(0);
  };

  return (
    <div className="space-y-4 py-2">
      {/* ── Main compose dialog ── */}
      <DialogWindow title="New Message — NILESH.SYS Mail Client v1.0" icon="✉">
        {/* Menu bar */}
        <div className="bg-retro-panel text-retro-fg font-sys text-xs flex border-b-2 border-retro-border-dark px-1">
          {["File", "Edit", "View", "Help"].map((m) => (
            <span
              key={m}
              className="px-3 py-1 cursor-default hover:bg-retro-chrome hover:text-retro-chrome-fg"
            >
              {m}
            </span>
          ))}
        </div>

        {/* To: line */}
        <div className="flex items-center border-b-2 border-retro-border-dark px-2 py-[3px] font-sys text-xs">
          <span className="w-20 shrink-0 text-retro-fg">To:</span>
          <span className="font-mono text-retro-fg">
            nileshvermaq@gmail.com
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
          className="p-3 space-y-2"
        >
          <FieldRow label="From:" required error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={change("email")}
              className={inputCls}
              placeholder="your@email.com"
              autoComplete="email"
              disabled={status === "sending"}
            />
          </FieldRow>

          <FieldRow label="Name:" required error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={change("name")}
              className={inputCls}
              placeholder="Your Name"
              autoComplete="name"
              disabled={status === "sending"}
            />
          </FieldRow>

          <FieldRow label="Subject:" required error={errors.subject}>
            <input
              type="text"
              value={form.subject}
              onChange={change("subject")}
              className={inputCls}
              placeholder="Cloud architecture role / collaboration / hello"
              disabled={status === "sending"}
            />
          </FieldRow>

          <div className="border-t-2 border-retro-border-dark pt-2">
            {errors.message && (
              <div
                className="font-mono text-xs mb-1"
                style={{ color: "#ff4444" }}
                role="alert"
              >
                {errors.message}
              </div>
            )}
            <textarea
              value={form.message}
              onChange={change("message")}
              rows={8}
              className={`${inputCls} resize-y`}
              placeholder="Write your message here..."
              disabled={status === "sending"}
              aria-label="Message body"
            />
          </div>

          {/* Progress */}
          <AnimatePresence>
            {status === "sending" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bevel-in p-2 overflow-hidden"
              >
                <PacketBar pct={pct} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {status === "error" && (
            <div
              className="bevel-in p-2 font-mono text-sm"
              style={{ color: "#ff4444" }}
              role="alert"
            >
              ERR: Delivery failed. Please retry or email directly:
              nileshvermaq@gmail.com
              <button
                type="button"
                onClick={reset}
                className="ml-3 bevel-out px-2 py-0 font-sys text-xs text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg"
              >
                Retry
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center gap-2 pt-1 border-t-2 border-retro-border-dark">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bevel-out px-4 py-1 font-sys text-sm text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ▶ Send
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(EMPTY);
                setErrors({});
              }}
              disabled={status === "sending"}
              className="bevel-out px-4 py-1 font-sys text-sm text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Status bar */}
        <div className="bevel-in mx-2 mb-2 px-2 font-sys text-xs text-retro-fg-dim">
          {status === "idle" && "Ready"}
          {status === "sending" && `Transmitting… ${pct}%`}
          {status === "success" && "Message delivered ✓"}
          {status === "error" && "Delivery failed — check connection"}
        </div>
      </DialogWindow>

      {/* ── Success message box ── */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18 }}
          >
            <DialogWindow title="Message Sent" icon="✉" onClose={reset}>
              <div
                className="p-6 font-sys text-sm text-center space-y-3"
                role="status"
                aria-live="polite"
              >
                <div className="text-5xl" aria-hidden>
                  ✉
                </div>
                <p className="text-retro-fg font-bold text-base">
                  Message sent successfully!
                </p>
                <p className="text-retro-fg-dim">
                  I&apos;ll get back to you within 24 hours.
                </p>
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={reset}
                    className="bevel-out px-10 py-1 font-sys text-sm text-retro-fg hover:bg-retro-chrome hover:text-retro-chrome-fg"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                  >
                    OK
                  </button>
                </div>
              </div>
            </DialogWindow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Social quick-links ── */}
      <DialogWindow title="Quick Links" icon="🔗">
        <div className="p-3 flex flex-wrap gap-3">
          <SocialBtn
            href="mailto:nileshvermaq@gmail.com"
            icon={Mail}
            label="nileshvermaq@gmail.com"
          />
          <SocialBtn
            href="https://github.com/nileshcf"
            icon={Github}
            label="github.com/nileshcf"
          />
          <SocialBtn
            href="https://www.linkedin.com/in/nileshvermaa/"
            icon={Linkedin}
            label="linkedin.com/in/nileshvermaa"
          />
        </div>
        <div className="font-mono text-xs text-retro-fg-dim px-3 pb-2">
          Response time: ≤ 24h. Prefer email for urgent matters.
        </div>
      </DialogWindow>

      {/* Dev note */}
      <div className="font-mono text-xs text-retro-fg-dim bevel-in p-2">
        <span className="text-retro-accent">$</span> To enable real
        submissions: set{" "}
        <code className="text-retro-fg">VITE_WEB3FORMS_KEY</code> in{" "}
        <code className="text-retro-fg">.env.local</code> — free key at{" "}
        <a
          href="https://web3forms.com"
          target="_blank"
          rel="noreferrer"
          className="text-retro-link"
        >
          web3forms.com
        </a>
        . Without it, the form runs in demo mode.
      </div>
    </div>
  );
};

export default ContactMe;

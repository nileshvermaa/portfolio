import React from "react";
import { motion } from "framer-motion";
import loveImage from "../assets/LOVE.png";
import BeveledPanel from "../components/ui/BeveledPanel";
import BlinkingCursor from "../components/ui/BlinkingCursor";
import { useSeoMeta } from "../hooks/useSeoMeta";

/* The /etc/dedications page — content preserved verbatim, retro-themed. */

const ENTRIES = [
  {
    icon: "🌟",
    title: "Radiant Confidence",
    body: "Watching you dance is like watching joy in its purest form. You inspire everyone to dream bigger and smile wider.",
  },
  {
    icon: "🤗",
    title: "Unwavering Kindness",
    body: "Your heart is open to everyone — your empathy turns ordinary days into beautiful memories.",
  },
  {
    icon: "🕊️",
    title: "Healing Light",
    body: "Whether it's through a scolding or a hug, you always find a way to bring me back to myself when I'm lost.",
  },
  {
    icon: "🌸",
    title: "Innocent Joy",
    body: "You see magic in the little things — your laughter, your curiosity, your silly moments... they melt my heart.",
  },
  {
    icon: "💪",
    title: "Strength & Wisdom",
    body: "No matter what life throws at you, you rise — with grace, with patience, and with unmatched elegance.",
  },
  {
    icon: "❤️",
    title: "Deepest Love",
    body: "You love with all your soul — in a way that sees the real me and loves me more for it.",
  },
];

const Love = () => {
  useSeoMeta({
    title: "Love",
    description: "A retro-styled dedication page — /etc/dedications.",
    path: "/love",
  });
  return (
  <div className="space-y-4 py-2">
    {/* Header banner */}
    <BeveledPanel title="/etc/dedications — cat /etc/dedications/pragati.txt">
      <div className="font-mono text-sm space-y-1">
        <div className="text-retro-fg-dim">
          $ cat /etc/dedications/pragati.txt
        </div>
        <div className="text-retro-fg-dim text-xs">
          ──────────────────────────────────────────────────────────
        </div>
        <div className="text-retro-accent font-bold text-lg">
          # My Cutu
          <BlinkingCursor />
        </div>
        <div className="text-retro-fg">
          You are the reason I smile brighter.
        </div>
      </div>
    </BeveledPanel>

    {/* Photo */}
    <BeveledPanel title="cutu.jpg — eog cutu.jpg">
      <div className="bevel-in overflow-hidden" style={{ maxHeight: 400 }}>
        <motion.img
          src={loveImage}
          alt="My Love — Pragati"
          className="w-full object-cover"
          style={{ maxHeight: 400 }}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop";
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <div className="font-mono text-xs text-retro-fg-dim mt-1 text-center">
        cutu.jpg — permissions: 600 (private) — owner: nilesh
      </div>
    </BeveledPanel>

    {/* Opening paragraph */}
    <BeveledPanel title="message.txt">
      <p className="font-mono text-sm text-retro-fg leading-relaxed">
        From the moment I met you, I&apos;ve known there was something truly
        special about you — a magic that radiates far beyond just beauty. Every
        day, you show me what real love looks like. 💖
      </p>
      <p className="font-mono text-xs text-retro-fg-dim mt-2">
        Here&apos;s everything that makes you unforgettable:
      </p>
    </BeveledPanel>

    {/* Entries — styled as log/readme sections */}
    {ENTRIES.map((entry, i) => (
      <motion.div
        key={entry.title}
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.3, delay: i * 0.06 }}
      >
        <BeveledPanel title={`[${String(i + 1).padStart(2, "0")}] ${entry.title}`}>
          <div className="flex gap-3 font-mono text-sm">
            <span className="text-2xl shrink-0" aria-hidden>
              {entry.icon}
            </span>
            <div>
              <div className="text-retro-accent font-bold mb-1">
                {entry.title}
              </div>
              <p className="text-retro-fg leading-relaxed">{entry.body}</p>
            </div>
          </div>
        </BeveledPanel>
      </motion.div>
    ))}

    {/* Closing */}
    <BeveledPanel title="EOF — end of /etc/dedications/pragati.txt">
      <div className="font-mono text-sm space-y-3 text-center">
        <p className="text-retro-fg leading-relaxed">
          <strong className="text-retro-accent">Pragati</strong>, you are not
          just special —{" "}
          <strong className="text-retro-accent">you are extraordinary</strong>.
          ✨ You&apos;ve brought light, meaning, and magic into my life in ways
          I never imagined.
        </p>
        <p className="text-retro-fg leading-relaxed">
          Thank you for being my sunshine, my safe place, my most beautiful
          person inside and out. ☀️💫
          <br />I admire you endlessly and love you more than words can ever
          say. 💌
        </p>
        <div className="text-retro-fg-dim text-xs pt-2 border-t-2 border-retro-border-dark">
          written by: nilesh · checksum: ∞ · last modified: always
        </div>
      </div>
    </BeveledPanel>
  </div>
  );
};

export default Love;

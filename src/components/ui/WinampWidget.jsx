import React, { useState, useEffect } from "react";
import { currently } from "../../content/currently";

const TRACKS = [
  currently.listening,
  "Boards of Canada — Roygbiv",
  "Daft Punk — Harder Better Faster Stronger",
  "Aphex Twin — Windowlicker",
  "Nine Inch Nails — Closer (The Downward Spiral)",
  "lofi.cafe — late night study mix",
];

const pad = (n) => String(Math.floor(n)).padStart(2, "0");

const WinampWidget = () => {
  const [playing, setPlaying] = useState(true);
  const [trackIdx] = useState(0);
  const [sec, setSec] = useState(74); // fake elapsed

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setSec((s) => (s + 1) % 3600), 1000);
    return () => clearInterval(t);
  }, [playing]);

  const mins = pad(Math.floor(sec / 60));
  const secs = pad(sec % 60);

  return (
    <div
      className="bevel-out w-full max-w-xs font-mono text-xs"
      style={{ minWidth: 200 }}
      role="region"
      aria-label="Decorative music player widget"
    >
      {/* Title bar */}
      <div className="bg-retro-chrome text-retro-chrome-fg flex items-center justify-between px-2 py-[2px] font-sys text-[10px]">
        <span className="font-bold">WINAMP v2.95 — NILESH.FM</span>
        <span aria-hidden>[-][□][x]</span>
      </div>

      {/* Display */}
      <div className="bg-black px-2 py-1 border-b-2 border-retro-border-dark">
        <div className="text-[#00ff00] text-[10px] truncate"
          style={{ fontFamily: '"VT323", monospace', fontSize: 14, letterSpacing: 1 }}
        >
          {TRACKS[trackIdx]}
        </div>
        <div className="flex justify-between text-[#ff8800] mt-1"
          style={{ fontFamily: '"VT323", monospace', fontSize: 13 }}
        >
          <span>{playing ? "▶ PLAYING" : "■ PAUSED"}</span>
          <span>{mins}:{secs}</span>
        </div>
        {/* Fake EQ bars */}
        <div className="flex gap-[2px] mt-1" aria-hidden="true">
          {playing
            ? [4, 7, 5, 8, 6, 9, 7, 5, 4, 6, 8, 7].map((h, i) => (
                <div
                  key={i}
                  className="bg-[#00ff00]"
                  style={{ width: 3, height: h, alignSelf: "flex-end" }}
                />
              ))
            : Array(12)
                .fill(2)
                .map((h, i) => (
                  <div
                    key={i}
                    className="bg-[#004400]"
                    style={{ width: 3, height: h, alignSelf: "flex-end" }}
                  />
                ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-1 p-1 bg-retro-panel">
        {["|◀", "▶▶", "■", "▐▌", "▶▶|"].map((label, i) => (
          <button
            key={i}
            type="button"
            aria-label={["prev", "rewind", "stop", i === 3 ? (playing ? "pause" : "play") : "next"][i] ?? label}
            onClick={() => i === 3 && setPlaying((p) => !p)}
            className="bevel-out px-1 py-[2px] text-retro-fg font-sys text-[10px] hover:bg-retro-chrome hover:text-retro-chrome-fg"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WinampWidget;

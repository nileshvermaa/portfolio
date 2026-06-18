import React, { useState, useRef, useEffect, useCallback } from "react";

/* ─── Stations ──────────────────────────────────────────────────────── */
const STATIONS = [
  {
    id: "groovesalad",
    name: "Groove Salad",
    genre: "ambient · lofi",
    url: "https://ice1.somafm.com/groovesalad-128-mp3",
    color: "#00ff00",
  },
  {
    id: "vaporwaves",
    name: "Vaporwaves",
    genre: "vaporwave · chill",
    url: "https://ice1.somafm.com/vaporwaves-128-mp3",
    color: "#ff44ff",
  },
  {
    id: "dronezone",
    name: "Drone Zone",
    genre: "deep ambient",
    url: "https://ice1.somafm.com/dronezone-128-mp3",
    color: "#00e5ff",
  },
  {
    id: "secretagent",
    name: "Secret Agent",
    genre: "spy jazz · retro",
    url: "https://ice1.somafm.com/secretagent-128-mp3",
    color: "#ffdd00",
  },
];

/* ─── EQ bar data ───────────────────────────────────────────────────── */
const EQ_BARS = 14;
// Each bar gets a random peak height and animation speed baked in
const BAR_CONFIG = Array.from({ length: EQ_BARS }, (_, i) => ({
  peak: 4 + Math.floor((((i * 7 + 3) % 11) / 10) * 10), // 4–14 px
  speed: 0.28 + ((i * 3) % 7) * 0.06,                    // 0.28–0.64 s
  delay: ((i * 5) % 9) * 0.05,                            // 0–0.4 s offset
}));

const pad = (n) => String(Math.floor(n)).padStart(2, "0");

/* ─── Component ─────────────────────────────────────────────────────── */
const WinampWidget = () => {
  const audioRef = useRef(null);
  const [stationIdx, setStationIdx] = useState(0);
  const [playing, setPlaying] = useState(false);   // OFF by default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(0.6);
  const [elapsed, setElapsed] = useState(0);
  const station = STATIONS[stationIdx];

  /* ── Elapsed timer (counts up while playing) ─ */
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [playing]);

  /* ── Volume sync ─────────────────────────────── */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  /* ── Play / pause helper ─────────────────────── */
  const doPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(null);
    setLoading(true);
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setError("stream unavailable");
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const doPause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    setLoading(false);
  }, []);

  /* ── Station switch ──────────────────────────── */
  const switchStation = useCallback(
    (dir) => {
      doPause();
      setElapsed(0);
      setError(null);
      setStationIdx((i) => (i + dir + STATIONS.length) % STATIONS.length);
    },
    [doPause]
  );

  /* ── Auto-play after station changes (if was playing) ─ */
  const wasPlayingRef = useRef(false);
  useEffect(() => {
    if (wasPlayingRef.current) {
      doPlay();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationIdx]);

  const handlePrev = () => {
    wasPlayingRef.current = playing;
    switchStation(-1);
  };
  const handleNext = () => {
    wasPlayingRef.current = playing;
    switchStation(1);
  };

  const togglePlay = () => {
    if (loading) return;
    if (playing) {
      doPause();
    } else {
      wasPlayingRef.current = false;
      doPlay();
    }
  };

  const mins = pad(Math.floor(elapsed / 60));
  const secs = pad(elapsed % 60);

  /* ── Status text ─────────────────────────────── */
  let statusText = "■ STOPPED";
  if (loading) statusText = "⌛ BUFFERING";
  else if (error) statusText = `⚠ ${error.toUpperCase()}`;
  else if (playing) statusText = "▶ LIVE";

  return (
    <div
      className="bevel-out w-full max-w-xs font-mono text-xs select-none"
      style={{ minWidth: 200 }}
      role="region"
      aria-label="Radio player — SomaFM internet radio"
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={station.url}
        preload="none"
        crossOrigin="anonymous"
        onError={() => {
          setError("stream unavailable");
          setPlaying(false);
          setLoading(false);
        }}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
      />

      {/* ── Title bar ── */}
      <div className="bg-retro-chrome text-retro-chrome-fg flex items-center justify-between px-2 py-[2px] font-sys text-[10px]">
        <span className="font-bold">WINAMP v2.95 — NILESH.FM</span>
        <span aria-hidden>[-][□][x]</span>
      </div>

      {/* ── Display ── */}
      <div className="bg-black px-2 py-[6px] border-b-2 border-retro-border-dark">
        {/* Station name + LIVE badge */}
        <div className="flex items-center gap-2">
          <span
            className="truncate flex-1"
            style={{ fontFamily: '"VT323", monospace', fontSize: 15, color: station.color, letterSpacing: 1 }}
          >
            {station.name}
          </span>
          {playing && (
            <span
              className="retro-blink text-[9px] px-1 border"
              style={{ borderColor: station.color, color: station.color }}
            >
              LIVE
            </span>
          )}
        </div>

        {/* Genre */}
        <div style={{ fontFamily: '"VT323", monospace', fontSize: 12, color: "#888", marginTop: 1 }}>
          {station.genre} · SomaFM
        </div>

        {/* Status + elapsed */}
        <div className="flex justify-between mt-[3px]"
          style={{ fontFamily: '"VT323", monospace', fontSize: 13, color: "#ff8800" }}
        >
          <span>{statusText}</span>
          <span>{mins}:{secs}</span>
        </div>

        {/* EQ bars */}
        <div className="flex items-end gap-[2px] mt-[5px]" style={{ height: 14 }} aria-hidden="true">
          {BAR_CONFIG.map((cfg, i) =>
            playing ? (
              <div
                key={i}
                className="eq-bar"
                style={{
                  width: 3,
                  backgroundColor: station.color,
                  height: cfg.peak,
                  animationDuration: `${cfg.speed}s`,
                  animationDelay: `${cfg.delay}s`,
                  "--eq-peak": `${cfg.peak}px`,
                  "--eq-speed": `${cfg.speed}s`,
                }}
              />
            ) : (
              <div
                key={i}
                style={{ width: 3, height: 2, backgroundColor: "#1a4a1a", alignSelf: "flex-end" }}
              />
            )
          )}
        </div>
      </div>

      {/* ── Volume slider ── */}
      <div className="bg-retro-panel px-2 py-1 flex items-center gap-2 border-b border-retro-border-dark">
        <span className="text-retro-fg-dim font-sys text-[9px]" aria-hidden>VOL</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          aria-label="Volume"
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-[6px] cursor-pointer accent-retro-accent"
          style={{ accentColor: station.color }}
        />
        <span className="text-retro-fg-dim font-sys text-[9px] w-6 text-right">
          {Math.round(volume * 100)}
        </span>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center gap-1 p-1 bg-retro-panel">
        {/* Prev */}
        <button
          type="button"
          aria-label="Previous station"
          onClick={handlePrev}
          className="bevel-out px-[6px] py-[2px] text-retro-fg font-sys text-[10px] hover:bg-retro-chrome hover:text-retro-chrome-fg"
        >
          |◀
        </button>

        {/* Play / Pause */}
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlay}
          disabled={loading}
          className="bevel-out px-[6px] py-[2px] font-sys text-[10px] hover:bg-retro-chrome hover:text-retro-chrome-fg disabled:opacity-50"
          style={{ color: playing ? station.color : undefined }}
        >
          {loading ? "⌛" : playing ? "▐▌" : "▶"}
        </button>

        {/* Stop */}
        <button
          type="button"
          aria-label="Stop"
          onClick={doPause}
          className="bevel-out px-[6px] py-[2px] text-retro-fg font-sys text-[10px] hover:bg-retro-chrome hover:text-retro-chrome-fg"
        >
          ■
        </button>

        {/* Next */}
        <button
          type="button"
          aria-label="Next station"
          onClick={handleNext}
          className="bevel-out px-[6px] py-[2px] text-retro-fg font-sys text-[10px] hover:bg-retro-chrome hover:text-retro-chrome-fg"
        >
          ▶▶|
        </button>

        {/* Station indicator dots */}
        <div className="flex gap-[3px] ml-auto mr-1" aria-hidden="true">
          {STATIONS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Switch to ${s.name}`}
              onClick={() => {
                wasPlayingRef.current = playing;
                doPause();
                setElapsed(0);
                setError(null);
                setStationIdx(i);
              }}
              className="w-[6px] h-[6px] rounded-full border border-current hover:opacity-80"
              style={{
                backgroundColor: i === stationIdx ? station.color : "transparent",
                borderColor: s.color,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Attribution ── */}
      <div className="bg-retro-panel px-2 pb-[3px]">
        <a
          href="https://somafm.com/"
          target="_blank"
          rel="noreferrer"
          className="text-retro-fg-dim hover:text-retro-accent font-sys text-[8px]"
        >
          ♫ powered by SomaFM — free internet radio
        </a>
      </div>
    </div>
  );
};

export default WinampWidget;

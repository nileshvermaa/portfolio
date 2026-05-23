import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import ScanlineOverlay from "./components/effects/ScanlineOverlay";
import MatrixRain from "./components/effects/MatrixRain";
import PixelSprite from "./components/effects/PixelSprite";
import BootSequence from "./components/layout/BootSequence";
import Loading from "./components/Loading";
import { useTheme } from "./hooks/useTheme";
import { useKonami } from "./hooks/useKonami";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Projects = lazy(() => import("./pages/Projects"));
const Love = lazy(() => import("./pages/Love"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/ContactMe"));

function AppInner() {
  const [matrixOn, setMatrixOn] = useState(false);
  useTheme();
  useKonami(() => setMatrixOn(true));

  // Restore persisted synthwave-grid preference on load.
  useEffect(() => {
    try {
      if (localStorage.getItem("nilesh.sys.synthwave") === "on") {
        document.documentElement.classList.add("synthwave-grid");
      }
    } catch {}
  }, []);

  return (
    <>
      <ScanlineOverlay />
      <BootSequence />
      {matrixOn && <MatrixRain onComplete={() => setMatrixOn(false)} />}
      <PixelSprite />

      {/* Skip-to-content — visually hidden until focused */}
      <a
        href="#main"
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 max-w-[1400px] w-full mx-auto px-3 md:px-6 py-4 flex gap-6">
          <main className="flex-1 min-w-0" id="main" tabIndex={-1}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/love" element={<Love />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </main>
          <Sidebar />
        </div>
        <Footer />
        <Analytics />
      </div>
    </>
  );
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppInner />
    </Router>
  );
}

export default App;

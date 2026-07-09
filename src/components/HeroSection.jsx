"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { H, M } from "../constants/tokens";
import { TRANSLATIONS } from "../constants/translations";

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 175;
const FRAME_PATH = (i) => {
  const num = String(18 + i).padStart(3, "0");
  return `/sequence/ezgif-frame-${num}.jpg`;
};

// Executive kinetic easing curve used across all motion in this component
const EASE_BUTTER = [0.16, 1, 0.3, 1];

const GLASS_PANEL_STYLE = {
  backdropFilter: "blur(32px) saturate(180%)",
  WebkitBackdropFilter: "blur(32px) saturate(180%)",
  backgroundColor: "rgba(255, 255, 255, 0.035)",
  border: "1px solid rgba(255, 255, 255, 0.11)",
  boxShadow:
    "inset 0 1px 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.5)",
};

// ─── Glass Overlay Panel ──────────────────────────────────────────────────────
function OverlayPanel({ children }) {
  return (
    <div
      className="rounded-[24px] px-5 py-5 sm:px-6 sm:py-6 w-[90vw] max-w-xs sm:max-w-sm"
      style={GLASS_PANEL_STYLE}
    >
      {children}
    </div>
  );
}

// ─── Scroll-Driven Text Overlay ───────────────────────────────────────────────
function ScrollOverlay({ progress, lang }) {
  const introVisible = progress >= 0.0 && progress < 0.18;
  const leftVisible = progress >= 0.25 && progress <= 0.55;
  const rightVisible = progress > 0.55 && progress <= 0.82;
  const ctaVisible = progress >= 0.82;

  const ctaRef = useRef(null);
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });

  const t = TRANSLATIONS[lang].hero;

  const handleMouseMove = useCallback((e) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 90;
    if (dist < maxDist) {
      const strength = (1 - dist / maxDist) * 20;
      setMagnetic({ x: (dx / dist) * strength, y: (dy / dist) * strength });
    } else {
      setMagnetic({ x: 0, y: 0 });
    }
  }, []);

  const fadeVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE_BUTTER },
    },
    exit: {
      opacity: 0,
      y: -16,
      filter: "blur(8px)",
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-4">
      <AnimatePresence mode="wait">
        {introVisible && (
          <motion.div
            key="intro"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center text-center"
          >
            <span
              className="block text-[10px] uppercase tracking-[0.4em] text-blue-400 mb-5"
              style={M}
            >
              Portfolio <span className="text-zinc-600">/ 2026</span>
            </span>
            <h1
              className="font-black font-sans uppercase leading-none"
              style={{
                ...H,
                fontSize: "clamp(2.6rem, 8.5vw, 7.5rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.88,
              }}
            >
              <span className="block bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                MUHAMAD AZKA
              </span>
              <span
                className="block"
                style={{
                  textShadow:
                    "0 0 40px rgba(96,165,250,0.55), 0 0 90px rgba(37,99,235,0.25)",
                  color: "#f4f4f5",
                }}
              >
                FIRMANSYAH
              </span>
            </h1>
            <p
              className="text-zinc-400 tracking-wide mt-5"
              style={{ ...M, fontSize: "clamp(9px, 1.4vw, 13px)" }}
            >
              Systems Information <span className="text-blue-400">&amp;</span>{" "}
              Creative Developer
            </p>
          </motion.div>
        )}

        {leftVisible && (
          <motion.div
            key="left"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center sm:justify-start px-4 sm:px-0 sm:pl-8 md:pl-14 lg:pl-20 pointer-events-auto"
          >
            <OverlayPanel>
              <span
                className="block text-[9px] text-blue-400 uppercase tracking-[0.4em] mb-2"
                style={M}
              >
                {t.expertiseLabel}
              </span>
              <p
                className="font-bold leading-snug"
                style={{
                  ...H,
                  fontSize: "clamp(1.02rem, 2vw, 1.25rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {t.expertiseTitle1}
                </span>
                <span className="text-blue-400">{t.expertiseTitleHighlight}</span>
                <span className="bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {t.expertiseTitle2}
                </span>
              </p>
              <div
                className="mt-2.5 h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(37,99,235,0.4), transparent)",
                }}
              />
              <p
                className="mt-2.5 text-[11.5px] sm:text-[12.5px] leading-relaxed"
                style={{ ...M, color: "#a1a1aa" }}
              >
                {t.expertiseDesc}
              </p>
            </OverlayPanel>
          </motion.div>
        )}

        {rightVisible && (
          <motion.div
            key="right"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center sm:justify-end px-4 sm:px-0 sm:pr-8 md:pr-14 lg:pr-20 pointer-events-auto"
          >
            <OverlayPanel>
              <span
                className="block text-[9px] text-blue-400 uppercase tracking-[0.4em] mb-2"
                style={M}
              >
                {t.securityLabel}
              </span>
              <p
                className="font-bold leading-snug"
                style={{
                  ...H,
                  fontSize: "clamp(1.02rem, 2vw, 1.25rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {t.securityTitle1}
                </span>
                <span className="text-blue-400">{t.securityTitleHighlight}</span>
                <span className="bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {t.securityTitle2}
                </span>
              </p>
              <div
                className="mt-2.5 h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(37,99,235,0.4), transparent)",
                }}
              />
              <p
                className="mt-2.5 text-[11.5px] sm:text-[12.5px] leading-relaxed"
                style={{ ...M, color: "#a1a1aa" }}
              >
                {t.securityDesc}
              </p>
            </OverlayPanel>
          </motion.div>
        )}

        {ctaVisible && (
          <motion.div
            key="cta"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto px-4"
          >
            <p
              className="font-extrabold"
              style={{
                ...H,
                fontSize: "clamp(1.6rem, 5vw, 3.8rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                marginBottom: "clamp(24px, 4vw, 40px)",
              }}
            >
              <span className="bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                {t.ctaTitle}
              </span>
              <span
                style={{
                  color: "#60a5fa",
                  textShadow: "0 0 32px rgba(96,165,250,0.4)",
                }}
              >
                {t.ctaHighlight}
              </span>
            </p>
            <motion.button
              ref={ctaRef}
              id="cta-start-project"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMagnetic({ x: 0, y: 0 })}
              animate={{ x: magnetic.x, y: magnetic.y }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative inline-flex items-center gap-3 rounded-full text-zinc-50 font-semibold text-sm overflow-hidden pointer-events-auto"
              style={{
                ...H,
                padding: "14px 40px",
                ...GLASS_PANEL_STYLE,
                borderRadius: 999,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.22) 0%, rgba(96,165,250,0.1) 100%)",
                  transition: `opacity 0.8s cubic-bezier(${EASE_BUTTER.join(
                    ",",
                  )})`,
                }}
              />
              <span className="relative z-10">{t.ctaButton}</span>
              <span className="relative z-10 text-blue-400">→</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Hero Section ────────────────────────────────────────────────────────
export function HeroSection({ lang = "id" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const rafRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // ── Local 1:1 scroll pinned tracking ──────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  // ── Precision frame index (clamped 0–174) ─────────────────────────────────
  const targetFrame = Math.min(
    TOTAL_FRAMES - 1,
    Math.floor(progress * (TOTAL_FRAMES - 1)),
  );

  // ── Preload all 175 frames ────────────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    const images = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);

      const handleDone = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };

      img.onload = handleDone;
      img.onerror = handleDone;
      images[i] = img;
    }
  }, []);

  // ── Canvas draw helper ────────────────────────────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight,
    );
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      (canvas.width - sw) / 2,
      (canvas.height - sh) / 2,
      sw,
      sh,
    );
  }, []);

  // ── Direct-snap rAF loop (NO interpolation bottleneck) ────────────────────
  useEffect(() => {
    if (!loaded) return;
    let currentIndex = -1;

    function loop() {
      rafRef.current = requestAnimationFrame(loop);
      const target = frameIndexRef.current;
      if (currentIndex !== target) {
        currentIndex = target; // Instant snap — zero lag, 1:1 scroll-to-frame
        drawFrame(currentIndex);
      }
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame]);

  // ── Sync target frame from scroll progress ────────────────────────────────
  useEffect(() => {
    frameIndexRef.current = targetFrame;
  }, [targetFrame]);

  // ── Canvas resize handler ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (loaded) drawFrame(frameIndexRef.current);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="h-[450vh] relative bg-zinc-950 z-[1] overflow-visible"
      aria-label="Sequence scroll hero animation"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden block bg-[#09090b]">
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 35%, rgba(9,9,11,0.8) 100%)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "#09090b", zIndex: 0 }}
          aria-hidden="true"
        />
        {loaded && <ScrollOverlay progress={progress} lang={lang} />}
      </div>
    </section>
  );
}

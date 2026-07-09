"use client";

import React, { useEffect, useRef, useState } from "react";
import { H, B, M } from "../constants/tokens";
import { TRANSLATIONS } from "../constants/translations";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BLUE_NAVY = "#2563eb";
const BLUE_SKY = "#60a5fa";
const BLUE_LIGHT = "#93c5fd";

// ─── Data ─────────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    id: "mnc",
    institution: "MNC University",
    degree: "Bachelor of Information Systems",
    subDegree: "Sistem Informasi",
    period: "2025 – Present",
    badge: "Active / Undergrad",
    badgeVariant: "active",
    chips: ["Systems", "Web Tech", "Databases"],
    progress: 40,
    details:
      "Focus on data structures, information systems management, and web technology integrations. Building a foundation for enterprise-grade software architecture and scalable systems design.",
    accentColor: BLUE_NAVY,
    glowColor: "rgba(37,99,235,0.35)",
    borderColor: "rgba(255,255,255,0.09)",
    gradient:
      "linear-gradient(135deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
  },
  {
    id: "smkn7",
    institution: "SMK Negeri 7 Baleendah",
    degree: "Software Engineering",
    subDegree: "Rekayasa Perangkat Lunak (RPL)",
    period: "Graduated Alumnus",
    badge: "Alumni",
    badgeVariant: "alumni",
    chips: ["Desktop Dev", "SQL / RDBMS", "Full-Stack Web"],
    progress: 100,
    details:
      "Core foundation in desktop programming, relational databases, basic networking, and full-stack web development. The place where curiosity turned into craft.",
    accentColor: BLUE_SKY,
    glowColor: "rgba(96,165,250,0.25)",
    borderColor: "rgba(255,255,255,0.09)",
    gradient:
      "linear-gradient(135deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
  },
];

// ─── Keyframes & class styles ──────────────────────────────────────────────────
const styles = `
  @keyframes edu-gridPan {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(56px, 56px); }
  }
  // @keyframes edu-scanDown {
  //   0%   { top: 0%;   opacity: 0; }
  //   8%   { opacity: 1; }
  //   92%  { opacity: 1; }
  //   100% { top: 100%; opacity: 0; }
  // }
  @keyframes edu-orbFloat {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(20px, 30px) scale(1.1); }
  }
  @keyframes edu-fadeSlideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes edu-lineExpand {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes edu-slideInCard {
    from { opacity: 0; transform: translateX(-40px) scale(0.96); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes edu-glowPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%      { opacity: 1;   transform: scale(1.2); }
  }
  @keyframes edu-shimmer {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  @keyframes edu-dotPulse {
    0%, 100% { opacity: 1;   transform: scale(1); }
    50%      { opacity: 0.3; transform: scale(0.6); }
  }
  @keyframes edu-cornerBlink {
    0%, 100% { opacity: 0.4; }
    50%      { opacity: 1; }
  }
  @keyframes edu-progressLoad {
    from { width: 0; }
    to   { width: var(--edu-target-width); }
  }
  @keyframes edu-particleRise {
    0%   { bottom: -10px; opacity: 0.6; }
    100% { bottom: 110%;  opacity: 0; }
  }
  @keyframes edu-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }

  .edu-section {
    width: 100%; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 4rem 1.5rem;
  }
  .edu-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px);
    background-size: 56px 56px;
    animation: edu-gridPan 20s linear infinite;
  }
  // .edu-scanline {
  //   position: absolute; left: 0; right: 0; top: 0;
  //   height: 2px; pointer-events: none; z-index: 2;
  //   background: linear-gradient(90deg, transparent, rgba(96,165,250,0.55), transparent);
  //   animation: edu-scanDown 5s ease-in-out infinite;
  // }
  .edu-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); pointer-events: none;
    animation: edu-orbFloat var(--edu-dur, 8s) ease-in-out infinite alternate;
  }
  .edu-header {
    display: flex; align-items: center; gap: 16px; margin-bottom: 3rem;
    animation: edu-fadeSlideDown 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .edu-header-line {
    flex: 1; height: 1px;
    background: linear-gradient(to right, rgba(37,99,235,0.4), transparent);
    transform-origin: left; transform: scaleX(0);
    animation: edu-lineExpand 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
  }
  .edu-card {
    position: relative; border-radius: 20px; padding: 20px; overflow: hidden;
    transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    cursor: default;
    opacity: 0; transform: translateX(-40px) scale(0.96);
    backdrop-filter: blur(28px) saturate(160%);
    -webkit-backdrop-filter: blur(28px) saturate(160%);
  }
  @media (min-width: 768px) {
    .edu-card { padding: 32px; }
  }
  .edu-card.edu-card--visible {
    animation: edu-slideInCard 0.8s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .edu-card:hover {
    transform: translateY(-5px) scale(1.006) !important;
    box-shadow: 0 24px 64px rgba(37,99,235,0.18), 0 0 0 1px rgba(37,99,235,0.32) !important;
  }
  .edu-card-glow {
    position: absolute; top: -40px; right: -40px;
    width: 180px; height: 180px; border-radius: 50%;
    pointer-events: none;
    animation: edu-glowPulse 3s ease-in-out infinite;
  }
  .edu-corner { position: absolute; top: 0; left: 0; pointer-events: none; }
  .edu-corner::before, .edu-corner::after {
    content: ''; position: absolute;
    background: var(--edu-corner-color);
    animation: edu-cornerBlink 2s ease-in-out infinite;
  }
  .edu-corner::before { top: 0; left: 0; width: 22px; height: 2px; }
  .edu-corner::after  { top: 0; left: 0; width: 2px;  height: 22px; }
  .edu-card-sweep {
    position: absolute; left: 0; right: 0; height: 50%; pointer-events: none;
    background: linear-gradient(to bottom, transparent, rgba(96,165,250,0.04), transparent);
    transform: skewY(-2deg); top: -100%; transition: top 0s;
  }
  .edu-card:hover .edu-card-sweep { top: 120%; transition: top 0.9s cubic-bezier(0.4,0,0.2,1); }
  .edu-divider {
    height: 1px; background: rgba(255,255,255,0.06);
    margin-bottom: 14px; position: relative; overflow: hidden;
  }
  .edu-divider::after {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(96,165,250,0.45), transparent);
    animation: edu-shimmer 3.5s ease-in-out infinite;
  }
  .edu-institution { position: relative; display: inline-block; }
  .edu-institution::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    height: 1px; width: 0; background: var(--edu-accent);
    transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .edu-card:hover .edu-institution::after { width: 100%; }
  .edu-chip {
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 4px; border: 1px solid;
    opacity: 0.55; transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .edu-card:hover .edu-chip { opacity: 1; }
  .edu-card:hover .edu-chip:nth-child(1) { transition-delay: 0s; }
  .edu-card:hover .edu-chip:nth-child(2) { transition-delay: 0.05s; }
  .edu-card:hover .edu-chip:nth-child(3) { transition-delay: 0.10s; }
  .edu-badge-dot {
    display: inline-block; width: 5px; height: 5px; border-radius: 50%;
    background: #60a5fa; margin-right: 6px; vertical-align: middle;
    animation: edu-dotPulse 1.5s ease-in-out infinite;
  }
  .edu-badge { transition: transform 0.3s ease; }
  .edu-card:hover .edu-badge { transform: scale(1.06); }
  .edu-progress-wrap {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; border-radius: 0 0 20px 20px; overflow: hidden;
  }
  .edu-progress-fill {
    height: 100%; width: 0;
    background: linear-gradient(90deg, #1d4ed8, #60a5fa);
    animation: edu-progressLoad 1.4s cubic-bezier(0.16,1,0.3,1) 0.8s forwards;
  }
  .edu-particles {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
    opacity: 0; transition: opacity 0.4s ease;
  }
  .edu-card:hover .edu-particles { opacity: 1; }
  .edu-particle {
    position: absolute; width: 1px; background: rgba(96,165,250,0.5);
    animation: edu-particleRise var(--edu-pdur) ease-out infinite;
    animation-delay: var(--edu-pdelay);
  }
  .edu-desc { transition: color 0.35s ease; }
  .edu-card:hover .edu-desc { color: #c4c4c8 !important; }
  .edu-cursor {
    display: inline-block; width: 2px; height: 0.9em;
    background: #60a5fa; margin-left: 2px; vertical-align: middle;
    animation: edu-blink 1s step-end infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .edu-grid, .edu-scanline, .edu-orb, .edu-card-glow,
    .edu-badge-dot, .edu-corner::before, .edu-corner::after,
    .edu-divider::after, .edu-particle { animation: none !important; }
    .edu-card { animation: none !important; opacity: 1 !important; transform: none !important; }
    .edu-progress-fill { animation: none !important; width: var(--edu-target-width) !important; }
  }
`;

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useTyped(text, active, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) return;
    let i = 0;
    setDisplayed("");
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [active, text, speed]);
  return displayed;
}

// ─── Particle layer ────────────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="edu-particles" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => {
        const left = ((i * 7.3 + 2) % 100).toFixed(1);
        const height = 20 + ((i * 17) % 60);
        const dur = (1.5 + ((i * 0.23) % 2)).toFixed(2);
        const delay = -((i * 0.37) % 2.2).toFixed(2);
        return (
          <div
            key={i}
            className="edu-particle"
            style={{
              left: `${left}%`,
              height: `${height}px`,
              "--edu-pdur": `${dur}s`,
              "--edu-pdelay": `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Individual card ───────────────────────────────────────────────────────────
function EduCard({ edu, index }) {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <div
      ref={ref}
      className={`edu-card${visible ? " edu-card--visible" : ""}`}
      style={{
        border: `1px solid ${edu.borderColor}`,
        background: edu.gradient,
        animationDelay: `${index * 0.18}s`,
        "--edu-accent": edu.accentColor,
        "--edu-corner-color": edu.accentColor,
        "--edu-target-width": `${edu.progress}%`,
      }}
    >
      <div
        className="edu-card-glow"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${edu.glowColor}, transparent 70%)`,
        }}
      />
      <div className="edu-corner" aria-hidden="true" />
      <div className="edu-card-sweep" aria-hidden="true" />
      <Particles />

      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 16,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <span
            style={{
              ...M,
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: edu.accentColor,
              opacity: 0.75,
              display: "block",
              marginBottom: 4,
            }}
          >
            {edu.period}
          </span>
          <h3
            className="edu-institution"
            style={{
              ...H,
              fontSize: "clamp(16px, 2.5vw, 20px)",
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: "-0.025em",
              marginBottom: 6,
              display: "block",
            }}
          >
            {edu.institution}
          </h3>
          <div style={{ ...B, fontSize: 13, color: "#71717a", marginTop: 4 }}>
            {edu.degree} ·{" "}
            <span style={{ color: edu.accentColor, opacity: 0.8 }}>
              {edu.subDegree}
            </span>
          </div>
        </div>

        <span
          className="edu-badge"
          style={{
            ...M,
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "5px 13px",
            borderRadius: 999,
            background: `${BLUE_SKY}18`,
            border: `1px solid ${BLUE_SKY}35`,
            color: BLUE_SKY,
            whiteSpace: "nowrap",
          }}
        >
          {edu.badgeVariant === "active" && (
            <span className="edu-badge-dot" aria-hidden="true" />
          )}
          {edu.badge}
        </span>
      </div>

      {/* ── Shimmer divider ── */}
      <div className="edu-divider" />

      {/* ── Description ── */}
      <p
        className="edu-desc"
        style={{
          ...B,
          fontSize: "clamp(12px, 1.5vw, 13.5px)",
          color: "#a1a1aa",
          lineHeight: 1.75,
          position: "relative",
          zIndex: 2,
        }}
      >
        {edu.details}
      </p>

      {/* ── Status chips ── */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 14,
          flexWrap: "wrap",
          position: "relative",
          zIndex: 2,
        }}
      >
        {edu.chips.map((chip) => (
          <span
            key={chip}
            className="edu-chip"
            style={{
              fontFamily: M.fontFamily,
              background: `${edu.accentColor}0d`,
              borderColor: `${edu.accentColor}35`,
              color: BLUE_LIGHT,
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="edu-progress-wrap" aria-hidden="true">
        <div
          className="edu-progress-fill"
          style={{
            animationDelay: visible ? `${0.8 + index * 0.2}s` : "9999s",
          }}
        />
      </div>
    </div>
  );
}

// ─── Ambient orbs ──────────────────────────────────────────────────────────────
function Orbs() {
  const orbs = [
    {
      w: 340,
      h: 340,
      top: -90,
      left: -70,
      bg: "rgba(37,99,235,0.13)",
      dur: "7s",
      delay: "0s",
      dir: "alternate",
    },
    {
      w: 280,
      h: 280,
      bottom: -60,
      right: -50,
      bg: "rgba(96,165,250,0.09)",
      dur: "9s",
      delay: "-3s",
      dir: "alternate-reverse",
    },
    {
      w: 200,
      h: 200,
      top: "40%",
      right: "22%",
      bg: "rgba(37,99,235,0.07)",
      dur: "11s",
      delay: "-5s",
      dir: "alternate",
    },
  ];
  return (
    <>
      {orbs.map((o, i) => (
        <div
          key={i}
          className="edu-orb"
          aria-hidden="true"
          style={{
            width: o.w,
            height: o.h,
            top: o.top,
            left: o.left,
            bottom: o.bottom,
            right: o.right,
            background: o.bg,
            "--edu-dur": o.dur,
            animationDelay: o.delay,
            animationDirection: o.dir,
          }}
        />
      ))}
    </>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ title }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);
  const typed = useTyped(title, inView);

  return (
    <div ref={ref} className="edu-header">
      <span
        style={{
          ...M,
          color: BLUE_SKY,
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {typed}
        <span className="edu-cursor" aria-hidden="true" />
      </span>
      <div className="edu-header-line" aria-hidden="true" />
      <div
        style={{ display: "flex", gap: 5, alignItems: "center" }}
        aria-hidden="true"
      >
        {[0.6, 0.4, 0.2].map((op, i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#3b82f6",
              opacity: op,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export function EducationSection({ lang = "id" }) {
  const t = TRANSLATIONS[lang].education;

  const educationData = EDUCATION.map((edu) => ({
    ...edu,
    degree: t.degrees[edu.id],
    badge: t.badges[edu.id],
    details: t.details[edu.id],
  }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section
        id="education"
        className="edu-section"
        aria-label="Education"
        style={{
          background:
            "linear-gradient(160deg, #080910 0%, #0a0d1c 55%, #07090f 100%)",
        }}
      >
        <div className="edu-grid" aria-hidden="true" />
        {/* <div className="edu-scanline" aria-hidden="true" /> */}
        <Orbs />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 900,
            width: "100%",
            margin: "0 auto",
          }}
        >
          <SectionHeader title={t.eduLabel} />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {educationData.map((edu, i) => (
              <EduCard key={edu.id} edu={edu} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default EducationSection;

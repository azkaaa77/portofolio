"use client";

import React from "react";
import { motion } from "motion/react";
import { H, B, M } from "../constants/tokens";
import { TRANSLATIONS } from "../constants/translations";
import { SectionLabel } from "../components/Primitives";

const CYBER_GRID = {
  background: "linear-gradient(160deg, #080910 0%, #0a0d1c 55%, #07090f 100%)",
  position: "relative",
};

const BLUE_NAVY = "#2563eb";
const BLUE_SKY = "#60a5fa";

// Executive kinetic easing curve used across all motion in this component
const EASE_BUTTER = [0.16, 1, 0.3, 1];

const GLASS = {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  boxShadow:
    "inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)",
};

export const CERTS = [
  {
    id: "bnsp",
    name: "Pemrogram Junior (Junior Programmer)",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    year: "2025",
    badge: "BNSP Certified",
    code: "62019 3514.02 2 0000049 2025",
    validation: "Nationally accredited programming competency standard.",
    accentColor: BLUE_NAVY,
    borderColor: "rgba(37,99,235,0.25)",
    gradient:
      "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.02) 100%)",
    imgSrc: null,
  },
  {
    id: "dicoding_frontend",
    name: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "2026",
    badge: "Verified Certificate",
    code: "OLZ057Y23X65",
    url: "https://dicoding.com/certificates/OLZ057Y23X65",
    validation: "Industry-standard front-end competency validation.",
    accentColor: BLUE_SKY,
    borderColor: "rgba(96,165,250,0.22)",
    gradient:
      "linear-gradient(135deg, rgba(96,165,250,0.10) 0%, rgba(37,99,235,0.02) 100%)",
    imgSrc: null,
  },
  {
    id: "dicoding_basic",
    name: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    year: "2024",
    badge: "Verified Certificate",
    code: "07Z646KLWPQR",
    url: "https://dicoding.com/certificates/07Z646KLWPQR",
    validation: "Fundamental web page architecture competency validation.",
    accentColor: BLUE_NAVY,
    borderColor: "rgba(37,99,235,0.25)",
    gradient:
      "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.02) 100%)",
    imgSrc: null,
  },
];

function CertIcon({ id, color }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { width: 16, height: 17, flexShrink: 0 },
  };
  switch (id) {
    case "bnsp":
      return (
        <svg {...p}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "dicoding_frontend":
    case "dicoding_basic":
    case "dicoding":
      return (
        <svg {...p}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <polyline points="7 8 12 13 17 8" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <polyline points="7 8 12 13 17 8" />
        </svg>
      );
  }
}

function CertCard({ cert, index, lang }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const text = cert.validation || "";

  // Split by whitespace to estimate words
  const words = text.split(/\s+/);
  const isLong = words.length > 22;

  const displayedText = isLong && !isExpanded
    ? words.slice(0, 18).join(" ") + "..."
    : text;

  const toggleText = isExpanded
    ? (lang === "id" ? "Sembunyikan" : "Show Less")
    : (lang === "id" ? "Lihat Selengkapnya" : "Show More");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: EASE_BUTTER,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -8,
        scale: 1.025,
        borderColor: "rgba(96,165,250,0.35)",
        boxShadow:
          "0 24px 48px rgba(37,99,235,0.12), inset 0 1px 1px rgba(255,255,255,0.1)",
        transition: { type: "tween", duration: 0.22, ease: "easeOut" },
      }}
      className="relative rounded-2xl p-6 overflow-hidden glass-card flex flex-col justify-between"
      style={{
        ...GLASS,
        border: "1px solid rgba(255,255,255,0.08)",
        backgroundImage: `${cert.gradient}, linear-gradient(rgba(9,9,11,0.45), rgba(9,9,11,0.45))`,
        transition: "box-shadow 0.22s ease, border-color 0.22s ease",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            top: -32,
            right: -32,
            width: 120,
            height: 120,
            borderRadius: "50%",
            filter: "blur(40px)",
            background: cert.accentColor,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        />

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: cert.accentColor + "18",
              border: `1px solid ${cert.accentColor}30`,
              flexShrink: 0,
            }}
          >
            <CertIcon id={cert.id} color={cert.accentColor} />
          </div>
          <span
            style={{
              ...M,
              letterSpacing: "0.18em",
              padding: "4px 10px",
              borderRadius: 999,
              background: cert.accentColor + "18",
              border: `1px solid ${cert.accentColor}30`,
              color: cert.accentColor,
            }}
            className="text-[9px] uppercase"
          >
            {cert.badge}
          </span>
        </div>

        <span
          style={{
            ...M,
            letterSpacing: "0.22em",
            color: cert.accentColor + "cc",
          }}
          className="text-[9px] uppercase block mb-1.5"
        >
          {cert.issuer}
        </span>

        <h3
          style={{
            ...H,
            fontWeight: 800,
            color: "#fafafa",
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
          className="text-[16px]"
        >
          {cert.name}
        </h3>

        <p
          style={{ ...B, color: "#a1a1aa" }}
          className="text-[13px] md:text-[14px] leading-relaxed mb-4"
        >
          {displayedText}
          {isLong && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
              style={{
                color: cert.accentColor,
                marginLeft: 6,
                fontWeight: 600,
                fontSize: "12px",
                cursor: "pointer",
                display: "inline-block",
                borderBottom: "1px dashed transparent",
              }}
              className="hover:border-current hover:brightness-125 transition-all"
            >
              {toggleText}
            </button>
          )}
        </p>
      </div>

      {cert.url ? (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:border-white/20 hover:bg-white/5 transition-all duration-200"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            padding: "11px 16px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            color: "#71717a",
            letterSpacing: "0.04em",
            textDecoration: "none",
            marginTop: 12,
          }}
        >
          <span style={{ color: cert.accentColor + "70", marginRight: 8 }}>›</span>
          {cert.code}
          <span style={{ float: "right", opacity: 0.6 }}>↗</span>
        </a>
      ) : (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            padding: "11px 16px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            color: "#71717a",
            letterSpacing: "0.04em",
            marginTop: 12,
          }}
        >
          <span style={{ color: cert.accentColor + "70", marginRight: 8 }}>›</span>
          {cert.code}
        </div>
      )}
    </motion.div>
  );
}

export function CertificationsSection({ lang = "id" }) {
  const t = TRANSLATIONS[lang].certifications;

  const certsData = CERTS.map((cert) => ({
    ...cert,
    badge: t.badges[cert.id],
    validation: t.validations[cert.id],
  }));

  return (
    <div
      id="certifications"
      className="w-full min-h-screen md:h-full flex items-center justify-center"
      style={{ ...CYBER_GRID }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          zIndex: 0,
        }}
      />
      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          filter: "blur(90px)",
          background: "rgba(37, 99, 235, 0.12)",
          top: "-10%",
          left: "-10%",
          pointerEvents: "none",
          zIndex: 0,
        }}
        className="mobile-orb-reduce"
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          filter: "blur(90px)",
          background: "rgba(96, 165, 250, 0.08)",
          bottom: "-10%",
          right: "-10%",
          pointerEvents: "none",
          zIndex: 0,
        }}
        className="mobile-orb-reduce"
      />

      <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 w-full max-w-5xl mx-auto flex flex-col justify-center min-h-[80vh] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_BUTTER }}
        >
          <SectionLabel>{t.certLabel}</SectionLabel>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-4">
          {certsData.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

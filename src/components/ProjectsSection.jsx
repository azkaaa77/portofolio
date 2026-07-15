"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react"; // 👈 FIX: Import motion & scroll locks
import { H, B, M } from "../constants/tokens";
import { BrowserMockup } from "../components/Primitives";
import { TRANSLATIONS } from "../constants/translations";

const CYBER_GRID = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

const BLUE_NAVY = "#2563eb";
const BLUE_SKY = "#60a5fa";

export const PROJECTS = [
  {
    id: "backburner",
    title: "Kedai Backburner",
    subtitle: "Advanced Culinary POS System",
    category: "Web App",
    tags: ["Laravel", "Tailwind CSS", "Filament", "Database"],
    accentColor: BLUE_NAVY,
    borderColor: "rgba(37,99,235,0.25)",
    gradient:
      "linear-gradient(160deg, rgba(37,99,235,0.10) 0%, transparent 70%)",
    imgSrc: "/image/sando.png",
  },
  {
    id: "equil",
    title: "EQUIL",
    subtitle: "Minimalist Personal Productivity Dashboard",
    category: "Web App",
    tags: ["Next.js", "Supabase", "TypeScript", "Vibe Coding"],
    accentColor: BLUE_SKY,
    borderColor: "rgba(96,165,250,0.22)",
    gradient:
      "linear-gradient(160deg, rgba(96,165,250,0.08) 0%, transparent 70%)",
    imgSrc: "/image/equil.png",
  },
  {
    id: "basket-mnc",
    title: "UKM Basket MNC",
    subtitle: "MNC Basketball Community Website - UI Slicing",
    category: "Website",
    tags: ["WordPress", "Tailwind CSS", "JavaScript", "UI Slicing"],
    accentColor: BLUE_NAVY,
    borderColor: "rgba(37,99,235,0.25)",
    gradient:
      "linear-gradient(160deg, rgba(37,99,235,0.10) 0%, transparent 70%)",
    imgSrc: "/image/slicing.png",
  },
  {
    id: "kard",
    title: "Kard",
    subtitle: "KARD.ID - Cybersecurity Ops Inspired Portfolio Hub",
    category: "Landing Page",
    tags: ["WordPress", "Tailwind CSS", "JavaScript", "Frontend"],
    accentColor: BLUE_SKY,
    borderColor: "rgba(96,165,250,0.22)",
    gradient:
      "linear-gradient(160deg, rgba(96,165,250,0.08) 0%, transparent 70%)",
    imgSrc: "/image/kard.png",
  },
  {
    id: "about-bandung",
    title: "About Bandung",
    subtitle: "Premium Cultural & City Guide Portal",
    category: "Website",
    tags: ["HTML", "CSS", "Responsive", "Frontend"],
    accentColor: BLUE_NAVY,
    borderColor: "rgba(37,99,235,0.25)",
    gradient:
      "linear-gradient(160deg, rgba(37,99,235,0.10) 0%, transparent 70%)",
    imgSrc: "/image/bandung.png",
  },
  {
    id: "azzzk-space",
    title: "AzzzK SPACE",
    subtitle: "Futuristic Interactive Astronomy Hub",
    category: "Website",
    tags: ["HTML", "CSS", "Creative Frontend", "UI Design"],
    accentColor: BLUE_SKY,
    borderColor: "rgba(96,165,250,0.22)",
    gradient:
      "linear-gradient(160deg, rgba(96,165,250,0.08) 0%, transparent 70%)",
    imgSrc: "/image/galaxy.png",
  },
];

const CATEGORIES = ["Semua", "Web App", "Website", "Landing Page"];

// Executive kinetic easing curve used across all motion in this component
const EASE_BUTTER = [0.16, 1, 0.3, 1];

const GLASS = {
  backdropFilter: "blur(32px) saturate(180%)",
  WebkitBackdropFilter: "blur(32px) saturate(180%)",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  boxShadow:
    "inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)",
};

function MetricIcon({ id, color }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color || "#60a5fa",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { width: 14, height: 14, flexShrink: 0 },
  };
  switch (id) {
    case "kard-id": // Trending up
      return (
        <svg {...p}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "elwinhaner": // Rocket
      return (
        <svg {...p}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "blue-team": // Shield
      return (
        <svg {...p}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "equil": // Lightning/Zap
      return (
        <svg {...p}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    default:
      return null;
  }
}

function ProjectCard({ project, index, lang }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = project.desc || "";

  // Split by whitespace to estimate words
  const words = text.split(/\s+/);
  const isLong = words.length > 25;

  const displayedText =
    isLong && !isExpanded ? words.slice(0, 22).join(" ") + "..." : text;

  const toggleText = isExpanded
    ? lang === "id"
      ? "Sembunyikan"
      : "Show Less"
    : lang === "id"
      ? "Lihat Selengkapnya"
      : "Show More";

  return (
    <motion.article
      key={project.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE_BUTTER, delay: index * 0.08 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        borderColor: "rgba(96,165,250,0.35)",
        boxShadow:
          "0 30px 60px rgba(37,99,235,0.12), inset 0 1px 1px rgba(255,255,255,0.08)",
        transition: { type: "tween", duration: 0.22, ease: "easeOut" },
      }}
      className="relative rounded-2xl overflow-hidden flex flex-col glass-card"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        backgroundImage: `${project.gradient}, linear-gradient(rgba(9,9,11,0.45), rgba(9,9,11,0.45))`,
        transition: "box-shadow 0.22s ease, border-color 0.22s ease",
      }}
    >
      <div className="p-4 pb-2">
        <BrowserMockup
          accentColor={project.accentColor}
          imgSrc={project.imgSrc}
        />
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              ...M,
              fontSize: 9,
              padding: "3px 9px",
              borderRadius: 999,
              border: `1px solid ${project.accentColor}30`,
              color: project.accentColor + "cc",
              background: project.accentColor + "0d",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col flex-1 px-5 pb-5">
        <h3
          style={{
            ...H,
            fontSize: "16px",
            fontWeight: 800,
            color: "#fafafa",
            letterSpacing: "-0.03em",
            marginBottom: 4,
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            ...M,
            fontSize: 9,
            color: "#71717a",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
            display: "block",
          }}
        >
          {project.subtitle}
        </span>
        <p
          style={{ ...B }}
          className="text-[13px] md:text-[14px] leading-relaxed"
        >
          <span style={{ color: "#a1a1aa" }}>{displayedText}</span>
          {isLong && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
              style={{
                color: project.accentColor,
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

      <div
        className="flex items-center justify-between gap-2 px-5 py-3"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: `linear-gradient(90deg, ${project.accentColor}12 0%, transparent 100%)`,
          marginTop: "auto",
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <MetricIcon id={project.id} color={project.accentColor} />
          <span
            style={{ ...B, fontSize: 11, fontWeight: 600, color: "#e4e4e7" }}
            className="truncate"
          >
            {project.role}
          </span>
        </div>
        <span style={{ ...M, fontSize: 9, color: "#71717a", flexShrink: 0 }}>
          {project.category}
        </span>
      </div>
    </motion.article>
  );
}

export function ProjectsSection({ lang = "id" }) {
  const wrapperRef = useRef(null); // 👈 FIX: Inisialisasi ulang wrapper target scroll
  const [activeFilter, setActiveFilter] = useState("Semua");
  const t = TRANSLATIONS[lang].projects;

  const categories = ["Semua", "Web App", "Website", "Landing Page"];

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const projectsData = PROJECTS.map((p) => {
    return {
      ...p,
      desc: t.projectDescs[p.id],
      role: t.projectRoles[p.id],
      deliverables: t.projectDeliverables[p.id],
    };
  });

  const filteredProjects =
    activeFilter === "Semua"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <div
      id="projects"
      ref={wrapperRef}
      className="w-full min-h-screen md:h-full flex items-center justify-center relative overflow-visible"
      style={{ ...CYBER_GRID }}
    >
      {/* FIX TOTAL: Mengubah tag pembuka menjadi <motion.div> agar sinkron dengan tag penutup </motion.div> di bawah */}
      <motion.div
        style={{ scale, transformOrigin: "top center" }}
        className="px-6 md:px-12 lg:px-16 py-16 md:py-24 w-full max-w-6xl mx-auto flex flex-col justify-center min-h-[85vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_BUTTER }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
        >
          <div>
            <span
              style={{
                ...M,
                color: BLUE_SKY,
                letterSpacing: "0.4em",
              }}
              className="text-[10px] uppercase block mb-3"
            >
              {t.projLabel}
            </span>
            <h2
              style={{
                ...H,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
              className="text-2xl md:text-4xl"
            >
              {t.projTitle} <br />
              <span className="bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                {t.projHighlight}
              </span>
            </h2>
          </div>

          <div
            className="flex gap-1 p-1.5 rounded-full overflow-x-auto max-w-full whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              ...GLASS,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    ...M,
                    fontSize: 10,
                    padding: "6px 16px",
                    borderRadius: 999,
                    color: isActive ? BLUE_SKY : "#71717a",
                    background: isActive
                      ? "rgba(37,99,235,0.15)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(37,99,235,0.3)"
                      : "1px solid transparent",
                    cursor: "pointer",
                    transition: `all 0.4s cubic-bezier(${EASE_BUTTER.join(",")})`,
                  }}
                >
                  {t.categories[cat]}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              lang={lang}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

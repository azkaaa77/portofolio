"use client";

import React from "react";
import { motion } from "motion/react";
import { H, M, glassStyle, gridBackgroundStyle } from "../constants/tokens";
import { useInView, useCountUp } from "../hooks/usePortfolioHooks";
import { TRANSLATIONS } from "../constants/translations";

export const STATS = [
  { value: 12, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: " yrs", label: "Dev Experience" },
  { value: 5, suffix: "+", label: "Certifications" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function StatBadge({ stat, trigger }) {
  const count = useCountUp(stat.value, 2000, trigger);
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.025,
        borderColor: "rgba(96, 165, 250, 0.35)",
        boxShadow: "0 20px 40px rgba(37, 99, 235, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.08)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
      transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
      style={{
        ...glassStyle,
        borderRadius: 16,
        padding: "22px 16px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "default",
      }}
    >
      <span style={{ ...H, fontSize: 38, fontWeight: 900 }}>
        <span style={{ color: "#60a5fa" }}>{count}</span>
        <span style={{ fontSize: 17, color: "#52525b" }}>{stat.suffix}</span>
      </span>
      <span
        style={{
          ...M,
          color: "#52525b",
          fontSize: 9,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export function StatsSection({ lang = "id" }) {
  const [ref, inView] = useInView({ once: true, threshold: 0.3 });
  const t = TRANSLATIONS[lang].stats;

  const stats = [
    { value: 12, suffix: "+", label: t.projectsDelivered },
    { value: 3, suffix: " yrs", label: t.devExperience },
    { value: 5, suffix: "+", label: t.certifications },
    { value: 100, suffix: "%", label: t.clientSatisfaction },
  ];

  return (
    <section
      style={{
        width: "100%",
        ...gridBackgroundStyle,
      }}
    >
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-12 max-w-[1100px] mx-auto"
      >
        {stats.map((stat) => (
          <StatBadge key={stat.label} stat={stat} trigger={inView} />
        ))}
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "motion/react";

export function LanguageToggle({ lang, setLang }) {
  return (
    <div
      className="flex items-center gap-1 p-0.5 rounded-full select-none pointer-events-auto"
      style={{
        padding: 3,
        background: "rgba(255, 255, 255, 0.035)",
        border: "1px solid rgba(255, 255, 255, 0.11)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08), 0 12px 24px rgba(0,0,0,0.4)",
      }}
    >
      {["id", "en"].map((l) => {
        const isActive = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="relative px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full transition-colors duration-300"
            style={{
              color: isActive ? "#ffffff" : "#71717a",
              fontFamily: "var(--font-mono, monospace)",
              cursor: "pointer",
            }}
          >
            {isActive && (
              <motion.span
                layoutId="activeLang"
                className="absolute inset-0 bg-blue-600/25 border border-blue-500/30 rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{l}</span>
          </button>
        );
      })}
    </div>
  );
}

export default LanguageToggle;

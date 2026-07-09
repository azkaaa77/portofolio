"use client";

import React, { useRef } from "react";
import { motion, useInView as motionUseInView } from "motion/react";
import { H, B, M, glassStyle, gridBackgroundStyle } from "../constants/tokens";
import { TRANSLATIONS } from "../constants/translations";

export const ABOUT_TEXT =
  "I'm Muhamad Azka Firmansyah — a Systems Information student and creative developer based in Indonesia. I build high-performance full-stack web applications with a deep interest in cybersecurity, clean architecture, and premium user experiences. Every line of code is intentional.";

export const TECH_STACK = [
  "React",
  "Next.js",
  "Laravel",
  "TailwindCSS",
  "MySQL",
  "PHP",
  "Cybersecurity",
  "Linux",
  "Lenis",
  "Framer Motion",
];

export function AboutSection({ lang = "id" }) {
  const bodyRef = useRef(null);
  const isInView = motionUseInView(bodyRef, {
    once: false,
    margin: "0px 0px -15% 0px",
  });
  const t = TRANSLATIONS[lang].about;
  const chars = t.aboutText.split("");

  return (
    <section
      id="about"
      style={{
        width: "100%",
        ...gridBackgroundStyle,
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-20 px-6 py-16 md:py-24 max-w-[1100px] mx-auto items-start"
      >
        {/* Left sticky */}
        <div className="relative md:sticky md:top-[100px] flex flex-col items-start">
          <span
            style={{
              ...M,
              color: "#60a5fa",
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            {t.aboutLabel}
          </span>
          <div
            className="w-full md:w-px h-px md:h-[60px] bg-gradient-to-r md:bg-gradient-to-b from-blue-600/50 to-transparent mt-3 md:mt-2"
          />
        </div>

        {/* Right: bio + stack */}
        <div ref={bodyRef}>
          <p
            style={{
              ...H,
              fontSize: "clamp(18px, 2.2vw, 24px)",
              fontWeight: 500,
              lineHeight: 1.65,
              letterSpacing: "-0.015em",
              marginBottom: 32,
            }}
            aria-label={t.aboutText}
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.08, color: "#3f3f46" }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        color: "#e4e4e7",
                        transition: {
                          delay: i * 0.007,
                          duration: 0.28,
                          ease: "easeOut",
                        },
                      }
                    : { opacity: 0.08, color: "#3f3f46" }
                }
              >
                {char}
              </motion.span>
            ))}
          </p>

          <div
            style={{
              height: 1,
              background:
                "linear-gradient(to right, rgba(37,99,235,0.2), transparent)",
              marginBottom: 22,
            }}
          />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TECH_STACK.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: 0.4 + i * 0.045, duration: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  borderColor: "rgba(96,165,250,0.45)",
                  color: "#ffffff",
                  boxShadow: "0 8px 20px rgba(37,99,235,0.2)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                style={{
                  ...M,
                  ...glassStyle,
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 10,
                  color: "#71717a",
                  cursor: "default",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

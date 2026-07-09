"use client";

import React from "react";
import { motion } from "motion/react";
import { H, B, M, gridBackgroundStyle } from "../constants/tokens";
import { TRANSLATIONS } from "../constants/translations";

export const CONTACT_LINKS = [
  {
    id: "email",
    label: "azkafirmansyah547@gmail.com",
    href: "mailto:azkafirmansyah547@gmail.com",
    primary: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/azkaaa77",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/azkafirmansyah77/",
    external: true,
  },
];

function ContactIcon({ id, color }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color || "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { width: 14, height: 14, flexShrink: 0 },
  };
  switch (id) {
    case "email":
      return (
        <svg {...p}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "github":
      return (
        <svg {...p}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...p}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    default:
      return null;
  }
}

export function ContactSection({ lang = "id" }) {
  const t = TRANSLATIONS[lang].contact;

  return (
    <section
      id="contact"
      style={{
        width: "100%",
        ...gridBackgroundStyle,
      }}
      className="w-full flex-1 flex flex-col justify-between min-h-0"
    >
      {/* ── TOP SPACER BALANCE: Penyeimbang ruang atas agar presisi simetris dengan footer ── */}
      <div
        className="w-full pt-8 opacity-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span style={M}>// spacer</span>
      </div>

      {/* ── CENTRAL BOX: Senjata Utama "my-auto" Pengunci Konten Tepat Di Tengah Layar ── */}
      <div className="my-auto flex flex-col justify-center items-center text-center px-6 max-w-3xl w-full mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center w-full"
        >
          <span
            style={{
              ...M,
              color: "#60a5fa",
              fontSize: 10,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 24,
            }}
          >
            {t.contactLabel}
          </span>

          <h2
            style={{
              ...H,
              fontSize: "clamp(46px, 7vw, 88px)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              marginBottom: 22,
            }}
          >
            {t.heading}
            <span
              style={{
                color: "#60a5fa",
                textShadow: "0 0 48px rgba(96,165,250,0.22)",
              }}
            >
              {t.headingHighlight}
            </span>
          </h2>

          <p
            style={{
              ...B,
              color: "#a1a1aa",
              fontSize: 13.5,
              lineHeight: 1.75,
              maxWidth: 340,
              margin: "0 auto 44px",
            }}
          >
            {t.desc}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              marginBottom: 28,
            }}
          >
            {CONTACT_LINKS.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                whileHover={{
                  y: -3,
                  scale: 1.025,
                  borderColor: link.primary
                    ? "rgba(37,99,235,0.6)"
                    : "rgba(255,255,255,0.22)",
                  color: "#ffffff",
                  boxShadow: link.primary
                    ? "0 12px 24px rgba(37,99,235,0.18)"
                    : "0 12px 24px rgba(255,255,255,0.04)",
                  transition: { type: "tween", duration: 0.18, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-[12.5px] font-medium max-w-full"
                style={{
                  ...H,
                  textDecoration: "none",
                  border: link.primary
                    ? "1px solid rgba(37,99,235,0.32)"
                    : "1px solid rgba(255,255,255,0.09)",
                  background: link.primary
                    ? "rgba(37,99,235,0.1)"
                    : "rgba(255,255,255,0.03)",
                  color: link.primary ? "#fff" : "#71717a",
                  backdropFilter: "blur(16px)",
                  transition: "color 0.25s, border-color 0.25s, background-color 0.25s, box-shadow 0.25s",
                }}
              >
                <span style={{ color: link.primary ? "#60a5fa" : "inherit" }}>
                  <ContactIcon id={link.id} />
                </span>
                <span className="max-w-[180px] sm:max-w-none truncate">{link.label}</span>
                {link.external && (
                  <span style={{ fontSize: 11, opacity: 0.6 }}>↗</span>
                )}
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(16,185,129,0.2)",
              background: "rgba(16,185,129,0.05)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10b981",
                animation: "afPulse 2s infinite",
                display: "block",
              }}
            />
            <span
              style={{
                ...M,
                color: "rgba(52,211,153,0.8)",
                fontSize: 9,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              {t.status}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BASELINE FOOTER ZONE: Mengunci Solid Menempel Di Dasar Lantai Paling Bawah ── */}
      <div className="w-full pb-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center px-6 md:px-12 lg:px-16 max-w-[1100px] mx-auto z-10">
        <span
          style={M}
          className="text-zinc-600 text-[9px] tracking-wider font-medium"
        >
          © 2026 Muhamad Azka Firmansyah. All rights reserved.
        </span>
        <span
          style={M}
          className="text-zinc-600 text-[9px] tracking-wider font-medium"
        >
          Built with Next.js · Motion · Lenis
        </span>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { H, B, M } from "../constants/tokens";
import { TRANSLATIONS } from "../constants/translations";
import { LanguageToggle } from "./LanguageToggle";

// ─── Hyper-Blur Glassmorphism constant ───────────────────────────────────────
const GLASS = {
  backdropFilter: "blur(40px) saturate(180%)",
  WebkitBackdropFilter: "blur(40px) saturate(180%)",
  background: "rgba(9,9,11,0.35)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow:
    "inset 0 1px 1px rgba(255,255,255,0.08), 0 24px 50px rgba(0,0,0,0.8)",
};

export function FloatingNavbar({ lang = "id", setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isAtTop = window.scrollY <= 150;
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;
      setShowLinks(!isAtTop && !isAtBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = TRANSLATIONS[lang].nav;

  const navLinks = [
    { label: t.about,       href: "#about",          num: "01" },
    { label: t.education,   href: "#education",      num: "02" },
    { label: t.projects,    href: "#projects",       num: "03" },
    { label: t.credentials, href: "#certifications", num: "04" },
    { label: t.contact,     href: "#contact",        num: "05" },
  ];

  function scrollTo(href) {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ── Floating Capsule Navbar ── */}
      <motion.nav
        layout
        id="floating-navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
        // Layout: fixed, centered pill, max viewport-aware width, z-50
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100vw-32px)] flex items-center whitespace-nowrap"
        style={{
          gap: showLinks ? 24 : 14,
          padding: showLinks ? "10px 20px" : "10px 14px",
          borderRadius: 999,
          ...GLASS,
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#"
          id="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center" }}
        >
          <img
            src="/image/logo.png"
            alt="Logo"
            style={{ height: 20, width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* ── Desktop navigation links — fully expanded, hidden on mobile ── */}
        <AnimatePresence>
          {showLinks && (
            <motion.div
              layout
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center overflow-hidden"
              style={{ gap: 18 }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => scrollTo(link.href)}
                  className="transition-colors duration-200 hover:text-zinc-50"
                  style={{
                    ...B,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#71717a",
                    fontSize: 12,
                    fontWeight: 500,
                    padding: 0,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Available status dot ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#2563eb",
              display: "block",
              animation: "afPulse 2.4s infinite",
              boxShadow: "0 0 8px rgba(37,99,235,0.8)",
            }}
          />
        </div>

        {/* ── Hamburger — visible ONLY on mobile (≤768px) — completely hidden on desktop ── */}
        <button
          id="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex md:hidden items-center justify-center"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: 4,
            padding: "4px 2px",
          }}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            style={{ display: "block", width: 20, height: 1, background: "#fff", borderRadius: 2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            style={{ display: "block", width: 13, height: 1, background: "#52525b", borderRadius: 2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            style={{ display: "block", width: 20, height: 1, background: "#fff", borderRadius: 2 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>

      {/* ── Fullscreen Mobile Overlay Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 49,
              background: "rgba(9,9,11,0.97)",
              backdropFilter: "blur(32px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 48 }}
                  transition={{
                    delay: i * 0.07 + 0.1,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "baseline",
                      gap: 14,
                      padding: "6px 0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.querySelector(
                        "span[data-label]"
                      ).style.color = "#fff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.querySelector(
                        "span[data-label]"
                      ).style.color = "#27272a")
                    }
                  >
                    <span style={{ ...M, color: "rgba(96,165,250,0.4)", fontSize: 10 }}>
                      {link.num}
                    </span>
                    <span
                      data-label
                      style={{
                        ...H,
                        fontSize: "clamp(32px, 8vw, 52px)",
                        fontWeight: 900,
                        color: "#27272a",
                        letterSpacing: "-0.04em",
                        transition: "color 0.3s",
                      }}
                    >
                      {link.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Social links footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ position: "absolute", bottom: 32, left: 24, display: "flex", gap: 20 }}
            >
              {["GitHub", "LinkedIn", "Email"].map((s) => (
                <span
                  key={s}
                  style={{
                    ...M,
                    color: "#3f3f46",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#71717a")}
                  onMouseLeave={(e) => (e.target.style.color = "#3f3f46")}
                >
                  {s}
                </span>
              ))}
            </motion.div>

            {/* Language switcher inside mobile overlay menu bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              style={{ position: "absolute", bottom: 24, right: 24 }}
            >
              <LanguageToggle lang={lang} setLang={setLang} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes afPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
      `}</style>
    </>
  );
}

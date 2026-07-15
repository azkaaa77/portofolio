"use client";

import React, { useState, useEffect } from "react";
import { FloatingNavbar } from "../components/FloatingNavbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { EducationSection } from "../components/EducationSection";
import { StatsSection } from "../components/StatsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { CertificationsSection } from "../components/CertificationsSection";
import { ContactSection } from "../components/ContactSection";
import { Divider } from "../components/Primitives";
import { LanguageToggle } from "../components/LanguageToggle";

import { useLenisScroll } from "../hooks/useLenisScroll";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("id");

  useEffect(() => {
    setMounted(true);
  }, []);
  useLenisScroll();

  if (!mounted) return null;

  return (
    <div className="bg-[#09090b] min-h-screen w-full text-zinc-50 overflow-x-clip">
      {/* Sticky language switcher floating in top-right */}
      <div className="fixed top-[18px] right-4 md:right-8 z-[100] hidden md:block">
        <LanguageToggle lang={lang} setLang={setLang} />
      </div>

      <FloatingNavbar lang={lang} setLang={setLang} />
      <HeroSection lang={lang} />

      {/* Main content — NO h-screen, NO overflow-hidden, NO overflow-clip here */}
      <main className="relative z-[2] w-full h-auto bg-[#09090b]">
        <Divider />
        <AboutSection lang={lang} />

        <Divider />
        <StatsSection lang={lang} />

        {/*
          ═══ STICKY STACKING — SCROLL TRACK & STICKY WINDOW PATTERN ═══

          Architecture:
            Parent Wrapper = relative h-auto w-full (NO overflow)
            ├─ Sticky Layer 1 (Education)  — sticky top-0 h-screen z-10
            ├─ Sticky Layer 2 (Projects)   — sticky top-0 h-screen z-20
            ├─ Sticky Layer 3 (Certs)      — sticky top-0 h-screen z-30
            └─ Relative Anchor (Contact)   — relative z-40 min-h-screen

          Why it works:
            Parent height = 3×100vh + Contact height ≈ 400vh total.
            Each sticky child sticks while scrolling through the REMAINING
            parent height beyond its own position. The Contact section's
            height gives the last sticky section its scroll runway.
            Higher z-index sections slide OVER lower ones as they enter.

          Rules enforced:
            ✓ Parent wrapper has ZERO overflow properties
            ✓ No container between wrapper and sticky children has overflow
            ✓ Each sticky child has solid bg + progressive z-index
            ✓ overflow-hidden is ONLY on the sticky elements themselves
              (this clips their decorative children, does NOT break sticky)
        */}
        <div className="relative h-auto w-full bg-zinc-950">

          {/* Layer 1: Education (z-10) — first card, sticks the longest */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-10 bg-[#09090b] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] rounded-t-[32px]">
            <EducationSection lang={lang} />
          </div>

          {/* Layer 2: Projects (z-20) — slides over Education */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-20 bg-[#09090b] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] rounded-t-[32px]">
            <ProjectsSection lang={lang} />
          </div>

          {/* Layer 3: Certifications (z-30) — slides over Projects */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-30 bg-[#09090b] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] rounded-t-[32px]">
            <CertificationsSection lang={lang} />
          </div>

          {/* Layer 4: Contact — relative anchor inside wrapper.
              Its min-h-screen gives Certifications (Layer 3) the scroll
              runway needed to stick. Also slides over Certs via z-40. */}
          <div className="relative z-40 bg-[#09090b] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] rounded-t-[32px] w-full min-h-screen flex flex-col">
            <ContactSection lang={lang} />
          </div>

        </div>
      </main>
    </div>
  );
}

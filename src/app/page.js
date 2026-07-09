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

      {/* Main content flows natively below the Hero track */}
      <main className="relative z-[2] w-full bg-[#09090b]">
        <Divider />
        <AboutSection lang={lang} />

        <Divider />
        <StatsSection lang={lang} />

        {/* Layer 1: Education Card */}
        <div className="relative md:sticky md:top-0 h-auto md:h-screen w-full bg-[#09090b] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] rounded-t-[32px] overflow-visible md:overflow-hidden z-30">
          <EducationSection lang={lang} />
        </div>

        {/* Layer 2: Projects Card (Slides over Education) */}
        <div className="relative md:sticky md:top-0 h-auto md:h-screen w-full bg-[#09090b] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] rounded-t-[32px] overflow-visible md:overflow-hidden z-40">
          <ProjectsSection lang={lang} />
        </div>

        {/* Layer 3: Certifications Card (Slides over Projects) */}
        <div className="relative md:sticky md:top-0 h-auto md:h-screen w-full bg-[#09090b] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] rounded-t-[32px] overflow-visible md:overflow-hidden z-50">
          <CertificationsSection lang={lang} />
        </div>

        {/* Layer 4: Contact Card (Slides over Certifications) */}
        <div className="relative z-[60] bg-[#09090b] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] rounded-t-[32px] w-full min-h-screen flex flex-col">
          <ContactSection lang={lang} />
        </div>
      </main>
    </div>
  );
}

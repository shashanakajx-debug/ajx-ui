"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Hero from "@/components/home-designer/Hero";
import ParallaxDivider from "@/components/home-designer/ParallaxDivider";
import OurExpertise from "@/components/home-designer/OurExpertise";
import About from "@/components/home-designer/About";
import CaseStudies from "@/components/home-designer/CaseStudies";
import Testimonials from "@/components/home-designer/Testimonials";
import Industries from "@/components/home-designer/Industries";
import TechStack from "@/components/home-designer/TechStack";
// import FinalCta from "@/components/home-designer/FinalCta";



export default function HomePage() {
  const router = useRouter();
  const secretRef = useRef<string>("");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const LETTER_REGEX = /^[a-zA-Z]$/;
    const DIGIT_REGEX = /^[0-9]$/;
    const TARGET = "AJX006";
    const SEQ_LENGTH = TARGET.length;
    const RESET_MS = 3000;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const isLetterWithShift = e.shiftKey && LETTER_REGEX.test(key);
      const isDigit = DIGIT_REGEX.test(key);

      if (isLetterWithShift || isDigit) {
        e.preventDefault();
        const char = key.toUpperCase();
        secretRef.current = (secretRef.current + char).slice(-SEQ_LENGTH);

        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

        resetTimerRef.current = window.setTimeout(() => {
          secretRef.current = "";
          resetTimerRef.current = null;
        }, RESET_MS);

        if (secretRef.current === TARGET) {
          secretRef.current = "";
          if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
          }
          router.push("/admin/login");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [router]);

  return (
    <div className="min-h-screen">
      <Hero />
      <ParallaxDivider />
      <OurExpertise />
      <About />
      <CaseStudies />
      <Testimonials />
      <Industries />
      <TechStack />
      {/* <FinalCta /> */}
    </div>
  );
}

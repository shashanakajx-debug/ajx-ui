"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Import all section components
import Hero from "@/components/home-designer/Hero";
import About from "@/components/home-designer/About";
import Services from "@/components/home-designer/Services";
import TechStack from "@/components/home-designer/TechStack";
import Projects from "@/components/home-designer/Projects";
import Industries from "@/components/home-designer/Industries";
import WhyChooseUs from "@/components/home-designer/WhyChooseUs";
import Process from "@/components/home-designer/Process";
import Testimonials from "@/components/home-designer/Testimonials";
import Blog from "@/components/home-designer/Blog";
import FinalCta from "@/components/home-designer/FinalCta";
import ParallaxDivider from "@/components/home-designer/ParallaxDivider";

/* --------------------
   HomePage component
   -------------------- */
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
      {/* 1. Header - Already in layout */}

      {/* 2. Hero Banner */}
      <Hero />

      {/* Divider */}
      <ParallaxDivider />

      {/* 3. About Us */}
      <About />

      {/* 4. Our Services */}
      <Services />

      {/* 5. Tech Stack (Logo Marquee) */}
      <TechStack />

      {/* 6. Featured Projects */}
      <Projects />

      {/* 7. Industries Served */}
      <Industries />

      {/* 8. Why Choose Us */}
      <WhyChooseUs />

      {/* 9. Our 6-Step Process */}
      <Process />

      {/* 10. Testimonials */}
      <Testimonials />

      {/* 11. Blog / Insights */}
      <Blog />

      {/* 12. Final Call to Action */}
      <FinalCta />

      {/* 13. Footer - Already in layout */}
    </div>
  );
}

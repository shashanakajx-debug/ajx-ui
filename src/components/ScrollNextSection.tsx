"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

import AboutHero from "@/components/about/Hero2";
import ServicesHero from "@/app/(public)/our-services/Hero";
import PortfolioHero from "@/app/(public)/our-portfolio/Portfolios1";

const ROUTE_MAP: Record<string, string> = {
  "/": "/about-us",
  "/about-us": "/our-services",
  "/our-services": "/our-portfolio",
  "/our-portfolio": "/career",
  "/career": "/blog",
  "/blog": "/contact",
  "/contact": "/",
};

const HERO_MAP: Record<string, React.ComponentType<any>> = {
  "/about-us": AboutHero,
  "/our-services": ServicesHero,
  "/our-portfolio": PortfolioHero,
};

export default function ScrollNextSection() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasNavigated, setHasNavigated] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const progress = useMotionValue(0);

  const smoothProgress = useSpring(progress, {
    stiffness: 60,
    damping: 25,
    mass: 0.8,
  });

  const nextPath = ROUTE_MAP[pathname || "/"] ?? ROUTE_MAP["/"];
  const NextHeroComponent = HERO_MAP[nextPath];

  const y = useTransform(smoothProgress, [0, 1], ["100vh", "0vh"]);
  const scale = useTransform(smoothProgress, [0, 1], [0.85, 1.0]);
  const borderRadius = useTransform(smoothProgress, [0, 1], ["40px", "0px"]);
  const shadowOpacity = useTransform(smoothProgress, [0, 0.5], [0, 0.6]);

  useEffect(() => {
    let currentProgress = 0;
    let isLocked = false;

    const handleWheel = (e: WheelEvent) => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20;

      if (!isAtBottom) {
        if (currentProgress > 0) {
          currentProgress = 0;
          progress.set(0);
          setIsActive(false);
        }
        return;
      }

      if (e.deltaY > 0 || currentProgress > 0) {
        setIsActive(true);

        if (currentProgress > 0 && currentProgress < 1) {
          e.preventDefault();
        }
        const delta = e.deltaY * 0.0015;

        currentProgress = Math.min(Math.max(currentProgress + delta, 0), 1.05);

        progress.set(currentProgress);

        if (currentProgress >= 1 && !isLocked) {
          isLocked = true;

          window.history.pushState({}, "", nextPath);
          router.push(nextPath);
        }

        if (currentProgress <= 0) {
          setIsActive(false);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [progress, nextPath, router]);

  useEffect(() => {
    setHasNavigated(false);
    setIsActive(false);
    progress.set(0);
  }, [pathname, progress]);

  return (
    <>
      <div className="w-full h-0" aria-hidden="true" />

      <motion.div
        style={{
          y,
          scale,
          borderRadius,
          display: isActive || hasNavigated ? "flex" : "none",
        }}
        className="fixed inset-0 z-[99999] bg-white flex-col overflow-hidden origin-bottom shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
      >
        <motion.div
          style={{ opacity: shadowOpacity }}
          className="absolute inset-0 bg-black/5 pointer-events-none z-10"
        />

        <div className="relative w-full h-full overflow-hidden bg-white">
          {NextHeroComponent ? (
            <NextHeroComponent />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-4xl font-bold bg-gray-50">
              {nextPath}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

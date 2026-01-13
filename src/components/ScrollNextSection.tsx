"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Define the sequence of pages
const ROUTE_MAP: Record<string, string> = {
  "/": "/about-us",
  "/about-us": "/our-services",
  "/our-services": "/our-portfolio",
  "/our-portfolio": "/career",
  "/career": "/blog",
  "/blog": "/contact",
  "/contact": "/",
};

type Props = {
  nextHref?: string;
};

export default function ScrollNextSection({ nextHref }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [inView, setInView] = useState(false);
  const [scrollState, setScrollState] = useState<"idle" | "confirming">("idle");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isNavigatingRef = useRef(false);
  const confirmTimeoutRef = useRef<number | null>(null);
  const progressRafRef = useRef<number | null>(null);
  const progressStartRef = useRef<number | null>(null);

  // Tweakable timings (feel free to adjust)
  const CONFIRM_DURATION = 4500; 
  const NAV_DELAY = 450; 
  const POST_NAV_RESET = 700; 

  const targetPath = nextHref ?? ROUTE_MAP[pathname || "/"] ?? ROUTE_MAP["/"];

  const getPageName = (path: string) => {
    if (path === "/") return "Home";
    return path
      .replace(/\//g, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const nextTitle = getPageName(targetPath);

  // Minimal, subtle loading indicator and optimized timing
  const triggerNavigation = useCallback(() => {
    if (!targetPath || isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    setIsLoading(true);

    // small polish delay then navigate
    window.setTimeout(() => {
      // Use Next.js navigation
      router.push(targetPath);

      // In case navigation doesn't immediately unmount (e.g. shallow), reset after a short delay
      window.setTimeout(() => {
        isNavigatingRef.current = false;
        setIsLoading(false);
      }, POST_NAV_RESET);
    }, NAV_DELAY);
  }, [router, targetPath]);

  // Smooth progress with requestAnimationFrame
  const startProgress = useCallback(() => {
    // reset
    if (progressRafRef.current) {
      cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = null;
    }
    progressStartRef.current = performance.now();

    const step = (now: number) => {
      if (!progressStartRef.current) progressStartRef.current = now;
      const elapsed = now - progressStartRef.current;
      const pct = Math.min((elapsed / CONFIRM_DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        progressRafRef.current = requestAnimationFrame(step);
      } else {
        // stop raf
        if (progressRafRef.current) {
          cancelAnimationFrame(progressRafRef.current);
          progressRafRef.current = null;
        }
      }
    };

    progressRafRef.current = requestAnimationFrame(step);
  }, [CONFIRM_DURATION]);

  const stopProgress = useCallback(() => {
    if (progressRafRef.current) {
      cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = null;
    }
    progressStartRef.current = null;
    setProgress(0);
  }, []);

  const handleScrollAction = useCallback(() => {
    if (isNavigatingRef.current) return;

    if (scrollState === "idle") {
      setScrollState("confirming");
      setProgress(0);

      // start smooth progress
      startProgress();

      // auto-hide after the confirm duration
      if (confirmTimeoutRef.current) {
        window.clearTimeout(confirmTimeoutRef.current);
      }
      confirmTimeoutRef.current = window.setTimeout(() => {
        setScrollState("idle");
        stopProgress();
      }, CONFIRM_DURATION);
    } else if (scrollState === "confirming") {
      // second scroll or interaction triggers navigation immediately
      if (confirmTimeoutRef.current) {
        window.clearTimeout(confirmTimeoutRef.current);
        confirmTimeoutRef.current = null;
      }
      stopProgress();
      triggerNavigation();
    }
  }, [scrollState, startProgress, stopProgress, triggerNavigation]);

  // Intersection observer to detect when the page bottom/footer area is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // small threshold — we want to react quickly when user reaches footer area
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Add scroll/wheel/touch/keyboard handlers only when in view
  useEffect(() => {
    if (!inView) {
      // clean state
      setScrollState("idle");
      setProgress(0);
      if (confirmTimeoutRef.current) {
        window.clearTimeout(confirmTimeoutRef.current);
        confirmTimeoutRef.current = null;
      }
      if (progressRafRef.current) {
        cancelAnimationFrame(progressRafRef.current);
        progressRafRef.current = null;
      }
      return;
    }

    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 12) handleScrollAction();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " " || e.key === "Enter") {
        handleScrollAction();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (touchStartY - y > 24) handleScrollAction();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (confirmTimeoutRef.current) {
        window.clearTimeout(confirmTimeoutRef.current);
        confirmTimeoutRef.current = null;
      }
      if (progressRafRef.current) {
        cancelAnimationFrame(progressRafRef.current);
        progressRafRef.current = null;
      }
    };
  }, [inView, handleScrollAction]);

  return (
    <>
      {/* invisible trigger area */}
      <div ref={sectionRef} className="w-full h-24 opacity-0 pointer-events-none" aria-hidden="true" />

      {/* popup */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300
          ${scrollState === "confirming" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"}
        `}
      >
        <button onClick={triggerNavigation} className="relative group focus:outline-none">
          <div className="relative bg-black/85 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 border border-white/10">

            {/* subtle progress bar (minimal) */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/6 rounded-b-md overflow-hidden">
              <div
                className="h-full bg-white/70 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col text-left">
                {isLoading ? (
                  <span className="text-xs text-white/60 uppercase tracking-wider">Loading</span>
                ) : (
                  <span className="text-xs text-white/60 uppercase tracking-wider">Next Page</span>
                )}
                <span className="text-sm font-medium">{nextTitle}</span>
              </div>

              {/* Minimal loading cue: a small pulsing dot beside the title when loading */}
              <div className="flex-shrink-0">
                {isLoading ? (
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse" aria-hidden="true" />
                ) : (
                  // small chevron that nudges on hover/focus — very subtle
                  <svg className="w-4 h-4 text-white/70 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  /** Optional override for the next link */
  nextHref?: string;
};

export default function ScrollNextSection({ nextHref }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [inView, setInView] = useState(false);
  const isNavigatingRef = useRef(false);

  // Determine target path
  const targetPath = nextHref ?? ROUTE_MAP[pathname || "/"] ?? ROUTE_MAP["/"];

  const goNext = useCallback(() => {
    if (!targetPath) return;
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    router.push(targetPath);

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 900);
  }, [router, targetPath]);

  // Detect when this section is mostly visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.75),
      { threshold: [0.75] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll / Wheel / Touch to navigate
  useEffect(() => {
    if (!inView) return;

    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 18) goNext();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " " || e.key === "Enter") {
        goNext();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      // swipe up => navigate
      if (touchStartY - y > 22) goNext();
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
    };
  }, [inView, goNext]);

  return (
    <div
      ref={sectionRef}
      className="w-full h-10 opacity-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

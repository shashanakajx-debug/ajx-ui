"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  /** Big title shown (dynamic). Optional now (defaults provided). */
  title?: string;

  /** Where to go when user scrolls down. Optional now (defaults provided). */
  nextHref?: string;
  /** Alias for nextHref to be compatible with other components */
  href?: string;

  /** Top strip texts */
  topLeft?: string;
  topCenter?: string;
  topRight?: string;

  /** Right side label */
  nextLabel?: string;

  /** How many plus signs to show on bottom line */
  plusCount?: number;
};

export default function ScrollNextSection({
  title = "ABOUT US",
  nextHref = "/about-us",
  href,
  topLeft = "©2025 Your Studio",
  topCenter = "R&D: yourdomain.com",
  topRight = "Built with ❤️",
  nextLabel = "NEXT PAGE",
  plusCount = 5,
}: Props) {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [inView, setInView] = useState(false);
  const isNavigatingRef = useRef(false);

  const plusArray = useMemo(() => Array.from({ length: plusCount }), [plusCount]);

  const resolvedNextHref = nextHref ?? href;

  const goNext = () => {
    if (!resolvedNextHref) return;
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    router.push(resolvedNextHref);

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 900);
  };

  // Detect when this section is mostly visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.75),
      { threshold: [0.25, 0.5, 0.75, 0.9] }
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
  }, [inView, nextHref]);

  return (
    <section ref={sectionRef} className="w-full">
      {/* Top white strip */}
      <div className="w-full bg-white text-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm">
          <div className="opacity-90">{topLeft}</div>
          <div className="opacity-90">{topCenter}</div>
          <div className="opacity-90">{topRight}</div>
        </div>
      </div>

      {/* Dark panel */}
      <div className="relative w-full bg-[#0b0f14] text-white">
        <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-6 py-20">
          {/* Left small text */}
          <div className="mb-10 max-w-md text-sm tracking-wide text-white/90">
            <div className="uppercase">KEEP SCROLLING</div>
            <div className="uppercase">TO LEARN MORE</div>
          </div>

          {/* Main row: big title + next page */}
          <div className="flex items-center justify-between gap-10">
            <h2 className="text-[64px] font-light tracking-wide md:text-[84px]">
              {(title ?? "ABOUT US").toUpperCase()}
            </h2>

            <button
              onClick={goNext}
              className="group hidden items-center gap-4 text-sm tracking-widest text-white/90 md:flex"
              aria-label={`Go to next page: ${resolvedNextHref}`}
              type="button"
            >
              <span className="uppercase">{nextLabel}</span>
              <span className="h-[2px] w-56 bg-white/20 transition-all group-hover:w-64" />
              <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Bottom line + plus signs */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between pb-6">
              {plusArray.map((_, i) => (
                <div key={i} className="text-3xl font-light text-white/90">
                  +
                </div>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-white/15" />
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import AnimatedButton from "@/components/animation/AnimatedButton";
import Image from "next/image";
import SectionHeader from "./SectionHeader";

type ExpertiseItem = {
  id: string;
  number: string;
  title: string;
  tags: string[];
  description: string;
  href: string;
  class: string;
  image: {
    src: string;
    alt: string;
  };
};

const EXPERTISE: ExpertiseItem[] = [
  {
    id: "data-ai",
    number: "01/",
    class: "circle-animation",
    title: "AI & Automation Solution",
    tags: ["ML", "LLMs", "Analytics", "Automation", "Dashboards", "MLOps"],
    description:
      "Turn raw data into decisions using analytics, automation, and AI systems built for real business impact.",
    href: "/expertise/data-science-ai",
    image: {
      src: "/FuturisticTechnology/ArtificialIntelligenceCircle.png",
      alt: "Data science & AI preview",
    },
  },

  {
    id: "web-dev",
    number: "02/",
    class: "",
    title: "Web Development",
    tags: ["Next.js", "React", "Node.js", "CMS", "Headless", "Ecommerce"],
    description:
      "High-performance web experiences with modern stacks, SEO-first structure, and scalable architecture.",
    href: "/expertise/web-development",
    image: {
      src: "/FuturisticTechnology/image (2).webp",
      alt: "Web development preview",
    },
  },
  {
    id: "mobile-app",
    number: "03/",
    class: "",
    title: "Mobile App Development",
    tags: ["iOS", "Android", "React Native", "Flutter", "APIs", "UI/UX"],
    description:
      "Build reliable mobile apps with clean UI, fast performance, and secure backend integrations.",
    href: "/expertise/mobile-app-development",
    image: {
      src: "/FuturisticTechnology/image (2).webp",
      alt: "Mobile app development preview",
    },
  },
  {
    id: "software",
    number: "04/",
    title: "Software",
    tags: [
      "Chicago",
      "New York",
      "Houston",
      "IT Consulting",
      "Scoping Session",
      "Product Development",
      "Product Management",
      "MVP Development",
      "Maintenance & Support",
      "SaaS",
    ],
    description:
      "Streamline all your interactions with customers through the launch of an individual CRM system made by your team.",
    href: "/expertise/software",
    class: "",
    image: {
      src: "/FuturisticTechnology/image (2).webp",
      alt: "Software expertise preview",
    },
  },
  {
    id: "qa",
    number: "05/",
    class: "",
    title: "QA & Software Testing",
    tags: ["Manual", "Automation", "Cypress", "Playwright", "API Testing"],
    description:
      "Ensure stability and quality through structured QA cycles, automation suites, and regression coverage.",
    href: "/expertise/qa-testing",
    image: {
      src: "/FuturisticTechnology/image (2).webp",
      alt: "QA & testing preview",
    },
  },
  {
    id: "ux-ui",
    number: "06/",
    title: "UX/UI Design",
    class: "",
    tags: ["Wireframes", "Design Systems", "Figma", "Prototyping", "UX Audit"],
    description:
      "Human-first interfaces with strong visual hierarchy, clean layouts, and conversion-focused UX.",
    href: "/expertise/ux-ui-design",
    image: {
      src: "/FuturisticTechnology/image (2).webp",
      alt: "UX/UI design preview",
    },
  },
];

export default function OurExpertise() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const active = React.useMemo(
    () => EXPERTISE[activeIndex] ?? EXPERTISE[0],
    [activeIndex]
  );

  // Scroll state and refs
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const wheelCooldownRef = React.useRef(false);
  const touchStartYRef = React.useRef<number | null>(null);

  // Scroll configuration settings
  const SCROLL_THRESHOLD = 6; // wheel delta threshold (px-ish)
  const TOUCH_THRESHOLD = 40; // pixels swipe for touch
  const COOLDOWN_MS = 550; // cooldown between changes


  const clampIndex = (i: number) =>
    Math.max(0, Math.min(EXPERTISE.length - 1, i));

  const goToIndex = (i: number) => {
    const clamped = clampIndex(i);
    if (clamped === activeIndex) return;
    setActiveIndex(clamped);
  };

  const goNext = () => goToIndex(activeIndex + 1);
  const goPrev = () => goToIndex(activeIndex - 1);


  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only intercept when pointer is over the component
      // preventDefault to stop page scroll
      if (wheelCooldownRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;

      e.preventDefault();
      e.stopPropagation();

      wheelCooldownRef.current = true;
      if (delta > 0) {
        goNext();
      } else {
        goPrev();
      }
      window.setTimeout(() => {
        wheelCooldownRef.current = false;
      }, COOLDOWN_MS);
    };

    // Add with passive: false so preventDefault works
    el.addEventListener("wheel", onWheel, { passive: false });


    const onKey = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement)) return; // only when focused inside
      if (e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);

    // touch handlers for mobile
    const onTouchStart = (ev: TouchEvent) => {
      if (ev.touches && ev.touches.length) {
        touchStartYRef.current = ev.touches[0].clientY;
      }
    };
    const onTouchMove = (ev: TouchEvent) => {
      // prevent page from moving while swiping component
      if (touchStartYRef.current !== null) {
        ev.preventDefault();
      }
    };
    const onTouchEnd = (ev: TouchEvent) => {
      const start = touchStartYRef.current;
      touchStartYRef.current = null;
      if (!start) return;
      const endY =
        ev.changedTouches && ev.changedTouches.length
          ? ev.changedTouches[0].clientY
          : start;
      const diff = start - endY; // positive => swipe up
      if (Math.abs(diff) < TOUCH_THRESHOLD) return;

      if (wheelCooldownRef.current) return;
      wheelCooldownRef.current = true;
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
      window.setTimeout(() => {
        wheelCooldownRef.current = false;
      }, COOLDOWN_MS);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel as unknown as EventListener);
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("touchstart", onTouchStart as unknown as EventListener);
      el.removeEventListener("touchmove", onTouchMove as unknown as EventListener);
      el.removeEventListener("touchend", onTouchEnd as unknown as EventListener);
    };
  }, [activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // focus container on mount so keyboard works immediately (optional)
  React.useEffect(() => {
    const el = containerRef.current;
    if (el) {
      // don't force focus if user clicked somewhere else — only focus if nothing else focused
      if (!document.activeElement || document.activeElement === document.body) {
        el.setAttribute("tabindex", "0");
      }
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="mxd-container our-experties container_ser mxd-section padding-hero-01 padding-pre-manifest"
      // Make the container focusable for keyboard navigation
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Expertise services. Use wheel, swipe, or arrow keys to move between services."
    >
      <div className="mx-auto row gx-0">

        <SectionHeader
          subtitle="OUR EXPERTISE"
          title="Advanced AI Services"
          description="for Digital-First Companies"
          buttonText="View More"
          buttonLink="#"
          className=""
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">

          <div className="flex flex-col">
            {EXPERTISE.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  className="border-b border-black/10 py-6"
                  // allow click to also focus this container (so keyboard works)
                  onClick={() => {
                    setActiveIndex(idx);
                    // Focus container to capture wheel/keys after click
                    containerRef.current?.focus();
                  }}
                >
                  <div className="flex items-start gap-6">
                    <div className="min-w-[54px] text-right">
                      <span className="number-aor-exprties">{item.number}</span>
                    </div>

                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveIndex(idx);
                          containerRef.current?.focus();
                        }}
                        className={[
                          "group w-full text-left",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2",
                        ].join(" ")}
                        aria-expanded={isActive}
                      >
                        <div
                          className={[
                            "oe-title-underline",
                            "text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl",
                          ].join(" ")}
                          data-active={isActive ? "true" : "false"}
                        >
                          {item.title}
                        </div>
                      </button>


                      <div
                        className={[
                          "grid transition-all duration-200 ease-out",
                          isActive
                            ? "mt-4 grid-rows-[1fr] opacity-100"
                            : "mt-0 grid-rows-[0fr] opacity-0",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={[
                                  "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                                ].join(" ")}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <p className="mt-4 leading-7 ">{item.description}</p>

                          <div className="mt-5">
                            <AnimatedButton
                              text="Learn more"
                              className="btn slide-right-up anim-uni-in-up"
                              href={`#`}
                            >
                              <i className="ph-bold ph-arrow-up-right" />
                            </AnimatedButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden">

              <div
                key={active.image.src}
                className="absolute inset-0 animate-[fadeIn_220ms_ease-out]"
              >
                <div
                  className={`relative w-full h-full flex justify-center items-center ${active.class}`}
                >
                  <Image
                    src={active.image.src}
                    alt={active.image.alt}
                    fill
                    className="object-contain p-3 sm:p-6 border-icon"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for the green underline animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Bottom line hover animation + active underline */
        .oe-title-underline {
          position: relative;
          display: inline-block; /* underline fits text width */
        }

        .oe-title-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -10px; /* spacing below heading */
          width: 100%;
          height: 3px;
          background: #119000; /* green line */
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 260ms ease;
        }

        .oe-title-underline[data-active="true"]::after {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  );
}

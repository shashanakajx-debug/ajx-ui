"use client";

import React, { useRef, useState, useEffect } from "react";
import AnimatedButton from "@/components/animation/AnimatedButton";
import Image from "next/image";
import SectionHeader from "./SectionHeader";

type ExpertiseItem = {
  id: string;
  number: string;
  title: string;
  tags: string[];
  description: string;
  class: string;
  href: string;
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
    class: "",
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
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  // We need refs to the wrapper (tall container) and the sticky section
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const stickyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = EXPERTISE.length;

  React.useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Logic:
      // 1. If wrapper top > 0: We are above the section.
      // 2. If wrapper top <= 0 AND wrapper bottom > viewportHeight: We are scrolling INSIDE the section.
      // 3. If wrapper bottom <= viewportHeight: We are reaching the END.

      const isPastTop = rect.top <= 0;
      const isAtBottom = rect.bottom <= viewportHeight;

      // STICKY BEHAVIOR MANIPULATION
      if (isAtBottom) {
        // SCENARIO: We reached the end. 
        // We must PIN the section to the BOTTOM of the wrapper so it scrolls away naturally.
        sticky.style.position = 'absolute';
        sticky.style.top = 'auto'; // Release top
        sticky.style.bottom = '0px'; // Stick to bottom
        sticky.style.width = '100%';
      } else if (isPastTop) {
        // SCENARIO: We are scrolling through.
        // Pin to VIEWPORT TOP.
        sticky.style.position = 'fixed';
        sticky.style.top = '0px';
        sticky.style.bottom = 'auto';
        sticky.style.width = '100%';
      } else {
        // SCENARIO: Not yet reached or just entering.
        // Default relative behavior.
        sticky.style.position = 'relative';
        sticky.style.top = 'auto';
        sticky.style.bottom = 'auto';
        sticky.style.width = '100%';
      }

      // ACTIVE INDEX LOGIC
      // Based on how far we scrolled INTO the wrapper.
      // rect.top is negative. So -rect.top is pixels scrolled.
      const scrolledPixels = -rect.top;

      if (scrolledPixels < 0) {
        setActiveIndex(0);
      } else {
        // 1 Item = 1 Screen Height
        const newIndex = Math.floor(scrolledPixels / viewportHeight);
        // Clamp it safely
        setActiveIndex(Math.min(Math.max(newIndex, 0), itemCount - 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, itemCount]);

  const active = EXPERTISE[activeIndex];

  // Total Height = Items * Viewport Height.
  // This gives exactly 1 screen of scroll per item.
  // Item 6 will be visible from 500vh to 600vh.
  // At 600vh, rect.bottom hits viewport bottom, and it unpins.
  const wrapperHeight = mounted ? itemCount * window.innerHeight : 6000;

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `${wrapperHeight}px`,
        position: "relative",
      }}
    >
      <section
        ref={stickyRef}
        className="h-screen w-full flex items-center z-10 overflow-hidden"
        // Initial state is critical for SSR match
        style={{ height: '100vh', position: 'relative' }}
      >
        <div className="mxd-container our-experties container_ser mxd-section w-full h-full padding-hero-01 padding-pre-manifest pb-24">
          <div className="mx-auto row gx-0 w-full">
            <SectionHeader
              subtitle="OUR EXPERTISE"
              title="Advanced AI Services"
              description="for Digital-First Companies"
              buttonText="View More"
              buttonLink="#"
              className=""
            />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start mt-6">
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  {EXPERTISE.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <div
                        key={item.id}
                        className="border-b border-black/10 py-4"
                        onClick={() => {
                          // Allow click to jump
                          if (wrapperRef.current) {
                            const targetTop = wrapperRef.current.offsetTop + (idx * window.innerHeight);
                            window.scrollTo({ top: targetTop, behavior: 'smooth' });
                          }
                        }}
                      >
                        <div className="flex items-start gap-6 cursor-pointer">
                          <div className="min-w-[54px] text-right">
                            <span className="number-aor-exprties">{item.number}</span>
                          </div>
                          <div className="flex-1">
                            <button className="group w-full text-left">
                              <div
                                className={[
                                  "oe-title-underline",
                                  "text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl",
                                  isActive ? "text-black" : "text-gray-400"
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
                                      className="rounded-full border px-3 py-1 lg:text-[20px] text-[18px] font-semibold uppercase tracking-wide"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <p className="mt-4 leading-10 lg:text-[24px] text-[18px]">
                                  {item.description}
                                </p>

                                <div className="mt-5">
                                  <AnimatedButton
                                    text="Learn more"
                                    className="btn slide-right-up btn-outline btn-small anim-uni-in-up"
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
              </div>

              <div className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <div
                    key={active.image.src}
                    className="absolute inset-0 animate-[fadeIn_220ms_ease-out]"
                  >
                    <div className={`relative w-full h-full flex justify-center items-center ${active.class}`}>
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
        </div>
      </section>

      <style jsx global>{`
        .oe-title-underline { position: relative; display: inline-block; }
        .oe-title-underline::after {
          content: ""; position: absolute; left: 0; bottom: -5px; width: 100%; height: 3px;
          background: #119000; border-radius: 99px; transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease;
        }
        .oe-title-underline[data-active="true"]::after { transform: scaleX(1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
"use client";

import React from "react";
import AnimatedButton from "@/components/animation/AnimatedButton";
import Image from "next/image";
import Link from "next/link";

type ExpertiseItem = {
  id: string;
  number: string; // "01/"
  title: string; // "Software"
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
  const [activeId, setActiveId] = React.useState<string>(EXPERTISE[0].id);
  const active = React.useMemo(
    () => EXPERTISE.find((i) => i.id === activeId) ?? EXPERTISE[0],
    [activeId]
  );

  return (
    <section className="mxd-container our-experties container_ser mxd-section padding-hero-01 padding-pre-manifest">
      <div className="mx-auto row gx-0">
        {/* Top label */}
        <div className="md:mb-40 mb-4 gap-4 lg:flex md:flex items-center gap-3 justify-between text-center ">
          <div className="left-content">
          <p className="font-semibold ">
            + Our Expertise
          </p>
          </div>
          <div className="heading">
           <h2 className="text-right">Advanced AI Services</h2>
            <h4 className="text-right">for Digital-First Companies</h4>
          </div>
          <div className="">
            <AnimatedButton
            text="View More"
            className="btn experties-button slide-right-up anim-uni-in-up"
            href={`#`}>
            <i className="ph-bold ph-arrow-up-right" />
            </AnimatedButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* left: List + Active content */}
          <div className="flex flex-col">
            {EXPERTISE.map((item) => {
              const isActive = item.id === activeId;

              return (
                <div key={item.id} className="border-b border-black/10 py-6">
                  <div className="flex items-start gap-6">
                    <div className="min-w-[54px] text-right">
                      <span className="number-aor-exprties">{item.number}</span>
                    </div>

                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => setActiveId(item.id)}
                        className={[
                          "group w-full text-left",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2",
                        ].join(" ")}
                        aria-expanded={isActive}
                      >
                        {/* ✅ UPDATED: underline hover + active (NO color changes) */}
                        <div
                          className={[
                            "oe-title-underline", // added class only
                            "text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl",
                            isActive ? "" : "",
                          ].join(" ")}
                          data-active={isActive ? "true" : "false"}
                        >
                          {item.title}
                        </div>
                      </button>

                      {/* Active expanded block */}
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
                                  isActive
                                    ? ""
                                    : "",
                                ].join(" ")}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <p className="mt-4 leading-7 ">
                            {item.description}
                          </p>

                          <div className="mt-5">
                            <AnimatedButton
                            text="Learn more"
                            className="btn experties-button slide-right-up anim-uni-in-up"
                            href={`#`}>
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

          {/* Right: Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm">
              {/* Fade swap */}
              <div
                key={active.image.src}
                className="absolute  inset-0 animate-[fadeIn_220ms_ease-out]"
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

      {/* ✅ Only added underline CSS (green #119000) + existing fadeIn (no other color changes) */}
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

        /* hover underline */
        button.group:hover .oe-title-underline::after {
          transform: scaleX(1);
        }

        /* active underline stays */
        .oe-title-underline[data-active="true"]::after {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  );
}
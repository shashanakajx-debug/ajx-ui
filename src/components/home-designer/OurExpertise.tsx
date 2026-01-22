"use client";

import React, { useRef, useEffect } from "react";
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

const ExpertiseRow = ({
  item,
  activeId,
  setActiveId,
}: {
  item: ExpertiseItem;
  activeId: string;
  setActiveId: (id: string) => void;
}) => {
  const ref = useRef(null);

  const isActive = item.id === activeId;

  return (
    <div
      ref={ref}
      className={`border-b border-black/10 py-6 transition-all duration-500 ${isActive ? "py-20" : "py-6"
        }`}
    >
      <div className="flex items-start gap-6">
        <div className="min-w-[54px] text-right">
          <span className="number-aor-exprties">{item.number}</span>
        </div>

        <div className="flex-1">
          <button
            type="button"
            onClick={() => setActiveId(item.id)}
            className="group heading-ultra w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2"
            aria-expanded={isActive}
          >
            <div
              className="relative inline-block text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl after:content-[''] after:absolute after:left-0 after:-bottom-2.5 after:w-full after:h-[3px] after:bg-[#119000] after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:duration-260 after:ease-out group-hover:after:scale-x-100 data-[active=true]:after:scale-x-100"
              data-active={isActive ? "true" : "false"}
            >
              {item.title}
            </div>
          </button>

          {/* Active expanded block */}
          <div
            className={`grid transition-all duration-200 ease-out ${isActive
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 leading-7">{item.description}</p>

              <div className="mt-5">
                <AnimatedButton
                  text="Learn more"
                  className="btn experties-button slide-right-up anim-uni-in-up"
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
};

export default function OurExpertise() {
  const [activeId, setActiveId] = React.useState<string>(EXPERTISE[0].id);

  const active = React.useMemo(
    () => EXPERTISE.find((i) => i.id === activeId) ?? EXPERTISE[0],
    [activeId]
  );

  return (
    <section className="mxd-container our-experties container_ser py-12 lg:pt-20 lg:pb-5 relative">
      <div className="mx-auto row gx-0">
        <SectionHeader
          subtitle="OUR EXPERTISE"
          title="Advanced AI Services"
          description="for Digital-First Companies"
          buttonText="View More"
          buttonLink="#"
          className=""
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start relative">
          {/* left: List + Active content */}
          <div className="flex flex-col">
            {EXPERTISE.map((item) => (
              <ExpertiseRow
                key={item.id}
                item={item}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>

          {/* Right: Image - Sticky */}
          <div className="relative hidden lg:block">
            {/* Sticky container matching the view height approximately */}
            <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* Fade swap */}
                <div
                  key={active.image.src}
                  className="absolute inset-0 animate-fade-in"
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
          {/* Mobile Image Fallback (Simple) - optional, keeping desktop focused logic */}
          <div className="relative lg:hidden">
            <div className="relative aspect-[4/3] w-full overflow-hidden circle-animation-w">
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
    </section>
  );
}
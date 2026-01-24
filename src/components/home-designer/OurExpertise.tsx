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
      "Turn your data into revenue-driving decisions. We build scalable AI systems that automate operations, surface real-time insights, reduce costs, and accelerate business growth—without complexity.",
    href: "/our-services/data-science-ai",
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
      "We build fast, SEO-optimized, and conversion-ready websites using modern stacks—designed to scale, load instantly, and turn visitors into customers.",
    href: "/our-services/web-development",
    image: {
      src: "/FuturisticTechnology/Untitled design 1 (2).png",
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
      "We build high-performance, user-friendly mobile apps with clean UI, smooth performance, and secure backend integrations—designed to engage users and drive real business growth.",
    href: "/our-services/mobile-app-development",
    image: {
      src: "/FuturisticTechnology/ArtificialIntelligenceCircle.png",
      alt: "Mobile app development preview",
    },
  },
  {
    id: "software",
    number: "04/",
    title: "Software Development ",
    tags: [
      "IT Consulting ",
      "Scoping Sessions ",
      "Product Strategy",
      "MVP Development",
      "SaaS Solutions",
      "Product Management",
      "Ongoing Support",
    ],
    description:
      "We design and build custom software and CRM systems that streamline customer interactions, accelerate product launches, and scale seamlessly as your business grows.",
    href: "/our-services/software",
    class: "",
    image: {
      src: "/FuturisticTechnology/ArtificialIntelligenceCircle.png",
      alt: "Software expertise preview",
    },
  },
  {
    id: "qa",
    number: "05/",
    class: "",
    title: "QA & Software Testing",
    tags: ["Manual Testing", "Automation", "Cypress", "Playwright", "API Testing","Regression Suites"],
    description:
      "We ensure stable, secure, and release-ready software through structured QA cycles, automated test coverage, and continuous regression testing—so you ship faster with confidence.",
    href: "/our-services/qa-testing",
    image: {
      src: "/FuturisticTechnology/ArtificialIntelligenceCircle.png",
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
      "We design human-first, conversion-focused interfaces with clear visual hierarchy, intuitive flows, and clean layouts—turning user experiences into measurable business results.",
    href: "/our-services/ux-ui-design",
    image: {
      src: "/FuturisticTechnology/ArtificialIntelligenceCircle.png",
      alt: "UX/UI design preview",
    },
  },
  {
    id: "E-Commerce",
    number: "07/",
    title: "E-Commerce and CMS",
    class: "",
    tags: ["Wireframes", "Design Systems", "Figma", "Prototyping", "UX Audit"],
    description:
      "We architect robust commerce and CMS ecosystems that support high traffic, complex catalogs, and long-term business expansion.",
    href: "/our-services/ux-ui-design",
    image: {
      src: "/FuturisticTechnology/ArtificialIntelligenceCircle.png",
      alt: "E-Commerce and CMS design preview",
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

              <p className="mt-4 leading text-[18px]">{item.description}</p>

              <div className="mt-5">
                <AnimatedButton
                  text="Learn more"
                  className="btn experties-button slide-right-up"
                  href={item.href}
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
          buttonLink="our-services"
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
            <div className="flex items-center justify-center">
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
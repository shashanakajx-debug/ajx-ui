"use client";
import { useState } from "react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

type CaseStudy = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  previewClass: string;
  tags: string[];
  anim?: string;
  metrics?: {
    percentage: string;
    amount: string;
    label: string;
  };
};

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Creative studio",
    description: "template for modern agencies",
    category: "UI/UX",
    previewClass: "preview-image-1",
    tags: ["UI/UX", "AI", "Web design", "Illustrations"],
    anim: "anim-uni-in-up",
    metrics: {
      percentage: "100%",
      amount: "5.0",
      label: "Client Satisfaction",
    },
  },
  {
    id: 2,
    title: "Interactive concept",
    description: "powered by AI",
    category: "3D MODELS",
    previewClass: "preview-image-2",
    tags: ["Sora", "AI", "Editorial"],
    anim: "anim-uni-in-up",
    metrics: {
      percentage: "95%",
      amount: "2X",
      label: "Faster Workflow",
    },
  },
  {
    id: 3,
    title: "Mobile app design",
    description: "for a cross-platform solution",
    category: "UI/UX",
    previewClass: "preview-image-3",
    tags: ["UI/UX", "Design", "Android"],
    anim: "",
    metrics: {
      percentage: "80%",
      amount: "1M+",
      label: "Downloads",
    },
  },
  {
    id: 4,
    title: "NFT project",
    description: "branding",
    category: "WEB DESIGN",
    previewClass: "preview-image-4",
    tags: ["Brand identity", "Style guides"],
    anim: "anim-uni-in-up",
    metrics: {
      percentage: "100%",
      amount: "10K",
      label: "Community Members",
    },
  },
  {
    id: 5,
    title: "Illustrations set",
    description: "for digital and print use.",
    category: "PACKAGING",
    previewClass: "preview-image-5",
    tags: ["Illustrations", "Design", "Packaging"],
    anim: "anim-uni-in-up",
    metrics: {
      percentage: "50+",
      amount: "High",
      label: "Quality Assets",
    },
  },
];

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("UI/UX");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["UI/UX", "AI", "WEB DESIGN", "PACKAGING", "3D MODELS"];

  const totalSlides = caseStudies.length;

  const currentCategory = caseStudies[currentSlide]?.category;
  if (currentCategory && currentCategory !== activeCategory) {
    setActiveCategory(currentCategory);
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleFilterClick = (category: string) => {
    setActiveCategory(category);
    const index = caseStudies.findIndex((study) => study.category === category);
    if (index !== -1) {
      setCurrentSlide(index);
    }
  };

  const getVisibleSlides = () => {
    return caseStudies.slice(currentSlide, currentSlide + 3);
  };

  return (
    <section className="py-12 md:py-20 px-5 overflow-hidden transition-colors duration-300">
      <style jsx>{`
        @keyframes smoothFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-fade-in {
          animation: smoothFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          subtitle="CASE STUDIES"
          title="Proven Results"
          description="Across Industries"
          buttonText="View More"
          buttonLink="/case-studies"
        />

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                data-magnetic
                data-tooltip={cat}
                className={`px-6 py-2.5 rounded-full border font-medium transition-all duration-300 ${activeCategory === cat
                  ? "border-[#119000] bg-[#119000] text-white"
                  : "border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:border-[#119000] hover:bg-[#119000]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
              data-magnetic
              data-tooltip="Previous Slide"
              className={`w-12 h-12 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center transition-all ${currentSlide === 0
                ? "opacity-50 cursor-not-allowed text-[var(--color-text-muted)]"
                : "hover:bg-[var(--color-text)] hover:text-[var(--color-surface)] hover:border-[var(--color-text)] text-[var(--color-text)]"
                }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-xl font-semibold tabular-nums text-[var(--color-text)]">
              {currentSlide + 1}
              <span className="text-[var(--color-text-muted)]">
                /{totalSlides}
              </span>
            </span>

            <button
              onClick={nextSlide}
              disabled={currentSlide >= totalSlides - 1}
              aria-label="Next slide"
              data-magnetic
              data-tooltip="Next Slide"
              className={`w-12 h-12 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center transition-all ${currentSlide >= totalSlides - 1
                ? "opacity-50 cursor-not-allowed text-[var(--color-text-muted)]"
                : "hover:bg-[var(--color-text)] hover:text-[var(--color-surface)] hover:border-[var(--color-text)] text-[var(--color-text)]"
                }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {getVisibleSlides().map((study, index) => {
              const isExpanded = hoveredId === study.id;

              let visibilityClass = "block";
              if (index === 1) visibilityClass = "hidden md:block";
              if (index === 2) visibilityClass = "hidden lg:block";

              return (
                <div
                  key={`${study.id}-${index}`}
                  onMouseEnter={() => setHoveredId(study.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 ease-in-out border border-[var(--color-border)] flex flex-col bg-[var(--color-surface)] ${visibilityClass}`}
                  style={{ height: "425px" }}
                >
                  {/* Image - shrinks on hover */}
                  <div
                    className="relative overflow-hidden flex-shrink-0 transition-all duration-700 ease-in-out"
                    style={{ height: isExpanded ? "150px" : "320px" }}
                  >
                    <Link
                      href={`/case-studies/${study.id}`}
                      className={`absolute inset-0 w-full h-full ${study.previewClass} bg-center bg-cover`}
                      style={{
                        transform: isExpanded ? "scale(1)" : "scale(1)",
                        transition: "transform 0.7s ease-in-out",
                      }}
                    >
                      <div
                        className="absolute inset-0 transition-colors duration-700"
                        style={{
                          backgroundColor: isExpanded
                            ? "rgba(0, 0, 0, 0.3)"
                            : "rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </Link>
                  </div>

                  {/* Content - fills remaining space */}
                  <div
                    className="p-8 flex flex-col transition-all duration-700 ease-in-out"
                    style={{ height: isExpanded ? "300px" : "200px" }}
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-[var(--color-text)] mb-2 leading-tight">
                          {study.title}
                        </h3>
                        <p className="text-[var(--color-text-muted)] font-medium">
                          {study.description}
                        </p>
                      </div>

                      {!isExpanded && (
                        <Link
                          href={`/case-studies/${study.id}`}
                          className="flex-shrink-0 w-12 h-12 rounded-full bg-[#119000] text-white flex items-center justify-center hover:bg-[#0e7500] hover:scale-110 transition-all"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="w-5 h-5"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </Link>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="transition-all duration-700 ease-in-out opacity-100">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {study.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-[var(--color-soft-gray)] rounded-md text-xs text-[var(--color-text-secondary)] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {study.metrics && (
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <div className="text-3xl font-bold text-[#119000] mb-1">
                                {study.metrics.percentage}
                              </div>
                              <div className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">
                                {study.metrics.label}
                              </div>
                            </div>
                            <div>
                              <div className="text-3xl font-bold text-[#119000] mb-1">
                                {study.metrics.amount}
                              </div>
                              <div className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">
                                {study.metrics.label}
                              </div>
                            </div>
                          </div>
                        )}

                        <Link
                          href={`/case-studies/${study.id}`}
                          className="w-full bg-[#119000] hover:bg-[#0e7500] text-white font-bold py-4 rounded-full flex items-center justify-between px-8 transition-colors group mt-auto"
                        >
                          <span data-magnetic data-tooltip="View Full Case Study">
                            View Full Case Study
                          </span>

                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


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
    tags: ["UI/UX", "Web design", "Illustrations"],
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

  const categories = ["UI/UX", "WEB DESIGN", "PACKAGING", "3D MODELS"];

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
                className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${activeCategory === cat
                  ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-surface)]"
                  : "border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:border-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-surface)]"
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
              className={`w-12 h-12 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center transition-all ${currentSlide === 0
                ? "opacity-50 cursor-not-allowed text-[var(--color-text-muted)]"
                : "hover:bg-[var(--color-text)] hover:text-[var(--color-surface)] hover:border-[var(--color-text)] text-[var(--color-text)]"
                }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-xl font-semibold tabular-nums text-[var(--color-text)]">
              {currentSlide + 1}<span className="text-[var(--color-text-muted)]">/{totalSlides}</span>
            </span>

            <button
              onClick={nextSlide}
              disabled={currentSlide >= totalSlides - 1}
              aria-label="Next slide"
              className={`w-12 h-12 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center transition-all ${currentSlide >= totalSlides - 1
                ? "opacity-50 cursor-not-allowed text-[var(--color-text-muted)]"
                : "hover:bg-[var(--color-text)] hover:text-[var(--color-surface)] hover:border-[var(--color-text)] text-[var(--color-text)]"
                }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleSlides().map((study, index) => {
              const isActive = index === 0;

              let visibilityClass = "block";
              if (index === 1) visibilityClass = "hidden md:block";
              if (index === 2) visibilityClass = "hidden lg:block";

              return (
                <div
                  key={`${study.id}-${index}`}
                  className={`rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--color-border)] flex flex-col h-full bg-[var(--color-surface)] ${visibilityClass}`}
                >
                  <div className={`relative group overflow-hidden ${isActive ? "h-64" : "flex-1 min-h-[300px]"}`}>
                    <Link
                      href={`/case-studies/${study.id}`}
                      className={`absolute inset-0 w-full h-full ${study.previewClass} bg-center bg-cover transition-transform duration-500 group-hover:scale-110`}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    </Link>
                  </div>

                  <div className="p-8 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2 leading-tight">
                          {study.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)] font-medium">
                          {study.description}
                        </p>
                      </div>

                      {!isActive && (
                        <Link
                          href={`/case-studies/${study.id}`}
                          className="flex-shrink-0 w-12 h-12 rounded-full bg-[#119000] text-white flex items-center justify-center hover:bg-[#0e7500] hover:scale-110 transition-all"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      )}
                    </div>

                    {isActive && (
                      <div className="mt-6 animation-fade-in">
                        <div className="flex flex-wrap gap-2 mb-8">
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
                          <div className="grid grid-cols-2 gap-4 mb-8">
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
                          className="w-full bg-[#119000] hover:bg-[#0e7500] text-white font-bold py-4 rounded-full flex items-center justify-between px-8 transition-colors group"
                        >
                          <span>View Full Case Study</span>
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
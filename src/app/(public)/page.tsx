"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ServiceCard from "@/components/molecules/ServiceCard/ServiceCard";
import Hero from "@/components/home-designer/Hero";
import About from "@/components/home-designer/About";
import Projects from "@/components/home-designer/Projects";
import Services from "@/components/home-designer/Services";
import ParallaxDivider from "@/components/home-designer/ParallaxDivider";

import {
  Brain,
  Blocks,
  Cloud,
  Code,
  ShoppingCart,
  Rocket,
  Search,
  Wrench,
} from "lucide-react";

/* --------------------
   Static data
   -------------------- */
const SERVICES = [
  {
    id: "ai",
    title: "AI & Automation Solutions",
    description:
      "With cutting-edge AI and automation frameworks, we design intelligent systems that streamline workflows and drive efficiency.",
    icon: Brain,
    link: "/our-services#ai-automation",
  },
  {
    id: "web3",
    title: "Blockchain & Web3 Solutions",
    description:
      "We craft decentralized applications with a focus on security, scalability, and innovation to empower businesses in the digital economy.",
    icon: Blocks,
    link: "/our-services#blockchain",
  },
  {
    id: "saas",
    title: "SaaS Product Development",
    description:
      "We build robust, cloud-ready SaaS applications with scalable architecture and enterprise-grade security.",
    icon: Cloud,
    link: "/our-services#saas",
  },
  {
    id: "web",
    title: "Web Design, Development & Applications",
    description:
      "Our web solutions combine stunning design with powerful development to create fast, responsive applications.",
    icon: Code,
    link: "/our-services#web",
  },
  {
    id: "ecom",
    title: "E-Commerce Development",
    description:
      "Our e-commerce solutions deliver seamless shopping experiences with secure transactions and conversion-focused design.",
    icon: ShoppingCart,
    link: "/our-services#ecommerce",
  },
  {
    id: "mvp",
    title: "MVP Development",
    description:
      "From concept to market-ready product, we build lean, scalable MVPs that validate ideas and attract investors.",
    icon: Rocket,
    link: "/our-services#mvp",
  },
  {
    id: "seo",
    title: "SEO & Digital Marketing",
    description:
      "We combine data-driven strategies with creative execution to maximize visibility, engagement, and measurable growth.",
    icon: Search,
    link: "/our-services#seo",
  },
  {
    id: "maint",
    title: "Website Maintenance & Support",
    description:
      "Our proactive support ensures your website stays secure, optimized, and always delivering peak performance.",
    icon: Wrench,
    link: "/our-services#maintenance",
  },
];

const WHY_CHOOSE_US = [
  {
    id: "tailored",
    title: "Tailored Solutions",
    description:
      "We don't believe in one-size-fits-all. Every website we create is designed specifically for your business needs and goals.",
  },
  {
    id: "endtoend",
    title: "End-to-End Services",
    description:
      "From concept to launch, we handle every aspect of your web development journey.",
  },
  {
    id: "results",
    title: "Proven Results",
    description:
      "Our work speaks for itself. We have a track record of delivering websites that improve performance and ROI.",
  },
  {
    id: "support",
    title: "Ongoing Support",
    description:
      "After your website goes live, we don't disappear. We provide ongoing support and maintenance to keep your site performing at its best.",
  },
];

const PROCESS_STEPS = [
  {
    id: "discovery",
    title: "Discovery & Research",
    description:
      "We start by understanding your business, your audience, and your objectives to create a tailored strategy.",
  },
  {
    id: "planning",
    title: "Planning & Strategy",
    description:
      "We outline the project scope, timelines, and deliverables to ensure everything runs smoothly from start to finish.",
  },
  {
    id: "design",
    title: "Design",
    description:
      "Our creative team crafts visually stunning designs that reflect your brand identity and enhance the user experience.",
  },
  {
    id: "development",
    title: "Development",
    description:
      "Using the latest technologies, we bring the designs to life with clean, efficient code that ensures performance and scalability.",
  },
  {
    id: "testing",
    title: "Testing & QA",
    description:
      "We rigorously test the website across different devices and browsers to ensure a seamless user experience.",
  },
  {
    id: "launch",
    title: "Launch & Post-Launch Support",
    description:
      "After launch, we provide ongoing support to monitor performance, fix any bugs, and make updates as needed.",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Daniyel Karlos",
    content:
      "The team at Ajx technologies transformed our online presence. The new website they built for us increased our traffic and conversions significantly. Their attention to detail and commitment to quality is outstanding.",
  },
  {
    id: "t2",
    name: "Samuel Peters",
    content:
      "We were blown away by the custom web app Ajx technologies developed for us. It has streamlined our operations and made our business so much more efficient. Highly recommended!",
  },
];

/* --------------------
   HomePage component
   -------------------- */
export default function HomePage() {
  const router = useRouter();
  const secretRef = useRef<string>("");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const LETTER_REGEX = /^[a-zA-Z]$/;
    const DIGIT_REGEX = /^[0-9]$/;
    const TARGET = "AJX006";
    const SEQ_LENGTH = TARGET.length;
    const RESET_MS = 3000;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const isLetterWithShift = e.shiftKey && LETTER_REGEX.test(key);
      const isDigit = DIGIT_REGEX.test(key);

      if (isLetterWithShift || isDigit) {
        e.preventDefault();
        const char = key.toUpperCase();
        secretRef.current = (secretRef.current + char).slice(-SEQ_LENGTH);

        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

        resetTimerRef.current = window.setTimeout(() => {
          secretRef.current = "";
          resetTimerRef.current = null;
        }, RESET_MS);

        if (secretRef.current === TARGET) {
          secretRef.current = "";
          if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
          }
          router.push("/admin/login");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [router]);

  return (
    <div className="min-h-screen">
      <Hero />
      <ParallaxDivider/>
      <About />
      <Services />

      {/* ===========================
          SERVICES SECTION
          =========================== */}
    

      {/* ===========================
          WHY CHOOSE US SECTION
          =========================== */}


      {/* ===========================
          DEVELOPMENT PROCESS SECTION
          =========================== */}

      {/* ===========================
          TESTIMONIALS SECTION
          =========================== */}


      {/* ===========================
          CTA SECTION
          =========================== */}
    </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ServiceCard from "@/components/molecules/ServiceCard/ServiceCard";
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
      {/* ===========================
          HERO SECTION
          =========================== */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white section-padding overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tags */}
            <div className="mb-8 flex justify-center gap-3 flex-wrap">
              <div className="px-5 py-2 bg-primary rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-glacial">
                DESIGN
              </div>
              <div className="px-5 py-2 bg-accent rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-glacial">
                DEVELOP
              </div>
              <div className="px-5 py-2 bg-primary rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-glacial">
                DEPLOY
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-glacial">
              Crafting Digital Experiences <br />
              <span className="gradient-text">That Drive Success</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              We build stunning, user-friendly websites and applications that
              engage your audience and elevate your brand.
            </p>

            {/* CTA Button */}
            <Link 
              href="/contact" 
              className="btn-primary shadow-xl hover:shadow-2xl"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ===========================
          INTRODUCTION SECTION
          =========================== */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white font-glacial">
              Your Trusted Partner in Web Development
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At AJX Technologies, we are a team of passionate designers,
              developers, and strategists dedicated to creating websites that
              not only look amazing but also deliver results. With years of
              experience in the web development industry, we specialize in
              crafting custom websites, web applications, and e-commerce
              solutions tailored to your business needs. Our goal is to help you
              succeed online by delivering cutting-edge digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* ===========================
          SERVICES SECTION
          =========================== */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white font-glacial">
              Our Services
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              From strategy to design, development to launch, we offer
              comprehensive web solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          WHY CHOOSE US SECTION
          =========================== */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white font-glacial">
            Why Choose AJX Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, index) => (
              <div key={item.id} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white font-glacial">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          DEVELOPMENT PROCESS SECTION
          =========================== */}
      <section className="section-padding bg-gradient-to-br from-primary via-accent to-primary-dark text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, transparent 48%, white 48%, white 52%, transparent 52%)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="container-custom relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-glacial">
            Our Proven 6-Step Development Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-4xl font-bold mb-4 opacity-50 font-glacial">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 font-glacial">
                  {step.title}
                </h3>
                <p className="leading-relaxed opacity-90">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          TESTIMONIALS SECTION
          =========================== */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white font-glacial">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic text-base">
                  "{testimonial.content}"
                </p>
                <p className="font-bold text-gray-900 dark:text-white font-glacial">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          CTA SECTION
          =========================== */}
      <section className="section-padding bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 font-glacial">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s work together to create something amazing. Get in touch
            for a free consultation.
          </p>
          <Link 
            href="/contact" 
            className="btn-primary shadow-xl hover:shadow-2xl"
          >
            Let&apos;s Work Together
          </Link>
        </div>
      </section>
    </div>
  );
}
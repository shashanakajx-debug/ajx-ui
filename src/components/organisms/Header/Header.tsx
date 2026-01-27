// src/components/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type SubLink = { label: string; des: string; href: string };
type NavLink = {
  label: string;
  href: string;
  submenu?: SubLink[];
  img: string;
  head: string;
  subline: string;
};

export default function Header(): React.ReactElement {
  const pathname = usePathname() || "/";
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const navLinks: NavLink[] = [
    {
      label: "AI / ML",
      href: "/our-services#AI-ML",
      img: "/mega-menu/AI & Machine Learning Strategy Consulting.png",
      head: "AI & Machine Learning Strategy Consulting",
      subline:
        "Build smart, scalable AI/ML solutions that drive real business results.",
      submenu: [
        {
          label: "AI & ML Readiness Assessment",
          href: "/our-services#AI-ML",
          des: "AI & ML Readiness Assessment: Evaluate data quality, availability, governance, infrastructure, and ML maturity to determine feasibility.",
        },
        {
          label: "Model & Technology Stack Recommendations",
          href: "/our-services#AI-ML",
          des: "Model & Technology Stack Recommendations :Recommend appropriate ML models, frameworks, cloud platforms, MLOps tools, and integration architectures.",
        },
        {
          label: "AI/ML Roadmap & Use-Case Prioritization",
          href: "/our-services#AI-ML",
          des: "AI/ML Roadmap & Use-Case Prioritization: Define and prioritize ML use cases based on business value, technical complexity, and deployment timelines.",
        },
        {
          label: "Strategic Roadmap Development",
          href: "/our-services#AI-ML",
          des: "Strategic Roadmap Development: Estimate performance gains, cost savings, and scalability benefits to justify AI/ML investments with clear.",
        },
      ],
    },
    {
      label: "Digital Engg",
      href: "/our-services#Digital-Engg",
      img: "/mega-menu/Digital Engineering Solutions.png",
      head: "AI & Machine Learning Strategy Consulting",
      subline:
        "Build smart, scalable AI/ML solutions that drive real business results.",
      submenu: [
        {
          label: "E-Commerce & Web Development",
          href: "/our-services#Digital-Engg",
          des: " From concept to launch, we build scalable, high-performance eCommerce platforms and custom websites tailored for enterprises and SMEs.",
        },
        {
          label: "Software & Enterprise Solutions",
          href: "/our-services#Digital-Engg",
          des: " Custom software development and enterprise application integration to solve complex business challenges with secure, scalable systems.",
        },
        {
          label: "Mobile Application Development",
          href: "/our-services#Digital-Engg",
          des: " Design, develop, and modernize high-quality mobile applications that deliver speed, performance, and seamless user experiences.",
        },
        {
          label: "User Experience & Digital Design",
          href: "/our-services#Digital-Engg",
          des: " Craft intuitive, engaging, and conversion-focused user experiences through strategic UX/UI design and digital innovation.",
        },
      ],
    },
    {
      label: "DevOps",
      href: "/our-services#DevOps",
      img: "/mega-menu/Devops.png",
      head: "AI & Machine Learning Strategy Consulting",
      subline:
        "Build smart, scalable AI/ML solutions that drive real business results.",
      submenu: [
        {
          label: "DevOps Consulting & Strategy",
          href: "/our-services#DevOps",
          des: "Expert DevOps consulting to design, optimize, and implement CI/CD pipelines, workflows, and best practices across teams.",
        },
        {
          label: "Cloud & Infrastructure DevOps",
          href: "/our-services#DevOps",
          des: " AWS and Azure DevOps setup, infrastructure automation, Kubernetes orchestration, and containerized environments built for scale.",
        },
        {
          label: "DevOps Support & Operations",
          href: "/our-services#DevOps",
          des: " 24/7 DevOps support, monitoring, testing, maintenance, and management to ensure high availability and performance.",
        },
        {
          label: "Migration, Automation & AIOps",
          href: "/our-services#DevOps",
          des: " Docker and Azure DevOps migrations, intelligent automation, and AIOps solutions to reduce downtime and operational complexity.",
        },
      ],
    },
    {
      label: "Web3",
      href: "/our-services#Web3",
      img: "/mega-menu/Web3.png",
      head: "Web3 & Decentralized Solutions",
      subline:
        "Build secure, scalable, and decentralized Web3 products powered by blockchain technology.",
      submenu: [
        {
          label: "Smart Contract Development & Audits",
          href: "/our-services#Web3",
          des: " Design, develop, and audit secure smart contracts to power decentralized applications and on-chain logic.",
        },
        {
          label: "Apps & Web3 Application Development",
          href: "/our-services#Web3",
          des: " End-to-end development of decentralized applications with seamless wallet integration and intuitive user experiences.",
        },
        {
          label: "Blockchain Infrastructure & Integrations",
          href: "/our-services#Web3",
          des: "Set up and manage blockchain nodes, APIs, and Web3 integrations for reliable and scalable decentralized systems.",
        },
        {
          label: "Tokenization, NFTs & DeFi Solutions",
          href: "/our-services#Web3",
          des: "Build token ecosystems, NFT platforms, and DeFi solutions that enable transparent, trustless digital economies.",
        },
      ],
    },
    {
      label: "Cloud",
      href: "/our-services#Cloud",
      img: "/mega-menu/Cloud.png",
      head: "Cloud Services & Platforms",
      subline:
        "Scalable, secure, and cloud-native solutions to modernize infrastructure and accelerate growth.",
      submenu: [
        {
          label: "Cloud Migration & Data Management",
          href: "/our-services#Cloud",
          des: " Seamless data migration and cloud transformation services to modernize IT environments with minimal downtime.",
        },
        {
          label: "Cloud Computing & Architecture",
          href: "/our-services#Cloud",
          des: " End-to-end cloud computing solutions powered by certified cloud experts, designed for performance, scalability, and reliability.",
        },
        {
          label: "Cloud Marketplaces & Startup Enablement",
          href: "/our-services#Cloud",
          des: " Launch cloud-native applications and SaaS products on trusted cloud marketplaces, helping startups reduce time-to-market.",
        },
        {
          label: "Cloud Support & Operations",
          href: "/our-services#Cloud",
          des: "  Ongoing cloud support, monitoring, and management to ensure optimized performance, security, and business continuity.",
        },
      ],
    },
    {
      label: "SaaS",
      href: "/our-services#SaaS",
      img: "/mega-menu/SaaS.png",
      head: "AI & Machine Learning Strategy Consulting",
      subline:
        "Build smart, scalable AI/ML solutions that drive real business results.",
      submenu: [
        {
          label: "SaaS Development",
          href: "/our-services#SaaS",
          des: "Evaluate data quality, availability, governance, infrastructure, and ML maturity to determine feasibility.",
        },
        {
          label: "SaaS Integration",
          href: "/our-services#SaaS",
          des: "Evaluate data quality, availability, governance, infrastructure, and ML maturity to determine feasibility.",
        },
        {
          label: "SaaS Migration",
          href: "/our-services#SaaS",
          des: "Evaluate data quality, availability, governance, infrastructure, and ML maturity to determine feasibility.",
        },
        {
          label: "Cloud Support & Operations",
          href: "/our-services#SaaS",
          des: "Ongoing cloud support, monitoring, and management to ensure optimized performance, security, and business continuity.",
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsHidden(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [hideTimeout]);

  const handleMouseEnter = (label: string) => {
    if (hideTimeout) clearTimeout(hideTimeout);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 120); // better UX
    setHideTimeout(timeout);
  };

  return (
    <header
      className={`mxd-header top-0 w-full z-50 transition-all duration-300 ${isHidden ? "mxd-header--scrolled backdrop-blur-lg-1 py-2" : "py-4"
        }`}
    >
      <nav className="container-custom-box navbar-box flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2" data-magnetic>
            <Image
              src="/AJX-black-logo.png"
              alt="AJX Technologies"
              width={150}
              height={50}
              className="h-20 w-auto logo-light"
              priority
            />
            <Image
              src="/AJX-white-logo.png"
              alt="AJX Technologies"
              width={150}
              height={50}
              className="h-20 w-auto logo-dark"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav (centered) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relatives"
              onMouseEnter={() => link.submenu && handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={link.href}
                className={`font-medium transition-colors] menu-item flex items-center ${pathname === link.href ? "" : ""
                  }`}
                data-magnetic
              >
                {link.label}
                {link.submenu && (
                  <svg
                    className="w-8 h-8 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>

              {/* Individual Dropdown for each service */}
              {link.submenu && (
                <div
                  className={`absolute top-full mt-0 z-50 mega-menu-box
      transition-all duration-200 ease-out
      ${activeDropdown === link.label
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 translate-y-2 invisible"
                    }`}
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="mxd-container">
                    <div className="row ">
                      <div className="col-12 col-xl-8 p-10 right-border">
                        <div className="grid grid-cols-2 gap-10">
                          {link.submenu.map((sublink, index) => (
                            <Link
                              key={`${link.label}-${index}`}
                              href={sublink.href}
                              className="group link-box-menu flex items-start gap-6 p-7 rounded-xl hover:pl-4 transition-all duration-200 ease-out menu-item"
                            >
                              <div className="menu-icon-hovers mt-1 w-14 h-14 rounded-[50px] flex items-center justify-center transition-colors flex-shrink-0 bg-[#119000]">
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
                                  className="w-8 h-8 text-white"
                                >
                                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-2xl mb-3 transition-colors">
                                  {sublink.label}
                                </h4>
                                <p className="leading-[1.3] three-row">
                                  {sublink.des}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="col-12 col-xl-4 p-16 mega-menu-img">
                        <h4 className="font-bold text-2xl mb-3 transition-colors">
                          {link.head}
                        </h4>
                        <p className="leading-[1.3] mb-12 three-row">
                          {link.subline}
                        </p>
                        <Image
                          src={link.img}
                          alt="mega-menu"
                          width={500}
                          height={500}
                          className="w-auto h-auto rounded-[15px]"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls: Theme + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 hidden"
            onClick={() => setMobileMenuOpen((s) => !s)}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            data-magnetic
            data-tooltip="Menu"
          >
            <span className="sr-only">Toggle Menu</span>
            <div className="w-6 h-0.5 bg-current mb-1" />
            <div className="w-6 h-0.5 bg-current mb-1" />
            <div className="w-6 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[var(--color-surface)] border-t p-4 flex flex-col gap-2 shadow-xl z-40">
          {navLinks.map((link) => (
            <div key={link.href} className="flex flex-col">
              <div className="flex items-center justify-between">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium py-2"
                >
                  {link.label}
                </Link>

                {link.submenu && (
                  <button
                    onClick={() =>
                      setOpenMobileSubmenu((open) =>
                        open === link.label ? null : link.label,
                      )
                    }
                    aria-expanded={openMobileSubmenu === link.label}
                    aria-controls={`${link.label}-submenu`}
                    className="px-2 py-1"
                    type="button"
                  >
                    {openMobileSubmenu === link.label ? "−" : "+"}
                  </button>
                )}
              </div>

              {link.submenu && openMobileSubmenu === link.label && (
                <div id={`${link.label}-submenu`} className="pl-4">
                  {link.submenu.map((s, index) => (
                    <Link
                      key={`${link.label}-mobile-${index}`}
                      href={s.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setOpenMobileSubmenu(null);
                      }}
                      className="block py-1 text-sm"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
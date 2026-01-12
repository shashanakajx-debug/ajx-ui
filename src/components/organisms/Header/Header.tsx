// src/components/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";


type SubLink = { label: string; href: string };
type NavLink = {
  label: string;
  href: string;
  submenu?: SubLink[];
  img: string;
};

export default function Header(): React.ReactElement {
  const pathname = usePathname() || "/";
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const navLinks: NavLink[] = [
    {
      label: "AI / ML",
      href: "/our-services#AI-ML",
      img: "/1400x1400_prv-01.webp",
      submenu: [
        { label: "LLM Training", href: "/our-services#AI-ML" },
        { label: "LLM Factuality", href: "/our-services#AI-ML" },
        {
          label: "Multimodality LLM Training",
          href: "/our-services#AI-ML",
        },
        { label: "LLM Alignment & Safety", href: "/our-services#AI-ML" },
      ],
    },
    {
      label: "Digital Engg",
      href: "/our-services#Digital-Engg",
      img: "/1400x1400_prv-02.webp",
      submenu: [
        { label: "AR/VR", href: "/our-services#Digital-Engg" },
        { label: "IoT", href: "/our-services#Digital-Engg" },
        { label: "Blockchain", href: "/our-services#Digital-Engg" },
      ],
    },
    {
      label: "DevOps",
      href: "/our-services#DevOps",
      img: "/1400x1400_prv-03.webp",
      submenu: [
        { label: "CI/CD", href: "/our-services#DevOps" },
        {
          label: "Infrastructure as Code",
          href: "/our-services#DevOps",
        },
        {
          label: "Monitoring & Logging",
          href: "/our-services#DevOps",
        },
      ],
    },
    {
      label: "Web3",
      href: "/our-services#Web3",
      img: "/1400x1400_prv-04.webp",
      submenu: [
        { label: "DApp Development", href: "/our-services#Web3" },
        { label: "Smart Contracts", href: "/our-services#Web3" },
        { label: "NFT Marketplaces", href: "/our-services#Web3" },
      ],
    },
    {
      label: "Cloud",
      href: "/our-services#Cloud",
      img: "/1400x1400_prv-05.webp",
      submenu: [
        { label: "AWS", href: "/our-services#Cloud" },
        { label: "Azure", href: "/our-services#Cloud" },
        { label: "Google Cloud", href: "/our-services#Cloud" },
      ],
    },
    {
      label: "SaaS",
      href: "/our-services#SaaS",
      img: "/1400x1400_prv-01.webp",
      submenu: [
        { label: "SaaS Development", href: "/our-services#SaaS" },
        { label: "SaaS Integration", href: "/our-services#SaaS" },
        { label: "SaaS Migration", href: "/our-services#SaaS" },
      ],
    },
    {
      label: "SEO",
      href: "/our-services#SEO",
      img: "/1400x1400_prv-01.webp",
      submenu: [
        { label: "On-Page SEO", href: "/our-services#SEO" },
        { label: "Off-Page SEO", href: "/our-services#SEO" },
        { label: "Technical SEO", href: "/our-services#SEO" },
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
      className={`mxd-header top-0 w-full z-50 transition-all duration-300 ${isHidden ? "mxd-header--scrolled backdrop-blur-lg shadow-sm py-2" : "py-4"
        }`}
    >
      <nav className="container-custom-box navbar-box flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
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
                className={`font-medium transition-colors] menu-item ${pathname === link.href
                  ? ""
                  : ""
                  }`}
              >
                {link.label}
              </Link>

              {/* Individual Dropdown for each service */}
              {link.submenu && (
  <div
    className={`absolute top-full mt-0 rounded-2xl z-50 p-12 mega-menu-box
      transition-all duration-200 ease-out
      ${activeDropdown === link.label
        ? "opacity-100 scale-100 translate-y-2 visible"
        : "opacity-0 scale-95 translate-y-2 invisible"
      }`}
    onMouseEnter={() => handleMouseEnter(link.label)}
    onMouseLeave={handleMouseLeave}
  >
    <div className="row">
      <div className="col-12 col-xl-8 right-border">
        <div className="grid grid-cols-2 gap-10">
          {link.submenu.map((sublink, index) => (
            <Link
              key={`${link.label}-${index}`}
              href={sublink.href}
              className="group flex items-start gap-6 p-7 rounded-xl hover:pl-4 transition-all duration-200 ease-out menu-item"
            >
              <div className="btn-anim mt-1 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-gray-800 dark:group-hover:bg-gray-200 transition-colors flex-shrink-0">
                <svg className="w-7 h-7 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-2xl mb-3 transition-colors">
                  {sublink.label}
                </h4>
                <p className=" leading-relaxed">
                  We are a leading {sublink.label} agency specializing in crafting exceptional solutions
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-12 col-xl-4 mega-menu-img">
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
)}

            </div>
          ))}
        </div>

        {/* Controls: Theme + Mobile Toggle */}
        <div className="flex items-center gap-4">


          {/* Mobile Toggle */}
          <button
            className="lg:hidden hidden p-2"
            onClick={() => setMobileMenuOpen((s) => !s)}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
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
                        open === link.label ? null : link.label
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
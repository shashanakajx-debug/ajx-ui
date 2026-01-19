import React from "react";
import Link from "next/link";
import AnimatedButton from "@/components/animation/AnimatedButton";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const services = [
    { label: "AI / ML", href: "#ai-ml" },
    { label: "Digital Engg", href: "#digital-engg" },
    { label: "DevOps", href: "#devops" },
    { label: "Web3", href: "#web3" },
    { label: "Cloud", href: "#cloud" },
    { label: "SaaS", href: "#saas" },
  ];

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "About", href: "/about-us" },
    { name: "Portfolios", href: "/our-portfolio" },
    { name: "Services", href: "/our-services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/ajxtechnologies",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/ajxtechnologies/",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@ajxtechnologies",
      label: "YouTube",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/ajxtechnologies",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-[#1c1c1c] text-white w-full">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-20 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-20">
          <div className="lg:col-span-5 anim-uni-in-up">
            <h2 className="text-white text-[2rem] sm:text-[2.5rem] lg:text-[4rem] xl:text-[5rem] font-bold leading-[1.3] mb-8 lg:mb-10">
              Ready to Start
              <br />
              Your Project?
            </h2>
         

          <AnimatedButton
          text="Let's talk"
          className="btn slide-right-up btn-outline btn-small anim-uni-in-up"
          href={`/contact`}
          >
          <ArrowUpRight className="w-[18px] h-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </AnimatedButton> 
          </div>

          <div className="lg:col-span-3">
            <ul className="space-y-3.5">
              {services.map((service, index) => (
                <li key={index} className="anim-uni-in-up">
                  <Link
                    href={service.href}
                    className="text-[#a8a8a8] hover:text-white transition-colors duration-200 text-[15px] block leading-relaxed"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="space-y-8 lg:space-y-9">
              {/* Email */}
              <div className="anim-uni-in-up">
                <h3 className="text-[#a8a8a8] text-[13px] mb-2.5 font-normal">
                  Email -
                </h3>
                <Link
                  href="mailto:connect@ajxtechnologies.com"
                  className="text-white hover:text-[#9ca3af] transition-colors duration-200 text-[15px] block"
                >
                  connect@ajxtechnologies.com
                </Link>
              </div>

              <div className="anim-uni-in-up">
                <h3 className="text-[#a8a8a8] text-[13px] mb-2.5 font-normal">
                  Address -
                </h3>
                <p className="text-white text-[15px] leading-relaxed">
                  117, Skye Privilon Tulsi Nagar,
                  <br />
                  Nipania, Indore, MP (452010) INDIA
                </p>
              </div>

              <div className="flex gap-2.5 anim-uni-in-up">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-[38px] h-[38px] rounded-full border border-[#4a4a4a] flex items-center justify-center hover:bg-white hover:border-white hover:text-[#1c1c1c] transition-all duration-300"
                  >
                    <social.icon className="w-[17px] h-[17px]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] mb-7"></div>

        <div className="space-y-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 lg:gap-4 border-bottom border-gray-400 pb-4">
            <div className="anim-uni-in-up">
              <h4 className="text-[19px] font-bold text-white tracking-tight">
                Transparent.
              </h4>
            </div>

            <nav className="flex flex-wrap gap-x-7 gap-y-2.5">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`text-[15px] transition-colors duration-200 anim-uni-in-up ${
                    link.active
                      ? "text-[#84cc16]"
                      : "text-[#a8a8a8] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 text-[13px]">
            <p className="text-[#6b7280] anim-uni-in-up">
              Copyright © 2025 AjxTechnologies.com
            </p>

            <div className="flex items-center gap-3.5 text-[#6b7280] anim-uni-in-up">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-[#3a3a3a]">|</span>
              <Link
                href="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center py-10 lg:py-12 md:pt-8 pt-0 overflow-hidden bg-[#1c1c1c]">
        <h1 className="text-[3rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[9rem] xl:text-[9rem] 2xl:text-[10rem] font-black tracking-[0.02em] text-white/90 select-none leading-none whitespace-nowrap">
          AJX TECHNOLOGIES
        </h1>
      </div>
    </footer>
  );
}
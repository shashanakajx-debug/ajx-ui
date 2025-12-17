import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Services", href: "/our-services" },
      { label: "Portfolio", href: "/our-portfolio" },
      { label: "Career", href: "/career" },
    ],
    services: [
      { label: "Web Development", href: "/our-services" },
      { label: "AI & Automation", href: "/our-services" },
      { label: "Blockchain & Web3", href: "/our-services" },
      { label: "SaaS Development", href: "/our-services" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/#faq" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/ajxtechnologies",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "https://x.com/ajxtechnologies",
      label: "X / Twitter",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/ajxtechnologies/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/ajxtechnologies",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-secondary dark:bg-darkmode-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-glacial font-bold mb-4 text-white">
              AJX Technologies
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Building smarter, scalable and future-ready digital experiences
              that drive business growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:contact@ajxtech.com"
                  className="hover:text-accent transition-colors text-sm"
                >
                  shashanakajx@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="hover:text-accent transition-colors text-sm"
                >
                  +91 8269669862
                </a>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                <span className="text-sm">
                  Address - 117, Skye Privilon Tulsi Nagar, Nipania, Indore, MP
                  (452010) INDIA
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-glacial font-bold mb-4 text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-glacial font-bold mb-4 text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-glacial font-bold mb-4 text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} AJX Technologies. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-accent transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-sm text-gray-400 hover:text-accent transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
    </footer>
  );
}

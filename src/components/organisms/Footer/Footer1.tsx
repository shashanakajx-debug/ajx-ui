import Link from "next/link";
import Image from "next/image";
import AnimatedButton from "../../animation/AnimatedButton";
import ScrollNextSection from "@/components/ScrollNextSection";

import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer1() {
  const footerNavData = [
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "Our Services", href: "/our-services" },
        { label: "Our Portfolio", href: "/our-portfolio" },
        { label: "Career", href: "/career" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      groups: [
        {
          title: "Quick Links",
          links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "FAQ", href: "/faq" },
          ],
        },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Facebook", href: "https://www.facebook.com/ajxtechnologies" },
        { label: "Twitter", href: "https://x.com/ajxtechnologies" },
        { label: "Instagram", href: "https://www.instagram.com/ajxtechnologies/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/ajxtechnologies" },
        { label: "GitHub", href: "https://github.com/ajxtechnologies" },
        { label: "YouTube", href: "https://www.youtube.com/@ajxtechnologies" },
      ],
    },
  ];

  return (
    <footer className="mxd-demo-footer">
      {/* Background */}
      <div className="mxd-demo-footer__bg">
        <Image
          src="/01-footer.webp"
          alt="AJX Technologies"
          width={1920}
          height={580}
        />
      </div>

      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              {/* LEFT */}
              <div className="col-12 col-xl-3 mxd-demo-footer__item mxd-grid-item">
                <div className="mxd-demo-footer__logo anim-uni-in-up">
                  <Link
                    href="/"
                    className="mxd-logo flex items-center gap-3"
                  >
                    <Image
                      src="/AJX-black-logo.png"
                      alt="AJX Technologies Logo"
                      width={130}
                      height={130}
                      className="w-auto logo-light"
                    />
                    <Image
                      src="/AJX-white-logo.png"
                      alt="AJX Technologies Logo"
                      width={130}
                      height={130}
                      className="w-auto logo-dark"
                    />

                  </Link>
                </div>

                <p className="t-small t-bright anim-uni-in-up">
                  We build stunning, user-friendly websites and applications that engage your audience and elevate your brand.


                </p>

                <div className="mxd-demo-footer__btn anim-uni-in-up mt-[10px]">
                  <AnimatedButton
                    as="a"
                    href="/contact"
                    className="btn btn-anim btn-default btn-small btn-accent slide-right"
                  >
                    <span className="flex items-center gap-2 ">
                      Get Started
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </AnimatedButton>
                </div>
              </div>

              {/* CENTER */}
              <div className="col-12 col-xl-6 mxd-demo-footer__item">
                <nav className="mxd-demo-footer__nav">
                  <div className="row g-0">
                    {footerNavData.map((section, index) => (
                      <div
                        key={index}
                        className="col-12 col-md-4 mxd-grid-item mxd-footer-nav__item"
                      >
                        {section.groups ? (
                          section.groups.map((group, gIndex) => (
                            <div key={gIndex} className="mxd-footer-nav__block">
                              <p className="t-140 t-bright t-caption anim-uni-in-up">
                                {group.title}
                              </p>
                              <ul className="mxd-footer-nav__list">
                                {group.links.map((link, i) => (
                                  <li key={i}>
                                    <Link
                                      href={link.href}
                                      className="group inline-flex items-center anim-uni-in-up"
                                    >
                                      {link.label}
                                      <ArrowRight className="w-3 h-3 ml-2 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <div className="mxd-footer-nav__block">
                            <p className="t-140 t-bright t-caption anim-uni-in-up">
                              {section.title}
                            </p>
                            <ul className="mxd-footer-nav__list">
                              {section.links.map((link, i) => (
                                <li key={i}>
                                  <Link
                                    href={link.href}
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    className="group inline-flex items-center anim-uni-in-up"
                                  >
                                    {link.label}
                                    <ArrowRight className="w-3 h-3 ml-2 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>
              </div>

              {/* RIGHT */}
              <div className="col-12 col-xl-3 mxd-demo-footer__item mxd-grid-item">
                <p className="t-140 t-bright t-caption anim-uni-in-up">
                  Get in touch:
                </p>

                <div className="mxd-footer-promo__list">
                  <p className="t-small t-bright anim-uni-in-up flex items-center gap-2">
                    <Mail className="icon-shine w-5 h-5" />
                    <a href="mailto:connect@ajxtechnologies.com">
                      connect@ajxtechnologies.com
                    </a>
                  </p>

                  <p className="t-small t-bright anim-uni-in-up flex items-center gap-2">
                    <MapPin className="icon-shine w-7 h-7" />
                    Address - 117, Skye Privilon Tulsi Nagar, Nipania, Indore, MP (452010) INDIA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BIG TEXT */}
        <div className="mxd-block">
          <div className="mxd-demo-footer__mixdesign mxd-grid-item no-margin">
          </div>
          <div className="copyright-section"
            style={{
              fontSize: "16px",
              fontWeight: 300,
              textAlign: "center",
              // opacity: 0.1,
            }}
          >
            Copyright © 2025 AjxTechnologies.com

          </div>
        </div>
        <div className="next_page mxd-block ">
          <div className="mxd-demo-footer__mixdesign mxd-grid-item no-margin">
          </div>
          <div className="copyright-section"
            style={{
              fontSize: "16px",
              fontWeight: 300,
              textAlign: "center",
              // opacity: 0.1,
            }}
          >
            Copyright © 2025 AjxTechnologies.com

          </div>

        </div>
        <ScrollNextSection nextHref="/about-us" />
      </div>
    </footer>
  );
}
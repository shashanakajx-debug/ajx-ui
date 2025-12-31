import Link from "next/link";
import Image from "next/image";
import AnimatedButton from "../../animation/AnimatedButton";

import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
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
                      src="/logo.png"
                      alt="AJX Technologies Logo"
                      width={56}
                      height={56}
                    />
                    <span className="mxd-logo__text">
                      AJX
                      <br />
                      Technologies
                    </span>
                  </Link>
                </div>

                <p className="t-small t-bright anim-uni-in-up">
                  Building smarter, scalable and future-ready digital experiences
                  that drive business growth.
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

                  <AnimatedButton
                    as="a"
                    href="/our-portfolio"
                    className="btn btn-anim btn-default btn-small btn-outline slide-right-up group"
                  >
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
                    <a href="mailto:shashanakajx@gmail.com">
                      shashanakajx@gmail.com
                    </a>
                  </p>

                  <p className="t-small t-bright anim-uni-in-up flex items-center gap-2">
                    <Phone className="icon-shine w-5 h-5" />
                    <a href="tel:+918269669862">
                      +91 8269669862
                    </a>
                  </p>

                  <p className="t-small t-bright anim-uni-in-up flex items-center gap-2">
                    <MapPin className="icon-shine w-5 h-5" />
                    117, Skye Privilon, Tulsi Nagar, Nipania, Indore, MP (452010)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BIG TEXT */}
        <div className="mxd-block">
          <div className="mxd-demo-footer__mixdesign mxd-grid-item no-margin">
            <div
              className="anim-uni-in-up"
              style={{
                fontSize: "110px",
                fontWeight: 700,
                textAlign: "center",
                // opacity: 0.1,
              }}
            >
              AJX-TECHNOLOGIES
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
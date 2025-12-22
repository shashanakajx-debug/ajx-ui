"use client";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Flip from "gsap/dist/Flip"; // Direct path often fixes the red underline
import { usePathname } from "next/navigation";
import AnimatedButton from "@/components/animation/AnimatedButton";

gsap.registerPlugin(Flip);

export default function MobileMenu() {
  const pathname = usePathname();
  
  // --- HARDCODED MENU DATA (Removed JSON) ---
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about-us" },
    { 
      title: "Services", 
      submenu: [
        { label: "Web Development", href: "/services/web-development" },
        { label: "UI/UX Design", href: "/services/design" },
        { label: "Digital Marketing", href: "/services/marketing" },
      ] 
    },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Contact", href: "/contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(-1);
  const submenuRefs = useRef<(HTMLUListElement | null)[]>([]);
  const hamburgerBtnRef = useRef<HTMLAnchorElement | null>(null);
  const menuContainRef = useRef<HTMLDivElement | null>(null);
  const flipBaseRef = useRef<HTMLDivElement | null>(null);

  const [submenuHeights, setSubmenuHeights] = useState<number[]>([]);

  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
      setTimeout(() => setIsMenuOpen(false), 800);
    } else {
      setIsMenuOpen(true);
      setTimeout(() => setIsActive(true), 600);
    }
  };

  const isMenuActive = (link?: string) =>
    link?.split("/")[1] === pathname.split("/")[1];

  useEffect(() => {
    const heights = submenuRefs.current.map((submenu) =>
      submenu ? submenu.scrollHeight : 0
    );
    setSubmenuHeights(heights);
  }, []);

  useEffect(() => {
    setActiveSubmenu(-1);
    if (isActive) handleToggle();
  }, [pathname]);

  useLayoutEffect(() => {
    const flipEl = flipBaseRef.current;
    if (!flipEl || !hamburgerBtnRef.current || !menuContainRef.current) return;

    const state = Flip.getState(flipEl);

    if (isMenuOpen) {
      menuContainRef.current.appendChild(flipEl);
    } else {
      hamburgerBtnRef.current.appendChild(flipEl);
    }

    Flip.from(state, {
      duration: 0.8,
      ease: "power4.inOut",
    });
  }, [isMenuOpen]);

  return (
    <nav className={`mxd-nav__wrap ${isActive ? "active_menu" : ""}`} data-lenis-prevent="">
      {/* Hamburger Section */}
      <div className="mxd-nav__contain loading__fade">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
          }}
          className={`mxd-nav__hamburger ${isMenuOpen ? "nav-open" : ""}`}
          ref={hamburgerBtnRef}
        >
          <div className="hamburger__base" ref={flipBaseRef} />
          <div className="hamburger__line" />
          <div className="hamburger__line" />
        </a>
      </div>

      {/* Navigation Overlay */}
      <div className={`mxd-menu__wrapper ${isActive ? "active_menu" : ""}`}>
        <div className="mxd-menu__base" />
        <div className="mxd-menu__contain" ref={menuContainRef}>
          <div className="mxd-menu__inner">
            <div className="mxd-menu__left">
              <p className="mxd-menu__caption fade-in-elm" style={{ transitionDelay: "0.4s" }}>
                🦄 Innovative design<br />and cutting-edge development
              </p>
              
              <div className="main-menu">
                <nav className="main-menu__content">
                  <ul id="main-menu" className="main-menu__accordion">
                    {menuItems.map((item, index) => (
                      <li key={index} className="main-menu__item fade-in-up-elm" style={{ transitionDelay: `${index * 0.1}s` }}>
                        {item.submenu ? (
                          <>
                            <div className="main-menu__toggle" onClick={() => setActiveSubmenu(activeSubmenu === index ? -1 : index)}>
                              <AnimatedButton text={item.title} as="span" className="main-menu__link btn btn-anim" />
                              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                                <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4Z" />
                              </svg>
                            </div>
                            <ul
                              className="submenu"
                              style={{
                                height: activeSubmenu === index ? `calc(${submenuHeights[index]}px + 2rem)` : 0,
                                paddingTop: activeSubmenu === index ? "2rem" : 0,
                                transition: "all 0.3s ease",
                                overflow: "hidden"
                              }}
                              ref={(el) => { submenuRefs.current[index] = el; }}
                            >
                              {item.submenu.map((sub, i) => (
                                <li key={i} className={`submenu__item ${isMenuActive(sub.href) ? "active" : ""}`}>
                                  <Link href={sub.href}>{sub.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          item.href && (
                            <AnimatedButton text={item.title} className="main-menu__link btn btn-anim" href={item.href} />
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="mxd-menu__right">
              <div className="menu-promo">
                <div className="menu-promo__content">
                  <p className="menu-promo__caption fade-in-elm" style={{ transitionDelay: "0.4s" }}>
                    👋 AJX Technologies is here!<br />Let's build something amazing together.
                  </p>
                  <div className="menu-promo__video fade-in-up-elm" style={{ transitionDelay: "0.3s" }}>
                    <video className="menu-video" autoPlay loop muted playsInline>
                      <source src="video/540x310_video-01.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>

            <div className="mxd-menu__data fade-in-up-elm" style={{ transitionDelay: "0.4s" }}>
              <p className="t-xsmall">AJX Technologies © 2025</p>
            </div>
          </div>
          <div className="hamburger__parking-slot" />
        </div>
      </div>
    </nav>
  );
}
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ScrollProcessPath() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const stepsData = [
    { label: "Research", at: 0.1 },
    { label: "Planning", at: 0.28 },
    { label: "Design", at: 0.46 },
    { label: "Development", at: 0.62 },
    { label: "Testing", at: 0.78 },
    { label: "Launch", at: 0.92 },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const steps = Array.from(section.querySelectorAll("[data-step]")) as HTMLElement[];
      const box = Array.from(section.querySelectorAll("#dots")) as SVGCircleElement[];

      // Helper to setup strokeDash
      const setupStroke = (activePath: SVGPathElement) => {
        const len = activePath.getTotalLength();
        activePath.style.strokeDasharray = `${len}`;
        activePath.style.strokeDashoffset = `${len}`;
      };

      // Helper to update step classes
      const updateSteps = (progress: number) => {
        steps.forEach((el) => {
          const at = parseFloat(el.dataset.at || "0");

          el.classList.toggle("done", progress > at + 0.03);
          el.classList.toggle(
            "active",
            Math.abs(progress - at) < 0.06
          );

          const done = el.classList.toggle("done", progress > at + 0.03);
          if (done) {
            el.style.opacity = "1";
          }
          else {
            el.style.opacity = "0.4";
          }
        });
        box.forEach((dot, index) => {
          const stepAt = Number(steps[index]?.dataset.at || 0);
          dot.classList.toggle("done", progress > stepAt);
        });
      };

      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION ---
      mm.add("(min-width: 992px)", () => {
        const track = section.querySelector("#track") as SVGPathElement;
        const active = section.querySelector("#trackActive") as SVGPathElement;
        const dot = section.querySelector("#dot") as SVGCircleElement;

        if (!track || !active || !dot) return;

        setupStroke(active);
        updateSteps(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2200",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => updateSteps(self.progress),
          },
        });

        tl.to(dot, {
          motionPath: {
            path: track,
            align: track,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
        }, 0)
          .to(active, {
            strokeDashoffset: 0,
            ease: "none",
          }, 0);
      });

      // --- MOBILE ANIMATION ---
      mm.add("(max-width: 991px)", () => {
        const track = section.querySelector("#track-mobile") as SVGPathElement;
        const active = section.querySelector("#trackActive-mobile") as SVGPathElement;
        const dot = section.querySelector("#dot-mobile") as SVGCircleElement;

        if (!track || !active || !dot) return;

        setupStroke(active);
        updateSteps(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2200",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => updateSteps(self.progress),
          },
        });

        tl.to(dot, {
          motionPath: {
            path: track,
            align: track,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
        }, 0)
          .to(active, {
            strokeDashoffset: 0,
            ease: "none",
          }, 0);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="spacer" />

      <section ref={sectionRef} className="process">
        <div className="wrap">
          <div className="titles text-center lg:mb-40">
            <div className="left">
              <h2 className="mb-2">Our Proven 6-Step Development Process</h2>

            </div>
          </div>

          <div className="pathStage">

            {/* Desktop SVG - Original IDs */}
            <svg viewBox="0 0 1200 260" className="svg" xmlns="http://www.w3.org/2000/svg">
              <path id="track"
                d="M80,90 C190,170 300,170 410,110 C520,50 610,50 720,120 C830,190 920,190 1030,110 C1100,60 1140,70 1160,90"
                fill="none"
                stroke="#2c2c2c"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path id="trackActive"
                d="M80,90 C190,170 300,170 410,110 C520,50 610,50 720,120 C830,190 920,190 1030,110 C1100,60 1140,70 1160,90"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
                strokeDasharray="10 14"
                strokeLinecap="round"
              />

              <circle id="dots" cx="140" cy="125" r="12" fill="#ccc" />
              <circle id="dots" cx="400" cy="115" r="12" fill="#ccc" />
              <circle id="dots" cx="520" cy="69" r="12" fill="#ccc" />
              <circle id="dots" cx="720" cy="120" r="12" fill="#ccc" />
              <circle id="dots" cx="920" cy="165" r="12" fill="#ccc" />
              <circle id="dots" cx="1160" cy="90" r="12" fill="#ccc" />
              <circle id="dot" r="14" cx="80" cy="68" fill="#DA353D" />
            </svg>

            {/* Mobile SVG - New IDs */}
            <svg
              viewBox="0 0 260 720"
              className="svg svg-mobile"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                id="track-mobile"
                d="
                  M130 20
                  C130 110 80 190 130 270
                  C180 350 130 430 130 510
                  C130 590 100 650 130 700
                "
                fill="none"
                stroke="#2c2c2c"
                strokeWidth="28"
                strokeLinecap="round"
              />


              <path
                id="trackActive-mobile"
                d="
                  M130 20
                  C130 110 80 190 130 270
                  C180 350 130 430 130 510
                  C130 590 100 650 130 700
                "
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
                strokeDasharray="10 14"
                strokeLinecap="round"
              />
              <circle id="dots" cx="130" cy="120" r="12" fill="#ccc" />
              <circle id="dots" cx="90" cy="240" r="12" fill="#ccc" />
              <circle id="dots" cx="170" cy="360" r="12" fill="#ccc" />
              <circle id="dots" cx="130" cy="480" r="12" fill="#ccc" />
              <circle id="dots" cx="90" cy="600" r="12" fill="#ccc" />
              <circle id="dots" cx="130" cy="680" r="12" fill="#ccc" />
              <circle id="dot-mobile" r="14" cx="130" cy="20" fill="#DA353D" />
            </svg>


            <div className="steps">
              {stepsData.map((s) => (
                <div key={s.label} data-step data-at={s.at} className="step">
                  <h5>{s.label}</h5>
                </div>
              ))}
            </div>
          </div>

          <div className="bottom hidden">
            <p>Scroll to move the dot across the workflow.</p>
            <p>Pinned section + scrubbed timeline like Prismic.</p>
          </div>
        </div>
      </section>

      <div />
    </>
  );
}
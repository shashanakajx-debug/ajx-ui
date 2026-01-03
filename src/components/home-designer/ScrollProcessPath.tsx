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

      const track = section.querySelector("#track") as SVGPathElement;
      const active = section.querySelector("#trackActive") as SVGPathElement;
      const dot = section.querySelector("#dot") as SVGCircleElement;
      const steps = Array.from(section.querySelectorAll("[data-step]")) as HTMLElement[];

      if (!track || !active || !dot) return;

      const positionSteps = () => {
        const svg = track.ownerSVGElement;
        if (!svg) return;

        const vb = svg.viewBox.baseVal;
        const len = track.getTotalLength();

        steps.forEach((el) => {
          const at = parseFloat(el.dataset.at || "0");
          const pt = track.getPointAtLength(len * at);

          // el.style.left = `${((pt.x - vb.x) / vb.width) * 100}%`;
          // el.style.top = `${((pt.y - vb.y) / vb.height) * 100}%`;
        });
      };

      const setupStroke = () => {
        const len = active.getTotalLength();
        active.style.strokeDasharray = `${len}`;
        active.style.strokeDashoffset = `${len}`;
      };

      const updateSteps = (progress: number) => {
        steps.forEach((el) => {
          const at = parseFloat(el.dataset.at || "0");

          el.classList.toggle("done", progress > at + 0.03);
          el.classList.toggle(
            "active",
            Math.abs(progress - at) < 0.06
          );

          el.style.opacity = `${0.4 + (1 - Math.min(1, Math.abs(progress - at) / 0.25)) * 0.6}`;
        });
      };

      positionSteps();
      setupStroke();

      const onResize = () => {
        positionSteps();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", onResize);

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

      tl.to(
        dot,
        {
          motionPath: {
            path: track,
            align: track,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
        },
        0
      ).to(
        active,
        {
          strokeDashoffset: 0,
          ease: "none",
        },
        0
      );

      updateSteps(0);

      return () => {
        window.removeEventListener("resize", onResize);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="spacer" />

      <section ref={sectionRef} className="process">
        <div className="wrap">
          <div className="titles text-center mb-40">
            <div className="left">
              <h2 className="mb-2"><span className="dev text-[#00c6ff]">Our Proven</span> Create a custom page builder</h2>
              <p>6-Step Development Process</p>
            </div>
          </div>

          <div className="pathStage">
            
<svg viewBox="0 0 1200 260" className="svg" xmlns="http://www.w3.org/2000/svg">
  <path id="track"
    d="M80,90 C190,170 300,170 410,110 C520,50 610,50 720,120 C830,190 920,190 1030,110 C1100,60 1140,70 1160,90"
    fill="none"
    stroke="#2c2c2c"
    stroke-width="28"
    stroke-linecap="round"
  />
  <path id="trackActive"
    d="M80,90 C190,170 300,170 410,110 C520,50 610,50 720,120 C830,190 920,190 1030,110 C1100,60 1140,70 1160,90"
    fill="none"
    stroke="#ffffff"
    stroke-width="4"
    stroke-dasharray="10 14"
    stroke-linecap="round"
  />
  <defs>
    <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00c6ff"/>
      <stop offset="100%" stop-color="#F3722E"/>
    </linearGradient>
  </defs>
  <path
    d="M80,90 C190,170 300,170 410,110 C520,50 610,50 720,120"
    fill="none"
    stroke="url(#roadGradient)"
    stroke-width="28"
    stroke-linecap="round"
  />
  <circle cx="140" cy="125" r="12" fill="#ccc"/>
  <circle cx="400" cy="115" r="12" fill="#ccc"/>
  <circle cx="520" cy="69" r="12" fill="#ccc"/>
  <circle cx="720" cy="120" r="12" fill="#ccc"/>
  <circle cx="920" cy="165" r="12" fill="#ccc"/>
  <circle cx="1160" cy="90" r="12" fill="#ccc"/>
  <circle id="dot" r="14" cx="80" cy="68" fill="#DA353D" />
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

      <div className="spacer" />
    </>
  );
}
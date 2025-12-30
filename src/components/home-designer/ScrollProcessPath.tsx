"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ScrollProcessPath() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const stepsData = [
    { label: "Set up", at: 0.1 },
    { label: "Build", at: 0.28 },
    { label: "Ship", at: 0.46 },
    { label: "Create", at: 0.62 },
    { label: "Publish", at: 0.78 },
    { label: "Automate", at: 0.92 },
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

          el.style.left = `${((pt.x - vb.x) / vb.width) * 100}%`;
          el.style.top = `${((pt.y - vb.y) / vb.height) * 100}%`;
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
          <div className="titles">
            <div className="left">
              <h2><span className="dev">Developers:</span> Create a custom page builder</h2>
              <p>Build pre-approved components and a workflow your team can ship safely.</p>
            </div>

            <div className="right">
              <h2><span className="mkt">Marketers:</span> Publish pages quick as a flash</h2>
              <p>Reduce time to launch new pages or update existing ones with confidence.</p>
            </div>
          </div>

          <div className="pathStage">
            <svg viewBox="0 0 1200 260" className="svg">
              <path id="track" d="M80,90 C190,170 300,170 410,110 C520,50 610,50 720,120 C830,190 920,190 1030,110 C1100,60 1140,70 1160,90" />
              <path id="trackActive" d="M80,90 C190,170 300,170 410,110 C520,50 610,50 720,120 C830,190 920,190 1030,110 C1100,60 1140,70 1160,90" />
              <circle id="dot" r="14" cx="80" cy="90" />
            </svg>

            <div className="steps">
              {stepsData.map((s) => (
                <div key={s.label} data-step data-at={s.at} className="step">
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          <div className="bottom">
            <p>Scroll to move the dot across the workflow.</p>
            <p>Pinned section + scrubbed timeline like Prismic.</p>
          </div>
        </div>
      </section>

      <div className="spacer" />
    </>
  );
}
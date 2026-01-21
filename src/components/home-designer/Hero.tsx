"use client";

import { useEffect, useRef } from "react";
import AnimatedButton from "@/components/animation/AnimatedButton";
import RevealText from "../animation/RevealText";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const cssAny = CSS as unknown as {
      paintWorklet?: { addModule: (url: string) => Promise<void> };
    };

    if (!cssAny.paintWorklet) return;

    // Try to load the ringparticles paint worklet (fail silently)
    cssAny.paintWorklet
      .addModule(
        "https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js"
      )
      .catch(() => { });

    // Set permanent values for the animation (same as first file)
    el.style.setProperty("--ring-x", "50");
    el.style.setProperty("--ring-y", "60");
    el.style.setProperty("--ring-interactive", "1");
    el.classList.add("interactive");
  }, []);

  return (
    <div
      ref={heroRef}
      className="mxd-section mxd-hero-section mxd-hero-section-bg"
    >
      <div className="mxd-hero-00">
        <div className="mxd-hero-00__wrap">

          <div className="mxd-hero-00__top">
            <div className="loading-wrap">

              <h1 className="hero-00-title heading-ultra heading-ultra-bold">
                <span className="hero_title text-center loading__item">
                  Crafting <span className="ai_tesxt heading-ultra heading-ultra-bold">Ai Experiences</span>
                  <br></br>
                  Automating Future
                </span>
              </h1>
              <div className="hero-00-manifest loading__fade">
                <RevealText
                  start="top 70%"
                  as="p"
                  className="mxd-manifest reveal-type anim-uni-in-up"
                >
                  AI-driven development and automation built to scale products,
                  optimize workflows, and accelerate digital growth.
                </RevealText>
              </div>
            </div>
          </div>

          <div className="mxd-hero-00__bottom">
            <div className="mxd-manifest__controls d-xl-flex justify-content-xl-center justify-center flex ">
              <AnimatedButton
                text="Get a Quote"
                className="btn btn-anim btn-default btn-outline slide-right-up anim-uni-in-up"
                href={`/contact`}
                style={{
                  borderRadius: "50px",
                  padding: "12px 32px",
                }}
              >
                <i className="ph-bold ph-arrow-up-right" />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
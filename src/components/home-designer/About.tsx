"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AnimatedButton from "@/components/animation/AnimatedButton";
import RevealText from "@/components/animation/RevealText";
import { Eye, SquareUser, ChartColumn } from "lucide-react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  plus?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2000,
  suffix = "",
  plus = false,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {plus ? "+" : ""}
      {suffix}
    </span>
  );
};
export default function About() {
  return (
    <section className="mxd-section relative">
      <div className="mxd-container grid-container">
        <div className="row gx-0 mb-10 lg:mb-24">
          <div className="col-12">
            <div className="flex flex-col items-center justify-center relative text-center">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-500 mb-6 block fade-in-up-elm">
                + ABOUT US
              </span>

              <RevealText className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-current mb-0 fade-in-up-elm">
                Software Company
              </RevealText>
              <RevealText className="text-4xl md:text-5xl lg:text-7xl font-bold text-current fade-in-up-elm">
                AJX Technologies
              </RevealText>
            </div>
          </div>
        </div>

        <div className="container-fluid px-0">
          <div className="row gx-0 items-start">
            <div className="col-12 col-xl-2 mxd-grid-item">
              <div className="flex flex-row xl:flex-col flex-wrap gap-x-6 gap-y-10 md:gap-x-12 md:gap-y-16 justify-center xl:justify-start pt-6 xl:pt-14 anim-uni-scale-in-left">
                <div className="text-center min-w-[120px] xl:min-w-0">
                  <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                    <AnimatedCounter target={215} />
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-3 tracking-wider uppercase">
                    Wix Websites
                  </div>
                </div>

                <div className="text-center min-w-[120px] xl:min-w-0">
                  <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                    <AnimatedCounter target={30} plus />
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-3 tracking-wider uppercase">
                    Wix Websites
                  </div>
                </div>

                <div className="text-center min-w-[120px] xl:min-w-0">
                  <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                    <AnimatedCounter target={25} />
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-3 tracking-wider uppercase">
                    Wix Websites
                  </div>
                </div>

                <div className="text-center min-w-[120px] xl:min-w-0">
                  <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                    <AnimatedCounter target={23} suffix="M" />
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-3 tracking-wider uppercase">
                    Wix Websites
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-4 mxd-grid-item">
              <div className="flex justify-center xl:justify-start pt-12 xl:pt-0 pr-0 xl:pr-8 anim-uni-scale-in-up">
                <div className="relative w-full max-w-[500px] xl:max-w-full rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/4] xl:aspect-auto">
                  <Image
                    src="/about-us/about-front.png"
                    alt="Person working at desk"
                    width={600}
                    height={850}
                    className="w-full h-full object-cover block"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6 mxd-grid-item">
              <div className="flex flex-col items-center xl:items-start text-center xl:text-left pl-0 xl:pl-16 pt-12 xl:pt-0 anim-uni-scale-in-right">
                <RevealText className="text-lg md:text-xl font-normal leading-relaxed mb-10 text-gray-600 w-full max-w-lg xl:max-w-none text-center xl:text-left">
                  We are a creative web agency specializing in innovative design
                  and cutting-edge development. We help businesses stand out and
                  every aspect of our projects is crafted with the highest
                  standards of quality.
                </RevealText>

                <div className="mb-14 w-full flex justify-center xl:justify-start">
                  <AnimatedButton
                    text="Learn More"
                    className="inline-flex items-center gap-3 rounded-full bg-[#1dbf00] px-10 py-4 text-base font-bold text-white hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105"
                    href="/about-us"
                  >
                    <i className="ph-bold ph-arrow-up-right" />
                  </AnimatedButton>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
                  <div className="rounded-3xl p-8 bg-white border border-gray-100 shadow-lg flex flex-col items-center text-center justify-between hover:shadow-xl transition-all duration-300 min-h-[220px] group">
                    <Eye className="w-6 h-6 stroke-[1.5px] text-gray-900 mb-6 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold leading-snug text-gray-900 uppercase tracking-widest">
                      Great coverage
                      <br />
                      at a great price
                    </div>
                  </div>

                  <div className="rounded-3xl p-8 bg-white border border-gray-100 shadow-lg flex flex-col items-center text-center justify-between hover:shadow-xl transition-all duration-300 min-h-[220px] group">
                    <SquareUser className="w-6 h-6 stroke-[1.5px] text-gray-900 mb-6 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold leading-snug text-gray-900 uppercase tracking-widest">
                      Sold exclusively
                      <br />
                      through our agents
                    </div>
                  </div>

                  <div className="rounded-3xl p-8 bg-white border border-gray-100 shadow-lg flex flex-col items-center text-center justify-between hover:shadow-xl transition-all duration-300 min-h-[220px] group">
                    <ChartColumn className="w-6 h-6 stroke-[1.5px] text-gray-900 mb-6 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold leading-snug text-gray-900 uppercase tracking-widest">
                      Trusted financial
                      <br />
                      strength
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

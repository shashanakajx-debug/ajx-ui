"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import RevealText from "@/components/animation/RevealText";
import { Eye, SquareUser, ChartColumn } from "lucide-react";
import SectionHeader from "./SectionHeader";

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
    <div className="home-aboutus lg:pt-[40px]">
      <section className="mxd-container our-experties container_ser lg:pt-10 lg:pb-[100px] pt-10 pb-[50px]">

        <div className="mx-auto row gx-0">
          <SectionHeader
            subtitle="ABOUT US"
            title="AJX Technologies"
            description=" The Software Company"
            buttonText="View More"
            buttonLink="/services"
            className=""
          />

          <div className="container-fluid px-0">
            <div className="row gx-0 items-start items-stretch">
              <div className="col-12 col-xl-2 mxd-grid-item">
                <div className="flex flex-row xl:flex-col flex-wrap gap-x-6 gap-y-10 md:gap-x-12 md:gap-y-16 justify-between anim-uni-in-up min-h-full">
                  <div className="text-left min-w-[120px] xl:min-w-0">
                    <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                      <AnimatedCounter target={215} />
                    </div>
                    <div className="lg:text-[22px] text-[18px] font-medium mt-3 tracking-wider ">
                      Wix Websites
                    </div>
                  </div>

                  <div className="text-left min-w-[120px] xl:min-w-0">
                    <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                      <AnimatedCounter target={30} plus />
                    </div>
                    <div className="lg:text-[22px] text-[18px] font-medium mt-3 tracking-wider ">
                      Wix Websites
                    </div>
                  </div>

                  <div className="text-left min-w-[120px] xl:min-w-0">
                    <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                      <AnimatedCounter target={25} />
                    </div>
                    <div className="lg:text-[22px] text-[18px] font-medium mt-3 tracking-wider ">
                      Wix Websites
                    </div>
                  </div>

                  <div className="text-left min-w-[120px] xl:min-w-0">
                    <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                      <AnimatedCounter target={23} suffix="M" />
                    </div>
                    <div className="lg:text-[22px] text-[18px] font-medium mt-3 tracking-wider ">
                      Wix Websites
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-4 mxd-grid-item">
                <div className="flex justify-center xl:justify-start pt-12 xl:pt-0 pr-0 xl:pr-8 anim-uni-in-up">
                  <div className="relative w-full max-w-[500px] xl:max-w-full rounded-[2.5rem] overflow-hidden aspect-[3/4] xl:aspect-auto">
                    <Image
                      src="/about-us/Untitled design.jpg"
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
                <div className="flex flex-col items-center justify-between xl:items-start text-center xl:text-left pl-0 xl:pl-16 md:pt-12 pt-4 xl:pt-0 anim-uni-in-up min-h-full">
                  <div className="">
                    <RevealText className="font-normal leading-relaxed mb-10 w-full max-w-lg xl:max-w-none text-left xl:text-left">
                      <p className="mb-[20px] lg:text[28px] text-[20px]">We are a creative web agency specializing in innovative design
                        and cutting-edge development.</p>
                      <p className="lg:text[28px] text-[20px] mb-8">We help businesses stand out and
                        every aspect of our projects is crafted with the highest
                        standards of quality.</p>
                    </RevealText>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
                    <div className="rounded-3xl p-8 gap-10 bg-white  flex flex-col items-left text-left justify-between hover:shadow-xl transition-all duration-300 group">
                      <Eye className="w-8 h-8 stroke-[1.5px] text-gray-900 mb-6 group-hover:scale-110 transition-transform" />
                      <div className="text-[15px] leading-snug text-gray-900 tracking-tight">
                        Great coverage
                        <br />
                        at a great price
                      </div>
                    </div>

                    <div className="rounded-3xl p-8 gap-10 bg-white flex flex-col items-left text-left justify-between hover:shadow-xl transition-all duration-300 group">
                      <SquareUser className="w-8 h-8 stroke-[1.5px] text-gray-900 mb-6 group-hover:scale-110 transition-transform" />
                      <div className="text-[15px] leading-snug text-gray-900 tracking-tight">
                        Sold exclusively
                        <br />
                        through our agents
                      </div>
                    </div>

                    <div className="rounded-3xl p-8 gap-10 bg-white flex flex-col items-left text-left justify-between hover:shadow-xl transition-all duration-300 group">
                      <ChartColumn className="w-8 h-8 stroke-[1.5px] text-gray-900 mb-6 group-hover:scale-110 transition-transform" />
                      <div className="text-[15px] leading-snug text-gray-900 tracking-tight">
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
    </div>
  );
}
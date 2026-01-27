"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import RevealText from "@/components/animation/RevealText";
import { Eye, SquareUser, ChartColumn } from "lucide-react";
import SectionHeader from "./SectionHeader";
import AnimatedButton from "@/components/animation/AnimatedButton";

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
      { threshold: 0.5 },
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
      <section className=" our-experties container_ser lg:pt-10 lg:pb-[100px] pt-10 pb-[50px]">
        <div className="mx-auto row gx-0">
          <SectionHeader
            subtitle="ABOUT US"
            title="AJX Technologies"
            description=" The Software Company"
            buttonText="View More"
            buttonLink="/services"
            className=""
          />

          <div className="mxd-container">
            <div className="container-fluid px-0">
              <div className="row gx-0 items-start items-stretch">
                <div className="col-12 col-xl-2 mxd-grid-item p-0">
                  <div className="flex flex-col gap-y-8 xl:gap-y-0 xl:justify-between anim-uni-in-up h-full py-4 xl:py-0">
                    <div className="text-left">
                      <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                        <AnimatedCounter target={12} />
                      </div>
                      <div className="lg:text-[22px] text-[18px] font-medium mt-3 tracking-wider">
                        Experience
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                        <AnimatedCounter target={250} plus />
                      </div>
                      <div className="lg:text-[22px] text-[18px] font-medium mt-3 tracking-wider">
                        Client's
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                        <AnimatedCounter target={20} />
                      </div>
                      <div className="lg:text-[22px] text-[18px] font-medium mt-3 tracking-wider">
                        Team
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-5xl lg:text-6xl font-bold leading-none text-current tracking-tight">
                        <AnimatedCounter target={1200} plus />
                      </div>
                      <div className="lg:text-[22px] text-[18px] font-medium mt-3 tracking-wider">
                        Project's
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl-4 mxd-grid-item p-0">
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

                <div className="col-12 col-xl-6 mxd-grid-item p-0">
                  <div className="flex flex-col items-center justify-between xl:items-start text-center xl:text-left pl-0 xl:pl-16 md:pt-12 pt-4 xl:pt-0 anim-uni-in-up min-h-full">
                    <div className="">
                      <RevealText className="font-normal leading-relaxed mb-10 w-full max-w-lg xl:max-w-none text-left xl:text-left">
                        <p className="mb-[20px] lg:text[28px] text-[20px]">
                          AJX Technologies builds scalable, future-ready digital
                          solutions that help businesses grow, innovate, and
                          achieve measurable results. We combine strategy,
                          technology, and creativity to deliver real business
                          value.
                        </p>
                        <p className="mb-[20px] lg:text[28px] text-[20px]">
                          We follow a transparent and customer-focused approach,
                          supporting clients from first contact through
                          successful project delivery. Clear communication and a
                          deep understanding of client goals guide every
                          engagement.
                        </p>
                        <p className="mb-[20px] lg:text[28px] text-[20px]">
                          Collaboration is at the core of our work. By
                          partnering closely with our clients, we create
                          efficient, high-quality solutions that help businesses
                          stay competitive in an evolving digital landscape.
                        </p>
                      </RevealText>
                    </div>
                    <AnimatedButton
                      text="About-Us"
                      className="btn btn-anim btn-default btn-outline slide-right-up"
                      href={`/about-us`}
                      style={{
                        borderRadius: "50px",
                        padding: "12px 32px",
                      }}
                      tooltip="Get Started"
                    >
                      <i className="ph-bold ph-arrow-up-right" />
                    </AnimatedButton>
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

"use client";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SectionHeader from "./SectionHeader";
import type { Swiper as SwiperType } from "swiper";
import { Star, ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialsData = [
  {
    id: 1,
    authorName: "Daniyel Karlos",
    authorPosition: "Senior Director",
    authorCompany: "TechVision Inc.",
    authorPhoto: "/testimonials/dainial.jpg",
    rating: 5,
    tags: ["PACKAGING", "BRANDING"],
    text: "The new website not only looks premium but has significantly increased our traffic and conversions. The team matched our rigorous standards and delivered on time.",
    link: "#",
  },
  {
    id: 2,
    authorName: "Alex Tomato",
    authorPosition: "Brand Manager",
    authorCompany: "Instant Design",
    authorPhoto: "/testimonials/samual.jpg",
    rating: 5,
    tags: ["WEB DESIGN", "DEVELOPMENT"],
    text: "Working with the Rayo team was an absolute pleasure! They took the time to understand our business needs and translated them into a beautifully designed, user-friendly website.",
    link: "#",
  },
];

export default function Testimonials() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = testimonialsData.length;

  return (
    <div
      id="testimonials"
      className="mxd-section overflow-hidden padding-default"
    >
      <div className="mxd-container">
        <div className="mx-auto row gx-0">
          <SectionHeader
            subtitle="TESTIMONIALS"
            title="Ajx Technologies"
            description="Trusted by clients"
            buttonText="View More"
            buttonLink="/testimonials"
            className="col-12"
          />

          <div className="w-full mt-8 md:mt-12">
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              <div className="w-full lg:w-[34%] flex-shrink-0">
                <div className="h-full min-h-[400px] bg-gray-100 rounded-[28px] p-8 md:p-12 flex flex-col justify-center items-center text-center text-black">
                  <div className="mb-4">
                    <span className="text-[64px] md:text-[80px] font-medium leading-none tracking-tight">
                      5.0
                    </span>
                  </div>

                  <div className="flex gap-1 mb-6 text-[#FFB400]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-8 h-8 fill-current"
                        strokeWidth={0}
                      />
                    ))}
                  </div>

                  <p className="text-[16px] text-black mb-8 max-w-[360px]">
                    5 of 5 based on 64 Upwork reviews
                  </p>

                  <div className="mb-8">
                    <Image
                      src="/testimonials/upworklogo-black.png"
                      alt="Upwork"
                      width={140}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-6 mt-auto">
                    <button
                      onClick={() => {
                        if (swiperInstance) swiperInstance.slidePrev();
                      }}
                      className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center transition-all hover:bg-black hover:text-white group"
                      aria-label="Previous Slide"
                    >
                      <ArrowLeft className="w-6 h-6 group-hover:stroke-current" />
                    </button>

                    <div className="text-lg font-medium">
                      <span className="text-black">{activeIndex + 1}</span>
                      <span className="text-black/40">/{totalSlides}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (swiperInstance) swiperInstance.slideNext();
                      }}
                      className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center transition-all hover:bg-black hover:text-white group"
                      aria-label="Next Slide"
                    >
                      <ArrowRight className="w-6 h-6 group-hover:stroke-current" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[66%] min-w-0 relative">
                <Swiper
                  onSwiper={setSwiperInstance}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  spaceBetween={0}
                  slidesPerView={1}
                  modules={[Autoplay]}
                  autoplay={{ delay: 6000, disableOnInteraction: true }}
                  loop={true}
                  allowTouchMove={true}
                  breakpoints={{
                    640: { slidesPerView: 1.1 },
                    900: { slidesPerView: 1.5 },
                    1200: { slidesPerView: 1.8 },
                  }}
                  className="h-full !pb-10 !pr-4"
                >
                  {testimonialsData.map((item, idx) => (
                    <SwiperSlide
                      key={item.id}
                      className="h-full !filter-none !opacity-100 relative"
                    >
                      {idx !== testimonialsData.length - 1 && (
                        <div className="absolute right-0 top-8 bottom-8 w-[2px] bg-gray-200"></div>
                      )}

                      <div className="h-full flex items-stretch px-8 md:px-12">
                        <div className="w-full h-full flex flex-col bg-transparent justify-between min-h-[400px]">
                          <div className="flex flex-col items-start gap-4 mb-8">
                            <Image
                              src="/clutch.png"
                              alt="Clutch"
                              width={100}
                              height={32}
                              className="h-7 w-auto object-contain"
                            />
                            <div className="flex gap-2 flex-wrap mt-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 rounded-full border border-gray-200 font-semibold tracking-wide"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-bold ">
                              {item.rating.toFixed(1)}
                            </span>
                            <div className="flex gap-1 text-[#FFB400]">
                              {Array.from({ length: item.rating }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="w-6 h-6 fill-current"
                                    strokeWidth={0}
                                  />
                                ),
                              )}
                            </div>
                          </div>

                          <p className=" leading-relaxed mb-8">
                            "{item.text}"
                          </p>

                          <div className="mt-auto">
                            <a
                              href={item.link}
                              className="inline-flex items-center font-semibold hover:underline mb-8 text-lg"
                            >
                              Case studies{" "}
                              <ArrowUpRight className="ml-1 w-5 h-5" />
                            </a>

                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                                <Image
                                  src={item.authorPhoto}
                                  alt={item.authorName}
                                  width={56}
                                  height={56}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold m-0">
                                  {item.authorName}
                                </h4>
                                <p className="text-base m-0">
                                  {item.authorPosition}, {item.authorCompany}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
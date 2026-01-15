
"use client";

import React from "react";
import {
  Briefcase,
  Heart,
  ShoppingBag,
  GraduationCap,
  Landmark,
  Building2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Parallax, Autoplay } from "swiper/modules";
import SectionHeader from "./SectionHeader";

import Image from "next/image";

type Industry = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  image: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "fintech",
    title: "FinTech",
    description:
      "Secure payment solutions, digital banking, and financial platforms built with compliance in mind.",
    icon: Landmark,
    image: "/industries/fintech.png",
  },
  {
    id: "healthtech",
    title: "HealthTech",
    description:
      "HIPAA-compliant healthcare applications, telemedicine platforms, and patient management systems.",
    icon: Heart,
    image: "/industries/healthtech.png",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description:
      "Scalable online stores, marketplace platforms, and inventory management solutions.",
    icon: ShoppingBag,
    image: "/industries/ecommerce.png",
  },
  {
    id: "edtech",
    title: "EdTech",
    description:
      "Learning management systems, virtual classrooms, and educational content platforms.",
    icon: GraduationCap,
    image: "/industries/edtech.png",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description:
      "Business intelligence, workflow automation, and enterprise resource planning solutions.",
    icon: Building2,
    image: "/industries/enterprise.png",
  },
  {
    id: "startups",
    title: "Startups",
    description:
      "MVP development, rapid prototyping, and scalable solutions for fast-growing companies.",
    icon: Briefcase,
    image: "/industries/startups.png",
  },
];

export default function Industries() {
  return (
    <div className="mxd-section overflow-hidden padding-grid-pre-mtext mt-12 md:mt-20">
      <div className="mx-auto row gx-0">
        <SectionHeader
          subtitle="INDUSTRIES"
          title="Industries We Serve"
          description="Diverse Sectors"
          buttonText="All Industries"
          buttonLink="/industries"
          className="col-12"
        />

        <div className="mxd-block">
          <Swiper
            className="mxd-demo-swiper mxd-grid-item anim-uni-in-up"
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1600: { slidesPerView: 3, spaceBetween: 28 },
            }}
            loop={true}
            parallax={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            grabCursor={true}
            speed={700}
            centeredSlides={true}
            keyboard={{ enabled: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Parallax, Autoplay]}
          >
            {INDUSTRIES.map((industry) => {
              const IconComponent: React.ComponentType<{
                className?: string;
                strokeWidth?: number;
              }> = industry.icon;
              return (
                <SwiperSlide
                  className="swiper-slide mxd-demo-swiper__slide"
                  key={industry.id}
                >
                  <div className="demo-swiper-slide__image">
                    <div className="mxd-service-card">
                      <div
                        className="mxd-service-card__image-wrapper"
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "3 / 2",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={industry.image}
                          alt={industry.title}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1600px) 45vw, 33vw"
                          quality={65} // smaller file size; tweak 50-80 as needed
                          loading="lazy" // default for offscreen images, explicit is fine
                          style={{ objectFit: "cover" }}
                          className="mxd-service-card__image"
                        />
                        <div className="mxd-service-card__overlay">
                          <h3 className="mxd-service-card__overlay-title">
                            {industry.title}
                          </h3>
                        </div>
                      </div>


                      <div className="mxd-service-card__body">
                        <div className="mxd-service-card__icon anim-uni-in-up">
                          <IconComponent
                            className="w-10 h-10"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="mxd-service-card__content">
                          <h6 className="mxd-service-card__title anim-uni-in-up">
                            {industry.title}
                          </h6>
                          <p className="mxd-service-card__text anim-uni-in-up">
                            {industry.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="demo-swiper-slide__descr">
                    <span>{industry.title}</span>
                  </div>
                </SwiperSlide>
              );
            })}


            <div className="swiper-button-prev mxd-slider-btn mxd-slider-btn-round-prev v2">
              <a
                className="btn btn-round btn-round-small btn-outline slide-left anim-no-delay"
                href="#"
              >
                <i className="ph ph-arrow-left" />
              </a>
            </div>
            <div className="swiper-button-next mxd-slider-btn mxd-slider-btn-round-next v2">
              <a
                className="btn btn-round btn-round-small btn-outline slide-right anim-no-delay"
                href="#"
              >
                <i className="ph ph-arrow-right" />
              </a>
            </div>
          </Swiper>
        </div>

      </div>
    </div>
  );
}

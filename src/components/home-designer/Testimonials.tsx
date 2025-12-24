"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax, Autoplay } from "swiper/modules";
import AnimatedButton from "../animation/AnimatedButton";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialsPortfolioData = [
  {
    authorName: "Alex Tomato",
    authorPosition: "Brand Manager",
    authorCompany: "Instant Design",
    authorCompanyUrl: "#",
    rating: 5,
    text:
      "Working with the Rayo team was an absolute pleasure! They took the time to understand our business needs and translated them into a beautifully designed, user-friendly website.",
    authorPhoto: "/testimonials/samual.jpg",
    testimonialImage: "/testimonials/project1.webp",
    projectPage: "#",
  },
  {
    authorName: "Daniyel Karlos",
    authorPosition: "Senior Director of Marketing",
    authorCompany: "TechVision Inc.",
    authorCompanyUrl: "#",
    rating: 5,
    text:
      "The team at AJX Technologies completely transformed our online presence. The new website not only looks premium but has significantly increased our traffic and conversions.",
    authorPhoto: "/testimonials/dainial.jpg",
    testimonialImage: "/testimonials/project2.webp",
    projectPage: "#",
  },
];

export default function Testimonials() {
  return (
    <div id="testimonials" className="mxd-section overflow-hidden padding-default">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop
            speed={900}
            parallax
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            pagination={{
              el: ".swiper-pagination",
              type: "fraction",
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Pagination, Parallax, Autoplay]}
            className="swiper-testimonials"
          >
            {testimonialsPortfolioData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="container-fluid p-0">
                  <div className="row g-0 align-items-stretch">

                    {/* LEFT */}
                    <div
                      className="col-12 col-lg-6"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "32px 40px",
                      }}
                    >
                      {/* Avatar + Info */}
                      <div
                        className="d-flex"
                        style={{ gap: 18 }}
                        data-swiper-parallax-x={-200}
                      >
                        <div
                          style={{
                            width: 140,
                            height: 140,
                            borderRadius: "50%",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={item.authorPhoto}
                            alt={item.authorName}
                            width={140}
                            height={140}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div>
                          <h3 style={{ margin: 0 }}>{item.authorName}</h3>
                          <p style={{ margin: "6px 0", opacity: 0.8 }}>
                            {item.authorPosition}{" "}
                            <a href={item.authorCompanyUrl}>
                              {item.authorCompany}
                            </a>
                          </p>
                          <div>
                            {Array.from({ length: item.rating }).map((_, i) => (
                              <i
                                key={i}
                                className="ph-fill ph-star"
                                style={{ fontSize: 13, marginRight: 4 }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Text */}
                      <div
                        style={{ marginTop: 24, maxWidth: 620 }}
                        data-swiper-parallax-x={-300}
                      >
                        <p style={{ lineHeight: 1.55 }}>{item.text}</p>
                        <div style={{ marginTop: 18 }}>
                          <AnimatedButton
                            text="Project Page"
                            className="btn btn-small"
                            href={item.projectPage}
                          >
                            <i className="ph ph-arrow-up-right" />
                          </AnimatedButton>
                        </div>
                      </div>

                      {/* CONTROLS */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          marginTop: "auto",
                          paddingTop: 24,
                        }}
                      >
                        <div
                          className="swiper-button-prev"
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 999,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="ph ph-arrow-left"
                            style={{ fontSize: 14 }}
                          />
                        </div>

                        <div
                          className="swiper-pagination"
                          style={{ fontSize: 13 }}
                        />

                        <div
                          className="swiper-button-next"
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 999,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="ph ph-arrow-right"
                            style={{ fontSize: 14 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div
                      className="col-12 col-lg-6 d-flex align-items-center justify-content-center"
                      style={{ padding: "32px 40px" }}
                      data-swiper-parallax-x={-400}
                    >
                      <div
                        style={{
                          width: "88%",
                          height: "55vh",
                          maxHeight: 560,
                          borderRadius: 24,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={item.testimonialImage}
                          alt={`${item.authorName} testimonial image`}
                          width={1400}
                          height={1000}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
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
  );
}

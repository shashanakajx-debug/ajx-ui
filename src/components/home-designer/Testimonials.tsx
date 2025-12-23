"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TESTIMONIALS = [
    {
        id: "t1",
        name: "Daniyel Karlos",
        position: "CEO",
        company: "TechVision Inc",
        rating: 5,
        content:
            "The team at AJX Technologies transformed our online presence. The new website they built for us increased our traffic and conversions significantly. Their attention to detail and commitment to quality is outstanding.",
    },
    {
        id: "t2",
        name: "Samuel Peters",
        position: "Founder",
        company: "StartupFlow",
        rating: 5,
        content:
            "We were blown away by the custom web app AJX Technologies developed for us. It has streamlined our operations and made our business so much more efficient. Highly recommended!",
    },
    {
        id: "t3",
        name: "Maria Johnson",
        position: "CTO",
        company: "FinanceHub",
        rating: 5,
        content:
            "Outstanding work on our FinTech platform. The team understood our complex requirements and delivered a secure, scalable solution that exceeded our expectations.",
    },
];

export default function Testimonials() {
    return (
        <div id="testimonials" className="mxd-section overflow-hidden padding-default">
            <div className="mxd-container grid-container">
                {/* Block - Testimonials Slider Start */}
                <div className="mxd-block">
                    <div className="testimonials-slider no-padding">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                el: ".swiper-pagination",
                                type: "fraction",
                            }}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                            className="swiper-testimonials no-padding"
                        >
                            {TESTIMONIALS.map((item) => (
                                <SwiperSlide key={item.id} className="swiper-slide">
                                    <div className="mxd-testimonials-simple">
                                        <div className="container-fluid p-0">
                                            <div className="row g-0">
                                                <div className="col-12 col-xl-8 mx-auto">
                                                    <div className="mxd-testimonials-simple__content">
                                                        {/* Rating */}
                                                        <div className="mxd-testimonials-simple__rating anim-uni-in-up">
                                                            {Array.from({ length: item.rating }).map((_, i) => (
                                                                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                                                            ))}
                                                        </div>

                                                        {/* Testimonial Text */}
                                                        <div className="mxd-testimonials-simple__text anim-uni-in-up">
                                                            <p className="t-large">{item.content}</p>
                                                        </div>

                                                        {/* Author Info */}
                                                        <div className="mxd-testimonials-simple__author anim-uni-in-up">
                                                            <h6 className="mxd-testimonials-simple__name">
                                                                {item.name}
                                                            </h6>
                                                            <p className="mxd-testimonials-simple__position t-small">
                                                                {item.position} at {item.company}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* Navigation */}
                            <div className="swiper-testimonials__controls">
                                <div className="swiper-button-prev mxd-slider-btn mxd-slider-btn-round-prev">
                                    <a className="btn btn-round btn-round-small btn-outline slide-left anim-no-delay" href="#">
                                        <i className="ph ph-arrow-left" />
                                    </a>
                                </div>
                                <div className="swiper-pagination mxd-swiper-pagination-fraction" />
                                <div className="swiper-button-next mxd-slider-btn mxd-slider-btn-round-next">
                                    <a className="btn btn-round btn-round-small btn-outline slide-right anim-no-delay" href="#">
                                        <i className="ph ph-arrow-right" />
                                    </a>
                                </div>
                            </div>
                        </Swiper>
                    </div>
                </div>
                {/* Block - Testimonials Slider End */}
            </div>
        </div>
    );
}

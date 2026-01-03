import Image from "next/image";

import RevealText from "../animation/RevealText";
import AnimatedButton from "../animation/AnimatedButton";

export default function RayoCtaDuplicate() {
    return (
        <div className="mxd-section overflow-hidden">
            <div className="mxd-container">
                {/* Block - CTA Start */}
                <div className="mxd-block">
                    <div className="mxd-promo">
                        <div className="mxd-promo__inner anim-zoom-out-container">
                            {/* background */}
                            <div className="mxd-promo__bg" />
                            {/* caption */}
                            <div className="mxd-promo__content mt-[8rem]">
                                <p className="mxd-promo__title anim-uni-in-up w-100">
                                    <span className="mxd-promo__icon align-text-bottom">
                                        <Image
                                            alt="Icon"
                                            src="/about-us/300x300_obj-cta-01.webp"
                                            width={300}
                                            height={300}
                                        />
                                    </span>
                                    <RevealText
                                        as="span"
                                        className="mxd-promo__caption reveal-type"
                                    >
                                        Building Smarter, Scalable and Future-Ready Experiences
                                    </RevealText>
                                </p>
                                
                                <div className="mxd-promo__description anim-uni-in-up">
                                    <p style={{ marginBottom: '1.5rem', fontSize: '1.6rem', lineHeight: '1.8', color: 'var(--t-opp-bright)' }}>
                                        SMBs and enterprises ship reliable, high‑performance digital products. Our team blends product thinking with engineering excellence—covering web and mobile development, AI agent generation, data engineering, and blockchain development.
                                    </p>
                                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                        <li style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative', color: 'var(--t-opp-bright)' }}>
                                            <span style={{ position: 'absolute', left: 0 }}>✦</span>
                                            <strong>Founded on collaboration:</strong> We win when our clients win.
                                        </li>
                                        <li style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative', color: 'var(--t-opp-bright)' }}>
                                            <span style={{ position: 'absolute', left: 0 }}>✦</span>
                                            <strong>Delivery you can trust:</strong> Agile execution, transparent communication, measurable outcomes.
                                        </li>
                                        <li style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative', color: 'var(--t-opp-bright)' }}>
                                            <span style={{ position: 'absolute', left: 0 }}>✦</span>
                                            <strong>Security-first mindset:</strong> Best practices for code, data, and infrastructure.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* parallax images */}
                            <div className="mxd-promo__images">
                                <Image
                                    className="promo-image promo-image-1"
                                    alt="Image"
                                    src="/about-us/cta-img-01.webp"
                                    width={500}
                                    height={612}
                                />
                                <Image
                                    className="promo-image promo-image-2"
                                    alt="Image"
                                    src="/about-us/cta-img-02.webp"
                                    width={400}
                                    height={401}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Block - CTA End */}
            </div>
        </div>
    );
}
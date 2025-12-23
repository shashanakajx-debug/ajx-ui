import RevealText from "@/components/animation/RevealText";
import AnimatedButton from "@/components/animation/AnimatedButton";

export default function FinalCta() {
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
                            <div className="mxd-promo__content">
                                <p className="mxd-promo__title anim-uni-in-up">
                                    <span className="mxd-promo__icon">
                                        <svg
                                            width="300"
                                            height="300"
                                            viewBox="0 0 300 300"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="150" cy="150" r="140" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
                                            <circle cx="150" cy="150" r="100" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
                                            <circle cx="150" cy="150" r="60" fill="currentColor" opacity="0.7" />
                                            <path d="M150 90 L150 210 M90 150 L210 150" stroke="white" strokeWidth="3" />
                                            <circle cx="150" cy="90" r="8" fill="white" />
                                            <circle cx="150" cy="210" r="8" fill="white" />
                                            <circle cx="90" cy="150" r="8" fill="white" />
                                            <circle cx="210" cy="150" r="8" fill="white" />
                                        </svg>
                                    </span>
                                    <RevealText
                                        as="span"
                                        className="mxd-promo__caption reveal-type"
                                    >
                                        Ready to bring your vision to life?
                                    </RevealText>
                                </p>
                                <div className="mxd-promo__controls anim-uni-in-up">
                                    <AnimatedButton
                                        text="Start Your Project"
                                        className="btn btn-anim btn-default btn-large btn-additional slide-right-up"
                                        href="/contact"
                                    >
                                        <i className="ph-bold ph-arrow-up-right" />
                                    </AnimatedButton>
                                </div>
                            </div>

                            {/* decorative elements */}
                            <div className="mxd-promo__decor">
                                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-accent/10 blur-xl animate-pulse" />
                                <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-pulse delay-1000" />
                                <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-secondary/10 blur-xl animate-pulse delay-500" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Block - CTA End */}
            </div>
        </div>
    );
}

import RevealText from "@/components/animation/RevealText";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { Search, Lightbulb, Palette, Code, TestTube, Rocket } from "lucide-react";

const PROCESS_STEPS = [
    {
        id: "discovery",
        title: "Discovery & Research",
        description:
            "We start by understanding your business, your audience, and your objectives to create a tailored strategy.",
        icon: Search,
    },
    {
        id: "planning",
        title: "Planning & Strategy",
        description:
            "We outline the project scope, timelines, and deliverables to ensure everything runs smoothly from start to finish.",
        icon: Lightbulb,
    },
    {
        id: "design",
        title: "Design",
        description:
            "Our creative team crafts visually stunning designs that reflect your brand identity and enhance the user experience.",
        icon: Palette,
    },
    {
        id: "development",
        title: "Development",
        description:
            "Using the latest technologies, we bring the designs to life with clean, efficient code that ensures performance and scalability.",
        icon: Code,
    },
    {
        id: "testing",
        title: "Testing & QA",
        description:
            "We rigorously test the website across different devices and browsers to ensure a seamless user experience.",
        icon: TestTube,
    },
    {
        id: "launch",
        title: "Launch & Post-Launch Support",
        description:
            "After launch, we provide ongoing support to monitor performance, fix any bugs, and make updates as needed.",
        icon: Rocket,
    },
];

export default function Process() {
    return (
        <div className="mxd-section padding-pre-grid mobile-grid-s">
            <div className="mxd-container grid-container">
                {/* Block - Section Title Start */}
                <div className="mxd-block">
                    <div className="mxd-section-title">
                        <div className="container-fluid p-0">
                            <div className="row g-0">
                                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                                    <div className="mxd-section-title__hrtitle anim-uni-in-up">
                                        <RevealText as="h2" className="reveal-type">
                                            Our development process
                                        </RevealText>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                                    <div className="mxd-section-title__hrdescr">
                                        <p className="anim-uni-in-up">Discover</p>
                                        <p className="anim-uni-in-up">Design</p>
                                        <p className="anim-uni-in-up">Deliver</p>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                                    <div className="mxd-section-title__hrcontrols anim-uni-in-up">
                                        <AnimatedButton
                                            text="Let's Chat"
                                            className="btn btn-anim btn-default btn-outline slide-right-up"
                                            href="/contact"
                                        >
                                            <i className="ph-bold ph-arrow-up-right" />
                                        </AnimatedButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Block - Section Title End */}

                {/* Block - Process List Start */}
                <div className="mxd-block">
                    <div className="mxd-approach-list">
                        {PROCESS_STEPS.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div className="mxd-approach-list__item" key={item.id}>
                                    <div className="mxd-approach-list__border anim-uni-in-up" />
                                    <div className="mxd-approach-list__inner">
                                        <div className="container-fluid px-0">
                                            <div className="row gx-0">
                                                <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                                                    <div className="mxd-approach-list__image anim-uni-in-up">
                                                        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-accent/10">
                                                            <IconComponent className="w-16 h-16 text-accent" strokeWidth={1.5} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                                                    <div className="mxd-approach-list__title anim-uni-in-up">
                                                        <h6>{item.title}</h6>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                                                    <div className="mxd-approach-list__descr anim-uni-in-up">
                                                        <p>{item.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {idx === PROCESS_STEPS.length - 1 && (
                                        <div className="mxd-approach-list__border anim-uni-in-up" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Block - Process List End */}
            </div>
        </div>
    );
}

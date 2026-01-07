import Image from "next/image";
import RevealText from "../animation/RevealText";
import AnimatedButton from "../animation/AnimatedButton";

const approach1 = [
  {
    title: "End-to-End Services",
    description:
      "We don’t believe in one-size-fits-all. Every website we create is designed specifically for your business needs and goals.",
    icon: "/icons/h70_appr-01.webp",
  },
  {
    title: "Innovative",
    description:
      "From concept to launch, we handle every aspect of your web development journey.",
    icon: "/icons/h70_appr-02.webp",
  },
  {
    title: "Proven Results",
    description:
      "Our work speaks for itself. We have a track record of delivering websites that improve performance and ROI.",
    icon: "/icons/h70_appr-03.webp",
  },
  {
    title: "Ongoing Support",
    description:
      "After your website goes live, we don’t disappear. We provide ongoing support and maintenance to keep your site performing at its best.",
    icon: "/icons/h70_appr-04.webp",
  },
  {
    title: "Client Success",
    description:
      "Our clients consistently see improved engagement, conversion rates, and business growth.",
    icon: "/icons/h70_appr-05.webp",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="mxd-section padding-pre-grid mobile-grid-s mt-40">
      <div className="mxd-container grid-container">
        {/* Block - Section Title Start */}
        <div className="mxd-block">
          <div className="mxd-section-title">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle anim-uni-in-up">
                    <RevealText as="h2" className="reveal-type">
                      Why Choose AJX
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up">Design</p>
                    <p className="anim-uni-in-up">Development</p>
                    <p className="anim-uni-in-up">Mastership</p>
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

        {/* Block - Approach and Philosophy List Start */}
        <div className="mxd-block">
          <div className="mxd-approach-list">
            {approach1.map((item, idx) => (
              <div className="mxd-approach-list__item" key={idx}>
                <div className="mxd-approach-list__border anim-uni-in-up" />
                <div className="mxd-approach-list__inner">
                  <div className="container-fluid px-0">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                        <div className="mxd-approach-list__image anim-uni-in-up">
                          <Image
                            alt={item.title}
                            src={item.icon}
                            width={210}
                            height={210}
                          />
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
                <div className="mxd-approach-list__border anim-uni-in-up" />
              </div>
            ))}
          </div>
        </div>
        {/* Block - Approach and Philosophy List End */}
      </div>
    </div>
  );
}

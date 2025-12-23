import Image from "next/image";
import RevealText from "../animation/RevealText";
import AnimatedButton from "../animation/AnimatedButton";

const approach1 = [
  {
    title: "Perfection",
    description: "From pixel-perfect designs to flawless code, every aspect of our projects is crafted with care to ensure the highest standards of quality.",
    icon: "/icons/h70_appr-01.webp"
  },
  {
    title: "Innovative",
    description: "We stay ahead of design trends, offering modern and visually impactful solutions that set your brand apart.",
    icon: "/icons/h70_appr-02.webp"
  },
  {
    title: "Expertise",
    description: "We are passionate about integrating the latest technologies and trends, including interactive animations and mobile-first strategies.",
    icon: "/icons/h70_appr-03.webp"
  },
  {
    title: "Full-Cycle services",
    description: "From web design to development, branding, SEO, and UX/UI, we provide a full range of services that cover all your digital needs.",
    icon: "/icons/h70_appr-04.webp"
  },
  {
    title: "Client Success",
    description: "Our clients consistently see improved engagement, conversion rates, and business growth.",
    icon: "/icons/h70_appr-05.webp"
  }
];

export default function WhyChooseUs() {
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
                      Approach and philosophy
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
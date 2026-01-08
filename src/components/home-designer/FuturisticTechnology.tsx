import Image from "next/image";
import Link from "next/link";

export default function FuturisticTechnology() {
  return (
    <div className="mxd-section overflow-hidden padding-pre-title">
      <div className="mxd-container grid-container">
        {/* Block - Services Cards #02 Start */}
        <div className="mxd-block">
          <div className="mxd-services-cards-s">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {/* item */}
                <div className="col-12 col-xl-8 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-right">
                  <div className="mxd-services-cards-s__inner justify-between bg-base-tint radius-l padding-4">
                    <div className="mxd-services-cards__controls">
                      <Link
                        className="btn btn-round btn-round-large btn-additional slide-right-up anim-no-delay"
                        href="/services"
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </Link>
                    </div>
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">
                        AI & Automation<br></br> Solutions
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info width-50">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          UI/UX
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Web design
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Packaging
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Motion
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          3D models
                        </span>
                      </div>
                      <p className="anim-uni-in-up">
                        With cutting-edge AI and automation frameworks, we design intelligent systems that streamline workflows and drive efficiency.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-right">
                      <Image
                        alt="Illustration"
                        src="/FuturisticTechnology/image.webp"
                        width={910}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-left">
                  <div className="mxd-services-cards-s__inner justify-end bg-accent radius-l padding-4">
                                        <div className="mxd-services-cards__controls">
                      <Link
                        className="btn btn-round btn-round-large btn-additional slide-right-up anim-no-delay"
                        href="/services"
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </Link>
                    </div>
                    <div className="mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">SaaS Product Development</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Frontend
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Interactions
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Backend
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        We build robust, cloud-ready SaaS applications with scalable architecture and enterprise-grade security.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-top-right">
                      <Image
                        className="mxd-move"
                        alt="Illustration"
                        src="/FuturisticTechnology/image (1).webp"
                        width={1200}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-right">
                  <div className="mxd-services-cards-s__inner bg-additional radius-l padding-4">
                                        <div className="mxd-services-cards__controls">
                      <Link
                        className="btn btn-round btn-round-large btn-additional slide-right-up anim-no-delay"
                        href="/services"
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </Link>
                    </div>
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">Blockchain & Web3 Solutions</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Strategy
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Social media
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          SEO
                        </span>
                      </div>
                      <p className="t-bright anim-uni-in-up">
                        We craft decentralized applications with a focus on security, scalability, and innovation to empower businesses in the digital economy.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-bottom">
                      <Image
                        className="mxd-rotate-slow"
                        alt="Illustration"
                        src="/FuturisticTechnology/image (2).webp"
                        width={1200}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in">
                  <div className="mxd-services-cards-s__inner bg-base-opp radius-l padding-4">
                    <div className="mxd-services-cards__controls">
                      <Link
                        className="btn btn-round btn-round-large btn-additional slide-right-up anim-no-delay"
                        href="/services"
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </Link>
                    </div>
                    <div className="mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">Web Application Development</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Brand strategy
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Logo design
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Guidelines
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        Our web solutions combine stunning design with powerful development to create fast, responsive.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-bottom image-bottom-2">
                      <Image
                        alt="Illustration"
                        src="/FuturisticTechnology/image (3).webp"
                        width={891}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-left">
                  <div className="mxd-services-cards-s__inner justify-end bg-base-tint radius-l padding-4">
                                        <div className="mxd-services-cards__controls">
                      <Link
                        className="btn btn-round btn-round-large btn-additional slide-right-up anim-no-delay"
                        href="/services"
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </Link>
                    </div>
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">E-Commerce Development</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          E-Commerce
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Maintenance
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Support
                        </span>
                      </div>
                      <p className="anim-uni-in-up">
                        Our e-commerce solutions deliver seamless shopping experiences with secure transactions and conversion-focused design.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-top">
                      <Image
                        alt="Illustration"
                        src="/FuturisticTechnology/image (4).webp"
                        width={1200}
                        height={996}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Services Cards #02 End */}
      </div>
    </div>
  );
}
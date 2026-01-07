import Link from "next/link";
import Image from "next/image";

export default function Services() {
  return (
    <div className="mxd-section overflow-hidden">
      <div className="mxd-container grid-container">
        {/* Block - Services Cards #01 Start */}
        <div className="mxd-block">
          <div className="mxd-services-cards">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards__item mxd-grid-item anim-uni-scale-in-right">
                  <div className="mxd-services-cards__inner align-end bg-base-opp radius-l padding-5x4">
                    <div className="mxd-services-cards__controls">
                      <Link
                        className="btn btn-round btn-round-large btn-additional slide-right-up anim-no-delay"
                        href={`/services`}
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </Link>
                    </div>
                    <div className="mxd-services-cards__title mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">MVP Development</h3>
                    </div>
                    <div className="mxd-services-cards__info">
                      <div className="mxd-services-cards__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          UI/UX
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Web design
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Packaging
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Motion
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          3D models
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        From concept to market-ready product, we build lean, scalable MVPs that validate ideas and attract investors
                      </p>
                    </div>
                    <div className="mxd-services-cards__image mxd-services-cards-image-1">
                      <Image
                        alt="Illustration"
                        src="/services/graphic.png"
                        width={800}
                        height={800}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards__item mxd-grid-item anim-uni-scale-in-left">
                  <div className="mxd-services-cards__inner align-end bg-accent radius-l padding-5x4">
                    <div className="mxd-services-cards__controls">
                      <Link
                        className="btn btn-round btn-round-large btn-base slide-right-up anim-no-delay"
                        href={`/services`}
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </Link>
                    </div>
                    <div className="mxd-services-cards__title mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">
                        SEO & Digital Marketing
                      </h3>
                    </div>
                    <div className="mxd-services-cards__info">
                      <div className="mxd-services-cards__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Frontend
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Interactions
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Backend
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Mobile Apps
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        We combine data-driven strategies with creative execution to maximize visibility, engagement, and measurable growth.
                      </p>
                    </div>
                    <div className="mxd-services-cards__image mxd-services-cards-image-2">
                      <Image
                        alt="Illustration"
                        src="/services/creative.png"
                        width={800}
                        height={800}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards__item mxd-grid-item anim-uni-scale-in-right">
                  <div className="mxd-services-cards__inner justify-end bg-base-opp radius-l padding-5x4">
                    <div className="mxd-services-cards__controls">
                      <Link
                        className="btn btn-round btn-round-large btn-additional slide-right-up anim-no-delay"
                        href={`/services`}
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </Link>
                    </div>
                    <div className="mxd-services-cards__title mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">
                        Website Maintenance & Support:
                      </h3>
                    </div>
                    <div className="mxd-services-cards__info">
                      <div className="mxd-services-cards__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Brand strategy
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Logo design
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Guidelines
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Rebranding
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        Our proactive support ensures your website stays secure, optimized, and always delivering peak performance.
                      </p>
                    </div>
                    <div className="mxd-services-cards__image mxd-services-cards-image-4">
                      <Image
                        alt="Illustration"
                        src="/services/brand-indentity.png"
                        width={800}
                        height={800}
                      />
                    </div>
                  </div>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
        {/* Block - Services Cards #01 End */}
      </div>
    </div>
  );
}
export default function Locations() {
  return (
    <div className="mxd-section padding-default">
      <div className="mxd-container grid-container">
        {/* Block - Text Block with H2 Title, Paragraph and Contact Lists Start */}
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                <div className="mxd-block__name">
                  <h2 className="reveal-type anim-uni-in-up">
                    Get in Touch
                  </h2>
                </div>
              </div>
              <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <div className="mxd-block__paragraph">
                    <p className="t-large t-bright anim-uni-in-up">
                      We&apos;re here to help and answer any questions you might
                      have. We look forward to hearing from you!
                    </p>
                    <div className="mxd-paragraph__lists">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-12 col-md-6 col-xl-5 mxd-paragraph__lists-item">
                            <div className="mxd-paragraph__lists-title">
                              <p className="t-large t-bright t-caption anim-uni-in-up">
                                Contact Info
                              </p>
                            </div>
                            <ul>
                              <li className="anim-uni-in-up">
                                <a
                                  href="mailto:shashanakajx@gmail.com"
                                  target="_blank"
                                >
                                  shashanakajx@gmail.com
                                </a>
                              </li>
                              <li className="anim-uni-in-up">
                                <a href="tel:+918269669862">+91 8269669862</a>
                              </li>
                            </ul>
                            <div className="mxd-paragraph__lists-title mt-4">
                              <p className="t-large t-bright t-caption anim-uni-in-up">
                                Address
                              </p>
                            </div>
                            <ul>
                              <li className="anim-uni-in-up">
                                <a
                                  href="https://goo.gl/maps/placeholder"
                                  target="_blank"
                                >
                                  Skye Privilon, 117, Tulsi Nagar, Nipania,
                                  <br />
                                  Indore, Madhya Pradesh 452010
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-12 col-md-6 col-xl-5 mxd-paragraph__lists-item">
                            <div className="mxd-paragraph__lists-title">
                              <p className="t-large t-bright t-caption anim-uni-in-up">
                                Business Hours
                              </p>
                            </div>
                            <ul>
                              <li className="anim-uni-in-up">
                                <span>Monday - Saturday:</span>
                                <br />
                                10:00 AM - 07:00 PM
                              </li>
                              <li className="anim-uni-in-up mt-2">
                                <span>Sunday: Closed</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Text Block with H2 Title, Paragraph and Contact Lists End */}
      </div>
    </div>
  );
}

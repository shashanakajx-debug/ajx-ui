"use client";
import { useEffect, useRef, useState } from "react";
// Define Faq interface
interface Faq {
  question: string;
  answer: string;
}

export default function Faqs() {
  const faqContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [faqContentHeights, setFaqContentHeights] = useState<number[]>([]);
  const [activeFaq, setActiveFaq] = useState(-1);

  // FAQ data
  const faqs: Faq[] = [
    {
      question: "What services does AJX Technologies provide?",
      answer: "We offer end-to-end web solutions including Web Design & Development, E-Commerce Development, SaaS Product Development, AI & Automation Solutions, Blockchain & Web3, SEO & Digital Marketing, MVP Development, and Website Maintenance & Support."
    },
    {
      question: "Do you provide custom solutions for startups and enterprises?",
      answer: "Yes, we work with startups, SMEs, and enterprises, offering tailor-made solutions that fit business goals, budgets, and growth stages."
    },
    {
      question: "How long does it take to develop a website or product?",
      answer: "Timelines depend on the project's complexity. A standard website may take 2–4 weeks, while SaaS platforms, AI solutions, or e-commerce stores may take 2–3 months. We provide clear timelines before starting."
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Absolutely! Our Website Maintenance & Support services include updates, bug fixes, security monitoring, backups, and performance optimization to keep your digital assets running smoothly."
    },
    {
      question: "Can you help with SEO and digital marketing after development?",
      answer: "Yes, we offer SEO & Digital Marketing services to help your website rank higher on search engines and reach your target audience effectively."
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes, AJX Technologies works with clients worldwide. We have experience delivering projects across multiple industries and regions."
    },
    {
      question: "What is your development process?",
      answer: "Our process includes Discovery & Planning, Design & Prototyping, Development & Testing, Launch & Deployment, and Ongoing Support. We maintain transparent communication throughout each phase."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We work with modern technologies including React, Next.js, Node.js, Python, AI/ML frameworks, blockchain platforms, and cloud services like AWS and Azure."
    },
    {
      question: "How do you ensure project quality and security?",
      answer: "We follow industry best practices, conduct thorough testing, implement security protocols, perform code reviews, and ensure compliance with data protection regulations."
    }
  ];

  useEffect(() => {
    // Get scrollHeight for each FAQ content and store in state
    const heights = faqContentRefs.current.map((content) =>
      content ? content.scrollHeight : 0
    );
    setFaqContentHeights(heights);
  }, []);

  return (
    <>
      <div className="mxd-section mxd-section-inner-headline padding-s-text-pre-block">
        <div className="mxd-container grid-container">
          <div className="mxd-block loading-wrap">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                  <div className="mxd-block__name name-inner-headline loading__item">
                    <p className="mxd-point-subtitle">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20px"
                        height="20px"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill="currentColor"
                          d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2
                    c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4
                    c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2
                    c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6
                    c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4
                    c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6
                    c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"
                        />
                      </svg>
                      <span>FAQ</span>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                  <div className="mxd-block__content">
                    <div className="mxd-block__inner-headline">
                      <h1 >
                        Everything you need to know
                      </h1>
                      <p className="inner-headline__text t-large t-bright loading__item">
                        Have questions? We&apos;ve got the answers! Here,
                        you&apos;ll find clear and concise information about our
                        services, process, and what to expect when working with
                        us. If you need more details, feel free to reach out!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section - FAQ Accordion Start */}
      <div className="mxd-section mxd-section-inner-form padding-default">
        <div className="mxd-container grid-container">
          <div className="mxd-block">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-2 mxd-grid-item no-margin" />
                <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                  <div className="mxd-block__content">
                    <div className="mxd-accordion loading__fade">
                      {faqs.map((f: Faq, idx: number) => (
                        <div key={idx} className="mxd-accordion__item">
                          <div className="mxd-accordion__divider anim-uni-in-up" />
                          <div
                            onClick={() =>
                              setActiveFaq((pre) => (pre === idx ? -1 : idx))
                            }
                            className="mxd-accordion__title anim-uni-in-up"
                          >
                            <h6>{f.question}</h6>
                            <div
                              className={`mxd-accordion__arrow ${
                                idx === activeFaq ? "accordion-rotate" : ""
                              }`}
                            >
                              <i className="ph ph-plus" />
                            </div>
                          </div>
                          <div
                            className="mxd-accordion__content"
                            style={{
                              display: "block",
                              height:
                                activeFaq === idx
                                  ? `calc(${faqContentHeights[idx]}px + 3.4rem)`
                                  : 0,
                              paddingBottom: activeFaq === idx ? "3.4rem" : 0,
                              transition: "all 0.3s ease",
                            }}
                            ref={(el) => {
                              faqContentRefs.current[idx] = el;
                            }}
                          >
                            <p className="mxd-accordion__text">{f.answer}</p>
                          </div>
                          <div className="mxd-accordion__divider anim-uni-in-up" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section - FAQ Accordion End */}
    </>
  );
}
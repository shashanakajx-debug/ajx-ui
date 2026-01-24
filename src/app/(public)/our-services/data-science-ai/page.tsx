import OurExpertise from "@/components/home-designer/OurExpertise";
import Image from "next/image";
import AnimatedButton from "@/components/animation/AnimatedButton";

const page = () => {
  return (
    <>
      {/* Section - Inner Page Headline Start */}
      <div className="mxd-section mxd-section-inner-headline mt-[100px]">
        <div className="mxd-container">
          <div className="flex flex-wrap">
            <div className="col-12 col-xl-6 col-lg-6 flex items-center">
              <div className="mxd-block__content">
                <div className="mxd-block__inner-headline">
                  <h1 className="inner-headline__title headline-img-before headline-img-04 loading__item">
                    Unlock Efficiency with AI & Automation
                  </h1>
                  <p className="md:text-[20px]">
                    Smarter workflows, faster decisions, and greater
                    productivity—powered by intelligent automation.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6 col-lg-6">
              <div className="">
                <Image
                  alt="Illustration"
                  src="/our-services/800x800_card-image-03.webp"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mxd-container mt-10 pb-10">
        <div className="flex flex-wrap">
          <div className="col-12 col-xl-4 col-lg-4">
            <h2 className="mb-4">
              We’ll Develop Your AI & Automation Solutions
            </h2>
            <p className="md:text-[20px]">
              We’ll help your business integrate AI-driven workflows and
              automation tools to save time, reduce costs, and boost
              performance.
            </p>
          </div>
          <div className="col-12 col-xl-8 col-lg-8">
            <div className="flex flex-wrap">
              <div className="col-12 col-xl-6 col-lg-6 p-4 pt-0 pb-4">
                <div className="border-b pb-4">
                  <h3>AI Chatbots & Virtual Assistants</h3>
                  <p>24/7 automated customer support.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-lg-6 p-4 pt-0 pb-4">
                <div className="border-b pb-4">
                  <h3>Predictive Analytics</h3>
                  <p>Data-driven insights for smarter decisions.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-lg-6 p-4 pb-4">
                <div className="border-b pb-4">
                  <h3>Robotic Process Automation (RPA)</h3>
                  <p>Automate repetitive business tasks.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-lg-6 p-4 pb-4">
                <div className="border-b pb-4">
                  <h3>Machine Learning Models</h3>
                  <p>Tailored models for your specific needs.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-lg-6 p-4 pb-4">
                <div className="border-b pb-4">
                  <h3>Workflow Automation</h3>
                  <p>Streamline internal processes and operations.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-lg-6 p-4 pb-4">
                <div className="border-b pb-4">
                  <h3>AI Integration</h3>
                  <p>
                    Seamless integration with CRMs, ERPs, and business tools.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="md:text-[20px]">
                With our advanced AI expertise and automation frameworks, we
                deliver intelligent, scalable, and secure solutions that
                accelerate business growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mxd-container pt-[80px] pb-[80px]">
        <div className="head-teps text-center pb-[30px]">
          <h2>4 Easy Working Steps</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="border text-center p-10 min-h-[100%]">
            <h3>Discovery & Strategy</h3>
            <p>Identify your business automation needs.</p>
          </div>

          <div className="border text-center p-10 min-h-[100%]">
            <h3>Design & Development</h3>
            <p>Build AI-powered workflows.</p>
          </div>

          <div className="border text-center p-10 min-h-[100%]">
            <h3>Testing & Optimization</h3>
            <p>Ensure accuracy, speed, and efficiency.</p>
          </div>

          <div className="border text-center p-10 min-h-[100%]">
            <h3>Launch & Support</h3>
            <p>Deploy and continuously improve solutions.</p>
          </div>
        </div>
      </div>

      <div className="mxd-container pt-[80px] pb-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 items-center">
          <div className="">
            <p>Stop Guessing. Start Building</p>
            <h2>Discovery & Strategy</h2>
          </div>

          <div className="  ">
            <Image
              alt="Illustration"
              src="/our-services/color-ai-image.png"
              width={600}
              height={600}
            />
          </div>

          <div className=" ">
            <AnimatedButton
              text="Get a Quote"
              className="btn btn-anim btn-default btn-outline slide-right-up anim-uni-in-up"
              href={`/contact`}
              style={{
                borderRadius: "50px",
                padding: "12px 32px",
              }}
            >
              <i className="ph-bold ph-arrow-up-right" />
            </AnimatedButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

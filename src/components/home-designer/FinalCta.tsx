import RevealText from "../animation/RevealText";
import AnimatedButton from "../animation/AnimatedButton";

export default function FinalCta() {
  return (
    <div className="mxd-section padding-default">
      <div className="mxd-container">
        <div className="mxd-block">
          <div className="mxd-demo-cta">
            <div className="mxd-demo-cta__caption anim-uni-in-up">
              <RevealText as="h2" className="h2-small reveal-type">
                Show your creativity and get noticed today!
              </RevealText>
            </div>

            <div className="mxd-demo-cta__btn anim-uni-in-up">
              <AnimatedButton
                text="LET'S GET STARTED"
                as="a"
                className="btn btn-anim btn-outline btn-default btn-large btn-additional slide-right"
                href="/contact"
                target="_blank"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
import Portfolios1 from "./Portfolios1";
import PortfolioStack from "./PortfolioStack";
import PortfolioList from "./PortfolioList";
import MarqueeSlider from "./MarqueeSlider";
import Testimonials from "./Testimonials";
import Cta from "@/components/common/Cta";

export default function PortfolioPage() {
    return (
        <main id="mxd-page-content" className="mxd-page-content inner-page-content">
            <Portfolios1 />
            <PortfolioStack />
            <PortfolioList />
            <MarqueeSlider />
            <Testimonials />
            <Cta />
        </main>
    );
}
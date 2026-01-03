

import Hero2 from "@/components/about/Hero2";
import MarqueeSlider2 from "@/components/about/MarqueeSlider2";
import RayoFacts from "@/components/about/RayoFacts";
import RayoCta from "@/components/about/RayoCta";
import RayoCtaDuplicate from "@/components/about/RayoCtaDuplicate";


export default function AboutPage() {
  return (
    <div>
      {/* Rayo content wrappers */}
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <Hero2 />
        <MarqueeSlider2 />
        <RayoCtaDuplicate />
        <RayoFacts />
        <RayoCta />
      </main>
    </div>
  );
}
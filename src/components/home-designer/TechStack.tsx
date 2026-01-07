import Image from "next/image";
import React from "react";

type TechstackItem = {
  id: string;
  name: string;
  icon: string;
};

// 🔹 Local data (no JSON, no imports, no build errors)
const techstack: TechstackItem[] = [
  // Frontend
  { id: "react", name: "React", icon: "/tech/react.svg" },
  { id: "nextjs", name: "Next.js", icon: "/tech/nextjs.svg" },
  { id: "typescript", name: "TypeScript", icon: "/tech/typescript.svg" },
  { id: "tailwind", name: "Tailwind CSS", icon: "/tech/tailwindcss.svg" },
  { id: "html", name: "HTML5", icon: "/tech/html5.svg" },
  { id: "css", name: "CSS3", icon: "/tech/css3.svg" },
  { id: "Shopify", name: "shopify", icon: "/tech/shopify.svg" },
  { id: "WordPress", name: "WordPress", icon: "/tech/wordpress.svg" },
  { id: "Bootstrap", name: "Bootstrap", icon: "/tech/bootstrap.svg" },
  { id: "Wix", name: "Wix", icon: "/tech/wix.svg" },
  { id: "Kajabi", name: "Kajabi", icon: "/tech/Kajabi.svg" },
  { id: "lightspeed", name: "Lightspeed", icon: "/tech/lightspeed.svg" },

  // Backend
  { id: "node", name: "Node.js", icon: "/tech/nodejs.svg" },
  { id: "express", name: "Express.js", icon: "/tech/express.svg" },
  // Database
  { id: "postgres", name: "PostgreSQL", icon: "/tech/postgresql.svg" },
  { id: "mongodb", name: "MongoDB", icon: "/tech/mongodb.svg" },

  // DevOps / Cloud
  { id: "aws", name: "AWS", icon: "/tech/aws.svg" },
  { id: "docker", name: "Docker", icon: "/tech/docker.svg" },
  { id: "nginx", name: "Nginx", icon: "/tech/nginx.svg" },
  { id: "vercel", name: "Vercel", icon: "/tech/vercel.svg" },

  // Tools
  { id: "git", name: "Git", icon: "/tech/git.svg" },
  { id: "github", name: "GitHub", icon: "/tech/github.svg" },
  { id: "figma", name: "Figma", icon: "/tech/figma.svg" },

];

// Controlled Marquee (reliable direction control)
function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const dir = reverse ? "reverse" : "normal";

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div
        className="flex whitespace-nowrap items-center marquee-track"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: dir as React.CSSProperties["animationDirection"],
        }}
      >
        <div className="marquee-group flex items-center">{children}</div>
        <div className="marquee-group flex items-center">{children}</div>
        <div className="marquee-group flex items-center">{children}</div>
        <div className="marquee-group flex items-center">{children}</div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track > .marquee-group { flex: 0 0 auto; }
      `}</style>
    </div>
  );
}

// Split into three rows
const itemsPerRow = Math.ceil(techstack.length / 3);
const row1 = techstack.slice(0, itemsPerRow);
const row2 = techstack.slice(itemsPerRow, itemsPerRow * 2);
const row3 = techstack.slice(itemsPerRow * 2);

export default function Techstack() {
  // sizes & spacing (tweak here)
  const ICON_WIDTH = 60;
  const ICON_HEIGHT = 36;
  const ITEM_MIN_WIDTH = 120; // reduce spacing between items
  const ROW_GAP = 8; // px vertical gap between rows
  const MARQUEE_DURATION = 42; // increase = slower

  const renderItems = (items: typeof techstack) => (
    <>
      {items.map((t) => (
        <div
          key={t.id}
          className="marquee-item marquee_bg flex items-center gap-2 px-2 py-1"
          style={{ minWidth: ITEM_MIN_WIDTH }}
        >
          <div style={{ width: ICON_WIDTH, height: ICON_HEIGHT }} className="flex-shrink-0">
            <Image src={t.icon} alt={t.name} width={ICON_WIDTH} height={ICON_HEIGHT} />
          </div>
          <div className="mxd-tech-stack-cards__title">

          </div>
        </div>
      ))}
    </>
  );

  return (
    <div>
      <div className="mxd-section techicon padding-grid-pre-pinned lg:mt-[80px]">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-block" style={{ rowGap: ROW_GAP }}>
            {/* Row 1: Right → Left (normal animation moves leftwards) */}
            <Marquee duration={MARQUEE_DURATION} reverse={false} className="mb-2">
              {renderItems(row1)}
            </Marquee>

            {/* Row 2: Left → Right (reverse animation direction) */}
            <Marquee duration={MARQUEE_DURATION * 1.02} reverse={true} className="mb-2">
              {renderItems(row2)}
            </Marquee>

            {/* Row 3: Right → Left */}
            <Marquee duration={MARQUEE_DURATION * 1.05} reverse={false}>
              {renderItems(row3)}
            </Marquee>
          </div>
        </div>
        <style jsx>{`
        /* tighten vertical spacing for the block on small screens */
        .mxd-block { display: flex; flex-direction: column; }
      `}</style>
      </div>
    </div>
  );
}

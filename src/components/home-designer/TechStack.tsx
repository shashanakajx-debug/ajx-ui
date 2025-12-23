// src/components/home-designer/TechStack.tsx
import Image from "next/image";
import VelocityMarquee from "@/components/animation/VelocityMarquee";

type TechstackItem = {
  id: string;
  name: string;
  icon: string;
};

// 🔹 Local data (no JSON, no imports, no build errors)
const techstack = [
  // Frontend
  { id: "react", name: "React", icon: "/tech/react.svg" },
  { id: "nextjs", name: "Next.js", icon: "/tech/nextjs.svg" },
  { id: "typescript", name: "TypeScript", icon: "/tech/typescript.svg" },
  { id: "tailwind", name: "Tailwind CSS", icon: "/tech/tailwindcss.svg" },
  { id: "html", name: "HTML5", icon: "/tech/html5.svg" },
  { id: "css", name: "CSS3", icon: "/tech/css3.svg" },

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

export default function Techstack() {
  return (
    <div className="mxd-section padding-grid-pre-pinned">
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <VelocityMarquee className="marquee marquee-right--gsap">
            <div className="marquee__toright">
              {techstack.map((t) => (
                <div key={t.id} className="marquee__item one-line item-regular">
                  <div className="mxd-tech-stack-cards__item">
                    <div className="mxd-tech-stack-cards__inner-v3">
                      <div className="mxd-tech-stack-cards__icon">
                        <Image
                          src={t.icon}
                          alt={t.name}
                          width={120}
                          height={90}
                        />
                      </div>
                      <div className="mxd-tech-stack-cards__title">
                        <p className="t-bright t-caption">{t.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </VelocityMarquee>
        </div>
      </div>
    </div>
  );
}

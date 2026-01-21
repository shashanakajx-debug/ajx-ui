"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./SectionHeader";
import {
  Layers,
  Boxes,
  Palette,
  FileCode,
  Webhook,
  Activity,
  Atom,
} from "lucide-react";

type TechstackItem = {
  id: string;
  name: string;
  icon?: string;
  lucideIcon?: React.ComponentType<any>;
  category: string;
  displayName: string;
};

const techstack: TechstackItem[] = [
  {
    id: "figma",
    name: "Figma",
    icon: "/tech/figma.svg",
    category: "UI/UX",
    displayName: "FIGMA",
  },
  {
    id: "ant-design",
    name: "Ant Design",
    lucideIcon: Palette,
    category: "UI/UX",
    displayName: "ANT DESIGN",
  },
  {
    id: "react-icons",
    name: "React Icons",
    icon: "/tech/react.svg",
    category: "UI/UX",
    displayName: "REACT.JS",
  },

  {
    id: "turborepo",
    name: "Turborepo",
    lucideIcon: Boxes,
    category: "WEB DESIGN",
    displayName: "TURBOREPO",
  },
  {
    id: "graphql",
    name: "GraphQL",
    lucideIcon: Webhook,
    category: "WEB DESIGN",
    displayName: "GRAPHQL",
  },
  {
    id: "react-hook-form",
    name: "React Hook Form",
    lucideIcon: FileCode,
    category: "WEB DESIGN",
    displayName: "REACT HOOK FORM",
  },
  {
    id: "material-ui",
    name: "Material UI",
    lucideIcon: Layers,
    category: "WEB DESIGN",
    displayName: "MATERIAL UI",
  },
  {
    id: "apollo-client",
    name: "Apollo Client",
    lucideIcon: Atom,
    category: "WEB DESIGN",
    displayName: "APOLLO CLIENT",
  },
  {
    id: "react-js",
    name: "React.js",
    icon: "/tech/react.svg",
    category: "WEB DESIGN",
    displayName: "REACT.JS",
  },
  {
    id: "rest-api",
    name: "REST API",
    lucideIcon: Activity,
    category: "WEB DESIGN",
    displayName: "REST API",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "/tech/typescript.svg",
    category: "WEB DESIGN",
    displayName: "TYPESCRIPT",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "/tech/nextjs.svg",
    category: "WEB DESIGN",
    displayName: "NEXT.JS",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "/tech/tailwindcss.svg",
    category: "WEB DESIGN",
    displayName: "TAILWIND CSS",
  },
  {
    id: "html",
    name: "HTML5",
    icon: "/tech/html5.svg",
    category: "WEB DESIGN",
    displayName: "HTML5",
  },
  {
    id: "css",
    name: "CSS3",
    icon: "/tech/css3.svg",
    category: "WEB DESIGN",
    displayName: "CSS3",
  },
  {
    id: "Shopify",
    name: "Shopify",
    icon: "/tech/shopify.svg",
    category: "WEB DESIGN",
    displayName: "SHOPIFY",
  },
  {
    id: "WordPress",
    name: "WordPress",
    icon: "/tech/wordpress.svg",
    category: "WEB DESIGN",
    displayName: "WORDPRESS",
  },
  {
    id: "Bootstrap",
    name: "Bootstrap",
    icon: "/tech/bootstrap.svg",
    category: "WEB DESIGN",
    displayName: "BOOTSTRAP",
  },
  {
    id: "Wix",
    name: "Wix",
    icon: "/tech/wix.svg",
    category: "WEB DESIGN",
    displayName: "WIX",
  },
  {
    id: "Kajabi",
    name: "Kajabi",
    icon: "/tech/Kajabi.svg",
    category: "WEB DESIGN",
    displayName: "KAJABI",
  },
  {
    id: "lightspeed",
    name: "Lightspeed",
    icon: "/tech/lightspeed.svg",
    category: "WEB DESIGN",
    displayName: "LIGHTSPEED",
  },

  {
    id: "node",
    name: "Node.js",
    icon: "/tech/nodejs.svg",
    category: "PACKAGING",
    displayName: "NODE.JS",
  },
  {
    id: "express",
    name: "Express.js",
    icon: "/tech/express.svg",
    category: "PACKAGING",
    displayName: "EXPRESS.JS",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    icon: "/tech/postgresql.svg",
    category: "PACKAGING",
    displayName: "POSTGRESQL",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "/tech/mongodb.svg",
    category: "PACKAGING",
    displayName: "MONGODB",
  },

  {
    id: "aws",
    name: "AWS",
    icon: "/tech/aws.svg",
    category: "3D MODELS",
    displayName: "AWS",
  },
  {
    id: "docker",
    name: "Docker",
    icon: "/tech/docker.svg",
    category: "3D MODELS",
    displayName: "DOCKER",
  },
  {
    id: "nginx",
    name: "Nginx",
    icon: "/tech/nginx.svg",
    category: "3D MODELS",
    displayName: "NGINX",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "/tech/vercel.svg",
    category: "3D MODELS",
    displayName: "VERCEL",
  },
  {
    id: "git",
    name: "Git",
    icon: "/tech/git.svg",
    category: "3D MODELS",
    displayName: "GIT",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/tech/github.svg",
    category: "3D MODELS",
    displayName: "GITHUB",
  },
];

const categories = ["UI/UX", "WEB DESIGN", "PACKAGING", "3D MODELS"];

export default function Techstack() {
  const [activeFilter, setActiveFilter] = useState("WEB DESIGN");

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeFilter]);

  const filteredTech = techstack.filter(
    (item) => item.category === activeFilter,
  );

  const rows: TechstackItem[][] = [];
  for (let i = 0; i < filteredTech.length; i += 3) {
    rows.push(filteredTech.slice(i, i + 3));
  }

  return (
    <div>
      <div className="mxd-section techicon padding-grid-pre-pinned">
        <div className="mxd-container pb-[40px]">
          <div className="mx-auto row gx-0">
            <SectionHeader
              subtitle="TECH STACK"
              title="The Technology Stack"
              description="That Drives Results"
              buttonText="View More"
              buttonLink="/tech-stack"
              className="col-12"
            />
          </div>

          <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2.5 rounded-full border font-medium transition-all duration-300 ${activeFilter === category
                  ? "border-[#119000] bg-[#119000] text-white"
                  : "border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:border-[#119000] hover:bg-[#119000]"
                  }`}
                style={{ letterSpacing: "0.5px" }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="w-full">
            <div className="space-y-4">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {row.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-5 bg-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:bg-gray-200 transition-all duration-300 min-h-[100px] border border-gray-200"
                    >
                      <div className="flex-shrink-0 w-22 h-22 flex items-center justify-center">
                        {tech.icon ? (
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={64}
                            height={64}
                            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        ) : tech.lucideIcon ? (
                          <tech.lucideIcon
                            className="w-12 h-12 text-black font-bold"
                            strokeWidth={2.5}
                          />
                        ) : null}
                      </div>

                      <div className="flex-1">
                        <div
                          className="text-black text-[16px] font-mono tracking-wide text-right"
                          style={{ fontWeight: 600, letterSpacing: "0.5px" }}
                        >
                          [{tech.displayName}]
                        </div>
                      </div>
                    </div>
                  ))}

                  {row.length < 3 &&
                    Array(3 - row.length)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="hidden md:block"
                        ></div>
                      ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .mxd-section {
            position: relative;
          }
        `}</style>
      </div>
    </div>
  );
}

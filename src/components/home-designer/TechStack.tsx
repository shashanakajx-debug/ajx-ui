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
  Database,
  Globe,
  Zap,
  Code2,
  Smartphone,
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
  // DESIGN TOOLS
  {
    id: "figma",
    name: "Figma",
    icon: "/tech/figma.svg",
    category: "DESIGN TOOLS",
    displayName: "FIGMA",
  },
  {
    id: "adobe-xd",
    name: "Adobe XD",
    lucideIcon: Palette,
    category: "DESIGN TOOLS",
    displayName: "ADOBE XD",
  },
  {
    id: "sketch",
    name: "Sketch",
    lucideIcon: Layers,
    category: "DESIGN TOOLS",
    displayName: "SKETCH",
  },

  // FRONTEND FRAMEWORKS
  {
    id: "react-js",
    name: "React.js",
    icon: "/tech/react.svg",
    category: "FRONTEND",
    displayName: "REACT.JS",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "/tech/nextjs.svg",
    category: "FRONTEND",
    displayName: "NEXT.JS",
  },
  {
    id: "vue",
    name: "Vue.js",
    lucideIcon: Code2,
    category: "FRONTEND",
    displayName: "VUE.JS",
  },
  {
    id: "angular",
    name: "Angular",
    lucideIcon: Atom,
    category: "FRONTEND",
    displayName: "ANGULAR",
  },
  {
    id: "svelte",
    name: "Svelte",
    lucideIcon: Zap,
    category: "FRONTEND",
    displayName: "SVELTE",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "/tech/typescript.svg",
    category: "FRONTEND",
    displayName: "TYPESCRIPT",
  },
  {
    id: "html",
    name: "HTML5",
    icon: "/tech/html5.svg",
    category: "FRONTEND",
    displayName: "HTML5",
  },
  {
    id: "css",
    name: "CSS3",
    icon: "/tech/css3.svg",
    category: "FRONTEND",
    displayName: "CSS3",
  },

  // CSS FRAMEWORKS & LIBRARIES
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "/tech/tailwindcss.svg",
    category: "CSS & UI",
    displayName: "TAILWIND CSS",
  },
  {
    id: "Bootstrap",
    name: "Bootstrap",
    icon: "/tech/bootstrap.svg",
    category: "CSS & UI",
    displayName: "BOOTSTRAP",
  },
  {
    id: "material-ui",
    name: "Material UI",
    lucideIcon: Layers,
    category: "CSS & UI",
    displayName: "MATERIAL UI",
  },
  {
    id: "ant-design",
    name: "Ant Design",
    lucideIcon: Palette,
    category: "CSS & UI",
    displayName: "ANT DESIGN",
  },
  {
    id: "shadcn",
    name: "Shadcn UI",
    lucideIcon: Boxes,
    category: "CSS & UI",
    displayName: "SHADCN UI",
  },
  {
    id: "chakra",
    name: "Chakra UI",
    lucideIcon: Atom,
    category: "CSS & UI",
    displayName: "CHAKRA UI",
  },

  // BACKEND & SERVER
  {
    id: "node",
    name: "Node.js",
    icon: "/tech/nodejs.svg",
    category: "BACKEND",
    displayName: "NODE.JS",
  },
  {
    id: "express",
    name: "Express.js",
    icon: "/tech/express.svg",
    category: "BACKEND",
    displayName: "EXPRESS.JS",
  },
  {
    id: "nestjs",
    name: "NestJS",
    lucideIcon: FileCode,
    category: "BACKEND",
    displayName: "NESTJS",
  },
  {
    id: "python",
    name: "Python",
    lucideIcon: Code2,
    category: "BACKEND",
    displayName: "PYTHON",
  },
  {
    id: "django",
    name: "Django",
    lucideIcon: Activity,
    category: "BACKEND",
    displayName: "DJANGO",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    lucideIcon: Zap,
    category: "BACKEND",
    displayName: "FASTAPI",
  },
  {
    id: "graphql",
    name: "GraphQL",
    lucideIcon: Webhook,
    category: "BACKEND",
    displayName: "GRAPHQL",
  },
  {
    id: "rest-api",
    name: "REST API",
    lucideIcon: Activity,
    category: "BACKEND",
    displayName: "REST API",
  },

  // DATABASES
  {
    id: "postgres",
    name: "PostgreSQL",
    icon: "/tech/postgresql.svg",
    category: "DATABASE",
    displayName: "POSTGRESQL",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "/tech/mongodb.svg",
    category: "DATABASE",
    displayName: "MONGODB",
  },
  {
    id: "mysql",
    name: "MySQL",
    lucideIcon: Database,
    category: "DATABASE",
    displayName: "MYSQL",
  },
  {
    id: "redis",
    name: "Redis",
    lucideIcon: Zap,
    category: "DATABASE",
    displayName: "REDIS",
  },
  {
    id: "supabase",
    name: "Supabase",
    lucideIcon: Database,
    category: "DATABASE",
    displayName: "SUPABASE",
  },
  {
    id: "firebase",
    name: "Firebase",
    lucideIcon: Activity,
    category: "DATABASE",
    displayName: "FIREBASE",
  },

  // CLOUD & DEVOPS
  {
    id: "aws",
    name: "AWS",
    icon: "/tech/aws.svg",
    category: "CLOUD & DEVOPS",
    displayName: "AWS",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "/tech/vercel.svg",
    category: "CLOUD & DEVOPS",
    displayName: "VERCEL",
  },
  {
    id: "docker",
    name: "Docker",
    icon: "/tech/docker.svg",
    category: "CLOUD & DEVOPS",
    displayName: "DOCKER",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    lucideIcon: Boxes,
    category: "CLOUD & DEVOPS",
    displayName: "KUBERNETES",
  },
  {
    id: "nginx",
    name: "Nginx",
    icon: "/tech/nginx.svg",
    category: "CLOUD & DEVOPS",
    displayName: "NGINX",
  },
  {
    id: "git",
    name: "Git",
    icon: "/tech/git.svg",
    category: "CLOUD & DEVOPS",
    displayName: "GIT",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/tech/github.svg",
    category: "CLOUD & DEVOPS",
    displayName: "GITHUB",
  },
  {
    id: "gitlab",
    name: "GitLab",
    lucideIcon: FileCode,
    category: "CLOUD & DEVOPS",
    displayName: "GITLAB",
  },

  // MOBILE DEVELOPMENT
  {
    id: "react-native",
    name: "React Native",
    icon: "/tech/react.svg",
    category: "MOBILE",
    displayName: "REACT NATIVE",
  },
  {
    id: "flutter",
    name: "Flutter",
    lucideIcon: Smartphone,
    category: "MOBILE",
    displayName: "FLUTTER",
  },
  {
    id: "swift",
    name: "Swift",
    lucideIcon: Code2,
    category: "MOBILE",
    displayName: "SWIFT",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    lucideIcon: Smartphone,
    category: "MOBILE",
    displayName: "KOTLIN",
  },
  {
    id: "expo",
    name: "Expo",
    lucideIcon: Zap,
    category: "MOBILE",
    displayName: "EXPO",
  },

  // CMS & E-COMMERCE
  {
    id: "Shopify",
    name: "Shopify",
    icon: "/tech/shopify.svg",
    category: "CMS & E-COMMERCE",
    displayName: "SHOPIFY",
  },
  {
    id: "WordPress",
    name: "WordPress",
    icon: "/tech/wordpress.svg",
    category: "CMS & E-COMMERCE",
    displayName: "WORDPRESS",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    lucideIcon: Globe,
    category: "CMS & E-COMMERCE",
    displayName: "WOOCOMMERCE",
  },
  {
    id: "strapi",
    name: "Strapi",
    lucideIcon: FileCode,
    category: "CMS & E-COMMERCE",
    displayName: "STRAPI",
  },
  {
    id: "sanity",
    name: "Sanity",
    lucideIcon: Database,
    category: "CMS & E-COMMERCE",
    displayName: "SANITY",
  },
  {
    id: "contentful",
    name: "Contentful",
    lucideIcon: Boxes,
    category: "CMS & E-COMMERCE",
    displayName: "CONTENTFUL",
  },
  {
    id: "Wix",
    name: "Wix",
    icon: "/tech/wix.svg",
    category: "CMS & E-COMMERCE",
    displayName: "WIX",
  },
  {
    id: "webflow",
    name: "Webflow",
    lucideIcon: Globe,
    category: "CMS & E-COMMERCE",
    displayName: "WEBFLOW",
  },
  {
    id: "Kajabi",
    name: "Kajabi",
    icon: "/tech/Kajabi.svg",
    category: "CMS & E-COMMERCE",
    displayName: "KAJABI",
  },
];

const categories = [
  "DESIGN TOOLS",
  "FRONTEND",
  "CSS & UI",
  "BACKEND",
  "DATABASE",
  "CLOUD & DEVOPS",
  "MOBILE",
  "CMS & E-COMMERCE",
];

export default function Techstack() {
  const [activeFilter, setActiveFilter] = useState("FRONTEND");

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
                data-magnetic
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
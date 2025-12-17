import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  link?: string;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  link,
}: ServiceCardProps) {
  const content = (
    <div className="card hover-lift group bg-white rounded-xl p-6 shadow-sm border border-[#F4F4F4] transition-all">
      <div className="flex items-start gap-4">
        {Icon && (
          <div
            className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1A73E8, #3A8DFF)",
            }}
          >
            <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
        )}

        <div className="flex-1">
          <h4 className="text-xl font-unbounded font-bold mb-3 text-[#0A0A0A] group-hover:text-[#1A73E8] transition-colors">
            {title}
          </h4>

          <p className="text-[#0A0A0A] opacity-80 leading-relaxed">
            {description}
          </p>

          {link && (
            <div className="mt-4">
              <span className="text-[#1A73E8] font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                View Details
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}

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
    <div className="group relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-start gap-4">
        {/* Icon Container */}
        {Icon && (
          <div
            className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1A73E8, #3A8DFF)",
            }}
          >
            <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Title */}
          <h4 className="text-xl font-glacial font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors">
            {title}
          </h4>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {description}
          </p>

          {/* View Details Link */}
          {link && (
            <div className="mt-4">
              <span className="text-primary dark:text-accent font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                View Details
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
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

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary dark:group-hover:border-accent transition-all duration-300 pointer-events-none"></div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
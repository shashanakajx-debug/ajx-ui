"use client";

import React, { useState } from "react";
import {
  Heart,
  Wallet,
  ShoppingCart,
  Settings,
  Cloud,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

type Industry = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  useCases: string[];
  metric: {
    label: string;
    value: string;
  };
};

const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "Intelligent features, user behavior analysis, and automated customer support",
    icon: Heart,
    useCases: ["Feature Intelligence", "User Analytics", "Chatbot Support"],
    metric: {
      label: "Average ROI",
      value: "45% reduction in diagnostic time",
    },
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Intelligent features, user behavior analysis, and automated customer support",
    icon: Wallet,
    useCases: ["Fraud Detection", "Risk Assessment", "Automated Trading"],
    metric: {
      label: "Average ROI",
      value: "60% faster transaction processing",
    },
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Intelligent features, user behavior analysis, and automated customer support",
    icon: ShoppingCart,
    useCases: [
      "Personalized Recommendations",
      "Inventory Optimization",
      "Customer Insights",
    ],
    metric: {
      label: "Average ROI",
      value: "35% increase in conversion rate",
    },
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Intelligent features, user behavior analysis, and automated customer support",
    icon: Settings,
    useCases: [
      "Predictive Maintenance",
      "Quality Control",
      "Supply Chain Optimization",
    ],
    metric: {
      label: "Average ROI",
      value: "50% reduction in downtime",
    },
  },
  {
    id: "saas",
    title: "SaaS",
    description:
      "Intelligent features, user behavior analysis, and automated customer support",
    icon: Cloud,
    useCases: [
      "User Behavior Analytics",
      "Churn Prediction",
      "Feature Adoption",
    ],
    metric: {
      label: "Average ROI",
      value: "40% improvement in retention",
    },
  },
];

export default function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    INDUSTRIES[0].id,
  );

  const currentIndustry = INDUSTRIES.find((ind) => ind.id === selectedIndustry);

  return (
    <div className="mxd-section overflow-hidden padding-grid-pre-mtext mt-12 md:mt-20">
      <div className="mxd-container">
        <div className="mx-auto row gx-0">
          <SectionHeader
            subtitle="INDUSTRY SOLUTIONS"
            title="AI Solutions"
            description="to Your Industry"
            buttonText="View More"
            buttonLink="/industries"
            className="col-12"
          />

          <div className="w-full mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-3">
                {INDUSTRIES.map((industry) => {
                  const IconComponent = industry.icon;
                  const isSelected = selectedIndustry === industry.id;

                  return (
                    <button
                      key={industry.id}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group hover:border-green-500 ${
                        isSelected
                          ? "bg-green-50 border-green-500"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-700 group-hover:bg-green-100 group-hover:text-green-600"
                            }`}
                          >
                            <IconComponent
                              className="w-6 h-6"
                              strokeWidth={2}
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-semibold text-base mb-1 ${
                                isSelected ? "text-gray-900" : "text-gray-800"
                              }`}
                            >
                              {industry.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {industry.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {isSelected ? (
                            <ChevronDown
                              className="w-5 h-5 text-green-600"
                              strokeWidth={2}
                            />
                          ) : (
                            <ChevronRight
                              className="w-5 h-5 text-gray-400 group-hover:text-green-600"
                              strokeWidth={2}
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {currentIndustry && (
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {currentIndustry.title}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {currentIndustry.description}
                  </p>

                  {/* Key Use Cases */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Use Cases
                    </h3>
                    <div className="space-y-3">
                      {currentIndustry.useCases.map((useCase, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle2
                            className="w-5 h-5 text-green-600 flex-shrink-0"
                            strokeWidth={2}
                          />
                          <span className="text-gray-700">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp
                        className="w-4 h-4 text-green-600"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-green-600 font-medium">
                        {currentIndustry.metric.label}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentIndustry.metric.value}
                    </p>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group">
                    <span>Explore {currentIndustry.title} Solutions</span>
                    <ArrowRight
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      strokeWidth={2}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

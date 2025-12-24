import { useState } from 'react';
import { Search, Lightbulb, Palette, Code, TestTube, Rocket } from 'lucide-react';

const PROCESS_STEPS = [
  {
    id: "discovery",
    title: "Discovery & Research",
    description: "We start by understanding your business, your audience, and your objectives to create a tailored strategy.",
    icon: Search,
  },
  {
    id: "planning",
    title: "Planning & Strategy",
    description: "We outline the project scope, timelines, and deliverables to ensure everything runs smoothly from start to finish.",
    icon: Lightbulb,
  },
  {
    id: "design",
    title: "Design",
    description: "Our creative team crafts visually stunning designs that reflect your brand identity and enhance the user experience.",
    icon: Palette,
  },
  {
    id: "development",
    title: "Development",
    description: "Using the latest technologies, we bring the designs to life with clean, efficient code that ensures performance and scalability.",
    icon: Code,
  },
  {
    id: "testing",
    title: "Testing & QA",
    description: "We rigorously test the website across different devices and browsers to ensure a seamless user experience.",
    icon: TestTube,
  },
  {
    id: "launch",
    title: "Launch & Post-Launch Support",
    description: "After launch, we provide ongoing support to monitor performance, fix any bugs, and make updates as needed.",
    icon: Rocket,
  },
];

const MarqueeRow = ({ direction = 'left', children }: { direction?: 'left' | 'right'; children: React.ReactNode }) => {
  return (
    <div className="relative flex overflow-hidden py-4">
      <div
        className={`flex gap-8 animate-marquee ${direction === 'right' ? 'flex-row-reverse' : ''}`}
        style={{
          animation: `marquee ${direction === 'right' ? '40s' : '35s'} linear infinite ${direction === 'right' ? 'reverse' : ''}`,
        }}
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          width: max-content;
        }
      `}</style>
    </div>
  );
};

const ProcessCard = ({ step, index }: { step: typeof PROCESS_STEPS[0]; index: number }) => {
  const IconComponent = step.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative min-w-[400px] bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50" />
      
      <div className="relative z-10">
        <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6 transition-transform duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
          <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
        
        <div className="mb-3">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Step {index + 1}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {step.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {step.description}
        </p>
        
        <div className={`mt-6 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ${isHovered ? 'w-full' : 'w-12'}`} />
      </div>
    </div>
  );
};

export default function Process() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Our Proven 6-Step Development Process
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <MarqueeRow direction="left">
          {PROCESS_STEPS.map((step, idx) => (
            <ProcessCard key={step.id} step={step} index={idx} />
          ))}
        </MarqueeRow>
      </div>
    </div>
  );
}
// home-designer/process/processSteps.ts
import { Search, FileCode, Settings, Rocket, CheckCircle, Users } from "lucide-react";

export interface ProcessStep {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  details: {
    activities: string[];
    deliverables: string[];
    duration: string;
  };
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery & Planning",
    shortDescription: "Understanding your vision and defining project scope",
    fullDescription:
      "We start by diving deep into your business objectives, target audience, and technical requirements. This phase establishes the foundation for a successful project through comprehensive research and strategic planning.",
    icon: Search,
    details: {
      activities: [
        "Stakeholder interviews and requirement gathering",
        "Market research and competitor analysis",
        "Technical feasibility assessment",
        "Project roadmap creation",
      ],
      deliverables: [
        "Project Requirements Document (PRD)",
        "Technical Specification",
        "Project Timeline & Milestones",
        "Resource Allocation Plan",
      ],
      duration: "1-2 weeks",
    },
  },
  {
    id: 2,
    title: "Design & Architecture",
    shortDescription: "Creating intuitive interfaces and robust system design",
    fullDescription:
      "Our design team creates user-centered interfaces while architects design scalable, secure system infrastructure. We iterate on prototypes until the solution perfectly matches your vision.",
    icon: FileCode,
    details: {
      activities: [
        "UI/UX design and wireframing",
        "System architecture design",
        "Database schema planning",
        "API design and documentation",
      ],
      deliverables: [
        "Interactive Prototypes",
        "Design System & Style Guide",
        "Architecture Diagrams",
        "API Specifications",
      ],
      duration: "2-3 weeks",
    },
  },
  {
    id: 3,
    title: "Development",
    shortDescription: "Building your solution with clean, maintainable code",
    fullDescription:
      "Using agile methodologies, our developers build your application with modern technologies and best practices. Regular sprints ensure continuous progress and flexibility for changes.",
    icon: Settings,
    details: {
      activities: [
        "Frontend and backend development",
        "Database implementation",
        "Third-party integrations",
        "Code reviews and quality assurance",
      ],
      deliverables: [
        "Working Application Builds",
        "Source Code Repository",
        "Integration Documentation",
        "Sprint Demos",
      ],
      duration: "4-12 weeks",
    },
  },
  {
    id: 4,
    title: "Testing & QA",
    shortDescription: "Ensuring quality through comprehensive testing",
    fullDescription:
      "Rigorous testing across all aspects of the application guarantees a bug-free, performant product. We test functionality, security, performance, and user experience.",
    icon: CheckCircle,
    details: {
      activities: [
        "Unit and integration testing",
        "User acceptance testing (UAT)",
        "Performance and load testing",
        "Security vulnerability assessment",
      ],
      deliverables: [
        "Test Reports & Coverage",
        "Bug Fix Documentation",
        "Performance Benchmarks",
        "Security Audit Report",
      ],
      duration: "2-3 weeks",
    },
  },
  {
    id: 5,
    title: "Deployment",
    shortDescription: "Launching your application to the world",
    fullDescription:
      "We handle the complete deployment process, from server configuration to DNS setup. Our CI/CD pipelines ensure smooth, zero-downtime deployments.",
    icon: Rocket,
    details: {
      activities: [
        "Server and infrastructure setup",
        "CI/CD pipeline configuration",
        "Database migration",
        "Production environment testing",
      ],
      deliverables: [
        "Production Deployment",
        "Deployment Documentation",
        "Monitoring Setup",
        "Backup Procedures",
      ],
      duration: "1 week",
    },
  },
  {
    id: 6,
    title: "Support & Maintenance",
    shortDescription: "Continuous improvement and ongoing support",
    fullDescription:
      "Our relationship doesn't end at launch. We provide ongoing support, monitor performance, and continuously improve your application based on user feedback and analytics.",
    icon: Users,
    details: {
      activities: [
        "24/7 monitoring and alerting",
        "Regular updates and patches",
        "Performance optimization",
        "Feature enhancements",
      ],
      deliverables: [
        "Monthly Performance Reports",
        "Update Changelogs",
        "Support Tickets Resolution",
        "Roadmap Updates",
      ],
      duration: "Ongoing",
    },
  },
];

import Hero from "./Hero";
import Services from "./Services";
import RayoCta from "../../../components/about/RayoCta";


const services = [
    {
        label: "AI / ML",
        id: "AI-ML",
        description: "Unlock the power of artificial intelligence to automate workflows, train large language models, and ensure safety and alignment in your AI systems. We specialize in LLM training, factuality, and multimodal implementations.",
        tags: ["LLM Training", "LLM Factuality", "Multimodality LLM Training", "LLM Alignment & Safety"],
        href: "/services/AI-ML",
        img: "/our-services/AI-Ml.png"
    },
    {
        label: "Digital Engg",
        id: "Digital-Engg",
        description: "Transform your business with cutting-edge digital engineering solutions. From immersive AR/VR experiences to robust IoT networks and secure blockchain infrastructures (DApps, Smart Contracts).",
        tags: ["AR/VR", "IoT", "Blockchain"],
        href: "/services/Digital-Engg",
        img: "/our-services/Digital-Engg.png"
    },
    {
        label: "DevOps",
        id: "DevOps",
        description: "Streamline your development lifecycle with our comprehensive DevOps services. We implement CI/CD pipelines, Infrastructure as Code, and advanced monitoring to ensure operational excellence.",
        tags: ["CI/CD", "Infrastructure as Code", "Monitoring & Logging"],
        href: "/services/DevOps",
        img: "/our-services/DevOps.png"
    },
    {
        label: "Web3",
        id: "Web3",
        description: "Build the future of the internet with our Web3 expertise. We develop decentralized applications, secure smart contracts, and NFT marketplaces tailored for the new digital economy.",
        tags: ["DApp Development", "Smart Contracts", "NFT Marketplaces"],
        href: "/services/Web3",
        img: "/our-services/Web3.png"
    },
    {
        label: "Cloud",
        id: "Cloud",
        description: "Scale effortlessly with our cloud solutions. Whether it's AWS, Azure, or Google Cloud, we optimize your infrastructure for high availability, security, and performance.",
        tags: ["AWS", "Azure", "Google Cloud"],
        href: "/services/Cloud",
        img: "/our-services/Cloud.png"
    },
    {
        label: "SaaS",
        id: "SaaS",
        description: "Accelerate your product growth with our SaaS development services. We handle everything from initial development and integration to migration, ensuring scalable and reliable software delivery.",
        tags: ["SaaS Development", "SaaS Integration", "SaaS Migration"],
        href: "/services/SaaS",
        img: "/our-services/SaaS.png"
    },
    {
        label: "SEO",
        id: "SEO",
        description: "Maximize your online visibility and drive organic traffic. Our data-driven SEO strategies cover on-page optimization, off-page authority building, and technical SEO audits.",
        tags: ["On-Page SEO", "Off-Page SEO", "Technical SEO"],
        href: "/services/SEO",
        img: "/our-services/SEO.png"
    }
];

export default function ServicesPage() {
    return (
        <div>
            <Hero />
            <Services items={services.map(s => ({
                image: s.img,
                title: s.label,
                desc: s.description,
                tags: s.tags,
                id: s.id
            }))} />
            <RayoCta />
        </div>
    );
}

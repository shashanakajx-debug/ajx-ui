import { getAllServices } from '@/models/Service';
import ServiceCard from '@/components/molecules/ServiceCard/ServiceCard';
import { getIconComponent } from '@/lib/iconMap';

export default async function ServicesPage() {
    const services = await getAllServices(true);

    // Fallback services if database is empty
    const defaultServices = [
        {
            title: 'AI & Automation Solutions',
            slug: 'ai-automation',
            description: 'With cutting-edge AI and automation frameworks, we design intelligent systems that streamline workflows and drive efficiency.',
            icon: 'AI',
            category: 'Technology',
            features: [],
            technologies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        },
        {
            title: 'Blockchain & Web3 Solutions',
            slug: 'blockchain',
            description: 'We craft decentralized applications with a focus on security, scalability, and innovation to empower businesses in the digital economy.',
            icon: 'BC',
            category: 'Technology',
            features: [],
            technologies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        },
        {
            title: 'Web Design, Development & Applications',
            slug: 'web',
            description: 'Our web solutions combine stunning design with powerful development to create fast, responsive, and future-ready applications.',
            icon: 'WD',
            category: 'Development',
            features: [],
            technologies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        },
        {
            title: 'SaaS Product Development',
            slug: 'saas',
            description: 'We build robust, cloud-ready SaaS applications with scalable architecture and enterprise-grade security.',
            icon: 'SA',
            category: 'Development',
            features: [],
            technologies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        },
        {
            title: 'MVP Development',
            slug: 'mvp',
            description: 'From concept to market-ready product, we build lean, scalable MVPs that validate ideas and attract investors.',
            icon: 'MV',
            category: 'Development',
            features: [],
            technologies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        },
        {
            title: 'Website Maintenance & Support',
            slug: 'maintenance',
            description: 'Our proactive support ensures your website stays secure, optimized, and always delivering peak performance.',
            icon: 'WM',
            category: 'Support',
            features: [],
            technologies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        },
        {
            title: 'E-Commerce Development',
            slug: 'ecommerce',
            description: 'Our e-commerce solutions deliver seamless shopping experiences with secure transactions and conversion-focused design.',
            icon: 'EC',
            category: 'Development',
            features: [],
            technologies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        },
        {
            title: 'SEO & Digital Marketing',
            slug: 'seo',
            description: 'We combine data-driven strategies with creative execution to maximize visibility, engagement, and measurable growth.',
            icon: 'SE',
            category: 'Marketing',
            features: [],
            technologies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        },
    ];

    const displayServices = services.length > 0 ? services : defaultServices;

    return (
        <div>
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-dark via-dark-800 to-dark text-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight text-[#0A0A0A]">
                            Empowering Digital <br />
                            <span className="gradient-text">Transformation Across All Platforms</span> 
                        </h1>
                        <p className="text-lg md:text-xl text-[#0A0A0A] leading-relaxed">
                            From strategy to design, development to launch, we offer comprehensive web solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4 text-dark">
                            Our Services
                        </h2>
                        <p className="text-lg text-[#0A0A0A] max-w-2xl mx-auto">
                            Comprehensive digital solutions tailored to your business needs
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayServices.map((service, index) => (
                            <ServiceCard
                                key={index}
                                title={service.title}
                                description={service.description}
                                icon={getIconComponent(service.icon)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center text-dark">
                        Technology We Work With
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card">
                            <h4 className="font-unbounded font-bold text-dark mb-4">PHP Frameworks</h4>
                            <p className="text-gray-text text-sm">CodeIgniter, Laravel, CakePHP, WordPress</p>
                        </div>
                        <div className="card">
                            <h4 className="font-unbounded font-bold text-dark mb-4">JavaScript</h4>
                            <p className="text-gray-text text-sm">Node.js, React.js, Angular.js, Vue.js, Next.js</p>
                        </div>
                        <div className="card">
                            <h4 className="font-unbounded font-bold text-dark mb-4">Cloud Expertise</h4>
                            <p className="text-gray-text text-sm">AWS, Google Cloud, Azure, Docker</p>
                        </div>
                        <div className="card">
                            <h4 className="font-unbounded font-bold text-dark mb-4">Databases</h4>
                            <p className="text-gray-text text-sm">MySQL, MongoDB, PostgreSQL</p>
                        </div>
                        <div className="card">
                            <h4 className="font-unbounded font-bold text-dark mb-4">Browser Extensions</h4>
                            <p className="text-gray-text text-sm">Chrome, Firefox, Microsoft Edge</p>
                        </div>
                        <div className="card">
                            <h4 className="font-unbounded font-bold text-dark mb-4">Google Workspace</h4>
                            <p className="text-gray-text text-sm">GSuite Add-ons, Firebase, Google Apps Script</p>
                        </div>
                        <div className="card">
                            <h4 className="font-unbounded font-bold text-dark mb-4">API Development</h4>
                            <p className="text-gray-text text-sm">RESTful APIs, GraphQL</p>
                        </div>
                        <div className="card">
                            <h4 className="font-unbounded font-bold text-dark mb-4">Blockchain</h4>
                            <p className="text-gray-text text-sm">Web3, Solidity, Ethereum, Smart Contracts</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-br from-primary-orange to-primary-teal text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
                        Have Any Project on Your Mind?
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Let&apos;s discuss how our services can help you achieve your goals.
                    </p>
                    <a href="/contact" className="btn-base bg-white text-[#1A73E8] hover:bg-opacity-90 inline-block">
                        Let&apos;s Talk With Us
                    </a>
                </div>
            </section>
        </div>
    );
}

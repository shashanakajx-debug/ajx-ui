import { getAllPortfolio } from '@/models/Portfolio';

export default async function PortfolioPage() {
    const portfolio = await getAllPortfolio();

    const defaultPortfolio = [
        {
            title: 'E-Commerce Platform Redesign',
            slug: 'ecommerce-platform',
            description: 'Complete redesign and development of a high-traffic e-commerce platform with modern UI/UX.',
            category: 'E-commerce' as const,
            imageUrl: '/placeholder-project.jpg',
            clientName: 'Tech Retail Co.',
            industry: 'Retail',
            technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
            completedDate: new Date('2024-01-15'),
            featured: true,
            createdAt: new Date(),
        },
        {
            title: 'Healthcare Management System',
            slug: 'healthcare-system',
            description: 'Enterprise healthcare management system with patient records, appointments, and billing.',
            category: 'Custom' as const,
            imageUrl: '/placeholder-project.jpg',
            clientName: 'MediCare Plus',
            industry: 'Healthcare',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
            completedDate: new Date('2024-02-20'),
            featured: true,
            createdAt: new Date(),
        },
        {
            title: 'Shopify Theme Development',
            slug: 'shopify-luxury-fashion',
            description: 'Custom Shopify theme for luxury fashion brand with advanced product customization.',
            category: 'Shopify' as const,
            imageUrl: '/placeholder-project.jpg',
            clientName: 'Luxury Fashion Co.',
            industry: 'Fashion',
            technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
            completedDate: new Date('2024-03-10'),
            featured: false,
            createdAt: new Date(),
        },
    ];

    const displayPortfolio = portfolio.length > 0 ? portfolio : defaultPortfolio;

    return (
        <div className="bg-white dark:bg-darkmode-primary">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary to-accent text-white dark:from-darkmode-primary dark:to-darkmode-secondary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-glacial font-bold mb-6 leading-tight">
                            Our Portfolio
                        </h1>
                        <p className="text-lg md:text-xl text-white leading-relaxed opacity-90">
                            Explore our work and see how we&apos;ve helped businesses transform their digital presence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="section-padding bg-white dark:bg-darkmode-primary">
                <div className="container-custom">
                    {displayPortfolio.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayPortfolio.map((item, index) => (
                                <div key={index} className="card hover-lift group">
                                    <div className="aspect-video bg-gradient-to-br from-primary to-accent rounded-lg mb-4 flex items-center justify-center text-white">
                                        <span className="text-4xl font-glacial font-bold opacity-50">
                                            {item.title.substring(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent rounded-full text-xs font-semibold">
                                            {item.category}
                                        </span>
                                        <span className="px-3 py-1 bg-soft-gray dark:bg-darkmode-secondary text-text-muted dark:text-text-dark-muted rounded-full text-xs font-semibold">
                                            {item.industry}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-glacial font-bold mb-2 text-secondary dark:text-darkmode-highlight group-hover:text-primary dark:group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-text-muted dark:text-text-dark-muted text-sm mb-4 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.technologies.slice(0, 3).map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-soft-gray dark:bg-darkmode-secondary text-text-muted dark:text-text-dark-muted rounded text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-text-muted dark:text-text-dark-muted">
                                        Client: <span className="font-semibold">{item.clientName}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-text-muted dark:text-text-dark-muted text-lg">No portfolio items available yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-soft-gray dark:bg-darkmode-secondary">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-glacial font-bold mb-6 text-secondary dark:text-darkmode-highlight">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-lg text-text-muted dark:text-text-dark-muted mb-8 max-w-2xl mx-auto">
                        Let&apos;s create something amazing together. Contact us to discuss your project requirements.
                    </p>
                    <a href="/contact" className="btn-primary inline-block">
                        Get Started
                    </a>
                </div>
            </section>
        </div>
    );
}
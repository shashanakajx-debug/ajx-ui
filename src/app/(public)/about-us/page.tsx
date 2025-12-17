export default function AboutPage() {
    const values = [
        {
            title: 'Innovation',
            description: 'Creativity and forward-thinking drive everything we do.',
        },
        {
            title: 'Collaboration',
            description: 'Built on trust and transparent partnerships.',
        },
        {
            title: 'Excellence',
            description: 'Quality code, secure practices, and user-first design.',
        },
        {
            title: 'Integrity',
            description: 'Honesty, ethics, and open communication.',
        },
        {
            title: 'Scalability',
            description: 'Long-term growth and adaptability in every solution.',
        },
    ];

    const pillars = [
        {
            title: 'Founded on collaboration',
            description: 'We win when our clients win.',
        },
        {
            title: 'Delivery you can trust',
            description: 'Agile execution, transparent communication, measurable outcomes.',
        },
        {
            title: 'Security-first mindset',
            description: 'Best practices for code, data, and infrastructure.',
        },
    ];

    return (
        <div className="bg-white dark:bg-darkmode-primary">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary to-accent text-white dark:from-darkmode-primary dark:to-darkmode-secondary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-glacial font-bold mb-6 leading-tight">
                            <span>About AJX Technologies</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white leading-relaxed">
                            Building Smarter, Scalable and Future-Ready Experiences
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="section-padding bg-white dark:bg-darkmode-primary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-glacial font-bold mb-6 text-secondary dark:text-darkmode-highlight">
                                Our Mission
                            </h2>
                            <p className="text-lg text-text-muted dark:text-text-dark-muted leading-relaxed">
                                To empower businesses and innovators by building secure, scalable, and intelligent digital solutions that drive real-world impact. We aim to make cutting-edge technologies—AI, blockchain, and modern web—accessible and practical for companies of all sizes.
                            </p>
                        </div>

                        {/* Company Description */}
                        <div className="bg-soft-gray dark:bg-darkmode-secondary rounded-2xl p-8 md:p-12">
                            <h3 className="text-2xl font-glacial font-bold mb-6 text-secondary dark:text-darkmode-highlight text-center">
                                Who We Are
                            </h3>
                            <p className="text-lg text-text-muted dark:text-text-dark-muted leading-relaxed mb-6">
                                AJX Technologies helps SMBs and enterprises ship reliable, high-performance digital products. Our team blends product thinking with engineering excellence—covering web and mobile development, AI agent generation, data engineering, and blockchain development.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                {pillars.map((pillar, index) => (
                                    <div key={index} className="bg-white dark:bg-darkmode-primary rounded-xl p-6 shadow-sm border border-soft-gray dark:border-darkmode-secondary">
                                        <h4 className="font-glacial font-bold text-secondary dark:text-darkmode-highlight mb-3">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-sm text-text-muted dark:text-text-dark-muted">
                                            {pillar.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="section-padding bg-soft-gray dark:bg-darkmode-secondary">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-glacial font-bold mb-12 text-center text-secondary dark:text-darkmode-highlight">
                        Our Values
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <div key={index} className="card hover-lift">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-glacial font-bold mb-3 text-secondary dark:text-darkmode-highlight">
                                    {value.title}
                                </h3>
                                <p className="text-text-muted dark:text-text-dark-muted leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-br from-primary to-accent text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-glacial font-bold mb-6">
                        Ready to Work with Us?
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Let&apos;s discuss how we can help you achieve your digital transformation goals.
                    </p>
                    <a href="/contact" className="btn-base bg-white text-primary hover:bg-opacity-90 inline-block">
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>
    );
}
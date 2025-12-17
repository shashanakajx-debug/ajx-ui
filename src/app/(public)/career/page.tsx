import { getAllCareers } from '@/models/Career';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function CareerPage() {
    const careers = await getAllCareers(true);

    const defaultCareers = [
        {
            title: 'Senior Full Stack Developer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time' as const,
            experience: '5+ years',
            description: 'We are looking for an experienced Full Stack Developer to join our growing team.',
            requirements: [
                '5+ years of experience in full-stack development',
                'Proficiency in Next.js, React, Node.js',
                'Experience with MongoDB or PostgreSQL',
                'Strong problem-solving skills',
                'Excellent communication skills',
            ],
            responsibilities: [
                'Develop and maintain web applications',
                'Collaborate with cross-functional teams',
                'Write clean, maintainable code',
                'Mentor junior developers',
            ],
            postedDate: new Date('2024-01-15'),
            isActive: true,
        },
        {
            title: 'UI/UX Designer',
            department: 'Design',
            location: 'Hybrid',
            type: 'Full-time' as const,
            experience: '3+ years',
            description: 'Join our design team to create beautiful and functional user experiences.',
            requirements: [
                '3+ years of UI/UX design experience',
                'Proficiency in Figma, Adobe XD',
                'Strong portfolio showcasing your work',
                'Understanding of user-centered design principles',
            ],
            responsibilities: [
                'Design user interfaces for web and mobile',
                'Conduct user research and testing',
                'Create wireframes and prototypes',
                'Collaborate with developers',
            ],
            postedDate: new Date('2024-02-01'),
            isActive: true,
        },
        {
            title: 'Blockchain Developer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time' as const,
            experience: '4+ years',
            description: 'Looking for a Blockchain Developer to build decentralized applications.',
            requirements: [
                '4+ years of blockchain development experience',
                'Proficiency in Solidity, Web3.js',
                'Experience with Ethereum, Smart Contracts',
                'Understanding of DeFi and NFT ecosystems',
            ],
            responsibilities: [
                'Develop smart contracts',
                'Build decentralized applications',
                'Conduct security audits',
                'Stay updated with blockchain trends',
            ],
            postedDate: new Date('2024-02-10'),
            isActive: true,
        },
    ];

    const displayCareers = careers.length > 0 ? careers : defaultCareers;

    return (
        <div className="bg-white dark:bg-darkmode-primary">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary to-accent text-white dark:from-darkmode-primary dark:to-darkmode-secondary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-glacial font-bold mb-6 leading-tight">
                            Join Our Team
                        </h1>
                        <p className="text-lg md:text-xl text-white leading-relaxed opacity-90">
                            Be part of a dynamic team building innovative digital solutions for the future.
                        </p>
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="section-padding bg-white dark:bg-darkmode-primary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {displayCareers.length > 0 ? (
                            <div className="space-y-6">
                                {displayCareers.map((job, index) => (
                                    <div key={index} className="card hover-lift">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-glacial font-bold mb-2 text-secondary dark:text-darkmode-highlight">
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent rounded-full text-sm font-semibold">
                                                        {job.department}
                                                    </span>
                                                    <span className="px-3 py-1 bg-soft-gray dark:bg-darkmode-secondary text-text-muted dark:text-text-dark-muted rounded-full text-sm">
                                                        {job.location}
                                                    </span>
                                                    <span className="px-3 py-1 bg-soft-gray dark:bg-darkmode-secondary text-text-muted dark:text-text-dark-muted rounded-full text-sm">
                                                        {job.type}
                                                    </span>
                                                    <span className="px-3 py-1 bg-soft-gray dark:bg-darkmode-secondary text-text-muted dark:text-text-dark-muted rounded-full text-sm">
                                                        {job.experience}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-sm text-text-muted dark:text-text-dark-muted">
                                                Posted {job.postedDate ? format(new Date(job.postedDate), 'MMM dd, yyyy') : 'Recently'}
                                            </div>
                                        </div>

                                        <p className="text-text-muted dark:text-text-dark-muted mb-4 leading-relaxed">
                                            {job.description}
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                                            <div>
                                                <h4 className="font-glacial font-bold text-secondary dark:text-darkmode-highlight mb-2">
                                                    Requirements:
                                                </h4>
                                                <ul className="space-y-1 text-sm text-text-muted dark:text-text-dark-muted">
                                                    {job.requirements.slice(0, 5).map((req, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <svg
                                                                className="w-4 h-4 text-primary dark:text-accent mt-0.5 flex-shrink-0"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-glacial font-bold text-secondary dark:text-darkmode-highlight mb-2">
                                                    Responsibilities:
                                                </h4>
                                                <ul className="space-y-1 text-sm text-text-muted dark:text-text-dark-muted">
                                                    {job.responsibilities.slice(0, 4).map((resp, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <svg
                                                                className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
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
                                                            {resp}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <a href="/contact" className="btn-primary inline-block">
                                            Apply Now
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-text-muted dark:text-text-dark-muted text-lg">
                                    No open positions at the moment. Check back soon!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-soft-gray dark:bg-darkmode-secondary">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-glacial font-bold mb-6 text-secondary dark:text-darkmode-highlight">
                        Don&apos;t See a Perfect Fit?
                    </h2>
                    <p className="text-lg text-text-muted dark:text-text-dark-muted mb-8 max-w-2xl mx-auto">
                        We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll keep you in mind for future opportunities.
                    </p>
                    <a href="/contact" className="btn-primary inline-block">
                        Send Your Resume
                    </a>
                </div>
            </section>
        </div>
    );
}
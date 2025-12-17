import { getAllBlogs } from '@/models/Blog';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function BlogPage() {
    const blogs = await getAllBlogs(true);

    const defaultBlogs = [
        {
            title: 'The Future of Web Development in 2024',
            slug: 'future-web-development-2024',
            excerpt: 'Discover the latest trends and technologies shaping the future of web development.',
            content: 'Full content here...',
            author: 'AJX Tech Team',
            category: 'Web Development',
            tags: ['Web Development', 'Trends', '2024'],
            imageUrl: '/placeholder-blog.jpg',
            publishedAt: new Date('2024-01-15'),
            isPublished: true,
            views: 0,
            createdAt: new Date(),
        },
        {
            title: 'Why Your Business Needs a Mobile-First Approach',
            slug: 'mobile-first-approach',
            excerpt: 'Learn why mobile-first development is crucial for modern businesses.',
            content: 'Full content here...',
            author: 'AJX Tech Team',
            category: 'Mobile Development',
            tags: ['Mobile', 'Strategy', 'UX'],
            imageUrl: '/placeholder-blog.jpg',
            publishedAt: new Date('2024-02-01'),
            isPublished: true,
            views: 0,
            createdAt: new Date(),
        },
        {
            title: 'Understanding Blockchain Technology for Business',
            slug: 'blockchain-for-business',
            excerpt: 'A comprehensive guide to implementing blockchain solutions in your business.',
            content: 'Full content here...',
            author: 'AJX Tech Team',
            category: 'Blockchain',
            tags: ['Blockchain', 'Web3', 'Business'],
            imageUrl: '/placeholder-blog.jpg',
            publishedAt: new Date('2024-02-15'),
            isPublished: true,
            views: 0,
            createdAt: new Date(),
        },
    ];

    const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;

    return (
        <div className="bg-white dark:bg-darkmode-primary">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary to-accent text-white dark:from-darkmode-primary dark:to-darkmode-secondary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-glacial font-bold mb-6 leading-tight">
                            Our Blog
                        </h1>
                        <p className="text-lg md:text-xl text-white leading-relaxed opacity-90">
                            Insights, tutorials, and industry news from our team of experts.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog List */}
            <section className="section-padding bg-white dark:bg-darkmode-primary">
                <div className="container-custom">
                    {displayBlogs.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayBlogs.map((blog, index) => (
                                <Link key={index} href={`/blog/${blog.slug}`}>
                                    <div className="card hover-lift group cursor-pointer h-full">
                                        <div className="aspect-video bg-gradient-to-br from-primary to-accent rounded-lg mb-4 flex items-center justify-center text-white">
                                            <span className="text-4xl font-glacial font-bold opacity-50">
                                                {blog.title.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent rounded-full text-xs font-semibold">
                                                {blog.category}
                                            </span>
                                            <span className="text-xs text-text-muted dark:text-text-dark-muted">
                                                {format(new Date(blog.publishedAt), 'MMM dd, yyyy')}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-glacial font-bold mb-2 text-secondary dark:text-darkmode-highlight group-hover:text-primary dark:group-hover:text-accent transition-colors">
                                            {blog.title}
                                        </h3>
                                        <p className="text-text-muted dark:text-text-dark-muted text-sm mb-4 leading-relaxed line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-text-muted dark:text-text-dark-muted">By {blog.author}</p>
                                            <span className="text-primary dark:text-accent font-semibold text-sm group-hover:underline">
                                                Read More →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-text-muted dark:text-text-dark-muted text-lg">No blog posts available yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
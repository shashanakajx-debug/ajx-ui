import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllServices } from '@/models/Service';
import { getAllPortfolio } from '@/models/Portfolio';
import { getAllBlogs } from '@/models/Blog';
import { getAllCareers } from '@/models/Career';
import { getAllContacts } from '@/models/Contact';
import Link from 'next/link';
import { Wrench, Briefcase, FileText, Users, Mail } from 'lucide-react';

export default async function AdminDashboard() {
    const session = await auth();

    if (!session) {
        redirect('/admin/login');
    }

    // Fetch counts
    const [services, portfolio, blogs, careers, contacts] = await Promise.all([
        getAllServices(),
        getAllPortfolio(),
        getAllBlogs(),
        getAllCareers(),
        getAllContacts(),
    ]);

    const stats = [
        { label: 'Services', count: services.length, href: '/admin/services', color: 'from-orange-500 to-orange-600', icon: Wrench },
        { label: 'Portfolio', count: portfolio.length, href: '/admin/portfolio', color: 'from-teal-500 to-teal-600', icon: Briefcase },
        { label: 'Blog Posts', count: blogs.length, href: '/admin/blog', color: 'from-blue-500 to-blue-600', icon: FileText },
        { label: 'Careers', count: careers.length, href: '/admin/career', color: 'from-purple-500 to-purple-600', icon: Users },
        { label: 'Contacts', count: contacts.length, href: '/admin/contact', color: 'from-green-500 to-green-600', icon: Mail },
    ];

    // Recent contacts (last 5)
    const recentContacts = contacts.slice(0, 5);

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Welcome back, {session.user?.name}!
                </h1>
                <p className="text-gray-text">
                    Here&apos;s what&apos;s happening with your website today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {stats.map((stat) => (
                    <Link key={stat.label} href={stat.href}>
                        <div className="card hover-lift cursor-pointer">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-4 flex items-center justify-center text-white`}>
                                <stat.icon className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <h3 className="font-unbounded font-bold text-dark text-lg mb-1">
                                {stat.count}
                            </h3>
                            <p className="text-sm text-gray-text">
                                {stat.label}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Contacts */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-unbounded font-bold text-dark">
                        Recent Contact Submissions
                    </h2>
                    <Link href="/admin/contact" className="text-primary-orange hover:underline font-semibold">
                        View All
                    </Link>
                </div>

                {recentContacts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Name</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Email</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Subject</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Status</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentContacts.map((contact) => (
                                    <tr key={contact._id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{contact.name}</td>
                                        <td className="py-3 px-4 text-gray-text">{contact.email}</td>
                                        <td className="py-3 px-4">{contact.subject}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${contact.status === 'new' ? 'bg-green-100 text-green-800' :
                                                contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {contact.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-text text-sm">
                                            {new Date(contact.submittedAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-text py-8">No contact submissions yet.</p>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <Link href="/admin/services" className="card hover-lift text-center cursor-pointer group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Wrench className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <h3 className="font-unbounded font-bold text-dark">Manage Services</h3>
                </Link>
                <Link href="/admin/portfolio" className="card hover-lift text-center cursor-pointer group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Briefcase className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <h3 className="font-unbounded font-bold text-dark">Manage Portfolio</h3>
                </Link>
                <Link href="/admin/blog" className="card hover-lift text-center cursor-pointer group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <h3 className="font-unbounded font-bold text-dark">Manage Blog</h3>
                </Link>
                <Link href="/admin/career" className="card hover-lift text-center cursor-pointer group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <h3 className="font-unbounded font-bold text-dark">Manage Careers</h3>
                </Link>
            </div>
        </div>
    );
}

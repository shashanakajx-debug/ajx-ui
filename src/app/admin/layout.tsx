'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
    LayoutDashboard,
    Wrench,
    Briefcase,
    FileText,
    Users,
    Mail,
    LogOut,
    ExternalLink,
    Key
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();

    // Don't show layout on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navItems = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Services', href: '/admin/services', icon: Wrench },
        { label: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
        { label: 'Blog', href: '/admin/blog', icon: FileText },
        { label: 'Careers', href: '/admin/career', icon: Users },
        { label: 'Contacts', href: '/admin/contact', icon: Mail },
        { label: 'Users', href: '/admin/users', icon: Key },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/admin/dashboard" className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="AJX Technologies"
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                            <span className="text-sm font-semibold text-gray-600">Admin Panel</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-primary-orange transition-colors text-sm flex items-center gap-2"
                            >
                                View Website <ExternalLink className="w-4 h-4" />
                            </Link>
                            {session && (
                                <button
                                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                                    className="btn-outline text-sm flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container-custom py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
                            <nav className="space-y-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-primary-orange text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" strokeWidth={2} />
                                            <span className="font-semibold">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* User Info */}
                            {session && (
                                <div className="mt-6 pt-6 border-t">
                                    <div className="text-sm">
                                        <p className="font-semibold text-dark">{session.user?.name}</p>
                                        <p className="text-gray-text text-xs mt-1">{session.user?.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

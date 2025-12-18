'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Services', href: '/our-services' },
        { label: 'Portfolio', href: '/our-portfolio' },
        { label: 'Career', href: '/career' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <header
            className="
                sticky top-0 z-50
                bg-[var(--color-surface)]
                text-[var(--color-text)]
                shadow-custom-md
                transition-colors duration-300
            "
        >
            <nav className="container-custom py-4">
                <div className="flex items-center justify-between">
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/Ajx-logo.png"
                            alt="AJX Technologies"
                            width={150}
                            height={50}
                            className="h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="
                                    font-medium
                                    text-[var(--color-text)]
                                    hover:text-[var(--color-primary)]
                                    transition-colors
                                "
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA + Theme Toggle */}
                    <div className="hidden lg:flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/contact" className="btn-primary">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            aria-label="Toggle menu"
                            className="p-2 text-[var(--color-text)]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="
                            lg:hidden mt-4 pt-4 pb-4
                            border-t
                            border-[var(--color-border)]
                        "
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="
                                        font-medium
                                        text-[var(--color-text)]
                                        hover:text-[var(--color-primary)]
                                        transition-colors
                                    "
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn-primary text-center"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeSwitcherButton from './ColorSwitcher'; // From your new code
import AnimatedButton from '@/components/animation/AnimatedButton'; // From your new code

export default function Header() {
    const pathname = usePathname();
    const [isHidden, setIsHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Navigation Links from your original code
    const navLinks = [
        { label: 'About Us', href: '/about-us' },
        { label: 'Services', href: '/our-services' },
        { label: 'Portfolio', href: '/our-portfolio' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
    ];

    // Scroll Logic: Hides or transforms header after 10px scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY; // modern way to get scroll pos
            setIsHidden(currentScrollPos > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header 
            className={`mxd-header fixed top-0 w-full z-50 transition-all duration-300 
            ${isHidden ? 'mxd-header--scrolled py-2 shadow-lg' : 'py-4'}`}
        >
            <nav className="container-custom flex items-center justify-between">
                
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/Ajx-logo.png"
                            alt="AJX Technologies"
                            width={150}
                            height={50}
                            className="h-10 w-auto"
                            priority
                        />
                        {/* Optional: Add the "rayo" text style from Header1 if desired */}
                        <span className="hidden sm:block font-bold text-xl tracking-tight">
                            AJX
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav - Centered */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-medium transition-colors hover:text-[var(--color-primary)] ${
                                pathname === link.href ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Controls: Theme + Animated Button */}
                <div className="flex items-center gap-4">
                    <ThemeSwitcherButton />
                    
                    <div className="hidden sm:block">
                        <AnimatedButton
                            text={pathname === '/contact' ? 'Let\'s Talk' : 'Get Started'}
                            className="btn-primary" // Use your existing CSS class
                            href="/contact"
                        >
                            <i className="ph-bold ph-arrow-up-right ml-2" />
                        </AnimatedButton>
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        className="lg:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {/* Use your previous SVG Icon logic here */}
                        <span className="sr-only">Toggle Menu</span>
                        <div className="w-6 h-0.5 bg-current mb-1"></div>
                        <div className="w-6 h-0.5 bg-current mb-1"></div>
                        <div className="w-6 h-0.5 bg-current"></div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-[var(--color-surface)] border-t p-4 flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href} 
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}

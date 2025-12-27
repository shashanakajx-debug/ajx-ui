import React from 'react';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer1';
import MobileMenu from '@/components/organisms/Header/MobileMenu';
import InitScroll from '@/components/scroll/InitScroll';
import LenisSmoothScroll from '@/components/scroll/LenisSmoothScroll';
import ScrollTop from '@/components/scroll/ScrollTop';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="loading-wrap">
            <InitScroll />
            <LenisSmoothScroll />
            <MobileMenu />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ScrollTop />
        </div>
    );
}
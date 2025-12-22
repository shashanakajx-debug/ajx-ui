import React from 'react';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer1';
import MobileMenu from '@/components/organisms/Header/MobileMenu';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <MobileMenu />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
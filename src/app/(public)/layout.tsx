import React from 'react';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
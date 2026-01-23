import React from 'react';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer1';
import MobileMenu from '@/components/organisms/Header/MobileMenu';
import InitScroll from '@/components/scroll/InitScroll';
import LenisSmoothScroll from '@/components/scroll/LenisSmoothScroll';
import Loader from '@/components/common/Loader';

import ChatWidget from '@/components/ai-chatbot/ChatWidget';
import ScrollNextSection from '@/components/ScrollNextSection';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="loading-wrap !overflow-visible">
            <Loader />
            <InitScroll />
            <LenisSmoothScroll />
            <MobileMenu />
            <Header />
            <main className="min-h-screen !overflow-visible">{children}</main>
            <ChatWidget />
            <Footer />
            <ScrollNextSection />
        </div>
    );
}
import Footer from '@/components/public/Footer';
import Header from '@/components/public/Header';
import type React from 'react';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen">
            <Header />

            <main>{children}</main>

            <Footer />
        </div>
    );
}

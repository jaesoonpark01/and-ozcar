// components/layout/MarketplaceLayout.tsx
"use client";

import React from 'react';
import Navbar from '@/components/Navbar';

interface Props {
    children: React.ReactNode;
}

const MarketplaceLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#010410] text-white font-sans">
            <Navbar />

            <main className="pt-40 pb-12 px-6 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default MarketplaceLayout;

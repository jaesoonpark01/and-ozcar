"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MarketplaceLayout from '@/components/layout/MarketplaceLayout';
import { ShoppingBag, Database, Zap, Repeat, ArrowLeftRight } from 'lucide-react';

export default function MarketLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tabs = [
        { name: 'Vehicle Market', href: '/marketplace', icon: <ShoppingBag size={16} /> },
        { name: 'Sell / List', href: '/marketplace/sell', icon: <ArrowLeftRight size={16} /> },
        { name: 'Trade-In', href: '/marketplace/trade-in', icon: <Repeat size={16} /> },
        { name: 'Data Insights Lab', href: '/marketplace/insight-lab', icon: <Database size={16} /> },
        { name: 'V2G Energy Market', href: '/marketplace/v2g-market', icon: <Zap size={16} /> },
    ];

    return (
        <MarketplaceLayout>
            <div className="mb-8">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Global Marketplace</h1>
                
                {/* Horizontal Tab Navigation */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/10">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link 
                                key={tab.href}
                                href={tab.href}
                                className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-sm transition-all whitespace-nowrap ${
                                    isActive 
                                    ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-400' 
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                                }`}
                            >
                                {tab.icon}
                                {tab.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Page Content Rendered Here */}
            <div className="min-h-[50vh]">
                {children}
            </div>
        </MarketplaceLayout>
    );
}

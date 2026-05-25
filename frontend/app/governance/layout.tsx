"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MarketplaceLayout from '@/components/layout/MarketplaceLayout';
import { Landmark, Scale, Trophy, Leaf, Users } from 'lucide-react';

export default function GovernanceLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tabs = [
        { name: 'DAO Voting', href: '/governance', icon: <Landmark size={16} /> },
        { name: 'Jury System', href: '/governance/jury', icon: <Scale size={16} /> },
        { name: 'Social League', href: '/governance/social-league', icon: <Trophy size={16} /> },
        { name: 'Eco Lab', href: '/governance/eco-lab', icon: <Leaf size={16} /> },
        { name: 'Ambassadors', href: '/governance/ambassador', icon: <Users size={16} /> },
    ];

    return (
        <MarketplaceLayout>
            <div className="mb-8">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Ozcar DAO</h1>
                
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
                                    ? 'bg-emerald-600/20 text-emerald-400 border-b-2 border-emerald-400' 
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

// components/marketplace/CertifiedBadge.tsx
"use client";

import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface CertifiedBadgeProps {
    score?: number;
    trustTier?: 'AAA' | 'AA' | 'A';
}

export default function CertifiedBadge({ score = 98, trustTier = 'AAA' }: CertifiedBadgeProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="bg-[#10B981] text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-emerald-400/30 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 animate-in fade-in zoom-in duration-500">
                <ShieldCheck className="w-3 h-3 stroke-[3]" />
                OZCAR AI CERTIFIED
            </div>
            <div className="bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-xl border border-white/10 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-blue-400 fill-blue-400" />
                    <span>TRUST {trustTier}</span>
                </div>
                <div className="w-px h-2 bg-white/20"></div>
                <span className="text-blue-400">{score}%</span>
            </div>
        </div>
    );
}
